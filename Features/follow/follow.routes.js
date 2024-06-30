import express from 'express';
import { follow, unfollow } from './follow.controller.js';


const router = express.Router();

router.post('/follow', follow);
router.delete('/unfollow', unfollow);

export default router;
