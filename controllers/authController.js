const bcrypt = require("bcrypt");

const Users = require("../models/User");
const { Op } = require("sequelize");

class AuthenticationController {
  static async login(req, res) {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res
          .status(400)
          .json({ message: "User and Password are Required" });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({ message: "Password must be at least 8 characters long" });
      }

      const user = await Users.findOne({
        where: {
          [Op.or]: [{ username: identifier }, { email: identifier }],
        },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid username" });
      }

      const compareResult = await bcrypt.compare(password, user.password);

      if (!compareResult) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.status(200).json({ message: "Login OK" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = AuthenticationController;
