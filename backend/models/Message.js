import { Schema, model } from 'mongoose';
const MessageSchema = new Schema({
    convo: { type: Schema.Types.ObjectId, ref: 'Conversation' },
    tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    from: { type: String }, // 'user' or 'bot' or 'system'
    text: String,
    payload: Object,

}, {
    timestamps: true
});
const Message = model('Message', MessageSchema);
export default Message;
