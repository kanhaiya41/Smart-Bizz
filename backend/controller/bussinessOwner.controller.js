import Message from "../models/Message.js";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";
import Conversation from "../models/Conversation.js";
import Inventory from "../models/Inventory.js";
import { COLLECTION, qdrant } from "../services/qdrant.service.js";


export const getProfile = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const user = await User.findById(ownerId)
            .select("-passwordHash")
            .lean();

        return res.json({ success: true, data:user });

    } catch (err) {
        res.status(500).json({message: err.message });
    }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const {
      firstName,
      lastName,
      email,
      contact,
      dob,
      address,
    } = req.body;

    const updatePayload = {};

     if (req.file) {
      updatePayload.profilePhoto = `/uploads/profile/${req.file.filename}`;
    }

    // 🔹 Basic Info
    if (firstName) updatePayload.firstName = firstName;
    if (lastName) updatePayload.lastName = lastName;
    if (email) updatePayload.email = email;
    if (contact) updatePayload.contact = contact;
    if (dob) updatePayload.dob = dob;

    // 🔹 Address (nested update)
    if (address && typeof address === "object") {
      Object.keys(address).forEach((key) => {
        updatePayload[`address.${key}`] = address[key];
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatePayload },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



// export const getAllMessages = async (req, res) => {
//   try {
//     const ownerId = req.user.id;
//     const platform = req.query.platform; // optional: "instagram" | "facebook" | "whatsapp"
//     const filter = req.query.filter;     // optional: "today"

//     // 1 Find all tenants for this business owner
//     let tenantQuery = { owner: ownerId };
//     if (platform) tenantQuery.platform = platform;

//     const tenants = await Tenant.find(tenantQuery).select("_id platform");

//     if (!tenants || tenants.length === 0) {
//       return res.json({ success: true, data: [] });
//     }

//     const tenantIds = tenants.map(t => t._id);

//     //  Build conversation query
//     let convQuery = { tenantId: { $in: tenantIds } };

//     if (filter === "today") {
//       const start = new Date();
//       start.setHours(0, 0, 0, 0);

//       const end = new Date();
//       end.setHours(23, 59, 59, 999);
//       const end = new Date();
//       end.setHours(23, 59, 59, 999);

//       convQuery.lastMessageAt = { $gte: start, $lte: end };
//     }
//       convQuery.lastMessageAt = { $gte: start, $lte: end };
//     }

//     // Fetch conversations (Inbox)
//     const conversations = await Conversation.find(convQuery)
//       .select("customer lastMessage lastMessageAt tenantId")
//       .sort({ lastMessageAt: -1 })
//       .lean();
//     // Fetch conversations (Inbox)
//     const conversations = await Conversation.find(convQuery)
//       .select("customer lastMessage lastMessageAt tenantId")
//       .sort({ lastMessageAt: -1 })
//       .lean();

//     return res.json({ success: true, data: conversations });

//   } catch (err) {
//     console.error("getAllMessages Error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// controllers/chatController.js

export const getAllUsers = async (req, res) => {
  try {
    const businessId = req.user.id; // from auth middleware
    const tenantId = req.query.tenantId; // optional (page / account)

    let filter = { businessId };

    if (tenantId) {
      filter.tenantId = tenantId;
    }

    const conversations = await Conversation.find(filter)
      .sort({ lastMessageAt: -1 })
      .select({
        customer: 1,
        lastMessage: 1,
        lastMessageAt: 1,
        tenantId: 1,
        createdAt: 1,
        platform:1
      });

    return res.status(200).json({
      success: true,
      data: conversations
    });

  } catch (err) {
    console.error("getAllUsers error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

export const getAllTodayConversation = async (req, res) => {
  try {
    const businessId = req.user.id; // from auth middleware
    const tenantId = req.query.tenantId; // optional (page / account)


const start = new Date();
start.setHours(0, 0, 0, 0);

const end = new Date();
end.setHours(23, 59, 59, 999);

let filter = {
  businessId,
  lastMessageAt: { $gte: start, $lte: end }
}

    if (tenantId) {
      filter.tenantId = tenantId;
    }

    const conversations = await Conversation.find(filter)
      .sort({ lastMessageAt: -1 })
      .select({
        customer: 1,
        lastMessage: 1,
        lastMessageAt: 1,
        tenantId: 1,
        createdAt: 1,
        platform:1
      });

    return res.status(200).json({
      success: true,
      data: conversations
    });

  } catch (err) {
    console.error("getAllUsers error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

export const getSingleChat = async (req, res) => {
  try {
    const businessId = req.user.id;
    const conversationId = req.query.conversationId;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    //Security check (VERY IMPORTANT)
    const conversation = await Conversation.findOne({
      _id: conversationId,
      businessId
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    

    return res.status(200).json({
      success: true,
      data : messages
    });

  } catch (err) {
    console.error("getSingleChat error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat"
    });
  }
};
export const getAllTeanants = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const teants = await Tenant.find({owner:ownerId })

        return res.json({ success: true, data:teants });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getInventory = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const inventories = await Inventory.find({ ownerId });

    return res.json({
      success: true,
      data: inventories
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Inventory id required" });
    }

    /*  Delete from MongoDB */
    const inventory = await Inventory.findByIdAndDelete(id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    /*  Delete related vectors from Qdrant */
    await qdrant.delete(COLLECTION, {
      filter: {
        must: [
          {
            key: "inventoryId",
            match: { value: id },
          },
        ],
      },
    });

    return res.status(200).json({
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    console.error("Delete Inventory Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const toggleAutoReply = async (req, res) => {
  try {
    const { conversationId } = req.query;
    const { autoReplyEnabled } = req.body;

    if (typeof autoReplyEnabled !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "autoReplyEnabled must be true or false"
      });
    }

    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { autoReplyEnabled },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }

    return res.json({
      success: true,
      message: "Auto reply updated successfully",
      autoReplyEnabled: conversation.autoReplyEnabled,
      conversationId: conversation._id
    });

  } catch (error) {
    console.error("Toggle Auto Reply Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


 

