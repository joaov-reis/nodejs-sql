const bcrypt = require("bcrypt");

const Users = require("../models/User");
const { Op } = require("sequelize");

class AuthenticationController {
  static async login(req, res) {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res.status(400).json({
          message: "User and Password are Required",
        });
      }

      const user = await Users.findOne({
        where: {
          [Op.or]: [{ username: identifier }, { email: identifier }],
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid username",
        });
      }

      const compareResult = await bcrypt.compare(password, user.password);

      if (!compareResult) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      req.session.user = {
        id: user.id,
        username: user.username,
      };

      res.status(200).json({
        message: "Login OK",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy();

      res.status(200).json({
        message: "Logout OK",
      });
    } catch (error) {
      console.error("Logout error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }

  static async me(req, res) {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      authenticated: true,
      user: req.session.user,
    });
  }
}

module.exports = AuthenticationController;
