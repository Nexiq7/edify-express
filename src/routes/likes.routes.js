import express from 'express';
import { checkIfUserLikedBoard, createLike, deleteLikeById, getLikeById } from '../controllers/likes.controller.js';

const router = express.Router();

router.post("/", createLike);
router.get("/:likeId", getLikeById)
router.delete("/:likeId", deleteLikeById)
router.get("/check/:userId/:boardId", checkIfUserLikedBoard);
export default router;