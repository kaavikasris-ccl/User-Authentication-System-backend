import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // DEBUG: check if API is hitting
    console.log("CONTROLLER HIT");

    // INSERT INTO DATABASE
    const user = await prisma.user.create({
  data: {
    email,
    password,
  },
});
    // DEBUG: check if insert worked
    console.log("INSERTED USER:", user);

    // SEND RESPONSE
    return res.status(201).json(user);

  } catch (error) {
    console.log("ERROR:", error);

    return res.status(500).json({
      message: "User creation failed",
    });
  }
};