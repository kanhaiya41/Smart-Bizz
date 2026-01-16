import Message from "../models/Message.js";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";


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
        const platform = req.query.platform
        const filter = req.query.filter
    
        console.log(req.user);

        let query ={ owner: ownerId }

        if(platform)
            { query.platform = platform }

if (filter) { 
  const start = new Date();
  start.setHours(0, 0, 0, 0);   // day start

  const end = new Date();
  end.setHours(23, 59, 59, 999); // day end

  query.updatedAt = { 
    $gte: start, 
    $lte: end 
  };
}

       
        const users = await User.find(query)
            .select("-passwordHash")
            .lean();

           
            

        const userIds = users.map(u => u._id);

        const messages = await Message.find({
            userId: { $in: userIds }
        })
            .sort({ createdAt: 1 })
            .lean();

 
        const messageMap = {};
        for (const msg of messages) {
            const key = msg.userId.toString();
            if (!messageMap[key]) messageMap[key] = [];
            messageMap[key].push(msg);
        }

        const data = users.map(user => ({
            user,platform,
            messages: messageMap[user._id.toString()] || []
        }));

        return res.json({ success: true, data });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
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

