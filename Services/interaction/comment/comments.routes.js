import express from 'express';
import { dislikeComment, comment, createReply, deleteComment, likeComment, updateComment } from './comment.controller.js';

const router = express.Router();

router.post('/comments', comment);
router.post('/replies', createReply);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);
router.post('/comments/like', likeComment);
router.post('/comments/dislike', dislikeComment);


export default router;
