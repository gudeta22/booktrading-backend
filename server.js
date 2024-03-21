// Import the Express framework
import express from "express";
import { db } from "./db.js";
import authRouth from "./routes/auth.js";
import createPost from "./routes/post.js";

// import multer from "multer";
import path from 'path';
import cors from "cors";
import userRegister from "./routes/register.js";
// import { editPost } from "./Controllers/post.js";
const PORT =  4002;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const currentDir = process.cwd();
app.use("/image", express.static(path.join(currentDir, "upload")));
app.use(express.json());


app.use("/api/auth", authRouth);
app.use("/api/posts" , createPost);
// app.use("/api/posts/update/:id" , editPost)
app.use("/api", userRegister);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  db.connect((error) => {
    if (error) {
      console.error("Error connecting to the database:", error);
      return;
    }
    console.log("Connected to the database.");
  });
});


console.log()
