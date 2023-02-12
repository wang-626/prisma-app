import { PrismaClient } from "@prisma/client";
import { encryption } from "./crypto";
const prisma = new PrismaClient();

export async function createUser(
  name: string,
  email: string,
  password: string,
  age: number | null = null
) {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      age: age,
      password: encryption(password),
    },
  });
  console.log(user);

  return user;
}

export async function findUser(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: encryption(password),
    },
    select: {
      name: true,
      email: true,
      age:true
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
// createUser()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e: any) => {
//     console.error(e);
//     await prisma.$disconnect();
//   });
