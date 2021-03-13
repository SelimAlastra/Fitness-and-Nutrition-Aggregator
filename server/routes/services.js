import express from 'express';
import {getServices, createService, updateService, deleteService} from '../controllers/services.js';

const router = express.Router();

router.get('/', getServices);
router.post('/add', createService);
router.patch('/update/:id', updateService);
router.delete('/:id', deleteService);

export default router;