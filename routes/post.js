import express from "express";
import { createPost, viewPosts } from "../Controllers/post.js";

const router = express.Router();

router.get("/" , viewPosts);
router.get("/create" ,  createPost);


export default router