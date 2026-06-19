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
});

module.exports = Enrollment;
