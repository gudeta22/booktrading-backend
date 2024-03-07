// Import the Express framework
const express = require('express');
const mysql = require("mysql2");
const config = require("./config")

const connection = mysql.createConnection({
  host:  config.database.host, // MySQL server hostname
  user: config.database.username,      // MySQL username
  password: config.database.password,      // MySQL password (if any)
  database: config.database.dbName // Name of the database to connect to
}); 

// Create an instance of Express
const app = express();
// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Start the server
app.listen(8800, () => {
 
  console.log("Server running on port 8800...");
 
});

