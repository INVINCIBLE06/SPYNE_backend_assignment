import Post from '../post/post.model.js';
import Like from './like.model.js';
import Comment from './comment.model.js';
import Reply from './reply.model.js';

// Like a post
export const like = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ userId: userId, postId: postId });
        if (existingLike) {
            return res.status(400).json({
                status: false,
                message: 'You have already liked this post',
            });
        }

        // Create a new Like object
        const like = new Like({
            userId: userId,
            postId: postId,
        });

        // Save the like to the database
        await like.save();

        // Add the like to the post's likes array
        const post = await Post.findByIdAndUpdate(
            postId,
            { $push: { likes: like._id }, $inc: { likeCount: 1 } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                status: false,
                message: 'Post not found',
            });
        }

        return res.status(201).json({
            status: true,
            message: 'Post liked successfully',
            post,
        });
    } catch (error) {
        console.error('Error liking post:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
            error,
        });
    }
};

// Unlike a post
export const unlikeDiscussion = async (req, res) => {
    const { userId, postId } = req.body;
    try {
        // Find the like entry to be removed
        const like = await Like.findOne({ userId: userId, postId: postId });

        if (!like) {
            return res.status(404).json({
                status: false,
                message: 'Like not found for this post',
            });
        }

        // Delete the like entry
        await Like.deleteOne({ _id: like._id });
        console.log('Like removed successfully!');

        // Update the post's like count
        const post = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: like._id }, $inc: { likeCount: -1 } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                status: false,
                message: 'Post not found',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Post unliked successfully',
            post,
        });
    } catch (error) {
        console.error('Error unliking post:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Comment on a post
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

// Update Comment
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

// Delete Comment
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

// Create Reply
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
            user: userId,
            comment: commentId,
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
