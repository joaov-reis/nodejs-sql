const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Students = require("../models/Student");
const { Op } = require("sequelize");

const {
  verifyJWT,
  getToken,
  invalidateToken,
} = require("../middlewares/authJWT");

class AuthenticationController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "email and password are required",
        });
      }

      const student = await Students.findOne({
        where: { email },
      });

      if (!student) {
        return res.status(401).json({
          message: "Invalid email",
        });
      }

      const compareResult = await bcrypt.compare(password, student.password);

      if (!compareResult) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: student.id,
          name: student.name,
          email: student.email,
          role: student.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        },
      );

      const refreshToken = jwt.sign(
        {
          id: student.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      await student.update({
        refreshToken,
      });

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
      student: res.locals.student,
    });
  }

  static async refresh(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh Token Required",
      });
    }

    const student = await Students.findOne({
      where: {
        refreshToken,
      },
    });

    if (!student) {
      return res.status(401).json({
        message: "Invalid Refresh Token",
      });
    }

    const newAccessToken = jwt.sign(
      {
        id: student.id,
        name: student.name,
        email: student.email,
        role: student.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.status(200).json({
      token: newAccessToken,
    });
  }
}

module.exports = AuthenticationController;
