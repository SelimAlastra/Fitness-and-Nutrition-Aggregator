import BasicUser from '../models/basicUser.model.js'
import mongoose from "mongoose";

export const getBasicUsers = async (req, res) => {
  BasicUser.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: Failed to get the BasicUsers ' + err));
};

export const createBasicUser = async (req, res) => {

  const user = req.body;

  const newBasicUser = new BasicUser(user);

  newBasicUser.save()
    .then(() => res.status(201).json(newBasicUser))
    .catch(err => res.status(400).json('Error: Failed to add BasicUser' + err));
};

export const getBasicUser = async (req, res) => {
  BasicUser.findById(req.params.id)
    .then(basicUser => res.json(basicUser))
    .catch(err => res.status(404).json('Error: Cannot find this BasicUser' + err));
};

export const deleteBasicUser = async (req, res) => {
  BasicUser.findByIdAndDelete(req.params.id)
    .then(() => res.json('BasicUser deleted.'))
    .catch(err => res.status(404).json('Error: Cannot delete this basicUser' + err));
};


export const updateBasicUser = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;
  
    if(!mongoose.Types.ObjectId.isValid(_id)) return (res.status(404).send('No user with that id'));
  
    const updatedUser = await BasicUser.findByIdAndUpdate(_id, { ...user, _id }, { new: true });
  
    res.json(updatedUser);
};