const MessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },
  platform: {
    type: String,
    enum: ["instagram", "facebook"],
    required: true
  },
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true });

MessageSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Message", MessageSchema);
