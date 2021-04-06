import ProfessionalUser from '../models/professionalUser.model.js';
import mongoose from 'mongoose';
import BasicUser from '../models/basicUser.model.js';

export const getProfessionalUser = async (req, res) => {
  ProfessionalUser.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(error => res.status(404).json("Error: Failed to get professional user"));
}

export const getProfessionalUsers = async (req, res) => {
  ProfessionalUser.find()
    .then(professionalUsers => res.json(professionalUsers))
    .catch(error => res.status(400).json("Error: Failed to get the professional users " + error));
}

export const createProfessionalUser = async (req, res) => {

  const user = req.body;

  const newProfessionalUser = new ProfessionalUser(user);
  
  newProfessionalUser.save()
    .then(() => res.status(201).json('Professional user added!'))
    .catch(error => res.status(400).json("Error: " + error));
}

export const updateProfessionalUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  const username = user.username;

  if(!mongoose.Types.ObjectId.isValid(_id)) return (res.status(404).send('No user with that id'));

  if(ProfessionalUser.findOne({username})){
    ProfessionalUser.findOne({
      username
    }).exec((err, userF) => {
      if(userF && userF._id != _id){
        return res.status(400).json({
          errors: 'Username already in use.'
        });
      }
    });
  }
  if(BasicUser.findOne({username})){
    BasicUser.findOne({
      username
    }).exec((err, userF) => {
      if(userF){
        return res.status(400).json({
          errors: 'Username already in use.'
        });
      }
    });
  }

  const updatedUser = await ProfessionalUser.findByIdAndUpdate(_id, { ...user, _id }, { new: true });

  res.json(updatedUser);
};


export const deleteProfessionalUser = async (req, res) => {
  ProfessionalUser.findByIdAndDelete(req.params.id)
    .then(() => res.json("Professional user deleted"))
    .catch(error => res.status(404).json("Error: " + error));
}; 