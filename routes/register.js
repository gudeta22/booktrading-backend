import express from "express";
import { userRegister } from "../Controllers/register.js";

const router = express.Router();

router.post("/register" , userRegister);



export default router