import Discussion from '../discussion/discussion.model.js';
import Like from './like.model.js';
import Comment from './comment.model.js';

// Like a post
export const like = async (req, res) => {
    try {
        const { userId, discussionId } = req.body;

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ user: userId, discussion: discussionId });
        if (existingLike) {
            return res.status(400).json({
                status: false,
                message: 'You have already liked this post',
            });
        }

        // Create a new Like object
        const like = new Like({
            user: userId,
            discussion: discussionId,
        });

        // Save the like to the database
        await like.save();

        // Add the like to the discussion's likes array
        const discussion = await Discussion.findByIdAndUpdate(
            discussionId,
            { $push: { likes: like._id }, $inc: { likeCount: 1 } },
            { new: true }
        );

        if (!discussion) {
            return res.status(404).json({
                status: false,
                message: 'Discussion not found',
            });
        }

        return res.status(201).json({
            status: true,
            message: 'Post liked successfully',
            discussion,
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
    const { userId, discussionId } = req.body;
    try {
        // Find the like entry to be removed
        const like = await Like.findOne({ user: userId, discussion: discussionId });

        if (!like) {
            return res.status(404).json({
                status: false,
                message: 'Like not found for this discussion',
            });
        }

        // Delete the like entry
        await Like.deleteOne({ _id: like._id });
        console.log('Like removed successfully!');

        // Update the discussion's like count
        const discussion = await Discussion.findByIdAndUpdate(
            discussionId,
            { $pull: { likes: like._id }, $inc: { likeCount: -1 } },
            { new: true }
        );

        if (!discussion) {
            return res.status(404).json({
                status: false,
                message: 'Discussion not found',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Discussion unliked successfully',
            discussion,
        });
    } catch (error) {
        console.error('Error unliking discussion:', error);
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
        const { userId, discussionId, text } = req.body;
        // Create a new Comment object
        const newComment = new Comment({
            user: userId,
            discussion: discussionId,
            text: text,
        });

        // Save the comment to the database
        await newComment.save();

        // Update the discussion with the new comment
        await Discussion.findByIdAndUpdate(
            discussionId,
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
