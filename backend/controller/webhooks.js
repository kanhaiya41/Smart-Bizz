
import axios from "axios";
import Tenant from "../models/Tenant.js";
import { searchUserData } from "../services/embedding.service.js";

import Gemini_Model from "../utills/gemini.js";
import User from "../models/User.js";
import Message from "../models/Message.js"

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
    const objectType = req.body.object;
    const platform = objectType === "page" ? "facebook" : "instagram";

    const messaging = req.body.entry?.[0]?.messaging?.[0];

    if (!messaging?.message?.text || messaging.message.is_echo) {
      return res.sendStatus(200);
    }

    const senderId = messaging.sender.id;
    const recipientId = messaging.recipient.id;
    const userText = messaging.message.text;

    const tenant = await Tenant.findOne(
      platform === "facebook"
        ? { "page.pageId": recipientId }
        : { "page.igBusinessId": recipientId }
    );

    if (!tenant) return res.sendStatus(200);


    let user = await User.findOne({ uniqueId: senderId, platform });

    if (!user) {
      user = await saveUserProfile(
        senderId,
        tenant.page.accessToken,
        tenant.owner,
        platform
      );
    }

    await Message.create({
      userId: user._id,
      tenantId: tenant._id,
      platform,
      sender: "user",
      text: userText
    });

   
    const result = await Gemini_Model.generateContent({
      contents: [{ role: "user", parts: [{ text: userText }] }]
    });

    const replyText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Thanks for your message 🙂";


    await replyToUser(senderId, replyText, tenant.page.accessToken);

  
    await Message.create({
      userId: user._id,
      tenantId: tenant._id,
      platform,
      sender: "bot",
      text: replyText
    });

    return res.sendStatus(200);

  } catch (err) {
    console.error("Webhook Error:", err);
    return res.sendStatus(200);
  }
};



