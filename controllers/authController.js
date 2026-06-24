const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/User");
const { Op } = require("sequelize");

const {
  verifyJWT,
  getToken,
  invalidateToken,
} = require("../middlewares/authJWT");

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

      const token = jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES },
      );

      res.status(200).json({
        message: "Login OK",
        token,
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
      const token = getToken(req);

      invalidateToken(token);

      res.status(200).json({
        message: "Logout OK",
        token: null,
      });
    } catch (error) {
      console.error("Logout error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }

  static async me(req, res) {
    res.status(200).json({
      authenticated: true,
      user: req.locals.user,
    });
  }
}

module.exports = AuthenticationController;
