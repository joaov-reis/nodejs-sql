const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize("Projeto_nodejs-sql", "dbpwf26264703", "MEi2lRe1N4jH6dw3f[mWa", {
  host: 'serverless-us-east-1.sysp0000.db1.skysql.com',
  port: 4034,
  dialect: 'mariadb',
  define: {
    freezeTableName: true,
  },
  dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.join(__dirname, "../config/globalsignrootca.pem")),
      },
    },
    logging: false,
});

try {
  sequelize.authenticate();
  console.log("Connection Succefully");
} catch (err) {
  console.log("Connection error");
}

module.exports = sequelize;