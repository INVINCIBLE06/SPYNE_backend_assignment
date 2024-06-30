import express from 'express';
import { like, unlikePost } from './like.controller.js';

const router = express.Router();

router.put('/unlike', unlikePost);
router.post('/likes', like);

export default router;
