import express from 'express';
import { createVideo, deleteVideoById } from '../controllers/videos.controller.js';

const router = express.Router();

router.post("/", createVideo);
router.delete("/:videoId", deleteVideoById);

export default router;