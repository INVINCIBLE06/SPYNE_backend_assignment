
import mongoose, { Schema } from 'mongoose';
import constants from '../../utils/constants.js';

const postSchema = new mongoose.Schema(
    {
        text: {
            type: String,
        },
        image: {
            type: String,
        },
        hashtags: {
            type: [String],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
        status: {
            type: String,
            enum: [constants.status.active, constants.status.inactive],
            default: constants.status.active,
        },
        viewCount: { 
            type: Number, 
            default: 0 
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Post', postSchema);
