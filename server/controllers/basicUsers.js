import BasicUser from '../models/basicUser.model.js'
import mongoose from "mongoose";

export const getBasicUsers = async (req, res) => {
  BasicUser.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: Failed to get the BasicUsers ' + err));
};

export const createBasicUser = async (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);
  const address = req.body.address;
  const isBanned = Boolean(req.body.isBanned);
  const bodyType = req.body.bodyType;
  const weight = req.body.weight;
  const goals = req.body.goals;
  const tags = req.body.tags;
  const bio = req.body.bio;

  const newBasicUser = new BasicUser({username,name,email,password,gender,dob,address,isBanned,bodyType,weight,goals,tags,bio});

  newBasicUser.save()
    .then(() => res.json('BasicUser added!'))
    .catch(err => res.status(400).json('Error: Failed to add BasicUser' + err));
};

export const getBasicUser = async (req, res) => {
  BasicUser.findById(req.params.id)
    .then(basicUser => res.json(basicUser))
    .catch(err => res.status(400).json('Error: Cannot find this BasicUser' + err));
};

export const deleteBasicUser = async (req, res) => {
  BasicUser.findByIdAndDelete(req.params.id)
    .then(() => res.json('BasicUser deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this basicUser' + err));
};


export const updateBasicUser = async (req, res) => {
  BasicUser.findById(req.params.id)
    .then(basicUser => {
      basicUser.username = req.body.username;
      basicUser.name = req.body.name;
      basicUser.email = req.body.email;
      basicUser.password = req.body.password;
      basicUser.gender = req.body.gender;
      basicUser.dob = Date.parse(req.body.dob);
      basicUser.address = req.body.address;
      basicUser.isBanned = Boolean(req.body.isBanned);
      basicUser.bodyType = req.body.bodyType;
      basicUser.weight = req.body.weight;
      basicUser.goals = req.body.goals;
      basicUser.tags = req.body.tags;
      basicUser.bio = req.body.bio;
      basicUser.save()
        .then(() => res.json('BasicUser updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};