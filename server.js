// Import the Express framework
import express from "express";
import { db } from "./db.js";
import authRouth from "./routes/auth.js";
import  createPost  from "./routes/post.js";
import multer from "multer";
import cors from 'cors'
import  userRegister from "./routes/register.js";
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())



// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Uploads folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Keep the original file name
  }
})


// Initialize multer with the storage options
const upload = multer({ storage: storage })
app.use("/api/auth", authRouth);
app.use("/api/posts" ,upload.single('image'),  createPost)
app.use("/api" , userRegister)
// app.use("/api/" , viewPosts)

// app.use("/", (req, res) => {
//   res.json("hello there");
// });

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
