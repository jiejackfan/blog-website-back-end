import express from 'express';
import { getPosts, getPost, createPosts, updatePost, deletePost, likePost, commentPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'

const router = express.Router();

// when user visit http://localhost:5000/posts
router.get('/', getPosts);
router.post('/', auth, createPosts);
// patch is for updating
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.get('/:id', getPost);
router.post('/:id/commentPost', auth, commentPost);
//
export default router;