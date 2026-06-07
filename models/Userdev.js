const { Sequelize, DataTypes } = require("sequelize");

const db = require("../database/conn");

const Userdev = db.define("Userdev", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,

    set(value) {
      this.setDataValue("name", value.trim());
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,

    validate: {
      isEmail: true,
    },

    set(value) {
      this.setDataValue("email", value.trim().toLowerCase());
    },
  },

  github: {
    type: DataTypes.STRING,
    allowNull: true,

    get() {
      const value = this.getDataValue("github");

      if (!value) {
        return null;
      }

      return `https://github.com/${value}`;
    },

    set(value) {
      if (!value) {
        this.setDataValue("github", null);
        return;
      }

      const cleanValue = value
        .replace("https://github.com/", "")
        .replace("http://github.com/", "")
        .replace("@", "")
        .trim();

      this.setDataValue("github", cleanValue);
    },
  },

  seniority: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  profile: {
    type: DataTypes.VIRTUAL,

    get() {
      const seniority = this.seniority || "sem senioridade definida";

      return `${this.name} é um desenvolvedor ${seniority}.`;
    },
  },

  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

    references: {
      model: "Roledev",
      key: "id",
    },
  },
});

module.exports = Userdev;
