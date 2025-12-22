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
    page: {
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
const Tenant = mongoose.model('Tenant', TenantSchema);
export default Tenant;

