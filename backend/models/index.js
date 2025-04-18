const config = require("../config/db");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userModel = require("./user_model")(sequelize, Sequelize);
db.donationModel = require("./donations_model")(sequelize, Sequelize);
db.volenteerModel = require("./volenteers_model")(sequelize, Sequelize);



module.exports = db;