import prisma from "@/config/prismaClient";
import bcrypt from "bcrypt";

class UserService {
  async createUser(input) {
    const { id, email, password } = input;

    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await prisma.user.create({
  data: {
    email,
    password: hashedPassword,
  },
});

    console.log("CREATED USER:", newUser);

    return newUser;
  }
}

export const userService = new UserService();