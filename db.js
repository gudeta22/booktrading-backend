import mysql from 'mysql'



export const db = mysql.createConnection({
  host: "localhost", // Assuming MySQL server is running on localhost
  user: "root", // Default MySQL username for XAMPP
  password: "", // Default MySQL password for XAMPP (empty string)
  database: "bookstore", // Name of the database to connect to
});

// Connect to the database

