require("dotenv").config();
const express = require("express");
const app = express();

const passport = require("passport");
const flash = require("connect-flash");
require("./src/config/passport"); 
const sessionMiddleware = require("./src/config/session");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assestsPath = path.join(__dirname, "public");
app.use(express.static(assestsPath));

app.use(express.urlencoded({ extended: true }));


app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); // success messages
    res.locals.error_msg = req.flash('error_msg');  // general error messages
    res.locals.error = req.flash('error');// passport error messages
    next();
});
app.use((req, res, next) => {
    res.locals.user = req.user; // Makes user available in all views
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});
