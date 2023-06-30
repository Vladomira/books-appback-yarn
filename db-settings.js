const { Sequelize } = require("sequelize");
const { pg } = require("pg");

module.exports = new Sequelize(process.env.DATABASE_URL, {
   dialectModule: pg,
   // dialect: "postgres",
   PORT: 5432,
   user: process.env.PGUSER,
   password: process.env.PGPASSWORD,
   host: process.env.PGHOST,
});
