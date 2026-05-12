import "dotenv/config";

import prisma from "../../src/config/prismaClient.js";
import { hashPassword } from "../../src/core/utils/hash.js";

async function main() {

  // GET FROM ENV
  const email =
    process.env.DEFAULT_USER_EMAIL;

  const password =
    process.env.DEFAULT_USER_PASSWORD;

  // HASH PASSWORD
  const hashedPassword =
    await hashPassword(password);

  // INSERT USER
  await prisma.user.createMany({
    data: [
      {
        email,
        password: hashedPassword,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Records inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });