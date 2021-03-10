const router = require('express').Router();
let Subscribers = require('../models/subscriber.model');

router.route('/').get((req, res) => {
  Subscribers.find()
    .then(subscribers => res.json(subscribers))
    .catch(err => res.status(400).json('Error: Failed to get the subscriber ' + err));
});

router.route('/add').post((req, res) => {

  const userID = req.body.userID;


  const newSubscriber = new Subscribers({userID});

  newSubscriber.save()
    .then(() => res.json('subscriber added!'))
    .catch(err => res.status(400).json('Error: Failed to add subscriber' + err));
});

router.route('/:id').get((req, res) => {
  Subscribers.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this subscriber' + err));
});

router.route('/:id').delete((req, res) => {
  Subscribers.findByIdAndDelete(req.params.id)
    .then(() => res.json('subscriber deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this subscriber' + err));
});


router.route('/update/:id').post((req, res) => {
  Subscribers.findById(req.params.id)
    .then(subscriber => {

      subscriber.userID = req.body.userID;

      subscriber.save()
        .then(() => res.json('subscriber updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;