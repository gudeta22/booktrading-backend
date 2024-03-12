// import bcrypt from 'bcrypt';
import {db} from '../db.js'; // Import your database connection

export const userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  
  try {

    //  const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, salt); // 10 is the number of salt rounds

    // Insert the user data into the database
    const sql = `INSERT INTO userRegisters (fullName, email, password) VALUES (?, ?, ?)`;
   
    db.query(sql, [fullName,email, password], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }

      return res.status(200).json({ fullName, email, password });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).send("Internal Server Error");
  }
};
