// Importing required modules
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Creating an Express application
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// =================================================================================================================

// Establishing a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sZ10O84<", // Consider using environment variables for sensitive information
  database: "Test",
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("sZ10O84<"),
  },
});

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// =================================================================================================================

// GET route to fetch all users
app.get("/user", (req, res) => {
  // Query to fetch all users from the User table
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
app.put("/user", async (req, res) => {
  // Extracting user data from the request body
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
    User_Type,
  } = req.body;

  // Retrieve the user's stored salt
  const selectQuery = `
    SELECT Salt
    FROM User
    WHERE User_ID = ?
  `;

  connection.query(selectQuery, [User_ID], async (err, results) => {
    if (err) {
      console.error("Error querying the database: " + err.stack);
      res.status(500).send("Error querying the database.");
      return;
    }

    if (results.length === 0) {
      // User not found
      res.status(404).send("User not found.");
      return;
    }

    const salt = results[0].Salt;

    try {
      // Hash the password with the stored salt
      const hashedPassword = await bcrypt.hash(Password, salt);

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
          Last_Donation_Date = ?,
          User_Type = ?
        WHERE User_ID = ?
      `;

      const values = [
        First_Name,
        Middle_Name,
        Last_Name,
        Username,
        hashedPassword, // Store the hashed password
        Email,
        Phone_No,
        Blood_Group,
        Last_Donation_Date,
        User_Type,
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
    } catch (error) {
      console.error("Error hashing password: " + error.stack);
      res.status(500).send("Error hashing password.");
    }
  });
});

// POST route to insert a new user
app.post("/user", async (req, res) => {
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
    User_Type,
  } = req.body;

  // Generate a random salt
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  try {
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(Password, salt);

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
        Last_Donation_Date,
        User_Type,
        Salt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      First_Name,
      Middle_Name,
      Last_Name,
      Username,
      hashedPassword, // Store the hashed password
      Email,
      Phone_No,
      Blood_Group,
      Last_Donation_Date,
      User_Type,
      salt, // Store the salt
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
  } catch (error) {
    console.error("Error hashing password: " + error.stack);
    res.status(500).send("Error hashing password.");
  }
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

// =================================================================================================================

// POST route for user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Query the database to get the user's stored salt and hashed password
  const selectQuery = `
    SELECT User_ID, Salt, Password
    FROM User
    WHERE Username = ?
  `;

  connection.query(selectQuery, [username], async (err, results) => {
    if (err) {
      console.error("Error querying the database: " + err.stack);
      res.status(500).send("Error querying the database.");
      return;
    }

    if (results.length === 0) {
      // User not found
      res.status(401).send("Invalid credentials.");
      return;
    }

    const { User_ID, Salt, Password: storedPassword } = results[0];

    try {
      // Use bcrypt.compare to compare entered password with stored hashed password
      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (passwordMatch) {
        // Generate a JWT token
        const token = jwt.sign(
          { user_id: User_ID, username },
          "your-secret-key",
          {
            expiresIn: "1h", // Token expires in 1 hour
          }
        );

        res.json({ token });
      } else {
        res.status(401).send("Invalid credentials.");
      }
    } catch (error) {
      console.error("Error comparing passwords: " + error.stack);
      res.status(500).send("Error comparing passwords.");
    }
  });
});

// =================================================================================================================

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

// PUT route to update blood quantities in the Inventory table
app.put("/updateQuantity", (req, res) => {
  const { Blood_type, No_of_units } = req.body;

  // Validating required fields
  if (!Blood_type || !No_of_units) {
    res
      .status(400)
      .send("Blood type and quantity must be provided in the request body.");
    return;
  }

  // SQL query for updating blood quantities in the Inventory table
  const updateQuery = `
    UPDATE Inventory
    SET No_of_units = ?
    WHERE Blood_type = ?
  `;

  const values = [No_of_units, Blood_type];

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

// =================================================================================================================

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

// =================================================================================================================

// PUT route to update feedback
app.put("/Feedback", (req, res) => {
  const { Rating, Feedback } = req.body;

  // Validating required fields
  if (!Rating || !Feedback) {
    res.status(400).send("All required fields must be provided.");
    return;
  }
  // SQL query for updating feedback
  const updateQuery = `
  UPDATE Feedback
  SET Rating = ?
  WHERE Feedback = ?
  `;

  const values = [No_of_units, Blood_type];

  // Executing the update query
  connection.query(updateQuery, values, (err, results) => {
    if (err) {
      console.error("Error updating feedback: " + err.stack);
      res.status(500).send("Error updating feedback.");
      return;
    }

    res.send("Feedback updated successfully.");
  });
});

// GET route to fetch all feedback
app.get("/feedback", (req, res) => {
  // Query to fetch all feedback from the Feedback table
  connection.query("SELECT * FROM Feedback", (err, results) => {
    if (err) {
      console.error("Error querying the database: " + err.stack);
      res.status(500).send("Error querying the database.");
      return;
    }
    res.send(results);
  });
});

// =================================================================================================================

// Starting the server on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
