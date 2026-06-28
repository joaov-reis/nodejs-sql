const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/studentsController");
const AuthenticationController = require("../controllers/authController");

const { verifyJWT } = require("../middlewares/authJWT");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/", verifyJWT, authorizeRole("admin"), studentsController.getStudents);
router.post("/", studentsController.addUser);
router.post("/refresh", AuthenticationController.refresh);

module.exports = router;
