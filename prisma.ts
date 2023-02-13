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
      age: true,
    },
  });
  console.log(user);

  return user;
}

export async function updateUser(email: string) {
  const deleteUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      name: "Viola the Magnificent",
    },
  });
  console.log(deleteUser);

  return deleteUser;
}

export async function deleteUser(email: string) {
  const deleteUser = await prisma.user.delete({
    where: {
      email: email,
    },
  });
  console.log(deleteUser);

  return deleteUser;
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
