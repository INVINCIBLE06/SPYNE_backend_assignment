import constants from "../../utils/constants.js";
import { fileUpload } from "../../utils/helper.js";
import Post from "./post.model.js";

// Create Post
export const createPost = async (req, res) => {
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

        // Create a new Post object
        const post = new Post({
            text: text,
            image: imageUrl,
            hashtags: hashtags,
            createdBy: req.params.id,
        });

        // Save Post to the database
        await post.save();

        // Send success response
        res.status(201).send(post);
    } catch (error) {
        // Handle errors
        console.error("Error creating post:", error);
        res.status(400).send(error);
    }
};

// Update Post
export const updatePost = async (req, res) => {
    const updates = { ...req.body };

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).send();
        }
        return res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete Post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { status: constants.status.inactive });
        if (!post) {
            return res.status(404).send({
                status: false,
                message: 'Post not found'
            });
        } else {
            return res.status(200).send({
                status: true,
                message: 'Post marked as inactive successfully',
                data: post
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: 'Failed to mark post as inactive',
            error: error.message
        });
    }
};

// Get Single User by ID
export const getParticularPost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Post fetched successfully",
            data: post
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            error: err.message
        });
    }
};

// Get Posts by Tags
export const getPostsByTags = async (req, res) => {
    try 
    {
        const { tags } = req.query;
        if (!tags) {
            return res.status(400).json({
                status: false,
                message: 'Tags parameter is missing',
            });
        }
        const posts = await Post.find({ hashtags: new RegExp(tags, 'i'), status: constants.status.active });
        return res.status(200).json({
            status: true,
            message: 'Posts fetched successfully',
            data: posts
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Failed to fetch posts by tags',
            error: error.message
        });
    }
};

export const searchPostsByText = async (req, res) => {
    try 
    {
        const { text } = req.query;
        if (!text) {
            return res.status(400).json({
                status: false,
                message: 'Text parameter is missing',
            });
        }

        const posts = await Post.find({ text: new RegExp(text, 'i'), status: constants.status.active });

        return res.status(200).json({
            status: true,
            message: 'Posts fetched successfully',
            data: posts,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Failed to fetch posts by text',
            error: error.message,
        });
    }
};

export const incrementPostViewCount = async (req, res) => {
    try {
        const postId = req.params.id;

        // Find the post by ID and increment view count
        const updatedPost = await Post.findByIdAndUpdate(postId, { $inc: { viewCount: 1 } }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({
                status: false,
                message: 'Post not found',
            });
        }

        res.status(200).json({
            status: true,
            message: 'View count incremented successfully',
            updatedPost,
        });
    } catch (error) {
        console.error('Error incrementing view count:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};