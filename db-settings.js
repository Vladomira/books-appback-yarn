const { Sequelize } = require("sequelize");
const { pg } = require("pg");

module.exports = new Sequelize(
   process.env.DB_NAME_DVPLMNT,
   process.env.DB_USER_DVPLMNT,
   process.env.DB_PASSWORD_DVPLMNT,
   {
      dialect: "postgres",
      user: "root",
      password: "science",
      host: process.env.DB_HOST_DVPLMNT || "localhost",
      PORT: process.env.DB_PORT_DVPLMNT,
   }
);
