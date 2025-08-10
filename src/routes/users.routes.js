import express from 'express';
import prisma from '../prisma.js';
const router = express.Router();

router.post("/", async (req, res) => {
     const { username, email } = req.body;
     console.log("Creating user:", { username, email });
     try {
          const user = await prisma.user.create({
               data: { username, email },
          });
          res.json(user);
     } catch (err) {
          res.status(400).json({ error: err.message });
     }
});

export default router;