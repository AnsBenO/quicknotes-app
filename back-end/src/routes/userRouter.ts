// routes/userRoutes.ts
import express from "express";
import {
	getAuthenticatedUser,
	signUp,
	login,
	logout,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.get("/profile", authenticateToken, getAuthenticatedUser);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
