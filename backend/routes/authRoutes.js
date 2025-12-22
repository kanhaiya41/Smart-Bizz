import express from 'express';
import { login, signup, socialConnection } from '../controller/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// save 
router.get("/callback" , socialConnection)

export default router;
