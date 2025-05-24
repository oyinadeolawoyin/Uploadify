const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const dotenv = require("dotenv");
dotenv.config();
const pool = require("./pool");

// 2 weeks in milliseconds
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;

const sessionMiddleware = session({
  store: new pgSession({
    pool,
    tableName: "session",
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: TWO_WEEKS,
    secure: false,
    httpOnly: true,
  },
});

module.exports = sessionMiddleware;
