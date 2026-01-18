
import axios from "axios";
import Gemini_Model from "../utills/gemini.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import {searchUserData } from "../services/qdrant.service.js";
import { defualtRulesheet } from "../utills/jswToken.js";


async function replyToUser(userId, text, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v19.0/me/messages`;

  const payload = {
    recipient: { id: userId },
    message: { text }
  };

  try {
    const result = await axios.post(url, payload, {
      params: { access_token: PAGE_ACCESS_TOKEN }
    });

    if (result.status === 200) {
      console.log("Message sent to:", userId);
      return true;
    }
  } catch (error) {
    console.error(
      "Meta Send Error:",
      error.response?.data || error.message
    );
    return false;
  }
}


export async function getSocialUserProfile({
  platform,
  userId,
  accessToken,
}) {
  try {
    let url = "";
    let params = {};

    // FACEBOOK MESSENGER USER
    if (platform === "facebook") {
      url = `https://graph.facebook.com/v19.0/${userId}`;
      params = {
        fields: "name,profile_pic",
        access_token: accessToken,
      };
    }

    // 🟣 INSTAGRAM USER (Messaging API)
    else if (platform === "instagram") {
      url = `https://graph.facebook.com/v19.0/${userId}`;
      params = {
        fields: "username,profile_pic",
        access_token: accessToken,
      };
    } else {
      throw new Error("Unsupported platform");
    }

    const response = await axios.get(url, { params });

    return {
      success: true,
      platform,
      data: {
        name: response.data.name || response.data.username || "Unknown",
        image: response.data.profile_pic || null,
        userId,
      },
    };
  } catch (error) {
    console.error(
      `${platform.toUpperCase()} API Error:`,
      error.response?.data || error.message
    );

    return {
      success: false,
      platform,
      error: error.response?.data || "Failed to fetch user profile",
    };
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

    console.log(req.body);
    
    const objectType = req.body.object;
    const platform = objectType === "page" ? "facebook" : "instagram";

    const messaging = req.body.entry?.[0]?.messaging?.[0];
    console.log(messaging);
    
    

    // Ignore echoes / non-text
    if (!messaging?.message?.text || messaging.message.is_echo) {
      return res.sendStatus(200);
    }

    const senderId = messaging.sender.id;       // CUSTOMER
    const recipientId = messaging.recipient.id; // PAGE / IG
    const userText = messaging.message.text;

    // 🔹 FIND TENANT
    const tenant = await Tenant.findOne(
      platform === "facebook"
        ? { "page.pageId": recipientId }
        : { "page.igBusinessId": recipientId }
    );

    if (!tenant) return res.sendStatus(200);

    // 🔹 BUSINESS OWNER
    const business = await User.findById(tenant.owner);
    if (!business) return res.sendStatus(200);

    // 🔹 FIND OR CREATE CONVERSATION
    let conversation = await Conversation.findOne({
      businessId: business._id,
      tenantId: tenant._id,
      "customer.externalId": senderId
    });

    if (!conversation) {
      const profile = await getSocialUserProfile({platform:platform,userId: senderId , accessToken :tenant?.page?.accessToken});
      conversation = await Conversation.create({
        businessId: business._id,
        tenantId: tenant._id,
        platform: platform,
        customer: {
          externalId: senderId,
          name: profile.data?.name,
          profileImage: profile.data.image
        },
        lastMessageAt: new Date()
      });
    }

    // 🔹 SAVE CUSTOMER MESSAGE
    await Message.create({
      conversationId: conversation._id,
      senderType: "customer",
      text: userText
    });

    // 🔹 UPDATE CONVERSATION METADATA
    await Conversation.findByIdAndUpdate(conversation._id, {
      lastMessage: {
        text: userText,
        senderType: "customer"
      },
      lastMessageAt: new Date()
    });

// Get business-specific searchable data
const bussinessOnwerData = await searchUserData({
  userId: business._id,
  query: userText
});

//  Safe defaults
const safeRulesheet = business?.rulesheet || defualtRulesheet || {};
const safeData = bussinessOnwerData || {};

// Stringify properly (VERY IMPORTANT)
const rulesheetStr = JSON.stringify(safeRulesheet, null, 2);
const dataStr = JSON.stringify(safeData, null, 2);

//  Strong, controlled prompt
const prompt = `
You are a BUSINESS AI assistant.

STRICT INSTRUCTIONS:
- You MUST follow the RULESHEET exactly.
- You MUST answer ONLY using RULESHEET and DATA.
- DO NOT guess or create new information.
- If the answer is not found, use fallbackRule.

RULESHEET:
${rulesheetStr}

DATA:
${dataStr}

User Question:
${userText}
`;

// AI reply
const result = await Gemini_Model.generateContent({
  contents: [
    {
      role: "user",
      parts: [{ text: prompt }]
    }
  ]
});

    console.log("bussinessOnwerData", bussinessOnwerData);
    

    const replyText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Thanks for your message";

    // 🔹 SEND TO META
    const sent = await replyToUser(
      senderId,
      replyText,
      tenant.page.accessToken
    );

    // 🔹 SAVE BOT MESSAGE ONLY IF SENT
    if (sent) {
      await Message.create({
        conversationId: conversation._id,
        senderType: "bot",
        text: replyText
      });

      await Conversation.findByIdAndUpdate(conversation._id, {
        lastMessage: {
          text: replyText,
          senderType: "bot"
        },
        lastMessageAt: new Date()
      });
    }

    return res.sendStatus(200);

  } catch (err) {
    console.error("Webhook Error:", err);
    return res.sendStatus(200);
  }
};





