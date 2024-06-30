import express from 'express';
import { deleteUser, followUser, getParticularUser, listUsers, searchUser, unfollowUser, updateUser }  from "./user.controller.js"
import { checkDuplicateEmail, checkDuplicateMobileNo, emailValidation, passwordValidation } from '../../middlewares/validationMiddleware.js';
import { auth } from '../../middlewares/authMiddleware.js';
import isValidUserIdInTheParams from '../../middlewares/verifyParams.js';

const router = express.Router();

// The bellow route is for updating the details of user
router.put('/users/:id', auth, checkDuplicateEmail, checkDuplicateMobileNo, passwordValidation, updateUser);

// The below route for fethcing the particualr user details
router.get('/user/:id', isValidUserIdInTheParams("User"), auth, getParticularUser);

// The below route for fethcing the inactiving a particualr user details
router.delete('/users/:id', isValidUserIdInTheParams("User"), auth, deleteUser);

// The below user is for listing all the users but after login
router.get('/users', listUsers);

// The below route is for listing the user on the basis of name
router.get('/users/search', searchUser);

// The below route is for following the other user
router.post('/user/follow/:id', isValidUserIdInTheParams("User"), auth, followUser);

// The below route is for unfollowing the other user
router.delete('/user/unfollow/:id', isValidUserIdInTheParams("User"), auth, unfollowUser);

export default router;
