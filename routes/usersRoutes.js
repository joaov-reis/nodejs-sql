const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const AuthenticationController = require("../controllers/authController");

const { verifyJWT } = require("../middlewares/authJWT");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/", verifyJWT, authorizeRole("admin"), usersController.getUsers);
router.post("/", usersController.addUser);
router.post("/refresh", AuthenticationController.refresh);

module.exports = router;
