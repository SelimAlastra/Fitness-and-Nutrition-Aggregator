import express from 'express';

import { getPost, getPosts, createPost , updatePost, deletePost, likePost, toggleFavAction, getBucketPosts} from '../controllers/posts.js';
//import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/:bucketId', getBucketPosts);
router.post('/', createPost);
router.patch('/:id',updatePost);
router.delete('/:id',  deletePost);
router.patch('/:id/:userId/likePost', likePost);
router.patch('/:id/toggleFavAction', toggleFavAction);


export default router;