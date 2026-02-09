const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* LOGIN */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT id, role FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (result.length > 0) {
        res.json({
          success: true,
          userId: result[0].id,
          role: result[0].role
        });
      } else {
        res.json({ success: false });
      }
    }
  );
});

/* ADMIN → GET ALL EMPLOYEES */
app.get("/users", (req, res) => {
  db.query("SELECT id, username, role, work FROM users WHERE role!='ADMIN'", (err, result) => {
    res.json(result);
  });
});

/* EMPLOYEE → GET OWN DETAILS */
app.get("/users/:id", (req, res) => {
  db.query(
    "SELECT username, work FROM users WHERE id=?",
    [req.params.id],
    (err, result) => res.json(result[0])
  );
});

/* ADMIN → ADD EMPLOYEE */
app.post("/users", (req, res) => {
  const { username, password, work } = req.body;
  db.query(
    "INSERT INTO users (username, password, role, work) VALUES (?,?, 'EMPLOYEE', ?)",
    [username, password, work],
    () => res.json({ success: true })
  );
});

/* ADMIN → UPDATE WORK */
app.put("/users/:id", (req, res) => {
  db.query(
    "UPDATE users SET work=? WHERE id=?",
    [req.body.work, req.params.id],
    () => res.json({ success: true })
  );
});

/* ADMIN → DELETE EMPLOYEE */
app.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], () =>
    res.json({ success: true })
  );
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
