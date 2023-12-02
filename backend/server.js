// Import required modules
const express = require("express");
const mysql = require("mysql2");

// Create an Express application
const app = express();

// Set up a MySQL database connection configuration
const connection = mysql.createConnection({
  // Database host
  host: "localhost",
  // Database user
  user: "root",
  // Database password
  password: "sZ10O84<",
  // Database port
  database: "Test",
  // Authentication method
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("sZ10O84<"),
  },
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

// Define an API route for handling GET requests to "/users"
app.get("/users", (req, res) => {
  // Execute a SELECT query on the "users" table
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      // Handle database query error
      console.error("Error querying database: " + err.stack);
      res.status(500).send("Error querying database.");
      return;
    }

    // Send the query results as the response
    res.send(results);
  });
});

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
