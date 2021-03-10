import Admin from '../models/admin.model.js'
import mongoose from "mongoose";

export const getAdmins = async (req, res) => {
  Admin.find()
    .then(admins => res.json(admins))
    .catch(err => res.status(400).json('Error: Failed to get the admin ' + err));
};

export const createAdmin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newAdmin = new Admin({username,password});

  newAdmin.save()
    .then(() => res.json('admin added!'))
    .catch(err => res.status(400).json('Error: Failed to add admin' + err));
};

export const getAdmin = async (req, res) => {
  Admin.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this admin' + err));
};

export const deleteAdmin = async (req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then(() => res.json('admin deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this admin' + err));
};


export const updateAdmin = async (req, res) => {
  Admin.findById(req.params.id)
    .then(admin => {
      admin.username = req.body.username;
      admin.password = req.body.password;

      admin.save()
        .then(() => res.json('admin updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};