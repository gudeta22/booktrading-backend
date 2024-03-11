
import {db } from '../db.js'

// Set up multer storage for image uploads


export const createPost = async (req, res) => {
  // const { title, author, price } = req.body;
  // const image = req.file.filename;
   const image= "image3"
    const title = "rich dad poor dad"
   const author = "BUli teshite"
   const price = 1000
  

  if (!title || !price || !author || !image) {
    return res.status(400).send("Title, content, author, and image are required");
  }

  try {
    // Insert the post data into the database
   const sql = `INSERT INTO posts (image, title, author, price) VALUES (?, ?, ?, ?)`;

    db.query(sql, [image, title,author , price], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }

      return res.status(201).json({ image , title , author , price });
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).send("Internal Server Error");
  }
};
export const viewPosts = (req, res) => {
  try {
    // Fetch posts from the database
    const sql = `SELECT * FROM posts`;
    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }

      return res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).send("Internal Server Error");
  }
};