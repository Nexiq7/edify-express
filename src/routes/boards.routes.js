import express from 'express';
import { createBoard, deleteBoardById, getAllBoards, getBoardById } from '../controllers/boards.controller.js';
import { getVideosByBoardId } from '../controllers/videos.controller.js';

const router = express.Router();

router.get('/', getAllBoards);

router.post("/", createBoard);

router.get('/:boardId', getBoardById);

router.delete('/:boardId', deleteBoardById)

router.get('/:boardId/videos', getVideosByBoardId);

export default router;