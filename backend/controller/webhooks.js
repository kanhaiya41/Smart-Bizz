
import axios from "axios";
import Tenant from "../models/Tenant.js";

async function replyToInstagram(userId, igBusinessId, text, PAGE_ACCESS_TOKEN) {
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
            console.log("✅ Message successfully sent to:", userId);
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
        const entry = req.body.entry?.[0];
        const messaging = entry?.messaging?.[0];

        if (!messaging?.message?.text) {
            return res.sendStatus(200);
        }
        console.log(JSON.stringify(req.body, 2, ""));


        const senderId = messaging.sender.id;
        const igBusinessId = messaging.recipient.id;
        const userText = messaging.message.text;

        console.log("IG Message:", userText);

        // Auto reply

        const userTenants = await Tenant.findOne({
            "page.igBusinessId": igBusinessId
        })

        if (!userTenants) {
            console.log("userNot Found");
            return res.sendStatus(200);


        }
        console.log(userTenants);

        await replyToInstagram(
            senderId,
            igBusinessId,
            "Aaaksh Badve Message Aa gaye",
            userTenants.page.accessToken

        );

        return res.sendStatus(200);

    } catch (error) {
        console.error("Webhook Error:", error?.response?.data || error);
        res.sendStatus(200);
    }
};

