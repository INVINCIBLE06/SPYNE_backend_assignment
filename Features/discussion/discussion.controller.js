import Discussion  from "./discussion.model.js";


// Create Discussion
export const createDiscussion = async (req, res) => {
    try {
        const discussion = new Discussion(req.body);
        await discussion.save();
        res.status(201).send(discussion);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update Discussion
export const updateDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!discussion) {
            return res.status(404).send();
        }
        res.send(discussion);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete Discussion
export const deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndDelete(req.params.id);
        if (!discussion) {
            return res.status(404).send();
        }
        res.send(discussion);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get Discussions by Tags
export const getDiscussionsByTags = async (req, res) => {
    try {
        const discussions = await Discussion.find({ hashtags: { $in: req.query.tags.split(',') } });
        res.send(discussions);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Search Discussions by Text
export const searchDiscussionsByText = async (req, res) => {
    try {
        const discussions = await Discussion.find({ text: new RegExp(req.query.text, 'i') });
        res.send(discussions);
    } catch (error) {
        res.status(500).send(error);
    }
};
