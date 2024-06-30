import express from 'express';
import { like, createReply, unlikeDiscussion, comment, updateComment, deleteComment } from "./interaction.controller.js";


const router = express.Router();

router.post('/likes', like);
router.post('/comments', comment);
router.post('/replies', createReply);

router.put('/unlike', unlikeDiscussion);
router.put('/comments/:id', updateComment);

router.delete('/comments/:id', deleteComment);

export default router;
