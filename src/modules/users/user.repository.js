import prisma from "../../config/prismaClient.js";

class UserRepository {

  createUser(data) {
    return prisma.user.create({
      data,
    });
  }

  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  getUsers() {
    return prisma.user.findMany();
  }

  updateUser(email, data) {
    return prisma.user.update({
      where: { email },
      data,
    });
  }

  deleteUser(email) {
    return prisma.user.delete({
      where: { email },
    });
  }
}

export const userRepository =
  new UserRepository();