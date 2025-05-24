const prisma = require("../services/folderService");
const prismaFile = require("../services/fileServices");
const { supabase } = require("../config/supabaseClient");

async function folderPage(req, res) {
  try {
    let folder = await prisma.getFolder(Number(req.params.id));
    res.render("folderPage", { title: folder.name, folder });
  } catch (error) {
    console.error("Error fetching folder:", error);
    return res.render("errorpage", {
      errors: [{ msg: "Internal Server Error" }],
    });
  }
}

async function deleteFoldersFile(req, res) {
  try {
    const fileId = Number(req.params.id);

    const file = await prismaFile.getFile(fileId);

    if (!file) {
      return res.render("folderPage", {
        errors: [{ msg: "File not found" }],
      });
    }

    await prisma.deleteFoldersFile(fileId);

    // Delete from Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("user-uploads")
      .remove([file.storagePath]);

    if (storageError) {
      console.error("Failed to delete from storage:", storageError.message);
      return res.render("folderPage", {
        errors: [{ msg: "Failed to delete file from storage." }],
      });
    }

    res.redirect("/");
  } catch (error) {
    console.error(error);

    res.status(500).render("errorpage", {
      errors: [{ msg: "Internal server error while deleting file." }],
    });
  }
}

module.exports = {
  folderPage,
  deleteFoldersFile,
};
