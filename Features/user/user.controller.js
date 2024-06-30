import User from "./user.model.js"

// Update User  
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete User
export const  deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Show List of Users
export const  listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Search User by Name
export const searchUser = async (req, res) => {
    try {
        const users = await User.find({ name: new RegExp(req.query.name, 'i') });
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};
