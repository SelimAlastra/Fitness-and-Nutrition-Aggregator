import Service from '../models/service.model.js';
import mongoose from 'mongoose';

export const getServices = async (req, res) => {
  Service.find()
    .then(services => res.json(services))
    .catch(error => res.status(400).json("Error: Failed to get the services " + error));
};

export const createService = async (req, res) => {
  const description = req.body.description;
  const price = req.body.price;
  const userID = req.body.userID;
  const newService = new Service({description, price, userID});

  newService.save()
    .then(() => res.json('service added'))
    .catch(error => res.status(400).json("Error: Failed to add a service " + error ));
};

export const updateService = async (req, res) => {
  Service.findById(req.params.id)
    .then(service => {
      service.description = res.body.description;
      service.price = res.body.price;
      service.userID = res.body.userID;

      service.save()
        .then(() => res.json('service updated!'))
        .catch(error => res.status(400).josn('Error: ' + error))
    })
};

export const deleteService = async (req, res) => {
  Service.findByIdAndDelete(req.params.id)
    .then(() => res.json('Service deleted!'))
    .catch(error => res.json('Error: ' + error));
};