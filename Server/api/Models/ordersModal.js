import mongoose from "mongoose";
import AppError from "../Utilities/appError.js";

const ordersModal = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Oreder must contain a product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order Must containe a User"],
    },
    address: {
      type: String,
      required: [true, "Order Must Have an Address"],
    },
    phone: {
      type: String,
      required: [true, "Order Must have a phone"],
    },
    qty: {
      type: Number,
      default: 1,
    },
    weight: {
      type: Number,
      default: 250,
    },
    orderStatus: {
      type: String,
      enum: {
        values: ["Completed", "Confirmed", "On Refund", "Cancelled"],
        message:
          "Invalid order status. Please select from: Completed, Confirmed, On Refund, or Cancelled",
      },
    },
    orderId: {
      type: String,
    },
    price: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ["Paid", "Unpaid"],
        message:
          '{VALUE} is not a valid payment status. Allowed values are "Paid" or "Unpaid".',
      },
      required: [true, "Order must have an payment status"],
    },
  },
  { timestamps: true }
);

ordersModal.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const product = await mongoose.model("Product").findById(this.product);
      if (product) {
        this.price = product.price * this.qty;
      } else {
        return next(new AppError("Product not found", 400));
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

ordersModal.pre("save", function (next) {
  // Generate a random six-digit number
  this.orderId = Math.floor(100000 + Math.random() * 900000).toString();
  next();
});
ordersModal.pre(/find/, function (next) {
  this.populate("product user");
  next();
});
const Order = mongoose.model("Order", ordersModal);

export default Order;
