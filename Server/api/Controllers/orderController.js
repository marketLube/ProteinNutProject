import APIFeatures from "../APIFeatures/APIFeatures.js";
import Order from "../Models/ordersModal.js";
import catchAsync from "../Utilities/catchAsync.js";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

const orderStats = catchAsync(async (req, res, next) => {
  const filter = {};
  const features = new APIFeatures(Order, Order.find(filter), req.query);
  features
    .filter()
    .sort()
    .limitFields()
    .paginate(Order.countDocuments())
    .filterByBranch()
    .filterByDateRange()
    .search();

  const orderStats = await features.query;

  const completed = orderStats.filter((obj) => obj.orderStatus === "Completed");
  const confirmed = orderStats.filter((obj) => obj.orderStatus === "Confirmed");
  const refund = orderStats.filter((obj) => obj.orderStatus === "On Refund");
  const cancelled = orderStats.filter((obj) => obj.orderStatus === "Cancelled");

  res.status(200).json({
    message: "Successfully fetched",
    status: "Success",
    data: {
      completed: completed.length,
      confirmed: confirmed.length,
      refund: refund.length,
      cancelled: cancelled.length,
    },
  });
});

const getAllOrders = getAll(Order);
const getOrder = getOne(Order);
const createOrder = createOne(Order);
const updateOrder = updateOne(Order);
const deleteOrder = deleteOne(Order);

export default {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  orderStats,
};
