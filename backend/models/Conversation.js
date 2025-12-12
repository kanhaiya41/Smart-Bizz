const mongoose = require('mongoose');
const ConversationSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  ig_user_id: String,
  platform: { type: String, default: 'instagram' },
  lastMessageAt: Date,
  meta: Object
}, {
    timestamps: true
});
module.exports = mongoose.model('Conversation', ConversationSchema);
