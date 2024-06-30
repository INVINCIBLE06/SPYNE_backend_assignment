import Like from "./like.model.js";
import Comment from "./comment.model.js";

// Like a post or comment
export const like = async (req, res) => {
    try {
        const like = new Like(req.body);
        await like.save();
        res.status(201).send(like);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Comment on a post
export const comment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update Comment
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete Comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
};
