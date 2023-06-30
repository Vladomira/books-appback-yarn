const { Sequelize } = require("sequelize");
const { pg } = require("pg");

module.exports = new Sequelize(process.env.DATABASE_URL, {
   dialectModule: pg,
});
