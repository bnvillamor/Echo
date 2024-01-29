const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //let's us access req.body

//routes

//create listing
app.post("/listings", async (req, res) => {
  try {
    const { description } = req.body;
    const newListing = await pool.query(
      "INSERT INTO listings (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newListing.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all listings
app.get("/listings", async (req, res) => {
  try {
    const allListings = await pool.query("SELECT * FROM urbanfetch");
    res.json(allListings.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
  });