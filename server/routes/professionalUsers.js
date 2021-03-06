const router = require('express').Router();
let ProfessionalUser = require('../models/professionalUser.model');

router.route('/').get((req, res) => {
  ProfessionalUser.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: Failed to get the professionalUser ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);
  const address = req.body.adress;
  const isBanned = Boolean(req.body.isBanned);
  const tags = req.body.tags;
  const bio = req.body.bio;

  const newProfessionalUser = new ProfessionalUser({username,name,email,password,gender,dob,address,isBanned,tags,bio});

  newProfessionalUser.save()
    .then(() => res.json('ProfessionalUser added!'))
    .catch(err => res.status(400).json('Error: Failed to add ProfessionalUser' + err));
});

router.route('/:id').get((req, res) => {
  ProfessionalUser.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this ProfessionalUser' + err));
});

router.route('/:id').delete((req, res) => {
  ProfessionalUser.findByIdAndDelete(req.params.id)
    .then(() => res.json('ProfessionalUser deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this professionalUser' + err));
});


router.route('/update/:id').post((req, res) => {
  ProfessionalUser.findById(req.params.id)
    .then(professionalUser => {
      professionalUser.username = req.body.username;
      professionalUser.name = req.body.name;
      professionalUser.email = req.body.email;
      professionalUser.password = req.body.password;
      professionalUser.gender = req.body.gender;
      professionalUser.dob = Date.parse(req.body.dob);
      professionalUser.address = req.body.address;
      professionalUser.isBanned = Boolean(req.body.isBanned);
      professionalUser.bodyType = req.body.bodyType;
      professionalUser.weight = req.body.weight;
      professionalUser.goals = [req.body.goals];
      professionalUser.tags = [req.body.tags];
      professionalUser.bio = req.body.bio;

      professionalUser.save()
        .then(() => res.json('ProfessionalUser updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;