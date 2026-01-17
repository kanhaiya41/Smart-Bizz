import mongoose from "mongoose";
const inventorySchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: {
    type: String // original filename
  },

  size : {
     type: String
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

