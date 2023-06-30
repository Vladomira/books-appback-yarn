const { Sequelize } = require("sequelize");
const { pg } = require("pg");

module.exports = new Sequelize(process.env.DATABASE_URL, {
   dialectModule: pg,
   PORT: 5432,
   user: process.env.PGUSER,
   password: process.env.PGPASSWORD,
   host: process.env.PGHOST,
   database: process.env.PGDATABASE,
   dialectOptions: {
      ssl: {
         rejectUnauthorized: false,
      },
   },
});
