import mongoose from 'mongoose';

const replySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
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
