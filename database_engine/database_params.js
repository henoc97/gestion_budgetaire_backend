const { Pool } = require('pg');
const dotenv = require('dotenv');
 
const host = process.env.DB_HOST
const dbuser = process.env.DB_USER
const dbname = process.env.DB_NAME
const dbpwd = process.env.DB_PASSWORD
const dbport = process.env.DB_PORT

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "gestion_budgetaire",
  password: "henoc2004",
  port: "5432",
});

module.exports = pool
