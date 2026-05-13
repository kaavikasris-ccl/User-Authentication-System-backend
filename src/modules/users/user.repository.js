import prisma from "@config/prismaClient.js";
class UserRepository {

  // INSERT
  createUser(data) {
    return prisma.user.create({ data });
  }

  // GET SINGLE USER
  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // GET ALL USERS
  getUsers() {
    return prisma.user.findMany();
  }

  // UPDATE USER
  updateUser(email, data) {
    return prisma.user.update({
      where: { email },
      data,
    });
  }

  // DELETE USER
  deleteUser(email) {
    return prisma.user.delete({
      where: { email },
    });
  }
}

export const userRepository = new UserRepository();