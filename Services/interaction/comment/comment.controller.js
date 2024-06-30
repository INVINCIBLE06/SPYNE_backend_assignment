



import Comment from './comment.model.js';
import Reply from './reply.model.js';
import Post from '../../post/post.model.js';

// Below function is for adding a comment
export const comment = async (req, res) => {
    try {
        const { userId, postId, text } = req.body;
        // Create a new Comment object
        const newComment = new Comment({
            userId: userId,
            postId: postId,
            text: text,
        });

        // Save the comment to the database
        await newComment.save();

        // Update the post with the new comment
        await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment._id } },
            { new: true }
        );

        return res.status(201).json({
            status: true,
            message: 'Comment added successfully',
            comment: newComment,
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({
            status: false,
            message: 'Failed to add comment',
            error: error.message,
        });
    }
};

//Below function is for updating a comment
export const updateComment = async (req, res) => {
    const { text } = req.body;
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { text },
            { new: true, runValidators: true }
        );

        if (!comment) {
            return res.status(404).json({
                status: false,
                message: 'Comment not found',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Comment updated successfully',
            comment,
        });
    } catch (error) {
        console.error('Error updating comment:', error);
        return res.status(400).json({
            status: false,
            message: 'Failed to update comment',
            error: error.message,
        });
    }
};

// Below function is for deleting a comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({
                status: false,
                message: 'Comment not found',
            });
        }
        res.status(200).json({
            status: true,
            message: 'Comment deleted successfully',
            deletedComment: comment,
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(400).json({
            status: false,
            message: 'Failed to delete comment',
            error: error.message,
        });
    }
};

// Below function is for replying to a comment
export const createReply = async (req, res) => 
{
    try 
    {
        const { userId, commentId, text } = req.body;
        
        // Check if the comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                status: false,
                message: 'Comment not found',
            });
        }

        // Create a new Reply object
        const reply = new Reply({
            userId: userId,
            commentId: commentId,
            text,
        });

        // Save the reply to the database
        await reply.save();

        // Optionally, update the comment to add the reply to its replies array
        comment.replies?.push(reply._id);
        await comment.save();

        res.status(201).json({
            status: true,
            message: 'Reply created successfully',
            reply,
        });
    } catch (error) {
        console.error('Error creating reply:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Below function is for liking a comment
export const likeComment = async (req, res) => {
    const { userId, commentId } = req.body;
    try {
        // Check if the user has already liked the comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                status: false,
                message: 'Comment not found',
            });
        }

        if (comment.likes.includes(userId)) {
            return res.status(400).json({
                status: false,
                message: 'You have already liked this comment',
            });
        }

        // Add user's ID to likes array
        comment.likes.push(userId);
        await comment.save();

        res.status(200).json({
            status: true,
            message: 'Comment liked successfully',
        });
    } catch (error) {
        console.error('Error liking comment:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Below function is for removing the like from a comment
export const dislikeComment = async (req, res) => {
    const { userId, commentId } = req.body;
    try {
        // Check if the comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                status: false,
                message: 'Comment not found',
            });
        }

        // Check if the user has liked the comment
        if (!comment.likes.includes(userId)) {
            return res.status(400).json({
                status: false,
                message: 'You have not liked this comment to dislike it',
            });
        }

        // Remove user's ID from likes array
        comment.likes = comment.likes.filter(id => id.toString() !== userId);
        await comment.save();

        res.status(200).json({
            status: true,
            message: 'Comment disliked successfully',
        });
    } catch (error) {
        console.error('Error disliking comment:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};
