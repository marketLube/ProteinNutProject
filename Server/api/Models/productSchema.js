import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    image: {
      type: [String], // Keep this if you want an array of images
      required: [true, "Product must have at least one image"], // Optional: make it required if necessary
    },
    name: {
      type: String,
      required: [true, "Product must have a name"],
      minlength: [3, "Product name should be greater than 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Product must have a description"],
      maxlength: [200, "Description must be less than 200 characters"],
      minlength: [10, "Description must be greater than 10 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
    },
    weight: {
      type: Number,
      required: [true, "Product must have a weight"],
    },
    ratingQty: {
      type: Number,
      default: 0,
    },
    avgRatings: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 10,
    },
    stockStatus: {
      type: String,
      default: "inStock",
    },
    statistic: {
      type: String,
      default: "bestSeller",
      required: [true, "Must belong to a statistic"],
    },
    category: {
      type: String,
      required: [true, "Product must belong to a category"],
    },
    offer: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // Correctly placed timestamps option
);

const Product = mongoose.model("Product", productSchema);

export default Product;
