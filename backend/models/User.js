import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    pincode: { type: String, trim: true },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    platform: {
      type: String,
    },

    profilePhoto: {
  type: String, // URL or file path
},

    firstName: {
      type: String,
      required: true,
      trim: true,
    },
        lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    contact: {
      type: String,
      trim: true,
    },

    dob: {
      type: Date,
    },

    address: AddressSchema,

    passwordHash: {
      type: String,
      required: true,
    },

    tenants: [
      {
        name: String,
        tenantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tenant",
        },
      },
    ],

    rulesheet: {
      type: Object,
      default: null,
    },

    role: {
      type: String,
      enum: ["owner", "admin", "viewer"],
      default: "owner",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
