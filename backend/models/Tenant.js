const mongoose = require('mongoose');
const TenantSchema = new mongoose.Schema({
    name: String,
    slug: { type: String, unique: true },
    // Instagram / Meta credentials per tenant
    instagram: {
        ig_user_id: String,
        page_id: String,
        access_token: String,
        token_expires_at: Date
    },
    settings: {
        auto_reply_enabled: { type: Boolean, default: true },
        model: { type: String, default: 'gemini-small' }
    },

}, {
    timestamps: true
});
module.exports = mongoose.model('Tenant', TenantSchema);
