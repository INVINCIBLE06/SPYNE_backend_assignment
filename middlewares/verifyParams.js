import { createDbConnection } from "../config/db.config.js";
import User from "../Services/user/user.model.js"
import constants from "../utils/constants.js";

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
            if(collection === "Candidate") {
                data = await User.findOne({ candidate: req.params?.id });
            } else if (collection === "Question") {
                data = await Question.findOne({ _id: req.params?.id });
                errorMessage = "Question not found with the provided params id"
            } else {
                data = await User.findOne({ _id: req.params?.id });
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
                    message: "Inactive users are not allowed. Please connect with the support teams."
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
