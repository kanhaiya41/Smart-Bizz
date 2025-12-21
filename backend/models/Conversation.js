import { Schema, model } from 'mongoose';
const ConversationSchema = new Schema({
  tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' },
  ig_user_id: String,
  platform: { type: String, default: 'instagram' },
  lastMessageAt: Date,
  meta: Object
}, {
  timestamps: true
});

const Conversation = model('Conversation', ConversationSchema);
export default Conversation;
