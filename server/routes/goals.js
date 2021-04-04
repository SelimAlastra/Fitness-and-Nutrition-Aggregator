import express from 'express';
import { getGoals, createGoal, updateGoal, deleteGoal, getGoalByUserID} from "../controllers/goals.js";

const router = express.Router();

router.get('/', getGoals);
router.get('/:id', getGoalByUserID);
router.post('/', createGoal);
router.patch('/:id', updateGoal);
router.delete('/:id', deleteGoal);


export default router;