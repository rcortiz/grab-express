const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userService = {
  registerUser: async (name, email, password) => {
    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) throw new Error("User already exist");
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  loginUser: async (email, password) => {
    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      // Generate JWT token
      const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getUserProfile: async (userID) => {
    try {
      // Find user by ID
      const user = await User.findByPk(userID);
      if (!user) throw new Error("User not found");
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = userService;
