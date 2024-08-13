import express from "express";
import { authenticateUser, userLogin, userLogout } from "../Controllers/auth.js";

const router = express.Router();

// Existing routes
router.post('/login', userLogin, authenticateUser );
router.post("/logout", userLogout);

// New route to get user info
// router.get("/user/info", authenticateUser, ); // Ensure the user is authenticated

export default router;



