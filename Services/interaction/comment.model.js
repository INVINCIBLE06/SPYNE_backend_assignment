import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reply'
        }]
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Comment', commentSchema);
