import express from 'express';
import { like, unlikeDiscussion, comment, updateComment, deleteComment } from "./interaction.controller.js";


const router = express.Router();

router.post('/likes', like);
router.put('/unlike', unlikeDiscussion);

router.post('/comments', comment);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);

export default router;
