import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const userExists = await checkIfUserExists(email);
    if (userExists) {
      return res.status(400).send("Email is already registered.");
    }
    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    // Insert the hashed password into the database
    const sql = `INSERT INTO userRegisters (fullName, email, password) VALUES (?, ?, ?)`;

    db.query(sql, [fullName, email, password], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }
      // Generate token
      const token = jwt.sign(
        { userId: results.insertId, email },
        process.env.SECRET_TOKEN,
        { expiresIn: "1s" }
      );

      return res.status(200).json({ fullName, email, token ,  password });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).send("Internal Server Error");
  }
};
const checkIfUserExists = async (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT COUNT(*) AS count FROM userRegisters WHERE email = ?`;
    db.query(sql, [email], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return reject(error);
      }
      resolve(results[0].count > 0);
    });
  });
};
