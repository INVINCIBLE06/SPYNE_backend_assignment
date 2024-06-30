import mongoose, { Schema } from 'mongoose';

const likeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post', 
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Like', likeSchema);
