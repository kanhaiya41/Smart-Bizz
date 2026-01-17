// models/Conversation.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderType: {
    type: String,
    enum: ["customer", "agent", "bot"],
    required: true
  },

  text: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });


const ConversationSchema = new mongoose.Schema({

  // Business owner
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },

  // Page / Account
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    index: true
  },

  // CUSTOMER INFO (Platform user)
  customer: {
    externalId: {
      type: String, // insta user id / whatsapp number
      index: true
    },
    name: String,
    username: String,
    profileImage: String,
    email: String,
    phone: String
  },

  //CHAT HISTORY
  messages: [MessageSchema],

  // Inbox optimization
  lastMessage: {
    text: String,
    senderType: String
  },

  lastMessageAt: Date

}, { timestamps: true });

const Conversation =  mongoose.model("Conversation", ConversationSchema);
export default Conversation;
