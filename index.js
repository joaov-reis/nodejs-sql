const express = require("express");
const conn = require("./database/conn");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

const CourseRoutes = require("./routes/courseRoutes");
const enrollmentsRoutes = require("./routes/enrollmentsRoutes");
const studentsRoutes = require("./routes/studentsRoutes");
const authenticationRoutes = require("./routes/authRoutes");

const Student = require("./models/Student");
const Course = require("./models/Course");
const Enrollment = require("./models/Enrollment");

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use("/course", CourseRoutes);
app.use("/enrollments", enrollmentsRoutes);
app.use("/students", studentsRoutes);

app.use("/", authenticationRoutes);

Student.hasMany(Enrollment, {
  foreignKey: "studentId",
});

Course.hasMany(Enrollment, {
  foreignKey: "courseId",
});

Enrollment.belongsTo(Student, {
  foreignKey: "studentId",
});

Enrollment.belongsTo(Course, {
  foreignKey: "courseId",
});

conn
  .sync({ force: false })
  .then(() => {
    console.log("sync OK");
    app.listen(3333, () => {
      console.log("Server starting");
    });
  })
  .catch((error) => {
    console.error("Error sync:", error);
  });
