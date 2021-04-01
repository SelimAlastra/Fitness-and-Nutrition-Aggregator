import express from 'express';
import { loginController } from "../controllers/admins.js";

const router = express.Router();

//Other routes removed for safety.

router.post('/login', loginController)

export default router;