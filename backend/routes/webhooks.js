import express from 'express';
import { verifyMetaWebhook, metaWebhookEvents, handleReplyMessage } from '../controller/webhooks.js';
const router = express.Router();


router.get("/meta", verifyMetaWebhook);
router.post("/meta", metaWebhookEvents);
router.post("/reply-message", handleReplyMessage)


export default router
