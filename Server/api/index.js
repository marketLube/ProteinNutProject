import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

// Load the .env file from the Server directory
dotenv.config();

const port = process.env.PORT || 3000;
const Db = process.env.MONGO_CONNECTION_STR;

// Check if the connection string is defined
if (!Db) {
  console.error(
    "MongoDB connection string is not defined. Please check your .env file."
  );
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(Db)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

// Start the server
app.listen(port, () => console.log("Server running on Port " + port));
