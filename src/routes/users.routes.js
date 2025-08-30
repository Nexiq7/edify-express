import express from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById } from '../controllers/users.controller.js';
import { getBoardsByUserId } from '../controllers/boards.controller.js';
import { getLikedBoardsByUserId, getLikesByUserId } from '../controllers/likes.controller.js';

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.delete("/:userId", deleteUserById);
router.get("/:userId/boards", getBoardsByUserId);
router.get("/:userId/liked-boards", getLikedBoardsByUserId);
router.get("/:userId/likes", getLikesByUserId);

export default router;