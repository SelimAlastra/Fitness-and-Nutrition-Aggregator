import express from 'express';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin, getAdmin, loginController } from "../controllers/admins.js";

const router = express.Router();

router.get('/', getAdmins);
router.post('/', createAdmin);
router.patch('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);
router.post('/login', loginController)

export default router;