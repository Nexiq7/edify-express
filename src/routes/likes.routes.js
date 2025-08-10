import express from 'express';
import prisma from '../prisma.js';
const router = express.Router();

router.post("/likes", async (req, res) => {
     const { userId, boardId } = req.body;
     try {
          const like = await prisma.like.create({
               data: { userId, boardId },
          });
          res.json(like);
     } catch (err) {
          res.status(400).json({ error: "Already liked" });
     }
});

export default router;