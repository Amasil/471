// Importing required modules
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Creating an Express application
const app = express();

app.use(bodyParser.json());
app.use(cors());

// =================================================================================================================

// Establishing a connection to the MySQL database
// In a real world application, these would be stored in environment variables.

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sZ10O84<",
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
  // Query to fetch all users with degree and department information
  const query = `
    SELECT U.*, MS.Degree, MS.Department_ID
    FROM User U
    LEFT JOIN MEDICAL_STAFF MS ON U.User_ID = MS.Medical_ID
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying the database: " + err.stack);
      res.status(500).send("Error querying the database.");
      return;
    }

    res.send(results);
  });
});

// Update user information
app.put('/user/:id', async (req, res) => {
  const userId = req.params.id;
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
    Degree,
    Department_ID,
  } = req.body;

  try {
    // Check if there are changes to update
    if (Object.keys(req.body).length > 0) {
      // Include User_Type in the payload
      const updatedInfoWithUserType = { ...req.body, User_Type: req.body.User_Type };

      // If the user type is "Doctor," include Degree and Department_ID in the payload
      const updatedInfoWithDoctorFields =
        req.body.User_Type === 'Doctor'
          ? { ...updatedInfoWithUserType, Degree, Department_ID }
          : updatedInfoWithUserType;

      // Hash the password if provided
      if (Password !== undefined && Password !== '') {
        const hashedPassword = await bcrypt.hash(Password, 10);
        updatedInfoWithDoctorFields.Password = hashedPassword;
      }

      // Build the update query dynamically based on non-empty fields
      const updateFields = {};
      if (First_Name !== undefined && First_Name !== '') updateFields.First_Name = First_Name;
      if (Middle_Name !== undefined && Middle_Name !== '') updateFields.Middle_Name = Middle_Name;
      if (Last_Name !== undefined && Last_Name !== '') updateFields.Last_Name = Last_Name;
      if (Username !== undefined && Username !== '') updateFields.Username = Username;
      if (Email !== undefined && Email !== '') updateFields.Email = Email;
      if (Phone_No !== undefined && Phone_No !== '') updateFields.Phone_No = Phone_No;
      if (Blood_Group !== undefined && Blood_Group !== '') updateFields.Blood_Group = Blood_Group;
      if (Last_Donation_Date !== undefined && Last_Donation_Date !== '') updateFields.Last_Donation_Date = Last_Donation_Date;
      if (Degree !== undefined && Degree !== '') updateFields.Degree = Degree;
      if (Department_ID !== undefined && Department_ID !== '') updateFields.Department_ID = Department_ID;
      if (User_Type !== undefined && User_Type !== '') updateFields.User_Type = User_Type;

      // Retrieve Department name based on Department_ID
      const [departmentRows, _] = connection.query('SELECT Department_Name FROM DEPARTMENT WHERE Department_ID = ?', [
        Department_ID,
      ]);

      if (departmentRows.length === 0) {
        return res.status(400).json({ message: 'Invalid Department_ID' });
      }

      const departmentName = departmentRows[0].Department_Name;
      updateFields.Medical_Staff = departmentName;

      // Check if there are fields to update
      if (Object.keys(updateFields).length > 0) {
        // Update user information in the database
        connection.query('UPDATE User SET ? WHERE User_ID = ?', [updateFields, userId]);
        console.log('User info updated successfully!');
      } else {
        console.log('No changes to update.');
        res.status(400).json({ message: 'No changes to update.' });
      }
    } else {
      console.log('No changes to update.');
      res.status(400).json({ message: 'No changes to update.' });
    }
  } catch (err) {
    console.error('Error updating user info:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST route to insert a new user
app.post("/user", async (req, res) => {
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
    Degree,
    Department_ID,
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
      } else if (User_Type == "Doctor" || "Admin") {
        const insertStaff = `
          INSERT INTO MEDICAL_STAFF (
            Medical_ID,
            Degree,
            Department_ID,
            Alert_ID
          ) VALUES (?, ?, ?, ?)
        `;
        const staffValues = [User_ID, Degree, Department_ID, 2];

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

// DELETE route to delete a user and associated records
app.delete("/user", async (req, res) => {
  const userId = req.body.User_ID;

  // Validating required fields
  if (!userId) {
    res.status(400).send("User ID must be provided in the request body.");
    return;
  }

  try {
    // Delete associated records first
    // Delete from FEEDBACK table
    connection.query("DELETE FROM FEEDBACK WHERE User_ID = ?", [userId]);
    // Delete from DONATION_APPOINTMENT table
    connection.query("DELETE FROM DONATION_APPOINTMENT WHERE USER_ID = ?", [
      userId,
    ]);
    // Delete from DONOR table
    connection.query("DELETE FROM DONOR WHERE Donor_ID = ?", [userId]);
    // Delete from RECIPIENT table
    connection.query("DELETE FROM RECIPIENT WHERE Recipient_ID = ?", [userId]);
    // Delete from MEDICAL_STAFF table
    connection.query("DELETE FROM MEDICAL_STAFF WHERE Medical_ID = ?", [
      userId,
    ]);
    // Delete from GENERAL_PUBLIC table
    connection.query("DELETE FROM GENERAL_PUBLIC WHERE Public_ID = ?", [
      userId,
    ]);
    // Delete from USER table
    const deleteUserQuery = "DELETE FROM User WHERE User_ID = ?";
    const deleteResult = connection.query(deleteUserQuery, [userId]);

    // Checking if the user was found and deleted
    if (deleteResult.affectedRows === 0) {
      res.status(404).send("User not found.");
    } else {
      res.send("User and associated records deleted successfully.");
    }
  } catch (error) {
    console.error("Error deleting user and associated records: " + error.stack);
    res.status(500).send("Error deleting user and associated records.");
  }
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

/// Endpoint to handle alert submissions
app.post("/sendAlert", (req, res) => {
  const { Blood_type, Alert_timestamp } = req.body; // Destructure the values

  const insertQuery = `
    INSERT INTO EMERGENCY_ALERT (Alert_timestamp, Blood_type, Hospital_ID, Medical_ID)
    VALUES (STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.%fZ'), ?, ?, ?)
    `;

  // Assign unique values for Alert_ID, Alert_timestamp, Hospital_ID, and Medical_ID
  const values = [
    // Assign unique values for the following fields (modify as needed)
    Alert_timestamp,
    Blood_type,
    1,
    1,
  ];

  // Execute the query (modify as needed based on your database library)
  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error("Error inserting alert: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Alert inserted with ID " + results.insertId);
      res.status(200).json({ message: "Alert submitted successfully" });
    }
  });
});

// =================================================================================================================
// API endpoint to handle feedback submissions
app.post("/submit-feedback", (req, res) => {
  const { User_ID, Feedback_Date, Details, Comment, Rating } = req.body;

  const insertQuery = `
    INSERT INTO FEEDBACK (User_ID, Feedback_Date, Details, Comment, Rating)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [User_ID, Feedback_Date, Details, Comment, Rating];

  connection.query(insertQuery, values, (err, results) => {
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
app.put("/update-feedback/:feedbackId", (req, res) => {
  const feedbackId = req.params.feedbackId;
  const { Rating, Comment } = req.body;

  // Validating required fields
  if (!Rating || !Comment) {
    res.status(400).send("All required fields must be provided.");
    return;
  }

  // SQL query for updating feedback
  const updateQuery = `
    UPDATE FEEDBACK
    SET Rating = ?, Comment = ?
    WHERE Feedback_ID = ?
  `;

  const values = [Rating, Comment, feedbackId];

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

// API endpoint to fetch all feedback with username instead of user ID
app.get("/get-feedback", (req, res) => {
  const selectQuery = `
    SELECT
      F.Feedback_ID,
      F.User_ID,
      F.Feedback_Date,
      U.Username,
      F.Comment,
      F.Rating
    FROM
      FEEDBACK F
    JOIN
      USER U ON F.User_ID = U.User_ID
  `;

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

  // Validate input data
  if (!USER_ID || !Status || !Appointment_Date || !Appointment_Time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

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

      res.status(201).json({
        message: "Appointment scheduled successfully",
        appointment: {
          Appointment_ID: insertedAppointmentId,
          USER_ID,
          Status,
          Appointment_Date,
          Appointment_Time,
        },
      });
    }
  );
});



// Define the route to get all appointments for a specific user
app.get("/get-appointments/:userId", (req, res) => {
  const userId = req.params.userId;

  // Query to retrieve appointments for the specified user
  const sql = `SELECT Appointment_ID, Status, Appointment_Date, Appointment_Time FROM DONATION_APPOINTMENT WHERE USER_ID = ?`;

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

let departmentTableInitialized = false;

if (!departmentTableInitialized) {
  // Hardcoded data for DEPARTMENT table
  const departmentData = [
    {
      Department_ID: 1,
      Department_name: "Cardiology",
      Location: "Hospital Wing A",
      Contact_info: "123-456-7890",
      Emergency_Protocol: "In case of emergency, call 911",
    },
    {
      Department_ID: 2,
      Department_name: "Neurology",
      Location: "Hospital Wing B",
      Contact_info: "987-654-3210",
      Emergency_Protocol: "In case of emergency, call 911",
    },
    {
      Department_ID: 3,
      Department_name: "Orthopedics",
      Location: "Hospital Wing C",
      Contact_info: "555-555-5555",
      Emergency_Protocol: "In case of emergency, call 911",
    },
    {
      Department_ID: 4,
      Department_name: "Radiology",
      Location: "Hospital Wing D",
      Contact_info: "111-222-3333",
      Emergency_Protocol: "In case of emergency, call 911",
    },
    {
      Department_ID: 5,
      Department_name: "Other",
      Location: "Hospital Wing E",
      Contact_info: "999-888-7777",
      Emergency_Protocol: "In case of emergency, call 911",
    },
  ];

  // Initialize DEPARTMENT table with hardcoded data
  const initializeDepartmentTable = () => {
    const insertQuery = `
      INSERT INTO DEPARTMENT (
        Department_name,
        Location,
        Contact_info,
        Emergency_Protocol
      ) VALUES (?, ?, ?, ?)
    `;

    for (const department of departmentData) {
      const values = [
        department.Department_name,
        department.Location,
        department.Contact_info,
        department.Emergency_Protocol,
      ];

      try {
        // Execute the INSERT query
        connection.query(insertQuery, values);
        console.log(
          `Department ${department.Department_name} inserted successfully.`
        );
      } catch (error) {
        console.error(
          `Error inserting department ${department.Department_name}: ${error.stack}`
        );
      }
    }

    // Set the flag after all data is inserted
    departmentTableInitialized = true;
  };
  initializeDepartmentTable();
}

// Starting the server on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
