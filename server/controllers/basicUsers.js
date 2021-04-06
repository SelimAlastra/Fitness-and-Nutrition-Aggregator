import BasicUser from '../models/basicUser.model.js'
import mongoose from "mongoose";
import ProfessionalUser from '../models/professionalUser.model.js';

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
  const { id: _id } = req.params;

  BasicUser.findOneAndDelete({_id : _id})
    .then(() => res.json('BasicUser deleted.'))
    .catch(err => res.status(404).json('Error: Cannot delete this basicUser' + err));
};


export const updateBasicUser = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;
    const username = user.username;

    if(!mongoose.Types.ObjectId.isValid(_id)) return (res.status(404).send('No user with that id'));

    if(BasicUser.findOne({username})){
      BasicUser.findOne({
        username
      }).exec((err, userF) => {
        if(userF && userF._id != _id){
          return res.status(400).json({
            errors: 'Username already in use.'
          });
        }
      });
    }
    else if(ProfessionalUser.findOne({username})){
      ProfessionalUser.findOne({
        username
      }).exec((err, userF) => {
        if(userF){
          return res.status(400).json({
            errors: 'Username already in use.'
          });
        }
      });
    }
  
    const updatedUser = await BasicUser.findByIdAndUpdate(_id, { ...user, _id }, { new: true });
  
    res.json(updatedUser);
};