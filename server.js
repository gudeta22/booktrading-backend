// Import the Express framework
import express from "express";
import { db } from "./db.js";
import authRouth from "./routes/auth.js";
import  createPost  from "./routes/post.js";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRouth);
app.use("/api/posts" , createPost)

app.use("/", (req, res) => {
  res.json("hello there");
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
