import express from "express";
import authController from "../Controllers/authController.js";
import userController from "../Controllers/userController.js";
import filterData from "../Utilities/filterData.js";

const router = express.Router();

router.get("/verify", authController.verify);
router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

//temporary route for development
router.delete("/deleteAllUsers", userController.deleteAllUsers);

router.get("/getme", authController.protect, userController.getMe);

router.patch(
  "/update-me",
  authController.protect,
  filterData("User"),
  userController.updateMe
);

router.patch("/verify-otp/:email/:otp", authController.verifyOtp);
router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);

export default router;
