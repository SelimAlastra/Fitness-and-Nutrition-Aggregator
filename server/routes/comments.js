const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/').get((req, res) => {
  Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error: Failed to get the comment ' + err));
});

router.route('/add').post((req, res) => {
  const postID = req.body.postID;
  const userID = req.body.userID;
  const content = req.body.content;


  const newComment = new Comment({postID,userID,content});

  newComment.save()
    .then(() => res.json('comment added!'))
    .catch(err => res.status(400).json('Error: Failed to add comment' + err));
});

router.route('/:id').get((req, res) => {
  Comment.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this comment' + err));
});

router.route('/:id').delete((req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json('comment deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this comment' + err));
});


router.route('/update/:id').post((req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      
      comment.content = req.body.content;

      comment.save()
        .then(() => res.json('comment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;