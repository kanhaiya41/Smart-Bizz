import mongoose from 'mongoose'
const MessageSchema = new mongoose.Schema({
    convo: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    from: { type: String }, // 'user' or 'bot' or 'system'
    text: String,
    payload: Object,

}, {
    timestamps: true
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;
