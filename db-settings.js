const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "production") {
   sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
   sequelize = new Sequelize(
      process.env.DB_NAME_DVPLMNT,
      process.env.DB_USER_DVPLMNT,
      process.env.DB_PASSWORD_DVPLMNT,
      {
         dialect: "postgres",
         host: process.env.DB_HOST_DVPLMNT || "localhost",
         port: 5432,
      }
   );
}

module.exports = sequelize;
