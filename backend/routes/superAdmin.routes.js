import express from "express";
import {
  getAllUsers,
  getUserById,
  getAllTenants,
  getTenantById,
  getAllConversations,
  getConversationsByTenant,
  getMessagesByConversation,
  getAllMessages,
  getDashboardStats
} from "../controller/superAdmin.controller.js";

const router = express.Router();

// Users
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);

// Tenants
router.get("/tenants", getAllTenants);
router.get("/tenants/:tenantId", getTenantById);

// Conversations
router.get("/conversations", getAllConversations);
router.get("/conversations/tenant/:tenantId", getConversationsByTenant);

// Messages
router.get("/messages", getAllMessages);
router.get("/messages/:convoId", getMessagesByConversation);

// Dashboard
router.get("/dashboard/stats", getDashboardStats);

export default router;
