import express from "express";
import { db } from "./db.js";
import authRoute from "./routes/auth.js";
import createPost from "./routes/post.js";
import path from "path";
import cors from "cors";
import userRegister from "./routes/register.js";
const PORT = 4000;
const app = express();
import { fileURLToPath } from 'url';
// Middleware
app.use(cors()); // CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the 'upload' directory under '/image' path
const currentDir = process.cwd();
app.use("/image", express.static(path.join(currentDir, "upload")));

app.use('/pdf', express.static(path.join(__dirname, "upload")));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", createPost);
app.use("/api", userRegister);

// Error Handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

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
