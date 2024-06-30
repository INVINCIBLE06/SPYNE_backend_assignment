import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import constants from '../../utils/constants.js';

const userSchema = new mongoose.Schema(
    {
        name: 
        { 
            type: String, 
            required: true 
        },
        mobile: 
        { 
            type: String, 
            unique: true, 
            required: true 
        },
        email: 
        { 
            type: String, 
            unique: true, 
            required: true 
        },
        password: 
        { 
            type: String, 
            required: true,
        },
        followers: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }],
        following: 
        [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }],
        status: 
        { 
            type: String, 
            enum: [`${constants.status.active}`, `${constants.status.inactive}`], 
            default: 'constants.status.active' 
        },
        deletedAt: 
        { 
            type: Date 
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


export default mongoose.model('User', userSchema);
