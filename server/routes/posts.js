import express from 'express';

import { getPosts, createPost , updatePost, deletePost, likePost, toggleFavAction} from '../controllers/posts.js';
//import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id',updatePost);
router.delete('/:id',  deletePost);
router.patch('/:id/:userId/likePost', likePost);
router.patch('/:id/toggleFavAction', toggleFavAction);


export default router;