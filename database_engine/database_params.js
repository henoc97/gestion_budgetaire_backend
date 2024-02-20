const { Pool } = require('pg');
const dotenv = require('dotenv');
 
const host = process.env.DB_HOST
const dbuser = process.env.DB_USER
const dbname = process.env.DB_NAME
const dbpwd = process.env.DB_PASSWORD
const dbport = process.env.DB_PORT

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: 'gestion_budgetaire',
  password: "henoc2004",
  port: 5432,
});

module.exports = pool
