import { db } from "../db.js";

// Set up multer storage for image uploads

export const createPost = async (req, res) => {
  const { title, author, price, image , content } = req.body;
  const imageName = req.file.filename;

  console.log(title, author, price, imageName , content);
  console.log(imageName);

  if (!title || !price || !author || !imageName || !content) {
    return res.status(400).send("inputes are required");
  }

  try {
    // Insert the post data into the database
    const sql = `INSERT INTO posts (image , title , author, price , content) VALUES (?, ?, ?, ? , ?)`;

    db.query(sql, [imageName, title, author, price , content], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);

        return res.status(201).json({ image, title, author, price , content});
      }

      return res.status(201).json({ image, title, author, price , content });
    });
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
  // console.log("Full URL:", fullUrl);
  // const fullUrl = `localhost:4003/`;

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
      console.log(results);
      console.log(data);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).send("Internal Server Error");
  }
};

//edit Post
// export const editPost = async (req, res) => {
//   const { id } = req.params;
//   const { title, author, price, image } = req.body;
//   const imageName = req.file.filename;

//   if (!title || !price || !author || !imageName) {
//     return res.status(400).send("All fields are required");
//   }

//   try {
//     // Update the post data in the database
//     const sql = `UPDATE posts SET image=?, title=?, author=?, price=? WHERE id=?`;
//     db.query(sql, [imageName, title, author, price, id], (error, results) => {
//       if (error) {
//         console.error("Error executing the query:", error);
//         return res.status(500).send("Internal Server Error");
//       }

//       return res.status(200).json({ id, image, title, author, price });
//     });
//   } catch (error) {
//     console.error("Error editing post:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };

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
