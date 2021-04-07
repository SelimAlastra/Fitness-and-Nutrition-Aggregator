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
  const urls = req.body.urls;
  const title = req.body.title
  const newService = new Service({description, price, userID, urls, title});

  newService.save()
    .then(() => res.status(201).json(newService))
    .catch(error => res.status(400).json("Error: Failed to add a service " + error ));
};

export const updateService = async (req, res) => {
  Service.findById(req.params.id)
    .then(service => {
      service.description = req.body.description;
      service.price = req.body.price;
      service.userID = req.body.userID;
      service.urls = req.body.urls;
      service.title = req.body.title;
      service.save()
        .then(() => res.json(service))
        .catch(error => res.status(404).json('Error: ' + error))
    })
    .catch(error => res.status(404).json('Error: ' + error));
};

export const deleteService = async (req, res) => {
  const { id: _id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(_id)) return (res.status(404).send('Error cannot delete this service:'));

  await Service.findOneAndDelete({_id : _id});

  res.json({ message: 'Service deleted!' });
};