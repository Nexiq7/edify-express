import { BoardsService } from '../services/boards.service.js';

const boardsService = new BoardsService();

export const createBoard = async (req, res) => {
     const { title, userId, thumbnailUrl } = req.body;

     if (!title || typeof title !== 'string' || title.trim().length === 0) {
          return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
     }
     if (!userId || isNaN(Number(userId))) {
          return res.status(400).json({ error: 'Valid userId is required.' });
     }
     // thumbnailUrl is optional, but if provided, should be a string
     if (thumbnailUrl && typeof thumbnailUrl !== 'string') {
          return res.status(400).json({ error: 'thumbnailUrl must be a string.' });
     }

     try {
          const board = await boardsService.createBoard(title.trim(), Number(userId), thumbnailUrl);
          res.status(201).json(board);
     } catch (err) {
          console.error('Error creating board:', err);
          res.status(500).json({ error: 'Error creating board' });
     }
}

export const deleteBoardById = async (req, res) => {
     const { boardId } = req.params;
     // Get userId from session
     const userId = req.user?.id;

     if (!userId || isNaN(Number(userId))) {
          return res.status(401).json({ error: 'Unauthorized: user not authenticated.' });
     }

     try {
          const board = await boardsService.getBoardById(boardId);
          if (!board) {
               return res.status(404).json({ error: 'Board not found' });
          }
          if (board.userId !== Number(userId)) {
               return res.status(403).json({ error: 'You are not authorized to delete this board.' });
          }
          const deletedBoard = await boardsService.deleteBoardById(boardId);
          res.json({ message: 'Board deleted successfully', board: deletedBoard });
     } catch (err) {
          console.error('Error deleting board:', err);
          res.status(500).json({ error: 'Error deleting board' });
     }
}


export const getBoardById = async (req, res) => {
     const { boardId } = req.params;

     try {
          const board = await boardsService.getBoardById(boardId);
          if (!board) {
               return res.status(404).json({ error: 'Board not found' });
          }
          res.json(board);
     } catch (err) {
          console.error('Error retrieving board:', err);
          res.status(500).json({ message: "Error retrieving board" });
     }
}

export const getBoardsByUserId = async (req, res) => {
     const { userId } = req.params;

     try {
          const boards = await boardsService.getBoardsByUserId(userId);
          if (!boards || boards.length === 0) {
               return res.status(404).json({ error: 'No boards found for this user' });
          }
          res.json(boards);
     } catch (err) {
          console.error('Error retrieving boards for user:', err);
          res.status(500).json({ error: 'Error retrieving boards for user' });
     }
}

export const getAllBoards = async (req, res) => {

     try {
          const boards = await boardsService.getAllBoards();
          res.json(boards);
     } catch (err) {
          console.error('Error retrieving boards:', err);
          res.status(500).json({ error: 'Error retrieving boards' });
     }
};


