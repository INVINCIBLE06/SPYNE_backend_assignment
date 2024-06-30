import mongoose, { Schema } from 'mongoose';

const likeSchema = new mongoose.Schema(
    {
        userId: 
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        discussionId: 
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Discussion', 
            required: true 
        },
        commentId: 
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment' 
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Like', likeSchema);
