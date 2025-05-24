const fs = require("fs");
const path = require("path");
const { supabase } = require("../config/supabaseClient");
const prisma = require("../services/fileServices");

function fileUpload(req, res) {
  res.render("upload");
}

async function uploadFile(req, res) {
  try {
    const { foldername } = req.body;
    const file = req.file;
    const userId = req.user.id;

    if (!file) {
      return res.status(400).render("upload", {
        errors: [{ msg: "No file uploaded" }],
      });
    }

    const fileBuffer = fs.readFileSync(file.path);
    const supabasePath = `uploads/${Date.now()}_${file.originalname}`;

    const { data, error } = await supabase.storage
      .from("user-uploads")
      .upload(supabasePath, fileBuffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("user-uploads")
      .getPublicUrl(supabasePath);

    const publicUrl = publicUrlData.publicUrl;

    await prisma.saveFile(
      file.originalname,
      file.size,
      publicUrl,
      foldername,
      userId,
    );

    fs.unlinkSync(file.path);

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).render("upload", {
      errors: [{ msg: "Something went wrong during upload" }],
    });
  }
}

module.exports = {
  fileUpload,
  uploadFile,
};
