import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//user registration function
export const userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  if ( !email || !password) {
    return res.status(400).send("invalid email and password");
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 3); // 10 is the number of salt rounds

    // Insert the user data into the database
    const sql = `INSERT INTO userRegisters (fullName , email, password) VALUES (?, ? , ?)`;
    db.query(sql, [fullName, email, hashedPassword], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }

      return res
        .status(200)
        .json({ fullName: fullName, email: email, password: hashedPassword });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).send("Internal Server Error");
  }
};
export const userLogin = (req, res) => {
  const { email, password } = req.body;
 

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  // Query the database to check if the user existlocalhost:3005/api/auth/registers with the provided email
  const sql = `SELECT * FROM userRegisters WHERE email = ?`;

  db.query(sql, [email], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Internal Server Error");
    }

    // Check if any user matched the provided email
    if (results.length === 0) {
      return res.status(401).send("Invalid email or password for this.");
    }
    

    const user = results[0];
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, password: user.password },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    // Send the token in the response
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: `Login successful. Redirecting...`,
      user_id: user.id,
      email: user.email,
      password: user.password,
    });
  });
};
export const authLogin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export const userAuthorized = (req, res) => {
  return res.status(200).send({ message: "You are authorized!" });
};


