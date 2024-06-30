/////////////////////////////////////////////////////////////////////////////////////////
//    This file is having all the library and other file import variable               //
//    that is required to run our program.                                             //
//                                                                                     //
//    We are importing all of them and putting all the details into one variable (app) //
//    exporting that variable. Which is being used in th server.js                     //
//                                                                                     //
//    We can run all this here only but since we have selected to keep server.js as    //
//    our starting point of the program. So keep it clean we have done all the imports //
//    over here                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////

import express from 'express';
import cors from "cors";
import userRoutes from "./Services/user/user.routes.js";
import postRoutes from "./Services/post/post.routes.js";
import authRoutes from "./Services/auth/auth.routes.js";
import commentRoutes from "./Services/interaction/comment/comments.routes.js";
import likeRoutes from "./Services/interaction/like/like.routes.js";
import fileUpload from "express-fileupload";
import { createDbConnection } from './config/db.config.js';


const app = express();
createDbConnection();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', likeRoutes);
app.use('/api', commentRoutes);

export default app;
