import express from 'express';
import { getPosts, createPosts, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

// when user visit http://localhost:5000/posts
router.get('/', getPosts);
router.post('/', createPosts);
// patch is for updating
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
export default router;