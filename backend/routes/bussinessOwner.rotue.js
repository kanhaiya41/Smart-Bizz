import express from "express";
import { getAllMessages } from "../controller/bussinessOwner.controller.js";
import { verifyToken } from "../utills/jswToken.js";

const router = express.Router();

router.get("")
router.get("/all-users-with-messages",verifyToken, getAllMessages)

export default router;