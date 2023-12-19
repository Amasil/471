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

// // Define requireAuth middleware
// const requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     res.redirect("/donor-login");
//     return;
//   }

//   jwt.verify(token, "your-secret-key", (err, decodedToken) => {
//     if (err) {
//       console.log(err.message);
//       res.redirect("/donor-login");
//     } else {
//       console.log(decodedToken);
//       next();
//     }
//   });
// };
// =================================================================================================================

// Establishing a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sZ10O84<", // Consider using environment variables for sensitive information
  database: "Website",
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

  try {
    // Hash the password with automatically generated salt
    const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the cost factor, you can adjust it

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
        User_Type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    ];

    // Executing the insert query
    connection.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error inserting into the database: " + err.stack);
        res.status(500).send("Error inserting into the database.");
        return;
      }

      // Retrieve the User_ID from the results
      const User_ID = results.insertId;

      if (User_Type == "Donor") {
        const insertPublic = `
          INSERT INTO GENERAL_PUBLIC (
            Public_ID,
            Blood_Type
          ) VALUES (?, ?)
        `;
        const publicValues = [User_ID, Blood_Group];

        connection.query(insertPublic, publicValues, (err, results) => {
          if (err) {
            console.error("Error inserting into the database: " + err.stack);
            res.status(500).send("Error inserting into the database.");
            return;
          }

          const insertDonor = `
            INSERT INTO DONOR (
              Donor_ID,
              No_of_Donations
            ) VALUES (?, ?)
          `;
          const donorValues = [User_ID, 2];

          connection.query(insertDonor, donorValues, (err, results) => {
            if (err) {
              console.error("Error inserting into the database: " + err.stack);
              res.status(500).send("Error inserting into the database.");
              return;
            }

            // Send a single response at the end
            res.send("Donor inserted successfully.");
          });
        });
      } else if (User_Type == "Recipient") {
        const insertPublic = `
          INSERT INTO GENERAL_PUBLIC (
            Public_ID,
            Blood_Type
          ) VALUES (?, ?)
        `;
        const publicValues = [User_ID, Blood_Group];

        connection.query(insertPublic, publicValues, (err, results) => {
          if (err) {
            console.error("Error inserting into the database: " + err.stack);
            res.status(500).send("Error inserting into the database.");
            return;
          }

          const insertRecipient = `
            INSERT INTO RECIPIENT (
              Recipient_ID,
              Diagnosis
            ) VALUES (?, ?)
          `;
          const recipientValues = [User_ID, "Need blood help"];

          connection.query(insertRecipient, recipientValues, (err, results) => {
            if (err) {
              console.error("Error inserting into the database: " + err.stack);
              res.status(500).send("Error inserting into the database.");
              return;
            }

            // Send a single response at the end
            res.send("Recipient inserted successfully.");
          });
        });
      } else if (User_Type == "Doctor") {
        const insertStaff = `
          INSERT INTO MEDICAL_STAFF (
            Medical_ID,
            Degree,
            Department_ID,
            Alert_ID
          ) VALUES (?, ?, ?, ?)
        `;
        const staffValues = [User_ID, "BioScience", 1, 2];

        connection.query(insertStaff, staffValues, (err, results) => {
          if (err) {
            console.error("Error inserting into the database: " + err.stack);
            res.status(500).send("Error inserting into the database.");
            return;
          }

          // Send a single response at the end
          res.send("Staff inserted successfully.");
        });
      } else if (User_Type == "Admin") {
        const insertStaff = `
          INSERT INTO MEDICAL_STAFF (
            Medical_ID,
            Degree,
            Department_ID,
            Alert_ID
          ) VALUES (?, ?, ?, ?)
        `;
        const staffValues = [User_ID, "Admin", 5, 3];

        connection.query(insertStaff, staffValues, (err, results) => {
          if (err) {
            console.error("Error inserting into the database: " + err.stack);
            res.status(500).send("Error inserting into the database.");
            return;
          }

          // Send a single response at the end
          res.send("Staff inserted successfully.");
        });
      } else {
        // Send a single response at the end
        res.send("User inserted successfully.");
      }
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

  connection.query(deleteQuery, [userId], async (err, results) => {
    if (err) {
      console.error("Error deleting from the database: " + err.stack);
      res.status(500).send("Error deleting from the database.");
      return;
    }

    // Checking if the user was found and deleted
    if (results.affectedRows === 0) {
      res.status(404).send("User not found.");
    } else {
      // Also delete associated records in other tables
      try {
        const deletePublicQuery = `
          DELETE FROM GENERAL_PUBLIC
          WHERE Public_ID = ?
        `;
        const deleteDonorQuery = `
          DELETE FROM DONOR
          WHERE Donor_ID = ?
        `;
        const deleteRecipientQuery = `
          DELETE FROM RECIPIENT
          WHERE Recipient_ID = ?
        `;
        const deleteStaffQuery = `
          DELETE FROM MEDICAL_STAFF
          WHERE Medical_ID = ?
        `;

        // Execute the deletion queries for associated records
        await Promise.all([
          connection.query(deletePublicQuery, [userId]),
          connection.query(deleteDonorQuery, [userId]),
          connection.query(deleteRecipientQuery, [userId]),
          connection.query(deleteStaffQuery, [userId]),
        ]);

        res.send("User and associated records deleted successfully.");
      } catch (error) {
        console.error("Error deleting associated records: " + error.stack);
        res.status(500).send("Error deleting associated records.");
      }
    }
  });
});
// =================================================================================================================

