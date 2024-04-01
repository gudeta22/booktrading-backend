import express from "express";
import {authenticateUser, userLogin, userLogout } from "../Controllers/auth.js";


const router = express.Router();

router.post('/login' ,  userLogin , authenticateUser);
router.post("/logout" , authenticateUser, userLogout);
// router.get('/authlogin' , authLogin, userAuthorized )

export default router;