import Follow from "./follow.model.js"

// Follow a user
export const follow = async (req, res) => {
    try {
        const follow = new Follow(req.body);
        await follow.save();
        res.status(201).send(follow);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Unfollow a user
export const unfollow = async (req, res) => {
    try {
        const follow = await Follow.findOneAndDelete(req.body);
        if (!follow) {
            return res.status(404).send();
        }
        res.send(follow);
    } catch (error) {
        res.status(400).send(error);
    }
};
