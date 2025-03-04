import express from "express";
import UserController from "../controllers/user-controller.js";
import { protect } from "../middleware/authMiddleware.js";

export const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/register", userController.registerUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.get("/profile", protect, userController.getUserProfile);
