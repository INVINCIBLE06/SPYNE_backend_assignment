import express from 'express';
import { createDbConnection } from './config/db.config.js';
import cors from "cors";
import userRoutes from "./Services/user/user.routes.js";
import discussionRoutes from "./Services/post/post.routes.js";
import authRoutes from "./Services/auth/auth.routes.js";
import interactionRoutes from "./Services/interaction/interaction.routes.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
createDbConnection();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/api', userRoutes);
app.use('/api', discussionRoutes);
app.use('/api', authRoutes);
app.use('/api', interactionRoutes);


export default app;
