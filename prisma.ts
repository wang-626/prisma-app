import { PrismaClient } from "@prisma/client";
import { encryption } from "./crypto";
const prisma = new PrismaClient();

export async function createUserByEmail({
  name,
  email,
  password,
  age = null,
}: {
  name: string;
  email: string;
  password: string;
  age: number | null;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        age: age,
        password: encryption(password),
      },
    });
    return user;
  } catch (err) {
    return {id:null};
  }
}

export async function findUser(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: encryption(password),
    },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
    },
  });

  return user;
}

export async function updateUser(email: string) {
  const updateUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      name: "Viola the Magnificent",
    },
  });

  return updateUser;
}

export async function deleteUser(email: string) {
  const deleteUser = await prisma.user.delete({
    where: {
      email: email,
    },
  });

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
