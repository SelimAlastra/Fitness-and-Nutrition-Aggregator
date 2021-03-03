const router = require('express').Router();
let Like = require('../models/like.model');

router.route('/').get((req, res) => {
  Like.find()
    .then(likes => res.json(likes))
    .catch(err => res.status(400).json('Error: Failed to get the like ' + err));
});

router.route('/add').post((req, res) => {
  const postID = req.body.postID;
  const userID = req.body.userID;


  const newLike = new Like({postID,userID});

  newLike.save()
    .then(() => res.json('like added!'))
    .catch(err => res.status(400).json('Error: Failed to add like' + err));
});

router.route('/:id').get((req, res) => {
  Like.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this like' + err));
});

router.route('/:id').delete((req, res) => {
  Like.findByIdAndDelete(req.params.id)
    .then(() => res.json('like deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this like' + err));
});


router.route('/update/:id').post((req, res) => {
  Like.findById(req.params.id)
    .then(like => {
      
      like.userID = req.body.userID;

      like.save()
        .then(() => res.json('like updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;