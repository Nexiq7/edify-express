import prisma from '../prisma.js';

export class VideosService {
     createVideo(url, boardId) {
          return prisma.video.create({
               data: { url, boardId },
          });
     }
     getVideosByBoardId(boardId) {
          return prisma.video.findMany({
               where: { boardId: Number(boardId) }
          });
     }
     deleteVideoById(videoId) {
          return prisma.video.delete({
               where: { id: Number(videoId) }
          });
     }
}