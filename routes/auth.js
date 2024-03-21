import express from "express";
import { authLogin, userLogin, userLogout } from "../Controllers/auth.js";


const router = express.Router();

router.post('/login' ,  userLogin);

router.post("/logout" , userLogout)
router.get('/authlogin' , authLogin)

export default router;