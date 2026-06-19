const session = require("express-session");
const crypto = require("crypto");

module.exports = session({
  secret: "nodejs",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
});
