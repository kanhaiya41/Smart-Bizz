
import axios from "axios";
import Gemini_Model from "../utills/gemini.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import { searchUserData } from "../services/qdrant.service.js";
import { compactRules } from "../utills/jswToken.js";
import { emitToOwner } from "../utills/socket.js";


export const verifyMetaWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log(req.query);


  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
    console.log("META WEBHOOK VERIFIED");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

export const metaWebhookEvents = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);


    // Facebook & Instagram
    if (body.object === "page" || body.object === "instagram") {
      return await metaEvents(req, res);
    }

    // WhatsApp
    if (body.object === "whatsapp_business_account") {
      return await metaWhatsAppEvents(req, res);
    }

    return res.sendStatus(200);

  } catch (err) {
    console.error("META WEBHOOK ERROR:", err);
    return res.sendStatus(200);
  }
};

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

async function getSocialUserProfile({
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

    //INSTAGRAM USER (Messaging API)
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
const metaEvents = async (req, res) => {
  try {
    const objectType = req.body.object;
    const platform = objectType === "page" ? "facebook" : "instagram";

    const messaging = req.body.entry?.[0]?.messaging?.[0];

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
      const profile = await getSocialUserProfile({ platform: platform, userId: senderId, accessToken: tenant?.page?.accessToken });
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

    if (!conversation?.autoReplyEnabled) {
      console.log("Emit is Triegger On Auto Reply Is user");

      emitToOwner(business._id,
        "conversation:update",
        {
          conversationId: conversation._id,
          lastMessage: conversation.lastMessage,
          lastMessageAt: conversation.lastMessageAt
        }
      )
      return res.sendStatus(200);
    }

    // Get business-specific searchable data
    const bussinessOnwerData = await searchUserData({
      userId: business._id,
      query: userText
    });

    //  Safe defaults
    const safeRulesheet = business?.rulesheet || compactRules || {};
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
    let replyText = "Thanks for your message";

    try {
      const result = await Gemini_Model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      });


      const aiText =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiText && typeof aiText === "string") {
        replyText = aiText.trim();
      }

    } catch (error) {
      console.error("Gemini AI Error:", error);
      replyText = "Thanks for your message. We will connect with you shortly.";
    }


    console.log("businessOwnerData:", dataStr);
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

    emitToOwner(business._id,
      "conversation:update",
      {
        conversationId: conversation._id,
        lastMessage: conversation.lastMessage,
        lastMessageAt: conversation.lastMessageAt
      }
    )

    return res.sendStatus(200);

  } catch (err) {
    console.error("Webhook Error:", err);
    return res.sendStatus(200);
  }
};

const metaWhatsAppEvents = async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // Ignore status updates
    if (!value?.messages) {
      return res.sendStatus(200);
    }

    const message = value.messages[0];

    // Only handle text messages
    if (message.type !== "text") {
      return res.sendStatus(200);
    }

    const customerPhone = message.from; // customer number
    const userText = message.text.body;
    const phoneNumberId = value.metadata.phone_number_id;

    // 🔹 FIND TENANT BY PHONE NUMBER ID
    const tenant = await Tenant.findOne({
      "whatsapp.phoneNumberId": phoneNumberId
    });

    if (!tenant) return res.sendStatus(200);

    const business = await User.findById(tenant.owner);
    if (!business) return res.sendStatus(200);

    // 🔹 FIND OR CREATE CONVERSATION
    let conversation = await Conversation.findOne({
      businessId: business._id,
      tenantId: tenant._id,
      "customer.externalId": customerPhone
    });

    if (!conversation) {
      conversation = await Conversation.create({
        businessId: business._id,
        tenantId: tenant._id,
        platform: "whatsapp",
        customer: {
          externalId: customerPhone,
          phone: customerPhone,
          name: message.profile?.name || "WhatsApp User"
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

    await Conversation.findByIdAndUpdate(conversation._id, {
      lastMessage: {
        text: userText,
        senderType: "customer"
      },
      lastMessageAt: new Date()
    });

    // 🔹 FETCH BUSINESS DATA
    const bussinessOnwerData = await searchUserData({
      userId: business._id,
      query: userText
    });

    const safeRulesheet = business?.rulesheet || compactRules || {};
    const safeData = bussinessOnwerData || {};

    const rulesheetStr = JSON.stringify(safeRulesheet, null, 2);
    const dataStr = JSON.stringify(safeData, null, 2);

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
    let replyText = "Thanks for your message";

    try {
      const result = await Gemini_Model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      });

      console.log("businessOwnerData:", dataStr);

      const aiText =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiText && typeof aiText === "string") {
        replyText = aiText.trim();
      }

    } catch (error) {
      console.error("Gemini AI Error:", error);
      replyText = "Thanks for your message. We will connect with you shortly.";
    }

    // 🔹 SEND MESSAGE TO WHATSAPP
    const sent = await sendWhatsAppMessage({
      phoneNumberId: tenant.whatsapp.phoneNumberId,
      accessToken: tenant.whatsapp.accessToken,
      to: customerPhone,
      text: replyText
    });

    // 🔹 SAVE BOT MESSAGE
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
    console.error("WhatsApp Webhook Error:", err);
    return res.sendStatus(200);
  }
};

const sendWhatsAppMessage = async ({ phoneNumberId, accessToken, to, text }) => {
  try {
    const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;

    await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to,
        text: { body: text }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    return true;
  } catch (err) {
    console.error("WhatsApp Send Error:", err.response?.data || err.message);
    return false;
  }
};

export const handleReplyMessage = async (req, res) => {
  try {
    const { senderId, replyMessage, conversationId } = req.body;

    // Proper validation
    console.log(req.body);

    if (!senderId || !replyMessage || !conversationId) {
      return res.status(400).json({
        message: "senderId, replyMessage, conversationId are required"
      });
    }

    // Find conversation
    const conversation = await Conversation
      .findById(conversationId)
      .populate("tenantId");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const lastMsg = conversation.lastMessage;

    // Last message must be from customer
    if (!lastMsg || lastMsg.senderType !== "customer") {
      return res.status(400).json({
        message: "Last message must be from customer first"
      });
    }
    console.log(conversation);
    // Send reply to user
    const send = await replyToUser(
      conversation.customer?.externalId,
      replyMessage,
      conversation.tenantId?.page?.accessToken
    );

    console.log("reply", send);


    if (!send) {
      return res.status(500).json({ message: "Error sending message" });
    }

    // Save owner reply
    await Message.create({
      conversationId,
      senderType: "owner",
      text: replyMessage
    });

    // Update conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        text: replyMessage,
        senderType: "owner"
      },
      lastMessageAt: new Date()
    });

    return res.status(200).json({ message: "Reply sent successfully" });

  } catch (error) {
    console.error("handleReplyMessage error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};





