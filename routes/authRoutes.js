const express = require("express");
const router = express.Router();

const {verifyJWT} = require("../middlewares/authJWT");

const AuthenticationController = require("../controllers/authController");

router.post("/login", AuthenticationController.login);
router.post("/logout", AuthenticationController.logout);
router.get("/me", verifyJWT, AuthenticationController.me);

module.exports = router;