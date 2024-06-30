import mongoose, { Schema } from 'mongoose';

const followSchema = new mongoose.Schema(
    {
        followerId: 
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        followeeId: 
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
    }
);

export default mongoose.model('Follow', followSchema);
