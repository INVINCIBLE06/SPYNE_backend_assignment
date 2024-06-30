import mongoose from 'mongoose';

const replySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required: true
        },
        text: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Reply', replySchema);
