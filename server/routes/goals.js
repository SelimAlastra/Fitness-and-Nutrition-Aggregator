import express from 'express';
import { getGoals, createGoal, updateGoal, deleteGoal, getGoal } from "../controllers/goals.js";

const router = express.Router();

router.get('/', getGoals);
router.post('/', createGoal);
router.patch('/:id', updateGoal);
router.delete('/:id', deleteGoal);
router.get('/:id', getGoal)

export default router;