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
    if (user) {
      const loginRes = await createLoginToken({
        device: "test",
        userId: user.id,
      });
      if (loginRes) {
        return loginRes;
      } else {
        return null;
      }
    }
  } catch {
    return null;
  }
}

export async function createUserByGithub({
  name,
  email,
  github_oauth,
  age = null,
}: {
  name: string;
  email: string;
  github_oauth: string;
  age: number | null;
}) {
  try {
    let user = await findUser({ email: email });
    if (user) {
      user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          github_oauth: github_oauth,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          github_oauth: github_oauth,
          age: age,
        },
      });
    }
    if (user) {
      const loginRes = await createLoginToken({
        device: "test",
        userId: user.id,
      });
      if (loginRes) {
        return loginRes;
      } else {
        return null;
      }
    }
  } catch {
    return null;
  }
}

export async function findUser({ email, password, id }: { email: string; password?: string; id?: string }) {
  if (password) {
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
  } else if (id) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        github_oauth: true,
      },
    });

    return user;
  } else {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
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
}

export async function findUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      github_oauth: true,
    },
  });

  return user;
}

export async function updateUser({ email }: { email: string }) {
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

export async function createLoginToken({ device, userId }: { device: string; userId: string }) {
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
    const findRes = await findUser({ email: email, password: password });
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
  const user = await prisma.loginToken.findUnique({
    where: {
      token: token,
    },
    select: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (user) {
    return user.User;
  }
  return user;
}
