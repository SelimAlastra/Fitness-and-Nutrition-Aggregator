import express from 'express';
import { getProfessionalUser, getProfessionalUsers, createProfessionalUser, updateProfessionalUser, deleteProfessionalUser } from '../controllers/professionalUsers.js';

import {
    registerController,
    loginController,
    forgotPasswordController,
    resetPasswordController,
    googleController,
    facebookController
  } from '../controllers/professionalUsersAuth.js';

const router = express.Router();

router.get('/:id', getProfessionalUser);
router.get('/', getProfessionalUsers);
router.post('/add', createProfessionalUser);
router.patch('/update/:id', updateProfessionalUser);
router.delete('/:id', deleteProfessionalUser);

router.post('/register', registerController)
router.post('/login', loginController)

router.put('/forgotpassword', forgotPasswordController)
router.put('/resetpassword', resetPasswordController)

router.post('/googlelogin', googleController);
router.post('/facebooklogin', facebookController);


export default router;