import express from "express";
import { getAllMessages, getAllTeanants, getProfile } from "../controller/bussinessOwner.controller.js";
import { verifyToken } from "../utills/jswToken.js";
// import upload from "../utills/multer.js";
// import upload from "../utills/multer.js";

const router = express.Router();

router.get("/getProfile", verifyToken, getProfile)
router.get("/all-users-with-messages", verifyToken, getAllMessages)
router.get("/get-all-teanants", verifyToken, getAllTeanants)
// router.post("/upload-inventry", upload("inventory"), getAllMessages)


export default router;