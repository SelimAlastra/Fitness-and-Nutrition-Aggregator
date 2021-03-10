import express from 'express';
import { getBasicUsers, createBasicUser, updateBasicUser, deleteBasicUser, getBasicUser } from "../controllers/basicUsers.js";

const router = express.Router();
router.get('/:id', getBasicUser);
router.get('/', getBasicUsers);
router.post('/', createBasicUser);
router.patch('/:id', updateBasicUser);
router.delete('/:id', deleteBasicUser);

export default router;