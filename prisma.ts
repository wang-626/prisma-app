import { PrismaClient } from "@prisma/client";
import { encryption } from "./lib/crypto";
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
    return { id: null };
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

export async function createLoginToken({
  device,
  userId,
}: {
  device: string;
  userId: string;
}) {
  try {
    const loginToken = await prisma.loginToken.create({
      data: {
        device: device,
        userId: userId,
      },
    });
    return loginToken;
  } catch (err) {
    return { id: null };
  }
}

export async function userLogin(email: string, password: string) {
  try {
    const findRes = await findUser(email, password);
    if (findRes) {
      const loginRes = await createLoginToken({
        device: "test",
        userId: findRes.id,
      });
      if (loginRes) {
        return loginRes;
      }
    }
  } catch {
    return null;
  }
}

export async function verifyLoginToken(token: string) {
  console.log(123);
  
  const loginToken = await prisma.loginToken.findUnique({
    where: {
      id: token,
    },
  });
  
  if (loginToken) {
    return true;
  }
  return false;
}
