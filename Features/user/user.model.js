import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

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
            required: true 
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
            enum: ['ACTIVE', 'INACTIVE'], 
            default: 'ACTIVE' 
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
