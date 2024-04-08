import express from "express";
import { userLogin, userLogout } from "../Controllers/auth.js";


const router = express.Router();

router.post('/login' ,  userLogin  );
router.post("/logout" , userLogout);
// router.get('/authlogin' , authLogin, userAuthorized )
// router.post("/checklogin" , authenticateUser);

export default router;