import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
    return res.status(200).send({
        message:"Welcome authenticated user",
        user:req.user
    })
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token."
    });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }


  try {
    const sql = `SELECT * FROM userRegisters WHERE email = ? AND password = ?`;
    db.query(sql, [email, password], async (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid email or password.");
      }

      const user = results[0];
      const token = jwt.sign(
        { userId: user.id, email: user.email , user:user.password },
        process.env.SECRET_TOKEN,
        { expiresIn: "1h" } // Set token expiration time as per your requirement
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(200).json({
        message: `Login successful ...Redirect`,
        email:email.email,
        password:password.password,
    });
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const userLogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logout successful" });
};
