import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        text: 
        { 
            type: String, 
            required: true 
        },
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
        parentId: 
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment' 
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Comment', commentSchema);
