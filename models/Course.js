const { Sequelize, DataTypes } = require("sequelize");

const db = require("../database/conn");

const Course = db.define("Course", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // description: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  // Participants: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  // },
  // remainingVacancies: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  // },
});

module.exports = Course;
