import express from "express";
import { UserController } from "../controllers/user-controller.js";
import { protect } from "../middleware/authMiddleware.js";

export const userRoutes = express.Router();

userRoutes.post("/register", UserController.registerUser);
userRoutes.post("/login", UserController.loginUser);
userRoutes.get("/profile", protect, UserController.getUserProfile);
