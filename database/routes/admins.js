const router = require('express').Router();
let Admin = require('../models/admin.model');

router.route('/').get((req, res) => {
  Admin.find()
    .then(admins => res.json(admins))
    .catch(err => res.status(400).json('Error: Failed to get the admin ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newAdmin = new Admin({username,password});

  newAdmin.save()
    .then(() => res.json('admin added!'))
    .catch(err => res.status(400).json('Error: Failed to add admin' + err));
});

router.route('/:id').get((req, res) => {
  Admin.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this admin' + err));
});

router.route('/:id').delete((req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then(() => res.json('admin deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this admin' + err));
});


router.route('/update/:id').post((req, res) => {
  Admin.findById(req.params.id)
    .then(admin => {
      admin.username = req.body.username;
      admin.password = req.body.password;

      admin.save()
        .then(() => res.json('admin updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;