import constants from "../../utils/constants.js";
import { fileUpload } from "../../utils/helper.js";
import Discussion from "./discussion.model.js";

// Create Discussion
export const createDiscussion = async (req, res) => {
    try {
        const { text, hashtags } = req.body;
        let imageUrl = null;

        // Check if image file is uploaded
        if (req.files && req.files.image_post) {
            const image_post = req.files.image_post;
            const uploadPost = await fileUpload(image_post);

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
    const updates = { ...req.body };

    try {
        const discussion = await Discussion.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
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
        const discussion = await Discussion.findByIdAndUpdate(req.params.id, { status: constants.status.inactive });
        if (!discussion) {
            return res.status(404).send({
                status: false,
                message: 'Discussion not found'
            });
        } else {
            return res.status(200).send({
                status: true,
                message: 'Discussion marked as inactive successfully',
                data: discussion
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: 'Failed to mark discussion as inactive',
            error: error.message
        });
    }
};

// Get Single User by ID
export const getParticularDiscussion = async (req, res, next) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({
                status: false,
                message: "Discussion not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Discussion fetched successfully",
            data: discussion
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            error: err.message
        });
    }
};

// Get Discussions by Tags
export const getDiscussionsByTags = async (req, res) => {
    try 
    {
        const { tags } = req.query;
        if (!tags) {
            return res.status(400).json({
                status: false,
                message: 'Tags parameter is missing',
            });
        }
        const discussions = await Discussion.find({ hashtags: new RegExp(tags, 'i') });
        return res.status(200).json({
            status: true,
            message: 'Discussions fetched successfully',
            data: discussions
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Failed to fetch discussions by tags',
            error: error.message
        });
    }
};

export const searchDiscussionsByText = async (req, res) => {
    try 
    {
        const { text } = req.query;
        if (!text) {
            return res.status(400).json({
                status: false,
                message: 'Text parameter is missing',
            });
        }

        const discussions = await Discussion.find({ text: new RegExp(text, 'i') });

        return res.status(200).json({
            status: true,
            message: 'Discussions fetched successfully',
            data: discussions,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Failed to fetch discussions by text',
            error: error.message,
        });
    }
};
