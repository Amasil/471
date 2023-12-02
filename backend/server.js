const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sZ10O84<",
  database: "Test",
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("sZ10O84<"),
  },
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }

  console.log("Connected to the database.");
});

// GET route to fetch all users
app.get("/user", (req, res) => {
  connection.query("SELECT * FROM User", (err, results) => {
    if (err) {
      console.error("Error querying the database: " + err.stack);
      res.status(500).send("Error querying the database.");
      return;
    }

    res.send(results);
  });
});

// POST route to insert a new user
app.post("/user", (req, res) => {
  const {
    First_Name,
    Middle_Name,
    Last_Name,
    Username,
    Password,
    Email,
    Phone_No,
    Blood_Group,
    Last_Donation_Date,
  } = req.body;

  if (
    !First_Name ||
    !Last_Name ||
    !Username ||
    !Password ||
    !Email ||
    !Phone_No
  ) {
    res.status(400).send("All required fields must be provided.");
    return;
  }

  const insertQuery = `
    INSERT INTO User (
      First_Name,
      Middle_Name,
      Last_Name,
      Username,
      Password,
      Email,
      Phone_No,
      Blood_Group,
      Last_Donation_Date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    First_Name,
    Middle_Name,
    Last_Name,
    Username,
    Password,
    Email,
    Phone_No,
    Blood_Group,
    Last_Donation_Date,
  ];

  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error("Error inserting into the database: " + err.stack);
      res.status(500).send("Error inserting into the database.");
      return;
    }

    res.send("User inserted successfully.");
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
