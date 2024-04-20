import { db } from "../db.js";

// Set up multer storage for image uploads
export const createPost = async (req, res) => {
  const { title, author, price, image, content } = req.body;
  const imageName = req.file.filename;
  if (!title || !price || !author || !imageName || !content) {
    return res.status(400).send("inputes are required");
  }
  try {
    // Insert the post data into the database
    const sql = `INSERT INTO posts (image , title , author, price , content) VALUES (?, ?, ?, ? , ?)`;
    db.query(
      sql,
      [imageName, title, author, price, content],
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          return res.status(201).json({ image, title, author, price, content });
        }
        return res.status(201).json({ image, title, author, price, content });
      }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const viewPosts = (req, res) => {
  const protocol = req.protocol;
  const hostname = req.hostname;
  const port = req.get("host").split(":")[1] || "80"; // Extract port from host header or default to 80
  // Construct the full URL
  const fullUrl = `${protocol}://${hostname}:${port}/`;
  try {
    // Fetch posts from the database
    const sql = `SELECT * FROM posts ORDER BY timestamp DESC`;
    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }
      const data = results.map((data) => {
        const singleData = data;
        singleData.image = fullUrl + "image/" + singleData.image;
        return singleData;
      });
      res.json(data);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).send("Internal Server Error");
  }
};


export const usersPost = (req , res) =>{
  const protocol = req.protocol;
  const hostname = req.hostname;
  const port = req.get("host").split(":")[1] || "80"; // Extract port from host header or default to 80
  // Construct the full URL
  const fullUrl = `${protocol}://${hostname}:${port}/`;
  try {
    // Fetch posts from the database
    const sql = `SELECT * FROM posts ORDER BY timestamp DESC`;
    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }
      const data = results.map((data) => {
        const singleData = data;
        singleData.image = fullUrl + "image/" + singleData.image;
        return singleData;
      });
      res.json(data);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).send("Internal Server Error");
  }
}

// edit Post
export const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;
  const imageName = req.file ? req.file.filename : null; // Check if file is provided

  try {
    let sql = `UPDATE posts SET`;
    const values = [];

    if (imageName) {
      sql += ` image=?,`;
      values.push(imageName);
    }
    if (title) {
      sql += ` title=?,`;
      values.push(title);
    }
    if (author) {
      sql += ` author=?,`;
      values.push(author);
    }
    if (price) {
      sql += ` price=?,`;
      values.push(price);
    }
    // Remove trailing comma and add WHERE clause
    sql = sql.slice(0, -1) + ` WHERE id=?`;
    values.push(id);
    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }
      const updatedFields = {
        id,
        ...(imageName && { image: imageName }),
        ...(title && { title }),
        ...(author && { author }),
        ...(price && { price }),
      };

      console.log(updatedFields); // Log the updated fields
      res.status(200).json(updatedFields); // Send the response with updated fields
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).send("Internal Server Error");
  }
};
//Delete Posts
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the post from the database
    const sql = `DELETE FROM posts WHERE id=?`;
    db.query(sql, [id], (error, results) => {
      if (error) {
        console.log("deleted");
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }

      return res
        .status(200)
        .json({ message: `Post with ID ${id} deleted successfully` });

    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).send("Internal Server Error");
  }
};
