const { Sequelize } = require("sequelize");
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_HOST = process.env.MYSQL_HOST;
module.exports = new Sequelize(
  MYSQL_DATABASE || "ThucTap2020",
  MYSQL_USERNAME || "root",
  MYSQL_PASSWORD || "01694113000",
  {
    host: MYSQL_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);
