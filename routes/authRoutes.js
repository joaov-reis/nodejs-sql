const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/authController");

router.post("/", AuthenticationController.login);
router.post("/logout", AuthenticationController.logout);
router.get("/me", AuthenticationController.me);

module.exports = router;
