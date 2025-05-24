const prisma = require("../services/folderService");
const { validationResult } = require("express-validator");

function createFolderForm(req, res) {
  res.render("create-folder");
}

async function createFolder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("create-folder", {
      errors: errors.array(),
    });
  }

  try {
    const { name } = req.body;
    const id = req.user.id;
    await prisma.createFolder({ id, name });
    console.log("id", id, "name", name);
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      // Prisma unique constraint error
      return res.status(400).render("create-folder", {
        errors: [{ msg: "Folder name already exists" }],
      });
    }
    res.status(500).render("errorpage", {
      errors: [{ msg: "Server Error" }],
    });
  }
}

module.exports = {
  createFolderForm,
  createFolder,
};
