import express from 'express';
import { getReports, createReport, deleteReport } from "../controllers/reports.js";

const router = express.Router();

router.get('/', getReports);
router.post('/', createReport);
router.delete('/:id', deleteReport);

export default router;