// POST route for user login
app.post("/login", async (req, res) => {
  const { username, password, userType } = req.body;

  // Query the database to get the user's stored hashed password and user type
  const selectQuery = `
    SELECT User_ID, Password, User_Type
    FROM User
    WHERE Username = ? AND User_Type = ?
  `;

  connection.query(selectQuery, [username, userType], async (err, results) => {
    if (err) {
      console.error("Error querying the database: " + err.stack);
      res.status(500).send("Error querying the database.");
      return;
    }

    if (results.length === 0) {
      // User not found or user type mismatch
      res.status(401).send("Invalid credentials.");
      return;
    }

    const {
      User_ID,
      Password: storedPassword,
      User_Type: storedUserType,
    } = results[0];

    try {
      // Use bcrypt.compare to compare entered password with stored hashed password
      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (passwordMatch) {
        const token = jwt.sign(
          { user_id: User_ID, username, userType: storedUserType },
          "your-secret-key",
          {
            expiresIn: "1h", // Token expires in 1 hour
          }
        );

        res.json({ token, userId: User_ID }); // Include user ID in the response
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

app.post("/initializeDatabase", async (req, res) => {
  try {
    // Perform SQL INSERT operations to initialize the database
    const initialData = [
      { Hospital_ID: 1, No_of_units: 0, Blood_type: "A+" },
      { Hospital_ID: 1, No_of_units: 0, Blood_type: "A-" },
      { Hospital_ID: 1, No_of_units: 0, Blood_type: "B+" },
      { Hospital_ID: 1, No_of_units: 0, Blood_type: "B-" },
      { Hospital_ID: 1, No_of_units: 0, Blood_type: "AB+" },
      { Hospital_ID: 1, No_of_units: 0, Blood_type: "AB-" },
      { Hospital_ID: 1, No_of_units: 0, Blood_type: "O+" },
      { Hospital_ID: 1, No_of_units: 0, Blood_type: "O-" },
    ];

    for (const { Hospital_ID, No_of_units, Blood_type } of initialData) {
      connection.query(
        "INSERT INTO Inventory (Hospital_ID, No_of_units, Blood_type) VALUES (?, ?, ?)",
        [Hospital_ID, No_of_units, Blood_type]
      );
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error initializing the database:", error);
    res.status(500).send("Internal Server Error");
  }
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
// API endpoint to handle feedback submissions
app.post("/submit-feedback", (req, res) => {
  const { Rating, Feedback } = req.body;

  const insertQuery = "INSERT INTO Feedback (Rating, Feedback) VALUES (?, ?)";
  connection.query(insertQuery, [Rating, Feedback], (err, results) => {
    if (err) {
      console.error("Error inserting feedback: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Feedback inserted with ID " + results.insertId);
      res.status(200).json({ message: "Feedback submitted successfully" });
    }
  });
});
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

// API endpoint to fetch all feedback
app.get("/get-feedback", (req, res) => {
  const selectQuery = "SELECT * FROM Feedback";
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Error fetching feedback: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

// =================================================================================================================
// API endpoint to handle donation appointment submissions
app.post("/schedule-appointment", (req, res) => {
  const { USER_ID, Status, Appointment_Date, Appointment_Time } = req.body;

  const insertQuery =
    "INSERT INTO DONATION_APPOINTMENT (USER_ID, Status, Appointment_Date, Appointment_Time) VALUES (?, ?, ?, ?)";

  connection.query(
    insertQuery,
    [USER_ID, Status, Appointment_Date, Appointment_Time],
    (err, results) => {
      if (err) {
        console.error("Error scheduling appointment:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const insertedAppointmentId = results.insertId;
      console.log("Appointment scheduled with ID:", insertedAppointmentId);
      res.status(200).json({
        message: "Appointment scheduled successfully",
        Appointment_ID: insertedAppointmentId,
      });
    }
  );
});

// Define the route to get all appointments for a specific user
app.get("/get-appointments/:userId", (req, res) => {
  const userId = req.params.userId;

  // Query to retrieve appointments for the specified user
  const sql = `SELECT * FROM DONATION_APPOINTMENT WHERE USER_ID = ?`;

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});
// =================================================================================================================

// Starting the server on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
