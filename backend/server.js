// run this code with `node server.js`

const express = require("express");
const mysql = require("mysql2");

const app = express();

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
    console.error("Error connecting to database: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

// this is the api route
// to make a GET u do app.get
// to do a POST u do app.post
// use postman to verify integrity of the api's
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error querying database: " + err.stack);
      res.status(500).send("Error querying database.");
      return;
    }

    res.send(results);
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
