import express from "express";
import { authLogin, userLogin, userRegister } from "../Controllers/auth.js";

const router = express.Router();

router.get('/login' , userLogin);
router.get('/register' , userRegister)
router.get('/authlogin' , authLogin)

export default router;