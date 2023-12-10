const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Taha12345",
  database: "Test",
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("Taha12345"),
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
// PUT route to update user information
app.put("/user", (req, res) => {
  const {
    User_ID,
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
    !User_ID ||
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

  const updateQuery = `
    UPDATE User
    SET
      First_Name = ?,
      Middle_Name = ?,
      Last_Name = ?,
      Username = ?,
      Password = ?,
      Email = ?,
      Phone_No = ?,
      Blood_Group = ?,
      Last_Donation_Date = ?
    WHERE User_ID = ?
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
    User_ID,
  ];

  connection.query(updateQuery, values, (err, results) => {
    if (err) {
      console.error("Error updating the database: " + err.stack);
      res.status(500).send("Error updating the database.");
      return;
    }

    res.send("User updated successfully.");
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
  console.log(req.body);
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

app.delete("/user", (req, res) => {
  const userId = req.body.User_ID;

  if (!userId) {
    res.status(400).send("User ID must be provided in the request body.");
    return;
  }

  const deleteQuery = `
    DELETE FROM User
    WHERE User_ID = ?
  `;

  connection.query(deleteQuery, [userId], (err, results) => {
    if (err) {
      console.error("Error deleting from the database: " + err.stack);
      res.status(500).send("Error deleting from the database.");
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send("User not found.");
    } else {
      res.send("User deleted successfully.");
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
