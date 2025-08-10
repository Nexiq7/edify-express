import express from 'express';
import prisma from '../prisma.js';
const router = express.Router();

router.post("/videos", async (req, res) => {
     const { url, boardId } = req.body;
     const video = await prisma.video.create({
          data: { url, boardId },
     });
     res.json(video);
});

export default router;