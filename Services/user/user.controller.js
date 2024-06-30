import constants from "../../utils/constants.js";
import User from "./user.model.js"

// Update User  
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        return res.status(200).send({
            status : true,
            message: "Details updated successfully"
        });
    } catch (error) {
        return res.status(500).send({
            status : false,
            message: "Internal server error."
        });
    }
};

// Get Single User by ID
export const getParticularUser = async (req, res, next) => {
    try 
    {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            error: err.message
        });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { status: constants.status.inactive });
        if(user) {
            return res.status(200).json({
                status: true,
                message: "User deleted successfully "
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }        
    } catch (error) {
        return res.status(404).json({
            status: false,
            error
        });
    }
};

// Show List of Users
export const listUsers = async (req, res) => {
    try {
        // let checkLoginUserData = await User.findOne({ _id : req.user.id });
        // console.log(checkLoginUserData);
        const users = await User.find({ status: constants.status.active });
        return res.status(200).json({
            status: true,
            message: "Data fetched successfully",
            data: { totalRecords: users?.length, users: users }
        });
    } catch (error) {
        return res.status(404).json({
            status: false,
            error
        });
    }
};

// Search User by Name
export const searchUser = async (req, res) => {
    try {
        const users = await User.find({ name: new RegExp(req.query.name, 'i') });
        if(users?.length > 0) {
            return res.status(200).json({
                status: true,
                message: "Data fetched successfully",
                data: { totalRecords: users?.length, users: users }
            });
        } else {
            return res.status(200).json({
                status: true,
                message: "No data present",
                data: { totalRecords: users?.length, users: [] }
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// The Below function is for following a user.
export const followUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const followId = req.body.followId;

        if (!followId) {
            return res.status(400).json({
                status: false,
                message: "Please provide the id of the user you need to follow"
            });
        }

        if (userId === followId) {
            return res.status(400).json({
                status: false,
                message: "You cannot follow yourself"
            });
        }

        const user = await User.findById(userId);
        const followUser = await User.findById(followId);

        if (!user || !followUser) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        if (!user.following.includes(followId)) {
            user.following.push(followId);
            followUser.followers.push(userId);

            await user.save();
            await followUser.save();

            return res.status(200).json({
                status: true,
                message: "User followed successfully"
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "You already follow this user"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Below function is for Unfollowing a user
export const unfollowUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const unfollowId = req.body.unfollowId;

        if (!unfollowId) {
            return res.status(400).json({
                status: false,
                message: "Please provide the id of the user you want to unfollow"
            });
        }

        if (userId === unfollowId) {
            return res.status(400).json({
                status: false,
                message: "You cannot unfollow yourself"
            });
        }

        const user = await User.findById(userId);
        const unfollowUser = await User.findById(unfollowId);

        if (!user || !unfollowUser) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        if (user.following.includes(unfollowId)) {
            user.following = user.following.filter(id => id.toString() !== unfollowId);
            unfollowUser.followers = unfollowUser.followers.filter(id => id.toString() !== userId);

            await user.save();
            await unfollowUser.save();

            res.status(200).json({
                status: true,
                message: "User unfollowed successfully"
            });
        } else {
            res.status(400).json({
                status: false,
                message: "You do not follow this user"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};
