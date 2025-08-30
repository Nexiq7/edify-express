import { LikesService } from '../services/likes.service.js';
const likesService = new LikesService();

export const createLike = async (req, res) => {
     const { userId, boardId } = req.body;
     try {
          const like = await likesService.createLike(userId, boardId);
          res.json(like);
     } catch (err) {
          console.log(err);
          res.status(400).json({ error: "Error creating like" });
     }
}

export const deleteLikeById = async (req, res) => {
     const { likeId } = req.params;
     try {
          const deletedLike = await likesService.deleteLikeById(likeId);
          if (!deletedLike) {
               return res.status(404).json({ error: "Like not found" });
          }
          res.json({ message: "Like deleted successfully", like: deletedLike });
     } catch (err) {
          res.status(500).json({ error: "Error deleting like" });
     }
}

export const getLikeById = async (req, res) => {
     const { likeId } = req.params;
     try {
          const like = await likesService.getLikeById(likeId);
          if (!like) {
               return res.status(404).json({ error: "Like not found" });
          }
          res.json(like);
     } catch (err) {
          res.status(500).json({ error: "Error retrieving like" });
     }
}

export const getLikesByUserId = async (req, res) => {
     const { userId } = req.params;
     try {
          const likes = await likesService.getLikesByUserId(userId);
          if (!likes || likes.length === 0) {
               return res.status(404).json({ error: "No likes found for this user" });
          }
          res.json(likes);
     } catch (err) {
          res.status(500).json({ error: "Error retrieving likes for user" });
     }
}

export const checkIfUserLikedBoard = async (req, res) => {
     const { userId, boardId } = req.params;
     try {
          const like = await likesService.checkIfUserLikedBoard(userId, boardId);
          res.json({ liked: !!like, likeId: like ? like.id : null });
     } catch (err) {
          res.status(500).json({ error: "Error checking like status" });
     }
}

export const getLikedBoardsByUserId = async (req, res) => {
     const { userId } = req.params;
     try {
          const boards = await likesService.getLikedBoardsByUserId(userId);
          res.json(boards);
     } catch (err) {
          console.error('Error retrieving liked boards for user:', err);
          res.status(500).json({ error: 'Error retrieving liked boards for user' });
     }
}