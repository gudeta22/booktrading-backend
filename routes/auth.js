import express from "express";
import {
  userLogin,
  userRegister
} from "../Controllers/auth.js";


const router = express.Router();

router.get("/login" , userLogin)
router.get("/register", userRegister);

export default router;
