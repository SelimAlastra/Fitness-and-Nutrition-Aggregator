import express from 'express';
import { getAdmins, loginController } from "../controllers/admins.js";

const router = express.Router();

//Other controllers are not pasrt of the API for safety concers.

router.get('/', getAdmins);
router.post('/login', loginController)

export default router;