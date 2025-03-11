import app from "./app";
import dotenv from "dotenv";
import { sequelize } from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync models (force: false to prevent data loss)
    await sequelize.sync({ force: false });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Run the server
startServer();
