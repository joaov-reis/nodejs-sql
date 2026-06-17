const Users = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const addUser = async (req, res) => {
  try {
    const { username, password, name, email, age, phoneNumber, country } =
      req.body;

    if (!checkPassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, letters and numbers",
      });
    }

    const userTrim = username.trim();

    const userExist = await Users.findOne({
      where: { username: userTrim },
    });

    if (userExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const user = await Users.create({
      username: userTrim,
      password,
      name,
      email,
      age,
      phoneNumber,
      country,
    });
    res.status(201).json({
      username,
      email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

function checkPassword(password) {
  const hasminimunLength = password.length >= 8;
  const hasnumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  return hasLetter && hasnumber && hasminimunLength;
}

const testUrlEncoder = async (req, res) => {
  const roles = req.body.roles; //encoded true
  //const roles = req.body['roles[]']  //encoded false
  res.send(roles);
};

module.exports = { getUsers, addUser, testUrlEncoder };
