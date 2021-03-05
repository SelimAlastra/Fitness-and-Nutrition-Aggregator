const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: Failed to get the post ' + err));
});

router.route('/add').post((req, res) => {
  const userID = req.body.userID;
  const content = req.body.content;


  const newPost = new Post({userID,content});

  newPost.save()
    .then(() => res.json('post added!'))
    .catch(err => res.status(400).json('Error: Failed to add post' + err));
});

router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then(professionalUser => res.json(professionalUser))
    .catch(err => res.status(400).json('Error: Cannot find this post' + err));
});

router.route('/:id').delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('post deleted.'))
    .catch(err => res.status(400).json('Error: Cannot delete this post' + err));
});


router.route('/update/:id').post((req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      
      post.content = req.body.content;

      post.save()
        .then(() => res.json('post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;