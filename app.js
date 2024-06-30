import express from 'express';
import { createDbConnection } from './config/db.config.js';
import cors from "cors";
import userRoutes from "./Features/user/user.routes.js";
import discussionRoutes from "./Features/discussion/discussion.routes.js";
import authRoutes from "./Features/auth/auth.routes.js";
import interactionRoutes from "./Features/interaction/interaction.routes.js";


const app = express();
createDbConnection();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', discussionRoutes);
app.use('/api', authRoutes);
app.use('/api', interactionRoutes);


export default app;
