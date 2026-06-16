const { Sequelize, DataTypes } = require("sequelize");

const db = require("../database/conn");

const TravelPackage = db.define("TravelPackage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  remainingVacancies: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = TravelPackage;
