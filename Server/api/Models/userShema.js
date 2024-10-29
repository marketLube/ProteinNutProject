import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import AppError from "../Utilities/appError.js";
import { otpToEmail } from "../Utilities/otpGenerate.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [20, "User name should be less than 20 characters"],
      minlength: [3, "User name should be greater than 3 characters"],
    },
    email: {
      type: String,
      unique: true,
      maxlength: [30, "Email should be less than 20 characters"],
      minlength: [3, "email should be greater than 3 characters"],
      Lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    phone: {
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
          return value.length >= 10 && value.length <= 13;
        },
        message:
          "Enter a valid phone number with a length between 9 and 13 digits",
      },
    },
    cart: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    active: {
      type: Boolean,
      select: false,
      default: true,
    },
    address: {
      type: String,
    },
    purchaseValue: {
      type: Number,
    },
    isNewOne: {
      type: Boolean,
      default: true,
    },
    changePasswordDate: Date,
    passwordResetOtp: String,
    otpExpires: Date,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.methods.calculatePurchaseValue = async function () {
  const orders = await mongoose
    .model("Order")
    .find({ user: this._id, orderStatus: "Completed" });
  return orders.reduce((total, order) => total + order.price, 0);
};

// deselecting fields that don't want to give to frontend
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
    .select("-__v")
    .populate("cart");
  next();
});

// password Reset
userSchema.methods.createPasswordResetOtp = async function (email) {
  const [response, status, otp] = await otpToEmail(email);

  if (status !== "OK") return false;

  this.passwordResetOtp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000;
  return true;
};

const User = mongoose.model("User", userSchema);

export default User;
