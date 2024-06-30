import { fileUpload } from "../../utils/helper.js";
import Discussion  from "./discussion.model.js";


// Create Discussion
export const createDiscussion = async (req, res) => {
    try {
        const { text, hashtags } = req.body;
        let imageUrl = null;
        
        // Check if image file is uploaded
        if (req.files && req.files.image_post) {
            const image_post = req.files.image_post;
            const uploadPost = await file
            Upload(image_post);

            if (uploadPost === 'INVALIDFORMAT' || uploadPost === 'NOATTACHEMENT') {
                imageUrl = null;
            } else {
                imageUrl = uploadPost;
            }
        }

        // Create a new Discussion object
        const discussion = new Discussion({
            text: text,
            image: imageUrl,
            hashtags: hashtags,
            createdBy: req.params.id,
        });

        // Save discussion to the database
        await discussion.save();

        // Send success response
        res.status(201).send(discussion);
    } catch (error) {
        // Handle errors
        console.error("Error creating discussion:", error);
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
