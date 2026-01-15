import express from "express";
import { getAllMessages, getAllTeanants, getProfile } from "../controller/bussinessOwner.controller.js";
import { verifyToken } from "../utills/jswToken.js";

const router = express.Router();

router.get("/getProfile",verifyToken,getProfile)
router.get("/all-users-with-messages",verifyToken, getAllMessages)
router.get("/get-all-teanants" ,verifyToken, getAllTeanants)
router.get("/today-message",verifyToken, getAllMessages)


export default router;