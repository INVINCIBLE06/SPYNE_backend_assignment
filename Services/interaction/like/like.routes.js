import express from 'express';
import { like, unlikePost } from './like.controller.js';

const router = express.Router();

// The below route is for unlike a post if you have liked it
router.put('/unlike', unlikePost);

// The below route is for liking a post if you have not liked it
router.post('/likes', like);

export default router;
