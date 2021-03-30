import express from 'express';
import { getPost, getPosts, createPost , updatePost, deletePost, likePost, toggleFavAction, getPostsFromArray} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/:id/bucket', getPostsFromArray);
router.post('/', createPost);
router.patch('/:id',updatePost);
router.delete('/:id',  deletePost);
router.patch('/:id/:userId/likePost', likePost);
router.patch('/:id/toggleFavAction', toggleFavAction);


export default router;