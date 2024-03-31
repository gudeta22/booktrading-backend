import { db } from "../db.js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }
    try {
        // Query the database to check if the user exists with the provided email
        const sql = `SELECT * FROM userRegisters WHERE email = ?`;
        db.query(sql, [email], async (error, results) => {
            if (error) {
                console.error("Error executing the query:", error);
                return res.status(500).send("Internal Server Error");
            }
            // Check if any user matched the provided email
            if (results.length === 0) {
                return res.status(401).send("Invalid email or password.");
            }
            const user = results[0];
            // Compare the provided password with the hashed password from the database
            // You should use bcrypt.compare() for secure password comparison, but for simplicity, we'll skip it here
            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.SECRET_TOKEN,
                { expiresIn: "1s" }
            );
            // Send the token in the response cookies
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" }); // Adjust options as per your requirements
            
            // Send response indicating successful login
            res.status(200).json({
                message: `Login successful.`,
                redirectUrl: "/dashboard", // Change this to the desired redirect URL
            });
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).send("Internal Server Error");
    }
};
export const userLogout = (req, res) => {
  // Assuming you're using JWT tokens stored in cookies
  res.clearCookie("token"); // Clears the token cookie
  // You can also choose to invalidate the token on the server-side
  // depending on your application's requirements, for example, by adding it to a blacklist
  res.status(200).json({
    message: "Logout successful.",
    redirectUrl: "/login", // Redirect to login page after logout
  });
};
