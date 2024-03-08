
import { db } from "../db.js";


//user registration function
export const userRegister = (req, res) => {
//   const { email, password } = req.body;
 const email = "gbteshite6195@gmail.com"
 const password = "1245"


  if (!email || !password) {
    return res.status(400).send("email, password  are required.");
  }

  const sql = `INSERT INTO userRegisters (email, password) VALUES (?, ?)`;
  db.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Internal Server Error");
    }

    return res.status(200).send("user registered successfully");
  });
};

//user login function
export const userLogin = (req, res) => {
  // const { email, password } = req.body;
  const email = "gbteshite@gmail.com"
  const password ="12345"

  // Query the database to check if the user exists with the provided email and password
  const sql = `SELECT * FROM userRegisters WHERE email = ? AND password = ?`;
  db.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Internal Server Error");
    }

    // Check if any user matched the provided credentials
    if (results.length === 0) {
      return res.status(401).send("Invalid email or password.");
    }

    // If a user with matching credentials is found, send a success message
    return res.status(200).send("Login successful");
  });
};

