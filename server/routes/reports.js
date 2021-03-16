import express from 'express';
import { getReports, createReport, deleteReport, getReport } from "../controllers/reports.js";

const router = express.Router();

router.get('/', getReports);
router.get('/:id', getReport);
router.post('/', createReport);
router.delete('/:id', deleteReport);

export default router;