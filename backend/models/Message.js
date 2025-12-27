
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
  },
  platform: {
    type: String,
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
  }
}, { timestamps: true });


const  Message = mongoose.model("Message", MessageSchema);

export default Message
