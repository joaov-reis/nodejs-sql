const { Sequelize, DataTypes } = require("sequelize");
const db = require("../database/conn");
const bcrypt = require("bcrypt");

const Student = db.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Student.beforeCreate(async (student) => {
  console.log(student.password);
  const passwordHash = await bcrypt.hash(student.password, 10);
  console.log(passwordHash);
  student.password = passwordHash;
});

module.exports = Student;
