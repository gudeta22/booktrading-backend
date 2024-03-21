import express from "express";
import { createPost, deletePost,editPost, viewPosts } from "../Controllers/post.js";
import multer from "multer";


const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/"); // Uploads folder where files will be stored
  },
  filename: (req, file, cb) => {
    console.log(file);
    const originalFileName = file.originalname;
    const fileExtension = originalFileName.split(".").pop();

    cb(null, `${Date.now()}.${fileExtension}`); // Keep the original file name
  },
}); // Initialize multer with the storage options
export const upload = multer({ storage: storage });


router.get("/" , viewPosts);
router.delete('/delete/:id' , deletePost)
router.put('/update/:id' ,  editPost)
router.post("/create",upload.single('image'), createPost);


export default router