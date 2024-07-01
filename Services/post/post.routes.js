import express from 'express';
import isValidIdInTheParams from '../../middlewares/verifyParams.js';
import { createPost, updatePost, incrementPostViewCount, deletePost, getPostsByTags, searchPostsByText, getParticularPost } from "./post.controller.js"
import { auth } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// The below route is for creating the post
router.post('/posts/:id', isValidIdInTheParams("Users"), auth, createPost);

// The below route is for updating the post details
router.put('/post/:id', isValidIdInTheParams("Posts"), auth, updatePost);

// The below route is for deleting the post
router.put('/posts/:id', isValidIdInTheParams("Posts"), auth, deletePost);

// The below route is for getting the post bu tags 
router.get('/posts', getPostsByTags);

// The below route searching the post based on the tags
router.get('/posts/search', searchPostsByText);

// The below route is for getting the count of total  number of time post viewed
router.put('/posts/:id/view', isValidIdInTheParams("Posts"), auth, incrementPostViewCount);

// The below route is for getting a particular post
router.get('/posts/:id', isValidIdInTheParams("Posts"), auth, getParticularPost);



export default router;
