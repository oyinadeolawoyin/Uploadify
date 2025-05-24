const prisma = require("../config/prismaClient");

async function saveFile(name, size, url, foldername, userId) {
  let folder = await prisma.folder.findFirst({
    where: {
      name: foldername,
      userId: userId,
    },
  });

  if (!folder) {
    folder = await prisma.folder.create({
      data: {
        name: foldername,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  return await prisma.file.create({
    data: {
      name,
      size,
      url,
      folder: {
        connect: { id: folder.id },
      },
      user: {
        connect: { id: userId },
      },
    },
  });
}

async function getFile(fileId) {
  return await prisma.file.findUnique({
    where: { id: fileId },
  });
}

module.exports = {
  saveFile,
  getFile,
};
