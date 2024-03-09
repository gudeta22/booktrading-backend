import express from "express";
import { createPost, viewPosts } from "../Controllers/post.js";

const router = express.Router();

router.get("/create" , createPost);
router.get("/view" , viewPosts);

export default router