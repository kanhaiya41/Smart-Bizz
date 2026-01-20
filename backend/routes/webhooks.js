import express from 'express';
import { verifyMetaWebhook,metaWebhookEvents } from '../controller/webhooks.js';
const router = express.Router();


router.get("/meta", verifyMetaWebhook);
router.post("/meta", metaWebhookEvents);


export default router
