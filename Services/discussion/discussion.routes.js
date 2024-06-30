import express from 'express';
import { createDiscussion, updateDiscussion, deleteDiscussion, getDiscussionsByTags, searchDiscussionsByText, getParticularDiscussion } from "./discussion.controller.js"
import isValidUserIdInTheParams from '../../middlewares/verifyParams.js';
import { auth } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/discussions/:id', isValidUserIdInTheParams("Users"), auth, createDiscussion);
router.put('/discussions/:id', updateDiscussion);
router.get('/discussion/:id', getParticularDiscussion);
router.delete('/discussion/:id', deleteDiscussion);
router.get('/discussions', getDiscussionsByTags);
router.get('/discussions/search', searchDiscussionsByText);

export default router;
