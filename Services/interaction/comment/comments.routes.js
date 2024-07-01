import express from 'express';
import { dislikeComment, comment, createReply, deleteComment, likeComment, updateComment } from './comment.controller.js';
import isValidIdInTheParams from '../../../middlewares/verifyParams.js';
import { auth } from '../../../middlewares/authMiddleware.js';

const router = express.Router();

// For adding the commnet
router.post('/comments', auth, comment);

// For updating the comment
router.put('/comments/:id', isValidIdInTheParams("Comments"), auth, updateComment);

// For deleting the comment
router.put('/comment/:id', isValidIdInTheParams("Comments"), auth, deleteComment);

// For replying the comment
router.post('/replies', auth, createReply);

// For liking the comment
router.post('/comments/like', auth, likeComment);

// For disliking the comment
router.post('/comments/dislike', auth,  dislikeComment);


export default router;
