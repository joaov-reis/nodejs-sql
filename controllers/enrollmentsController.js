const Enrollments = require("../models/Enrollment");
const Course = require("../models/Course");

const getEnrollments = async (req, res) => {
  try {
    const enrollements = await Enrollments.findAll({
      where: { studentId: req.student.id },
    });
    res.status(200).json(enrollements);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const addEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyEnrolled = await Enrollments.findOne({
      where: { studentId, courseId, enrolled: true },
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "Student is already enrolled in this course",
      });
    }

    const enrollment = await Enrollments.create({
      studentId,
      courseId
    });

    res.status(200).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const cancelEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const enrollment = await Enrollments.findOne({
      where: { studentId, courseId, enrolled: true },
    });

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    if (!enrollment.enrolled) {
      return res.status(400).json({
        message: "Enrollment already canceled",
      });
    }

    enrollment.enrolled = false;
    await enrollment.save();

    return res.status(200).json({ message: "Enrollment canceled successfully", enrollment});
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = { getEnrollments, addEnrollment, cancelEnrollment };
