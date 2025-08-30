import prisma from '../prisma.js';

export class LikesService {
     createLike(userId, boardId) {
          return prisma.like.create({
               data: { userId, boardId },
          });
     }
     deleteLikeById(likeId) {
          return prisma.like.delete({
               where: { id: Number(likeId) }
          });
     }
     getLikeById(likeId) {
          return prisma.like.findUnique({
               where: { id: Number(likeId) }
          });
     }
     getLikesByUserId(userId) {
          return prisma.like.findMany({
               where: { userId: Number(userId) }
          });
     }
     checkIfUserLikedBoard(userId, boardId) {
          return prisma.like.findFirst({
               where: { userId: Number(userId), boardId: Number(boardId) }
          });
     }
     getLikedBoardsByUserId = async (userId) => {
          const likes = await prisma.like.findMany({
               where: { userId: Number(userId) },
               select: { boardId: true }
          });
          const boardIds = likes.map(like => like.boardId);
          if (boardIds.length === 0) return [];
          const boards = await prisma.board.findMany({
               where: { id: { in: boardIds } },
               include: { user: true }
          });
          const boardsWithCount = await Promise.all(
               boards.map(async board => {
                    const videoCount = await prisma.video.count({ where: { boardId: board.id } });
                    return { ...board, videoCount };
               })
          );
          return boardsWithCount;
     }
}

