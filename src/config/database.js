const sequelizeDB = require("sequelize");
require("dotenv").config();

const sequelize = new sequelizeDB(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
