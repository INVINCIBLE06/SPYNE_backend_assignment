import express from 'express';
import { createPost, updatePost, incrementPostViewCount, deletePost, getPostsByTags, searchPostsByText, getParticularPost } from "./post.controller.js"
import isValidUserIdInTheParams from '../../middlewares/verifyParams.js';
import { auth } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// The below route is for creating the post
router.post('/posts/:id', isValidUserIdInTheParams("Users"), auth, createPost);

// The below route is for getting the count of total  number of time post viewed
router.post('/posts/:id/view', incrementPostViewCount);


router.get('/posts', getPostsByTags);
router.get('/posts/search', searchPostsByText);
router.get('/posts/:id', getParticularPost);

router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

export default router;
