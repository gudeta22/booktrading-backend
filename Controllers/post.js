import { db } from "../db.js";

// Set up multer storage for file uploads (images and PDFs)
export const createPost = async (req, res) => {
  const { title, author, price, content } = req.body;
  // const imageName = req.files?.image?.[0]?.filename;
  const imageName = req.files['image'] ? req.files['image'][0].filename : null;
    const pdf = req.files['pdf'] ? req.files['pdf'][0].filename : null;

  if (!title || !price || !author || !content || (!imageName && !pdf)) {
    return res.status(400).send("All inputs are required, including at least one file (image or PDF).");
  }

  try {
    // Insert the post data into the database
    const sql = `INSERT INTO posts (image, pdf, title, author, price, content) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [imageName, pdf, title, author, price, content],
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(201).json({ image: imageName, pdf: pdf, title, author, price, content });
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
  const fullUrl = `${protocol}://${hostname}:${port}/`;

  try {
    // Fetch posts from the database
    const sql = `SELECT * FROM posts ORDER BY timestamp DESC`;
    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }
      const data = results.map((post) => {
        const singleData = { ...post };
        if (singleData.image) {
          singleData.image = fullUrl + "image/" + singleData.image;
        }
        if (singleData.pdf) {
          singleData.pdf = fullUrl + "pdf/" + singleData.pdf;
        }
        return singleData;
      });
      res.json(data);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// Edit Post
export const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;
  const imageName = req.files?.image?.[0]?.filename;
 const pdf = req.files['pdf'] ? req.files['pdf'][0].filename : null;

  try {
    let sql = `UPDATE posts SET`;
    const values = [];

    if (imageName) {
      sql += ` image=?,`;
      values.push(imageName);
    }
    if (pdf) {
      sql += ` pdf=?,`;
      values.push(pdf);
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
        ...(pdf && { pdf: pdf }),
        ...(title && { title }),
        ...(author && { author }),
        ...(price && { price }),
      };

      res.status(200).json(updatedFields);
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// Delete Posts
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `DELETE FROM posts WHERE id=?`;
    db.query(sql, [id], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        return res.status(500).send("Internal Server Error");
      }
      return res.status(200).json({ message: `Post with ID ${id} deleted successfully` });
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).send("Internal Server Error");
  }
};
