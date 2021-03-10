import express from 'express';
import { getProfessionalUser, getProfessionalUsers, createProfessionalUser, updateProfessionalUser, deleteProfessionalUser } from '../controllers/professionalUsers.js';

const router = express.Router();

router.get('/:id', getProfessionalUser);
router.get('/', getProfessionalUsers);
router.post('/add', createProfessionalUser);
router.patch('/update/:id', updateProfessionalUser);
router.delete('/:id', deleteProfessionalUser);

export default router;