// models/Message.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
  },

  senderType: {
    type: String,
    enum: ["customer", "agent", "bot"],
    required: true
  },

  text: {
    type: String,
    required: true
  }

}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);
export default Message;
