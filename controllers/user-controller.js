import UserService from "../services/user-service.js";

const userService = new UserService();

class UserController {
  registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const newUser = await userService.registerUser(name, email, password);
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error in registration:", error);
      res.status(500).json({ message: error.message });
    }
  };

  loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const userToken = await userService.loginUser(email, password);
      res.json({ userToken });
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ message: error.message });
    }
  };

  getUserProfile = async (req, res) => {
    const email = req.user.email;

    try {
      const user = await userService.getUserProfile(email);
      res.json({ profile: user });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: error.message });
    }
  };
}

export default UserController;
