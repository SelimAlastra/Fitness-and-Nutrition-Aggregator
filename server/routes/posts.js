import express from 'express';

import { getPosts, createPost , updatePost, deletePost, likePost, toggleFavAction} from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/',auth, createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.patch('/:id/toggleFavAction',auth, toggleFavAction);


export default router;