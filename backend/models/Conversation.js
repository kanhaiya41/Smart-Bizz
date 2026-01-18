import mongoose from "mongoose";
const ConversationSchema = new mongoose.Schema({
  businessId: { type:  mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  tenantId: { type:  mongoose.Schema.Types.ObjectId, ref: "Tenant", index: true },

  customer: {
    externalId: { type: String, index: true },
    name: String,
    username: String,
    profileImage: String,
    email: String,
    phone: String
  },

  status: {
    type: String,
    enum: ["open", "pending", "closed"],
    default: "open"
  },

  platform: {
    type: String,
  },

  lastMessage: {
    text: String,
    senderType: String
  },
  lastMessageAt: Date

}, { timestamps: true });

const Conversation =  mongoose.model("Conversation", ConversationSchema);
export default Conversation;

