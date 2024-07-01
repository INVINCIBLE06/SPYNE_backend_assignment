import { createDbConnection } from "../config/db.config.js";
import User from "../Services/user/user.model.js"
import constants from "../utils/constants.js";
import Post from "../Services/post/post.model.js"


/**
 * The functiion is for chekcing the params id in the link or api 
 */
const isValidUserIdInTheParams = (collection) => async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                code: 400,
                message: `user id is required`
            });
        } else {
            let data;
            let errorMessage;
            if(collection === "Posts") {
                data = await Post.findOne({ _id: req.params?.id });
                req.paramsData = data
            } else {
                data = await User.findOne({ _id: req.params?.id });
                req.paramsData = data
            }
            if (!data) 
            {
                return res.status(400).send({
                    status: false,
                    message: errorMessage ? errorMessage : `User not found with the provided params id`
                });
            }
            if (data?.status === constants.status.inactive) 
            {
                return res.status(400).send({
                    status: false,
                    message: `Inactive ${collection} are not allowed to change the status. Please connect with the support teams.`
                });
            }
            next();
        }
    } 
    catch(err) 
    {
        return res.status(500).json({
            status: false,
            error: err.message
        });
    }
};



export default isValidUserIdInTheParams;
