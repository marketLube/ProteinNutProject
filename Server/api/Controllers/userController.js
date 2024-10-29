import User from "../Models/userShema.js";
import Cart from "../Models/cartModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { deleteOne, getAll, getOne } from "./handlerFactory.js";

const getMe = catchAsync(async (req, res, next) => {
  //req.user coming from protect middleware
  const me = req.user;

  res.status(200).json({
    status: "Success",
    message: "Successfully fetched the user",
    envelop: {
      me,
    },
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword)
    return next(
      new AppError("This is not the route for updating password..", 400)
    );

  //coming from protect middleware
  const userId = req.user._id;

  const updatedMe = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    message: `${updatedMe.name}'s data updated successfully`,
    envelop: {
      user: updatedMe,
    },
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ active: { $ne: false } }).select(
    "-__v -password"
  );

  // Loop through each user and calculate the purchase value
  for (const user of users) {
    user.purchaseValue = await user.calculatePurchaseValue();
  }

  res.status(200).json({
    message: "Successfully fetched",
    status: "Success",
    docs: users,
  });
});

// const getAllUsers = getAll(User);
const getUser = getOne(User);
const deleteUser = deleteOne(User);

const deleteAllUsers = async (req, res, next) => {
  await User.deleteMany({});
  await Cart.deleteMany({});
  res.status(200).json({ status: "Success", message: "Deleted All Users" });
};

export default {
  getAllUsers,
  getUser,
  deleteUser,
  deleteAllUsers,
  getMe,

  updateMe,
};
