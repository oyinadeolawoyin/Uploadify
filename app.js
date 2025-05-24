require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");

const passport = require("passport");
const flash = require("connect-flash");
require("./src/config/passport");
const sessionMiddleware = require("./src/config/session");

const homePageRoutes = require("./src/routes/homePageRoutes");
const userRoutes = require("./src/routes/userRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const logoutRoutes = require("./src/routes/logoutRoutes");
const createFolderRoutes = require("./src/routes/createFolderRoutes");
const folderRoutes = require("./src/routes/folderRoutes");
const fileRoutes = require("./src/routes/fileRoutes");

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

const assestsPath = path.join(__dirname, "public");
app.use(express.static(assestsPath));

app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg"); // success messages
  res.locals.error_msg = req.flash("error_msg"); // general error messages
  res.locals.error = req.flash("error"); // passport error messages
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user; // Makes user available in all views
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use("/", homePageRoutes);
app.use("/sign-up-form", userRoutes);
app.use("/login-form", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/create-folder", createFolderRoutes);
app.use("/folders", folderRoutes);
app.use("/upload", fileRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port: ${PORT}`);
});