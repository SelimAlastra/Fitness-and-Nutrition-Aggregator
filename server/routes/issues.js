import express from 'express';
import { getIssues, createIssue, deleteIssue } from "../controllers/issues.js";

const router = express.Router();

router.get('/', getIssues);
router.post('/', createIssue);
router.delete('/:id', deleteIssue);

export default router;