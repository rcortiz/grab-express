const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BaseService = require("./base-service");

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  async registerUser(name, email, password) {
    try {
      const existingUser = await this.findByField("email", email);

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.create({
        name,
        email,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      console.error("Error in creating user", error);
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const user = await this.findByField("email", email);
      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      console.error("Error in logging user", error);
      throw error;
    }
  }

  async getUserProfile(email) {
    try {
      const user = await this.findByField("email", email);
      if (!user) throw new Error("User not found");

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
