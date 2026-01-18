import express from "express";
import {deleteInventory, getAllTeanants, getAllUsers, getInventory, getProfile, getSingleChat } from "../controller/bussinessOwner.controller.js";
import { verifyToken } from "../utills/jswToken.js";
import { uploadInventory } from "../controller/vector_controller_2.js";
 import upload from "../utills/multer.js";

const router = express.Router();

router.get("/getProfile", verifyToken, getProfile)
router.get("/all-users", verifyToken, getAllUsers)
router.get("/get-all-teanants", verifyToken, getAllTeanants)
router.get("/get-inventory", verifyToken, getInventory)
router.get("/single-chat-history", verifyToken, getSingleChat);
router.delete("/del-inventory", verifyToken, deleteInventory);

router.post(
  "/upload-inventry",
  verifyToken,          
 upload.single("file"), 
  uploadInventory        
);



export default router;