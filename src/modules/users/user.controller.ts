import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createUser = async (req: Request, res: Response) => {
  try {
    
    const { name, email, password } = req.body;

    // DEBUG: check if API is hitting
    console.log("CONTROLLER HIT");

    // 2️⃣ INSERT INTO DATABASE (THIS IS YOUR CODE)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    // DEBUG: check if insert worked
    console.log(" INSERTED USER:", user);

    // 3️⃣ SEND RESPONSE
    return res.status(201).json(user);

  } catch (error) {
    console.log("❌ ERROR:", error);

    return res.status(500).json({
      message: "User creation failed",
    });
  }
};