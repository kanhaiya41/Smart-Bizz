import User from "../models/User.js";
import Tenant from "../models/Tenant.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

/* =========================
   USERS
========================= */

// 1️⃣ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-passwordHash")
      .populate("tenants.tenantId", "businessName slug");

    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2️⃣ Get single user with tenants
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-passwordHash")
      .populate("tenants.tenantId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================
   TENANTS
========================= */

// 3️⃣ Get all tenants
export const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate("owner", "name email");

    res.json({ success: true, data: tenants });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 4️⃣ Get tenant by ID
export const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.tenantId)
      .populate("owner", "name email");

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    res.json({ success: true, data: tenant });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================
   CONVERSATIONS
========================= */

// 5️⃣ Get all conversations
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .populate("tenant", "businessName slug")
      .sort({ lastMessageAt: -1 });

    res.json({ success: true, data: conversations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 6️⃣ Get conversations by tenant
export const getConversationsByTenant = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      tenant: req.params.tenantId
    }).sort({ lastMessageAt: -1 });

    res.json({ success: true, data: conversations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================
   MESSAGES
========================= */

// 7️⃣ Get messages of a conversation
export const getMessagesByConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      convo: req.params.convoId
    })
      .populate("tenant", "businessName")
      .sort({ createdAt: 1 });

    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 8️⃣ Get all messages (system wide)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("tenant", "businessName")
      .populate("convo");

    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================
   DASHBOARD STATS
========================= */

// 9️⃣ Super admin dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const [
      users,
      tenants,
      conversations,
      messages
    ] = await Promise.all([
      User.countDocuments(),
      Tenant.countDocuments(),
      Conversation.countDocuments(),
      Message.countDocuments()
    ]);

    res.json({
      success: true,
      data: {
        totalUsers: users,
        totalTenants: tenants,
        totalConversations: conversations,
        totalMessages: messages
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
