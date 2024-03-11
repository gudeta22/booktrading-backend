import express from "express";
import { authLogin, userLogin } from "../Controllers/auth.js";

const router = express.Router();

router.post('/login' ,  userLogin);

router.get('/authlogin' , authLogin)

export default router;