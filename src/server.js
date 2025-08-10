import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from './routes/users.routes.js';
import boardsRoutes from './routes/boards.routes.js';
import videosRoutes from './routes/videos.routes.js';
import likesRoutes from './routes/likes.routes.js';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/boards', boardsRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/likes', likesRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));
