
import axios from "axios";
import Tenant from "../models/Tenant.js";
import { searchUserData } from "../services/embedding.service.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import Gemini_Model from "../utills/gemini.js";

async function replyToUser(userId, text, PAGE_ACCESS_TOKEN) {
    // FIX: Use 'me/messages' or ensure igBusinessId is the correct Page/Business ID
    // Hackathon ke liye 'me/messages' sabse safe aur working endpoint hai
    const url = `https://graph.facebook.com/v19.0/me/messages`;

    const payload = {
        recipient: {
            id: userId // Ye wahi senderId hai jo webhook se mili
        },
        message: {
            text: text
        }
    };

    try {
        const result = await axios.post(url, payload, {
            params: { access_token: PAGE_ACCESS_TOKEN }
        });

        if (result.status === 200) {
            console.log("Message successfully sent to:", userId);
            return true;
        }
    } catch (error) {
        // Isse aapko exact pata chalega ki Meta kya error de raha hai
        console.error("❌ Send Error Details:", error.response?.data || error.message);
        return false;
    }
}


export const reciveWebhook = (req, res) => {
    try {

        console.log("VERIFY REQUEST:", req.query);
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        console.log("VERIFY REQUEST:", req.query);
        console.log("events:", req.body);

        if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
            console.log("Webhook verified ");
            return res.status(200).send(challenge);
        }

        return res.sendStatus(403);
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({ "message": "Internal Server Error" });
    }

};


export const metaEvents = async (req, res) => {
    try {
        console.log(JSON.stringify(req.body, null, 2));

        const objectType = req.body.object; // "page" | "instagram"
        const platform = objectType === "page" ? "facebook" : "instagram";

        const entry = req.body.entry?.[0];
        const messaging = entry?.messaging?.[0];

        if (!messaging?.message?.text) {
            return res.sendStatus(200);
        }

        // Ignore echo messages
        if (messaging.message.is_echo) {
            return res.sendStatus(200);
        }

        const senderId = messaging.sender.id;
        const recipientId = messaging.recipient.id;
        const userText = messaging.message.text;
        const messageId = messaging.message.mid;

        //  Find tenant
        const tenantQuery =
            platform === "facebook"
                ? { "page.pageId": recipientId }
                : { "page.igBusinessId": recipientId };

        const userTenant = await Tenant.findOne(tenantQuery);

        if (!userTenant) {
            console.log("Tenant not found");
            return res.sendStatus(200);
        }

        //  Find or Create Conversation
        let convo = await Conversation.findOne({
            tenant: userTenant._id,
            ig_user_id: senderId,
            platform
        });

        if (!convo) {
            convo = await Conversation.create({
                tenant: userTenant._id,
                ig_user_id: senderId,
                platform,
                lastMessageAt: new Date()
            });
        } else {
            convo.lastMessageAt = new Date();
            await convo.save();
        }

        //  Save USER message
        await Message.create({
            convo: convo._id,
            tenant: userTenant._id,
            from: "user",
            text: userText,
            messageId,
            payload: messaging
        }).catch(err => {
            if (err.code !== 11000) throw err; // ignore duplicate user messages
        });

        //  AI Search
        const findUserRelatedQuery = await searchUserData(
            userTenant.owner,
            userText
        );

        const prompt = `
You are a business assistant.

Business Info:
${findUserRelatedQuery}

User Question:
${userText}
`;

        const result = await Gemini_Model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        });

        const replyText =
            result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Thanks for your message";

        //  SAVE BOT MESSAGE FIRST  (IMPORTANT FIX)
        await Message.create({
            convo: convo._id,
            tenant: userTenant._id,
            from: "bot",
            text: replyText,
            payload: { ai: true }
        });

        //  Send reply to Meta
        if (platform === "instagram") {
            await replyToUser(
                senderId,
                replyText,
                userTenant.page.accessToken
            );
        }

        if (platform === "facebook") {
            await replyToUser(
                senderId,
                replyText,
                userTenant.page.accessToken
            );
        }

        return res.sendStatus(200);

    } catch (error) {
        console.error("Webhook Error:", error);
        return res.sendStatus(200);
    }
};



