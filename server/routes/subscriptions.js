const router = require('express').Router();
let Subscriptions = require('../models/subscription.model');

router.route('/').get((req, res) => {
  Subscriptions.find()
    .then(subscription => res.json(subscription))
    .catch(err => res.status(400).json('Error: Failed to get the subscription ' + err));
});

router.route('/add').post((req, res) => {

  const userID = req.body.userID;


  const newSubscription = new Subscriptions({userID});

  newSubscription.save()
    .then(() => res.json('subscription added!'))
    .catch(err => res.status(400).json('Error: Failed to add subscription' + err));
});

router.route('/:id').get((req, res) => {
  Subscriptions.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this subscription' + err));
});

router.route('/:id').delete((req, res) => {
  Subscriptions.findByIdAndDelete(req.params.id)
    .then(() => res.json('subscription deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this subscription' + err));
});


router.route('/update/:id').post((req, res) => {
  Subscriptions.findById(req.params.id)
    .then(subscription => {

      subscription.userID = req.body.userID;

      subscription.save()
        .then(() => res.json('subscription updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;