import Goal from '../models/goal.model.js'
import mongoose from "mongoose";

export const getGoals = async (req, res) => {
  Goal.find()
    .then(goals => res.json(goals))
    .catch(err => res.status(400).json('Error: Failed to get the goal ' + err));
};

export const createGoal = async (req, res) => {
  const userID = req.body.userID;
  const deadline = req.body.deadline;
  const tags = req.body.tags;
  const description = req.body.description;

  const newGoal = new Goal({userID,deadline,tags,description});

  newGoal.save()
    .then(() => res.json('Goal added!'))
    .catch(err => res.status(400).json('Error: Failed to add Goal' + err));
};

export const getGoal = async (req, res) => {
  Goal.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this goal' + err));
};

export const deleteGoal = async (req, res) => {
  Goal.findByIdAndDelete(req.params.id)
    .then(() => res.json('goal deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this goal' + err));
};


export const updateGoal = async (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => {
      goal.deadline = req.body.deadline;
      goal.tags = req.body.tags;
      goal.description = req.body.description;

      goal.save()
        .then(() => res.json('goal updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};