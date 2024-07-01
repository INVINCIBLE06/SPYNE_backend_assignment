
//////////////////////////////////////////////////////////////
//                                                          //
//      This is file is reponsible for verifying the token  //
//                                                          //
//////////////////////////////////////////////////////////////

import jwt from 'jsonwebtoken';


// The below function is for decoding the jwt token
export const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        if(verified.id === req.params.id) {
            req.user = verified;
            next();
        } else if (req.url === `/post/${req.params.id}` && req.method == "PUT" && req.paramsData.createdBy == verified.id ) {
            req.user = verified;
            next();
        }
        else if(req.url === `/posts/${req.params.id}` && req.method == "PUT" && req.paramsData.createdBy == verified.id) {
            req.user = verified;
            next();
        } else if(req.url === `/posts/${req.params.id}` && req.method == "GET" && req.paramsData.createdBy == verified.id) {
            req.user = verified;
            next();
        } else if(req.url === `/posts/${req.params.id}/view` && req.method == "PUT" && req.paramsData.createdBy == verified.id) {
            req.user = verified;
            next();
        } else if(req.url === `/comments` && req.method == "POST") {
            req.user = verified;
            next();
        } else if(req.url === `/comments/${req.params.id}` && req.method == "PUT" && req.paramsData.userId == verified.id) {
            req.user = verified;
            next();
        } else if(req.url === `/comment/${req.params.id}` && req.method == "PUT" && req.paramsData.userId == verified.id) {
            req.user = verified;
            next();
        } else if(req.url === `/replies` && req.method == "POST" ) {
            req.user = verified;
            next();
        } else if(req.url === `/comments/like` && req.method == "POST" ) {
            req.user = verified;
            next();
        } else if(req.url === `/comments/dislike` && req.method == "POST") {
            req.user = verified;
            next();
        } else if(req.url === `/unlike` && req.method == "PUT") {
            req.user = verified;
            next();
        } else if(req.url === `/likes` && req.method == "POST") {
            req.user = verified;
            next();
        }
        else {
            return res.status(401).json({ message: 'Unauthorized user' });
        } 
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: 'Invalid Token' });
    }
};