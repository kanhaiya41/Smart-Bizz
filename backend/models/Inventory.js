import mongoose from "mongoose";
const inventorySchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },

  source: {
    type: String // original filename
  },

  fileType: {
    type: String, // "csv" | "json"
  },
    filePath: {
    type: String, // "csv" | "json"
  },

  rawData: {
    type: mongoose.Schema.Types.Mixed, // EXACT file data
    required: true
  },

  recordCount: Number,

} , {timestamps : true});

const Inventory =  mongoose.model("Inventory", inventorySchema);
export default Inventory;

