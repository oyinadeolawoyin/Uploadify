const prisma = require("../config/prismaClient");
const bcrypt = require("bcrypt");

async function createUser({ username, password, email }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
}

async function getUserByUsername(username) {
  return await prisma.user.findUnique({
    where: { username },
  });
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      folders: true,
      files: true,
    },
  });
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
};
