const prisma = require("../services/userService");
const prismaFolder = require("../services/folderService");

async function homePage(req, res) {
  try {
    if (req.isAuthenticated()) {
      const user = await prisma.getUserById(req.user.id);
      return res.render("homePage", { user });
    }
    res.render("homePage");
  } catch (error) {
    console.error("Error fetching folder:", error);
    return res.render("errorpage", {
      errors: [{ msg: "Internal Server Error" }],
    });
  }
}

async function deleteFolder(req, res) {
  try {
    const folderId = Number(req.params.id);
    await prismaFolder.deleteFolder(folderId);
    res.redirect("/");
  } catch (error) {
    console.error("Error fetching folder:", error);
    return res.render("errorpage", {
      errors: [{ msg: "Internal Server Error" }],
    });
  }
}

module.exports = {
  homePage,
  deleteFolder,
};
