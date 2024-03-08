// Import the Express framework
import express from 'express'

import { db } from "./db.js";
// const config = require("./config");
import authRouth from './routes/auth.js'

const app = express();
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Create an instance of Express

// Connect to the database
 
app.use("/api/auth" , authRouth )
app.use('/api/auth' , authRouth)

app.use("/", (req, res) => {
  res.json("hello there");
});

// Start the server
app.listen(8801, () => {
  console.log("Server running on port 8800...");
  db.connect((error) => {
    if (error) {
      console.error("Error connecting to the database:", error);
      return;
    }
    console.log("Connected to the database.");
  });
});


