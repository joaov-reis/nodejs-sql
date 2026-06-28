const express = require("express");
const router = express.Router();

const CourseController = require("../controllers/coursesController");

router.get("/", CourseController.getCourse);
router.post("/", CourseController.addCourse);

module.exports = router;
