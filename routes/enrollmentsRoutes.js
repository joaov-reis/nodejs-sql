const express = require("express");
const router = express.Router();

const enrollmentsController = require("../controllers/enrollmentsController");
const AuthenticationController = require("../controllers/authController");
const { verifyJWT } = require("../middlewares/authJWT");

router.get("/", verifyJWT, enrollmentsController.getEnrollments)
router.post("/", enrollmentsController.addEnrollment);
router.patch("/", enrollmentsController.cancelEnrollment);

module.exports = router;
