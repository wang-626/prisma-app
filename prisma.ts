import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export async function findUser() {
  const user = await prisma.user.findUnique({
    where: {
      id: "ae14c8e8-3bcd-4735-a058-06ae991d81f3",
    },
    select: {
      name: true,
      email: true,
    },
  });
  console.log(user);

  return user;
}

export async function findAllUser() {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
    },
  });
  return users;
}

// 測試使用
// findUser()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e: any) => {
//     console.error(e);
//     await prisma.$disconnect();
//   });
