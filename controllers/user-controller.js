import { UserService } from "../services/user-service.js";

export class UserController {
  static async registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
      const newUser = await UserService.registerUser(name, email, password);
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error in registration:", error);
      res.status(500).json({ message: error.message });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const userToken = await UserService.loginUser(email, password);
      res.json({ userToken });
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserProfile(req, res) {
    const email = req.user.email;

    try {
      const user = await UserService.getUserProfile(email);
      res.json({ profile: user });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: error.message });
    }
  }
}
