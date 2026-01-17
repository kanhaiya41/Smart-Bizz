import Message from "../models/Message.js";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";
import Conversation from "../models/Message.js";
import Inventory from "../models/Inventory.js";

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



export const getAllMessages = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const platform = req.query.platform; // optional: "instagram" | "facebook" | "whatsapp"
    const filter = req.query.filter;     // optional: "today"

    // 1 Find all tenants for this business owner
    let tenantQuery = { owner: ownerId };
    if (platform) tenantQuery.platform = platform;

    const tenants = await Tenant.find(tenantQuery).select("_id platform");

    if (!tenants || tenants.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const tenantIds = tenants.map(t => t._id);

    //  Build conversation query
    let convQuery = { tenantId: { $in: tenantIds } };

    if (filter === "today") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      convQuery.lastMessageAt = { $gte: start, $lte: end };
    }

    // Fetch conversations (Inbox)
    const conversations = await Conversation.find(convQuery)
      .select("customer lastMessage lastMessageAt tenantId")
      .sort({ lastMessageAt: -1 })
      .lean();

    return res.json({ success: true, data: conversations });

  } catch (err) {
    console.error("getAllMessages Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const todayMessage = async(req,res)=>{
    
}


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


 

