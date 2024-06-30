import Post from '../../post/post.model.js';
import Like from './like.model.js';

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
export const unlikePost = async (req, res) => {
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