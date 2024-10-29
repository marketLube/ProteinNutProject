import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import productsRoute from "./Routes/productsRoute.js";
import AppError from "./Utilities/appError.js";
import globalErrorHandler from "./Utilities/globalErrorhandler.js";
import cartRoutes from "./Routes/cartRoutes.js";
import userRoute from "./Routes/usersRoute.js";
import couponRoutes from "./Routes/couponRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";
import orderRoute from "./Routes/orderRoute.js";

const app = express();

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve the path to the Client dist folder
const clientDistPath = path.resolve(__dirname, "..", "..", "Client", "dist");

// Application Level Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both Vite dev servers
    credentials: true, // If using cookies for authentication
  })
);

app.use(cookieParser());
app.use(express.json());



// API routes
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupons", couponRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders", orderRoute);

// Check if the dist folder exists
if (fs.existsSync(clientDistPath)) {
  // Serve static files from the React app
  app.use(express.static(clientDistPath));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next(
        new AppError(`Cannot find ${req.originalUrl} on this server!`, 404)
      );
    }
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
} else {
  console.warn("Client dist folder not found at:", clientDistPath);
  app.get("*", (req, res, next) => {
    if (!req.path.startsWith("/api")) {
      return res
        .status(404)
        .send(
          "Frontend not built. Please run the build command in the Client directory."
        );
    }
    next();
  });
}

// Global error handler
app.use(globalErrorHandler);

export default app;
