import express from 'express';
import { createDiscussion, updateDiscussion, deleteDiscussion, getDiscussionsByTags, searchDiscussionsByText } from "./discussion.controller.js"

const router = express.Router();

router.post('/discussions', createDiscussion);
router.put('/discussions/:id', updateDiscussion);
router.delete('/discussions/:id', deleteDiscussion);
router.get('/discussions/tags', getDiscussionsByTags);
router.get('/discussions/search', searchDiscussionsByText);

export default router;
