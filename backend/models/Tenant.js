import  mongoose  from 'mongoose';

const TenantSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    instagram: {
        pageId: {
            type: String,
            required: true
        },
        igBusinessId: {
            type: String,
            required: true
        },
        accessToken: {
            type: String,
            required: true
        },
        tokenExpiresAt: Date
    },

    settings: {
        autoReplyEnabled: { type: Boolean, default: true },
        model: { type: String, default: 'gemini-small' }
    }
}, { timestamps: true });
module.exports = mongoose.model('Tenant', TenantSchema);

