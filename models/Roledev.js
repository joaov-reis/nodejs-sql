const { Sequelize, DataTypes } = require("sequelize");

const db = require("../database/conn");

const Roledev = db.define("Roledev", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  label: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.name} - ${this.level}`;
    },
  },
});

module.exports = Roledev;
