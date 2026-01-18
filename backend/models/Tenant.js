import  mongoose  from 'mongoose';

const TenantSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    businessName: {
        type: String,
    },
    page: {
        pageId: {
            type: String,
           
        },
        igBusinessId: {
            type: String,
          
        },
        accessToken: {
            type: String,
       
        },
        tokenExpiresAt: Date
    },

        platform: {
        type: String,
    },

    settings: {
        autoReplyEnabled: { type: Boolean, default: true },
        model: { type: String, default: 'gemini-small' }
    }
}, { timestamps: true });
const Tenant = mongoose.model('Tenant', TenantSchema);
export default Tenant;

