const prisma = require("../config/prismaClient");
const { supabase } = require("../config/supabaseClient");

async function createFolder({ name, id }) {
  return await prisma.folder.create({
    data: {
      name,
      user: {
        connect: { id: id },
      },
    },
  });
}

async function getFolder(id) {
  return await prisma.folder.findUnique({
    where: {
      id: id,
    },
    include: {
      files: true,
    },
  });
}

async function deleteFolder(folderId) {
  const files = await prisma.file.findMany({
    where: { folderId },
  });

  if (files.length > 0) {
    const storagePaths = files.map((file) => file.storagePath);

    const { error: storageError } = await supabase.storage
      .from("user-uploads")
      .remove(storagePaths);

    if (storageError) {
      console.error(
        "Failed to delete files from Supabase:",
        storageError.message,
      );
      throw new Error("Storage deletion failed");
    }

    await prisma.file.deleteMany({
      where: { folderId },
    });
  }

  return await prisma.folder.delete({
    where: { id: folderId },
  });
}

async function deleteFoldersFile(fileId) {
  return await prisma.file.delete({
    where: {
      id: fileId,
    },
  });
}

module.exports = {
  createFolder,
  getFolder,
  deleteFolder,
  deleteFoldersFile,
};
