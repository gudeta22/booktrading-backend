import { db } from '../db.js';
import bcrypt from 'bcrypt';

export const userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    //  if (!fullName || !email || !password) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }
    //  const salt = await bcrypt.genSalt(10); 
    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert the hashed password into the database
    const sql = `INSERT INTO userRegisters (fullName, email, password) VALUES (?, ?, ?)`;

    db.query(sql, [fullName, email, password], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }

      return res.status(200).json({ fullName, email , password });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).send("Internal Server Error");
  }
};
