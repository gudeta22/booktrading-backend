import { db } from "../db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
//user registration function
export const userRegister = async (req, res) => {
    // const { email, password } = req.body;
   const email = "gb@gmail.com"
   const password = "2323"

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Insert the user data into the database
        const sql = `INSERT INTO userRegisters (email, password) VALUES (?, ?)`;
        db.query(sql, [email, hashedPassword], (error, results) => {
            if (error) {
                console.error("Error executing the query:", error);
                return res.status(500).send("Internal Server Error");
            }

            return res.status(200).send("User registered successfully");
        });
    } catch (error) {
        console.error("Error hashing password:", error);
        return res.status(500).send("Internal Server Error");
    }
};
export const userLogin = (req, res) => {
    // const { email, password } = req.body;
   const email = "gb@gmail.com"
   const password = "2323"

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }
   

    // Query the database to check if the user exists with the provided email
    const sql = `SELECT * FROM userRegisters WHERE email = ?`;

    db.query(sql, [email], (error, results) => {
        if (error) {
            console.error("Error executing the query:", error);
            return res.status(500).send("Internal Server Error");
        } 

        // Check if any user matched the provided email
        if (results.length === 0) {
            return res.status(401).send("Invalid email or password fothis.");
        }
        const user = results[0];
         // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email , password:user.password },
             process.env.SECRET_TOKEN , { expiresIn: '1h' });

        // Send the token in the response
        return res.status(200).json({ token });
         
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

export const protectedRouteExample = (req, res) => {
    return res.status(200).send({ message: "You are authorized!" });
};

// Middleware to check if the user is logged in

// Controller for posting books
// export const postBook = (req, res) => {
//     const { title, author, price } = req.body;

//     if (!title || !author || !price) {
//         return res.status(400).json({ error: "Title, author, and price are required." });
//     }

//     // Get the user ID from the authenticated user (assuming it's stored in req.user)
//     const userId = req.user.id;

//     // Insert the book information into the database
//     const insertSql = `INSERT INTO books (title, author, price, user_id) VALUES (?, ?, ?, ?)`;

//     db.query(insertSql, [title, author, price, userId], (error, results) => {
//         if (error) {
//             console.error("Error executing the query:", error);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }

//         // Book successfully posted
//         return res.status(201).json({ message: "Book posted successfully", bookId: results.insertId });
//     });
// };

// // Example route with authentication middleware and book posting functionality
// app.post('/api/postBook', requireLogin, postBook);
