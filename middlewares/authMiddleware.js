
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
        } else {
            return res.status(401).json({ message: 'Unauthorized user' });
        } 
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};