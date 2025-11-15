import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Harsh@23",
  database: "job_board",
});

export default db;
