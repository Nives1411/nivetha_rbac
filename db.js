const mysql = require("mysql2");

console.log("🔥 DB FILE LOADED 🔥");

const db = mysql.createConnection({
  host: "localhost",
  user: "nodeuser",
  password: "node123",
  database: "nive_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected as nodeuser");
});

module.exports = db;
