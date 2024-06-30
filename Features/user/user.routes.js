import express from 'express';
import { deleteUser, listUsers, searchUser, updateUser }  from "./user.controller.js"
import isValidUserIdInTheParams from '../../middlewares/verifyParams.js';
import { emailValidation } from '../../middlewares/validationMiddleware.js';

const router = express.Router();



// The bellow route is for updating the details of user
router.put('/users/:id', isValidUserIdInTheParams("User"), emailValidation, updateUser);


router.delete('/users/:id', deleteUser);
router.get('/users', listUsers);
router.get('/users/search', searchUser);

export default router;
