import express from "express";
import { deleteInventory, updateUserProfile, getAllTeanants, getAllTodayConversation, getAllUsers, getInventory, getProfile, getSingleChat, toggleAutoReply, createOrUpdateRulesheet } from "../controller/bussinessOwner.controller.js";
import { verifyToken } from "../utills/jswToken.js";
import { uploadInventory } from "../controller/vector_controller_2.js";
import upload, { ImagesUploader } from "../utills/multer.js";

const router = express.Router();


router.put("/profile", verifyToken, ImagesUploader.single("profilePhoto"), updateUserProfile);
router.get("/getProfile", verifyToken, getProfile)
router.get("/all-users", verifyToken, getAllUsers)
router.get("/today-conversation", verifyToken, getAllTodayConversation)
router.get("/get-all-teanants", verifyToken, getAllTeanants)
router.get("/get-inventory", verifyToken, getInventory)
router.get("/single-chat-history", verifyToken, getSingleChat);
router.delete("/del-inventory", verifyToken, deleteInventory);
router.put("/user/auto-reply", verifyToken, toggleAutoReply);
router.post("/add-rulesheet", verifyToken, createOrUpdateRulesheet);

router.post(
  "/upload-inventry",
  verifyToken,
  upload.single("file"),
  uploadInventory
);



export default router;