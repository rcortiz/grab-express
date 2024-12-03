const userService = require("../services/userService");

const userController = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const newUser = await userService.registerUser(name, email, password);
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const userToken = await userService.loginUser(email, password);
      res.json({ userToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  getUserProfile: async (req, res) => {
    // console.log(req.user);
    const email = req.user.email; // Assuming the email is stored in the token (JWT)
    console.log(email);

    try {
      const user = await userService.getUserProfile(email);
      res.json({ profile: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
