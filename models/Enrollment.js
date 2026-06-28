const { Sequelize, DataTypes } = require("sequelize");

const db = require("../database/conn");

const Student = require("../models/Student");
const Course = require("../models/Course");

const Enrollment = db.define("Enrollment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  enrolled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Enrollment;
