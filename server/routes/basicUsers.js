import express from 'express';
import { getBasicUsers, createBasicUser, updateBasicUser, deleteBasicUser, getBasicUser } from "../controllers/basicUsers.js";

import {
    registerController,
    loginController,
    forgotPasswordController,
    resetPasswordController,
    googleController,
    facebookController
  } from '../controllers/basicUsersAuth.js';

const router = express.Router();

router.get('/', getBasicUsers);
router.post('/', createBasicUser);
router.patch('/:id', updateBasicUser);
router.delete('/:id', deleteBasicUser);

router.post('/register', registerController)
router.post('/login', loginController)

router.put('/forgotpassword', forgotPasswordController)
router.put('/resetpassword', resetPasswordController)

router.post('/googlelogin', googleController);
router.post('/facebooklogin', facebookController);

export default router;