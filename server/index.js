const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes

//create user
app.post("/user_info", async (req, res) => {
  try {
    const { email } = req.body;
    const newEmail = await pool.query(
      "INSERT INTO user_info (email) VALUES($1) RETURNING *",
      [email]
    );

    res.json(newEmail.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all users
app.get("/user_info", async (req, res) => {
  try {
    const allUserInfo = await pool.query("SELECT * FROM user_info");
    res.json(allUserInfo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
  });