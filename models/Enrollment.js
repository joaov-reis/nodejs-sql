const { Sequelize, DataTypes } = require("sequelize");

const db = require("../database/conn");

const User = require("../models/User");
const TravelPackage = require("../models/TravelPackage");

const Enrollment = db.define("Enrollment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  enrolled: {
    type: DataTypes.boolean,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Enrollment;
