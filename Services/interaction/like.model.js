import mongoose, { Schema } from 'mongoose';

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        discussion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Discussion', // Reference to the Discussion model
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
