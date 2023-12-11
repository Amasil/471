const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Establishing a connection to the MySQL database
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

// PUT route to update user information
app.put("/user", (req, res) => {
  // Extracting data from the request body
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

  // Validating required fields
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

  // SQL query for updating user information
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

  // Executing the update query
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
  // Extracting data from the request body
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

  // Validating required fields
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

  // SQL query for inserting a new user
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

  // Executing the insert query
  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error("Error inserting into the database: " + err.stack);
      res.status(500).send("Error inserting into the database.");
      return;
    }
    res.send("User inserted successfully.");
  });
});

// DELETE route to delete a user
app.delete("/user", (req, res) => {
  const userId = req.body.User_ID;

  // Validating required fields
  if (!userId) {
    res.status(400).send("User ID must be provided in the request body.");
    return;
  }

  // SQL query for deleting a user
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

    // Checking if the user was found and deleted
    if (results.affectedRows === 0) {
      res.status(404).send("User not found.");
    } else {
      res.send("User deleted successfully.");
    }
  });
});

// GET route to fetch initial blood quantities
app.get("/bloodQuantities", (req, res) => {
  // SQL query to retrieve blood quantities from the Inventory table
  connection.query(
    "SELECT Blood_Type, No_of_units FROM Inventory",
    (err, results) => {
      if (err) {
        console.error(
          "Error querying the database for blood quantities: " + err.stack
        );
        res
          .status(500)
          .send("Error querying the database for blood quantities.");
        return;
      }

      // Formatting the results into a more readable format
      const quantities = {};
      results.forEach((row) => {
        quantities[row.Blood_Type] = row.No_of_units;
      });

      res.send(quantities);
    }
  );
});

// POST route to insert data into the Inventory table
app.post("/inventory", (req, res) => {
  // Extracting data from the request body
  const { Hospital_ID, No_of_units, Blood_type } = req.body;

  // Validating required fields
  if (!Hospital_ID || !No_of_units || !Blood_type) {
    res.status(400).send("All required fields must be provided.");
    return;
  }

  // SQL query for inserting data into the Inventory table
  const insertQuery = `
    INSERT INTO Inventory (Hospital_ID, No_of_units, Blood_type)
    VALUES (?, ?, ?)
  `;

  const values = [Hospital_ID, No_of_units, Blood_type];

  // Executing the insert query
  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error("Error inserting into the Inventory table: " + err.stack);
      res.status(500).send("Error inserting into the Inventory table.");
      return;
    }

    res.send("Data inserted into the Inventory table successfully.");
  });
});

// PUT route to update blood quantities in the Inventory table
app.put("/inventory", (req, res) => {
  // Extracting data from the request body
  const { Hospital_ID, No_of_units, Blood_type } = req.body;

  // Validating required fields
  if (!Hospital_ID || !No_of_units || !Blood_type) {
    res.status(400).send("All required fields must be provided.");
    return;
  }

  // SQL query for updating blood quantities in the Inventory table
  const updateQuery = `
    UPDATE Inventory
    SET No_of_units = No_of_units + ?
    WHERE Hospital_ID = ? AND Blood_type = ?
  `;

  const values = [No_of_units, Hospital_ID, Blood_type];

  // Executing the update query
  connection.query(updateQuery, values, (err, results) => {
    if (err) {
      console.error("Error updating blood quantity: " + err.stack);
      res.status(500).send("Error updating blood quantity.");
      return;
    }

    res.send("Blood quantity updated successfully.");
  });
});

// Starting the server on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
