import ProfessionalUser from '../models/professionalUser.model.js';
import mongoose from 'mongoose';

export const getProfessionalUser = async (req, res) => {
  ProfessionalUser.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(error => res.status(400).json("Error: Failed to get professional user"));
}

export const getProfessionalUsers = async (req, res) => {
  ProfessionalUser.find()
    .then(professionalUsers => res.json(professionalUsers))
    .catch(error => res.status(400).json("Error: Failed to get the professional users " + error));
}

export const createProfessionalUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const address = req.body.address;
  const isBanned = req.body.isBanned;
  const tags = req.body.tags;
  const bio = req.body.bio;
  const instagramLink = req.body.instagramLink;
  const youtubeLink = req.body.youtubeLink;
  const newProfessionalUser = new ProfessionalUser({name, email, password, gender, dob,
     address, isBanned, tags, bio, instagramLink, youtubeLink});
  
  newProfessionalUser.save()
    .then(() => res.json('Professional user added!'))
    .catch(error => res.status(400).json("Error: " + error));
}

export const updateProfessionalUser = async (req, res) => {
  ProfessionalUser.findById(req.params.id)
    .then(professionalUser => {
      professionalUser.name = req.body.name;
      professionalUser.email = req.body.email;
      professionalUser.password = req.body.password;
      professionalUser.gender = req.body.gender;
      professionalUser.dob = req.body.dob;
      professionalUser.address = req.body.address;
      professionalUser.isBanned = req.body.isBanned;
      professionalUser.tags = req.body.tags;
      professionalUser.bio = req.body.bio;
      professionalUser.instagramLink = req.body.instagramLink;
      professionalUser.youtubeLink = req.body.youtubeLink;

      professionalUser.save()
        .then(() => res.json('Professional user updated!'))
        .catch(error => res.status(400).json("Error: " + error));

    })
};

export const deleteProfessionalUser = async (req, res) => {
  ProfessionalUser.findByIdAndDelete(req.params.id)
    .then(() => res.json("Professional user deleted"))
    .catch(error => res.json("Error: " + error));
}; 