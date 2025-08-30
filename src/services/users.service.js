import prisma from '../prisma.js';

export class UsersService {
     createUser(username, email) {
          return prisma.user.create({
               data: { username, email },
          });
     }
     deleteUserById(userId) {
          return prisma.user.delete({
               where: { id: Number(userId) }
          });
     }
     getUserById(userId) {
          return prisma.user.findUnique({
               where: { id: Number(userId) }
          });
     }
     getAllUsers() {
          return prisma.user.findMany();
     }
}
