const { Sequelize } = require("sequelize");

// Method 1
// const sequelize = new Sequelize("dbservername://user:pass@example.com:5432/dbname");

// Method 2
const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_SERVER_NAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    },
  }
);

module.exports = sequelize;
