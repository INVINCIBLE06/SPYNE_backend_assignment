
import mongoose, { Schema } from 'mongoose';
import constants from '../../utils/constants.js';

const discussionSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Discussion', discussionSchema);
