import mongoose from 'mongoose'
const ConversationSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ig_user_id: String,
  platform: { type: String, default: 'instagram' },
  lastMessageAt: Date,
  meta: Object
}, {
  timestamps: true
});
const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;

