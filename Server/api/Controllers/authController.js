import jwt from "jsonwebtoken";
import User from "../Models/userShema.js";
import catchAsync from "../Utilities/catchAsync.js";
import AppError from "../Utilities/appError.js";
import Cart from "../Models/cartModel.js";

const KEY = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, KEY);
};

const sendToken = (newUser, statusCode, res) => {
  const token = generateToken(newUser._id);
  if (!token) return next(new AppError("Server failed to create token", 500));

  res.cookie("token", token, { httpOnly: true });

  res.status(statusCode).json({
    status: "Success",
    message: "Successfully logged in",
    envelop: {
      user: newUser,
    },
  });
};

const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ status: "Success", message: "Logged out, cookie cleared" });
});

const protect = catchAsync(async (req, res, next) => {
  // 1) Get the token and check its there
  const token = req.cookies.token;
  if (!token) return next(new AppError("Please Login to get access..", 401));

  // 2) Varify token
  const decode = jwt.verify(token, KEY); // there is a chance to get error

  // 3) Check the user is still exist to make sure
  const currentUser = await User.findById(decode.id);
  if (!currentUser)
    return next(new AppError("The User belong to this token is not exist"));

  // // 4) Check the password is changed after the token is issued
  // if (currentUser.changedPasswordAfter(decode.iat)) {
  //   return next(
  //     new AppError(
  //       "The User recently changed password, Please login again",
  //       401
  //     )
  //   );
  // }

  // passing the user  to next middleware
  req.user = currentUser;

  next();
});

const verify = catchAsync(async (req, res, next) => {
  let isLoggedIn = false;
  // 1) Get the token and check its there
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ status: "Failed", message: "Logged in failed", isLoggedIn });

  // 2) Varify token
  const decode = jwt.verify(token, KEY);
  const currentUser = await User.findById(decode.id).select(
    "email phone image name"
  );
  if (!currentUser) {
    return res.status(404).json({
      status: "Failed",
      message: "The User belong to this token is not exist",
      isLoggedIn,
    });
  }

  isLoggedIn = true;
  res.status(200).json({
    status: "Success",
    message: "Successfully Logged in",
    isLoggedIn,
    currentUser,
  });
});
const login = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new AppError("Please provide email or phone.."));

  const user = await User.findOne({ email });
  if (!user) return signUp();

  //checking password is matching or not
  await user.createPasswordResetOtp(email);
  await user.save();

  res
    .status(200)
    .json({ status: "Success", message: "Otp has been sended successfully" });
});
const signUp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("Please provide the mail"));
  // Create the user first
  const newUser = new User(req.body);

  if (!newUser) return next(new AppError("Failed to create user", 500));
  //checking password is matching or not
  const isOtpSent = await newUser.createPasswordResetOtp(email);
  if (!isOtpSent)
    return next(new AppError("Failed to send otp please try again..", 500));

  await newUser.save();

  res
    .status(200)
    .json({ status: "Success", message: "Otp has been sended successfully" });
});

const verifyOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.params;
  const user = await User.findOne({ email });

  if (!user)
    return next(new AppError("Something went wrong user not found...", 400));

  if (Date.now() > user.otpExpires) {
    return next(new AppError("This Otp is expired. Try again..", 401));
  }

  if (user.passwordResetOtp !== otp)
    return next(new AppError("Incorrect OTP check your inbox again...", 400));

  if (user.isNewOne) {
    // Create the cart concurrently
    const newUserCart = await Cart.create({
      user: user._id,
      products: [],
    });

    // Link the cart to the user in a single save call
    user.cart = newUserCart._id;
    user.isNew = false;
    await user.save({ validateBeforeSave: false });
  }

  // Send the token
  sendToken(user, 201, res);
});

export default { signUp, protect, logout, login, verifyOtp, verify };
