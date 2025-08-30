import { BoardsService } from '../services/boards.service.js';
import { VideosService } from '../services/videos.service.js';
const videosService = new VideosService();
const boardsService = new BoardsService();

export const createVideo = async (req, res) => {
     const { url, boardId } = req.body;
     const userId = req.user?.id;

     if (!userId || isNaN(Number(userId))) {
          return res.status(401).json({ error: 'Unauthorized: user not authenticated.' });
     }
     if (!url || typeof url !== 'string' || url.trim().length === 0) {
          return res.status(400).json({ error: 'Valid video URL is required.' });
     }
     if (!boardId || isNaN(Number(boardId))) {
          return res.status(400).json({ error: 'Valid boardId is required.' });
     }

     try {
          const board = await boardsService.getBoardById(boardId);
          if (!board) {
               return res.status(404).json({ error: 'Board not found' });
          }
          if (board.userId !== Number(userId)) {
               return res.status(403).json({ error: 'You are not authorized to add videos to this board.' });
          }
          const video = await videosService.createVideo(url, boardId);
          res.json(video);
     } catch (err) {
          res.status(400).json({ error: err.message });
     }
}

export const deleteVideoById = async (req, res) => {
     const { videoId } = req.params;
     try {
          const deletedVideo = await videosService.deleteVideoById(videoId);
          if (!deletedVideo) {
               return res.status(404).json({ error: "Video not found" });
          }
          res.json({ message: "Video deleted successfully", video: deletedVideo });
     } catch (err) {
          res.status(500).json({ error: "Error deleting video" });
     }
}

export const getVideosByBoardId = async (req, res) => {
     const { boardId } = req.params;
     try {
          const videos = await videosService.getVideosByBoardId(boardId);
          if (!videos || videos.length === 0) {
               return res.status(404).json({ error: "No videos found for this board" });
          }
          res.json(videos);
     } catch (err) {
          res.status(500).json({ error: "Error retrieving videos for board" });
     }
}