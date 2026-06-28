const express = require("express");
const conn = require("./database/conn");
require("dotenv").config();

const app = express();

const CourseRoutes = require("./routes/courseRoutes");
const enrollmentsRoutes = require("./routes/enrollmentsRoutes");
const usersRoutes = require("./routes/students");
const authenticationRoutes = require("./routes/authRoutes");

const Student = require("./models/User");
const Courses = require("./models/Course");
const Enrollment = require("./models/Enrollment");

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use("/Course", CourseRoutes);
app.use("/enrollments", enrollmentsRoutes);
app.use("/users", usersRoutes);

app.use("/", authenticationRoutes);

User.hasMany(Enrollment, {
  foreignKey: "userId",
});

Course.hasMany(Enrollment, {
  foreignKey: "courseId",
});

Enrollment.belongsTo(User, {
  foreignKey: "userId",
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
