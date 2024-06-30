
import mongoose, { Schema } from 'mongoose';

const discussionSchema = new mongoose.Schema(
    {
        text: 
        { 
            type: String, 
            required: true 
        },
        image: 
        { 
            type: String 
        },
        hashtags: 
        { 
            type: [String] 
        },
        createdOn: 
        { 
            type: Date, 
            default: Date.now 
        },
        userId: 
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
    }
);

export default mongoose.model('Discussion', discussionSchema);
