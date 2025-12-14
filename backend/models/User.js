import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },

    // User can own or manage multiple tenants (businesses/pages)
    tenants: [{
        name: String,
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant'
        }


    }],

    role: {
        type: String,
        enum: ['owner', 'admin', 'viewer'],
        default: 'owner'
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;