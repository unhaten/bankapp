const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    user: "postgres",
    password: "1",
    host: "localhost",
    port: 5432,
    database: "bankapp",
});

module.exports = pool;
