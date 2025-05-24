require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");

const caCert = fs.readFileSync("/etc/secrets/ca.pem").toString();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: caCert,
  },
});

module.exports = pool;