import User from "../models/User";

export const getAllMessages = async (req, res) => {
    try {
        const ownerId = req.user.id;   
        const users = await User.find({ owner: ownerId })
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
            user,
            messages: messageMap[user._id.toString()] || []
        }));

        return res.json({ success: true, data });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
