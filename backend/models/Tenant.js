import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  businessName: String,

  platform: {
    type: String,
    enum: ["facebook", "instagram", "whatsapp"],
    required: true
  },

  //Facebook & Instagram
  page: {
    pageId: String,
    igBusinessId: String,
    accessToken: String,
    tokenExpiresAt: Date
  },

  //WhatsApp Business
  whatsapp: {
    businessId: String,       // Meta Business Manager ID
    wabaId: String,           // WhatsApp Business Account ID
    phoneNumberId: String,    // WhatsApp Phone Number ID
    displayPhone: String,
    accessToken: String,
    tokenExpiresAt: Date,
    webhookSubscribed: { type: Boolean, default: false }
  },

  // ⚙ Platform settings
  settings: {
    autoReplyEnabled: { type: Boolean, default: true },
    model: { type: String, default: "gemini-small" }
  },

  isActive: { type: Boolean, default: true }

}, { timestamps: true });

const Tenant = mongoose.model("Tenant", TenantSchema);
export default Tenant;
