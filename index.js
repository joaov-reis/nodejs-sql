const express = require("express");
const { QueryTypes } = require("sequelize");

const conn = require("./database/conn");

const Roledev = require("./models/Roledev");
const Userdev = require("./models/Userdev");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

Roledev.hasMany(Userdev, { foreignKey: "role_id" });

Userdev.belongsTo(Roledev, { foreignKey: "role_id" });

app.get("/", (req, res) => {
  res.json({
    message: "API",
    endpoints: [
      "GET /roles",
      "GET /roles/:id",
      "POST /roles",
      "PUT /roles/:id",
      "DELETE /roles/:id",
      "GET /users",
      "GET /users/:id",
      "POST /users",
      "PUT /users/:id",
      "DELETE /users/:id",
      "GET /users/by-role/:role_id",
      "GET /reports/users-by-role",
      "GET /reports/users-by-name",
    ],
  });
});

app.get("/roles", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      const roles = await Roledev.findAll({
        order: [["id", "ASC"]],
      });

      return res.json(roles);
    }

    const roles = await Roledev.findAll({
      where: { name },
      order: [["id", "ASC"]],
    });

    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/roles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Roledev.findByPk(id, {
      include: Userdev,
    });

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/roles", async (req, res) => {
  try {
    const { name, level, description } = req.body;

    const role = await Roledev.create({
      name,
      level,
      description,
    });

    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
      message: error.message,
    });
  }
});

app.put("/roles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, description } = req.body;

    const role = await Roledev.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    role.name = name;
    role.level = level;
    role.description = description;

    await role.save();

    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
      message: error.message,
    });
  }
});

app.delete("/roles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const contUser = await Userdev.count({
      where: { role_id: id },
    });

    if (contUser > 0) {
      return res.status(400).json({
        message: "Error delete role. There are users using this role.",
      });
    }

    const countRole = await Roledev.destroy({
      where: { id },
    });

    if (countRole === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json({ message: "Role deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      const users = await Userdev.findAll({
        include: Roledev,
        order: [["id", "ASC"]],
      });

      return res.json(users);
    }

    const users = await Userdev.findAll({
      include: [
        {
          model: Roledev,
          where: { name: role },
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Userdev.findByPk(id, {
      include: Roledev,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, github, seniority, role_id } = req.body;

    const role = await Roledev.findByPk(role_id);

    if (!role) {
      return res.status(404).json({
        error: "Role not found. Create the role first.",
      });
    }

    const user = await Userdev.create({
      name,
      email,
      github,
      seniority,
      role_id,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
      message: error.message,
    });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, github, seniority, role_id } = req.body;

    const user = await Userdev.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (role_id) {
      const role = await Roledev.findByPk(role_id);

      if (!role) {
        return res.status(404).json({
          error: "Role not found",
        });
      }
    }

    user.name = name;
    user.email = email;
    user.github = github;
    user.seniority = seniority;
    user.role_id = role_id;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
      message: error.message,
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const countUser = await Userdev.destroy({
      where: { id },
    });

    if (countUser === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/users/by-role/:role_id", async (req, res) => {
  try {
    const { role_id } = req.params;

    const users = await Userdev.findAll({
      where: { role_id },
      include: Roledev,
      order: [["id", "ASC"]],
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/reports/users-by-role", async (req, res) => {
  try {
    const result = await conn.query(
      `
      SELECT
        r.id AS role_id,
        r.name AS role_name,
        r.level AS role_level,
        COUNT(u.id) AS total_users
      FROM Roledevs r
      LEFT JOIN Userdevs u ON u.role_id = r.id
      GROUP BY r.id, r.name, r.level
      ORDER BY total_users DESC
      `,
      {
        type: QueryTypes.SELECT,
      },
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
      message: error.message,
    });
  }
});

app.get("/reports/users-by-name", async (req, res) => {
  try {
    const result = await conn.query(
      `
      SELECT
       u.id,
       u.name,
       r.name as rolename,
       r.level
      FROM Userdevs u
      LEFT JOIN Roledevs r ON u.role_id = r.id
      where u.name LIKE :name
      ORDER BY u.name ASC
      `,
      {
        replacements: {
          name: `%${name || ""}%`,
        },
        type: QueryTypes.SELECT,
      },
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
      message: error.message,
    });
  }
});

conn
  .sync({ force: false })
  .then(() => {
    console.log("sync OK");

    app.listen(3333, () => {
      console.log("Server starting on port 3333");
    });
  })
  .catch((error) => {
    console.error("Error sync:", error);
  });
