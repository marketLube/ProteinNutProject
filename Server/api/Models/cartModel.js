import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    couponAppliedPrice: {
      type: Number,
    },
    isCouponApplied: {
      type: Boolean,
      default: false,
    },
    coupons: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Coupon",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

cartSchema.methods.calcTotalPrice = function (products) {
  return products.reduce((acc, prod) => prod.price + acc, 0);
};

cartSchema.pre(/^find/, function (next) {
  this.populate({ path: "products", select: "-__v " });
  next();
});

// cartSchema.pre(/^find/, function (next) {
//   // this.populate({ path: "user", select: "name email phone" }).populate({
//   //   path: "coupons",
//   // });
//   // next();
// });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
