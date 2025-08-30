import prisma from '../prisma.js';

export class BoardsService {
     getBoardById = async (boardId) => {
          const board = await prisma.board.findUnique({
               where: { id: Number(boardId) },
               include: { user: true }
          });
          if (!board) return null;
          const videoCount = await prisma.video.count({ where: { boardId: board.id } });
          return { ...board, videoCount };
     }

     getBoardsByUserId = async (userId) => {
          const boards = await prisma.board.findMany({
               where: { userId: Number(userId) },
          });

          const boardsWithCount = await Promise.all(
               boards.map(async board => {
                    const videoCount = await prisma.video.count({ where: { boardId: board.id } });
                    return { ...board, videoCount };
               })
          );
          return boardsWithCount;
     }

     createBoard = async (title, userId, thumbnailUrl) => {
          return prisma.board.create({
               data: { title, userId, thumbnailUrl },
          });
     }

     deleteBoardById = async (boardId) => {
          return prisma.board.delete({
               where: { id: Number(boardId) }
          });
     }

     getAllBoards = async () => {
          const boards = await prisma.board.findMany({
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