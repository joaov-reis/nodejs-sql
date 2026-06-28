const Course = require("../models/Course");

const getCourse = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const addCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const course = await Course.create({
      name,
    });
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getCourse, addCourse };
