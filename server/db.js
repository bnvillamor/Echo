const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "lucario49",
  host: "localhost",
  port: 5432,
  database: "echo"
});

module.exports = pool;