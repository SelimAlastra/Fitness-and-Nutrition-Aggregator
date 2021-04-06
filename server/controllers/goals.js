import Goal from '../models/goal.model.js'
import mongoose from "mongoose";

export const getGoals = async (req, res) => {
  Goal.find()
    .then(goals => res.json(goals))
    .catch(error => res.status(400).json("Error: Failed to get the goals " + error));
};

export const createGoal = async (req, res) => {
  const userID = req.body.userID;
  const deadline = req.body.deadline;
  const tags = req.body.tags;
  const description = req.body.description;

  const newGoal = new Goal({userID,deadline,tags,description});

  newGoal.save()
    .then(() => res.status(201).json(newGoal))
    .catch(err => res.status(400).json('Error: Failed to add Goal' + err));
};

export const getGoalByUserID = async (req, res) => {
  Goal.find({ userID: req.params.id}).exec()
    .then(goal => res.json(goal))
    .catch(err => res.status(400).json('Error: Cannot find this goal' + err));
};


export const deleteGoal = async (req, res) => {
  const { id: _id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(_id)) return (res.status(404).send('Error: Cannot delete this goal' + err));

  await Goal.findOneAndDelete(_id);

  res.json({ message: 'goal deleted.' });

};

export const updateGoal = async (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => {
      goal.deadline = req.body.deadline;
      goal.tags = req.body.tags;
      goal.description = req.body.description;

      goal.save()
        .then(() => res.json(goal))
        .catch(err => res.status(404).json('Error: ' + err));
    })
    .catch(err => res.status(404).json('Error: ' + err));
};