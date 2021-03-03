const router = require('express').Router();
let Service = require('../models/service.model');

router.route('/').get((req, res) => {
  Service.find()
    .then(services => res.json(services))
    .catch(err => res.status(400).json('Error: Failed to get the service ' + err));
});

router.route('/add').post((req, res) => {
  const userID = req.body.userID;
  const price = req.body.price;
  const description = req.body.description;

  const newService = new Service({userID,price,description});

  newService.save()
    .then(() => res.json('service added!'))
    .catch(err => res.status(400).json('Error: Failed to add service' + err));
});

router.route('/:id').get((req, res) => {
  Service.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this service' + err));
});

router.route('/:id').delete((req, res) => {
  Service.findByIdAndDelete(req.params.id)
    .then(() => res.json('service deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this service' + err));
});


router.route('/update/:id').post((req, res) => {
  Service.findById(req.params.id)
    .then(service => {
      service.price = req.body.price;
      service.description = req.body.description;

      service.save()
        .then(() => res.json('service updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;