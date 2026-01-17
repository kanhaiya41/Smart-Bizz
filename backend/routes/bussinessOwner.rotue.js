import express from "express";
import { getAllMessages, getAllTeanants, getInventory, getProfile } from "../controller/bussinessOwner.controller.js";
import { verifyToken } from "../utills/jswToken.js";
import { uploadPDF } from "../controller/vector.controller.js";
import { uploadInventory } from "../controller/vector_controller_2.js";
// import upload from "../utills/multer.js";
 import upload from "../utills/multer.js";

const router = express.Router();

router.get("/getProfile", verifyToken, getProfile)
router.get("/all-users-with-messages", verifyToken, getAllMessages)
router.get("/get-all-teanants", verifyToken, getAllTeanants)
router.get("/get-inventory", verifyToken, getInventory)

router.post(
  "/upload-inventry",
  verifyToken,          
 upload.single("file"), 
  uploadInventory        
);



export default router;