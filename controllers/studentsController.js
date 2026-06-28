const Students = require("../models/Student");

const getStudents = async (req, res) => {
  try {
    const students = await Students.findAll();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const addStudent = async (req, res) => {
  try {
    const { password, name, email, birthDate } = req.body;

    if (!checkPassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, letters and numbers",
      });
    }

    const studentTrim = email.trim();

    const studentExist = await Students.findOne({
      where: { email: studentTrim },
    });

    if (studentExist) {
      return res.status(409).json({
        message: "Student account already created with this email",
      });
    }

    const student = await Students.create({
      password,
      name,
      email: studentTrim,
      birthDate,
      role: "user",
    });
    res.status(201).json({
      name,
      email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

function checkPassword(password) {
  const hasminimunLength = password.length >= 8;
  const hasnumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  return hasLetter && hasnumber && hasminimunLength;
}

module.exports = { getStudents, addStudent };
