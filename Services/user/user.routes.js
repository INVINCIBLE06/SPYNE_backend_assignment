///////////////////////////////////////////////////////////
//                                                       //
//      This file is routes file. Where all the          // 
//      endpoints of the users are written.              //
//                                                       //
///////////////////////////////////////////////////////////



import express from 'express';
import { deleteUser, followUser, getParticularUser, listUsers, searchUser, unfollowUser, updateUser, updateUserPassword }  from "./user.controller.js"
import { checkDuplicateEmail, checkDuplicateMobileNo } from '../../middlewares/validationMiddleware.js';
import { auth } from '../../middlewares/authMiddleware.js';
import isValidIdInTheParams from '../../middlewares/verifyParams.js';

const router = express.Router();

// The bellow route is for updating the details of user
router.put('/users/:id', auth, checkDuplicateEmail, checkDuplicateMobileNo, updateUser);

// The below route for fethcing the particualr user details
router.get('/user/:id', isValidIdInTheParams("User"), auth, getParticularUser);

// The below route for fethcing the inactiving a particualr user details
router.delete('/users/:id', isValidIdInTheParams("User"), auth, deleteUser);

// The below user is for listing all the users but after login
router.get('/users', listUsers);

// The below route is for listing the user on the basis of name
router.get('/users/search', searchUser);

// The below route is for following the other user
router.post('/user/follow/:id', isValidIdInTheParams("User"), auth, followUser);

// The below route is for unfollowing the other user
router.put('/user/unfollow/:id', isValidIdInTheParams("User"), auth, unfollowUser);

router.put('/user/changePassword/:id', isValidIdInTheParams("User"), auth, updateUserPassword);


export default router;
