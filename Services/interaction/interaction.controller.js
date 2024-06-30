import Like from "./like.model.js";
import Comment from "./comment.model.js";

// Like a post
export const like = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ user: userId, post: postId });
        if (existingLike) {
            return res.status(400).json({
                status: false,
                message: 'You have already liked this post',
            });
        }

        // Create a new Like object
        const like = new Like({
            user: userId,
            post: postId,
        });

        // Save the like to the database
        await like.save();

        // Update the post with the new like
        await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

        res.status(201).json({
            status: true,
            message: 'Post liked successfully',
            like,
        });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            error,
        });
    }
};

// Comment on a post
export const comment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update Comment
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete Comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
};
