import express from 'express';
import prisma from '../prisma.js';
const router = express.Router();

router.get('/:boardId', async (req, res) => {
     const { boardId } = req.params;
     try {
          const board = await prisma.board.findUnique({
               where: { id: boardId },
               include: { videos: true, user: true },
          });
          if (!board) {
               return res.status(404).json({ error: 'Board not found' });
          }
          res.json(board);
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
});

router.post("/", async (req, res) => {
     const { title, userId } = req.body;
     const board = await prisma.board.create({
          data: { title, userId },
     });
     res.json(board);
});

export default router;