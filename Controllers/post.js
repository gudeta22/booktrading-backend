
import {db } from '../db.js'

export const createPost = async (req, res) => {
//   const { title, content, author, thumbnail } = req.body;
  if (!title || !content || !author || !thumbnail) {
    return res.status(400).send("Title, content, author, and thumbnail are required");
  }

  try {
    // Insert the post data into the database
    const sql = `INSERT INTO posts (title, content, author, thumbnail) VALUES (?, ?, ?, ?)`;
    db.query(sql, [title, content, author, thumbnail], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }

      return res.status(201).json({ title:title, content:content, author:author, thumbnail:thumbnail });
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