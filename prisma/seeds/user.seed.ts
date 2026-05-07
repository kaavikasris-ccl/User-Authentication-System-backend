import prisma from "@/config/prismaClient";
import { hashPassword } from "@/core/utils/hash";

async function main() {
  const hashedPassword = await hashPassword("ccl@12");

  await prisma.user.createMany({
    data: [
      {
        email: "cclemployee@zohomail.com",
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