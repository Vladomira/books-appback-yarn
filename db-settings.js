const { Sequelize } = require("sequelize");
const { pg } = require("pg");

module.exports = new Sequelize(
   process.env.PGDATABASE,
   process.env.PGUSER,
   process.env.PGPASSWORD,
   {
      dialect: "postgres",
      // dialectModule: pg,
      PORT: 5432,
      host: process.env.PGHOST,
      dialectOptions: {
         ssl: {
            rejectUnauthorized: false,
         },
      },
   }
);
