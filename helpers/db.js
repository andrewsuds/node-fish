const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    process.env.PRODUCTION === "true"
      ? process.env.INTERNAL
      : process.env.EXTERNAL,
  ssl: process.env.PRODUCTION === "true" ? false : true,
});

module.exports = pool;
