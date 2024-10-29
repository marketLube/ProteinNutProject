import { useState, useEffect, useRef } from "react";
import "./ProductModal.css";
import axios from "axios";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import { ImageIcon } from "./ImageIcon";
import { CloseButton } from "./CloseButton";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion


// Modal Component
const ProductModal = ({ isOpen, onClose, product, refetchProducts }) => {
  const [isClosing, setIsClosing] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      productName: "",
      category: "",
      regularPrice: "",
      offer: "",
      salePrice: "",
      weight: "",
      stockStatus: "inStock",
      quantityInStock: "",
      statistics: "",
      description: "",
    },
  });

  const [images, setImages] = useState([]);
  const fileInputRefs = [useRef(), useRef(), useRef(), useRef()];
  useEffect(() => {
    if (product) {
      setValue("productName", product.name || "");
      setValue("category", product.category || "");
      setValue("regularPrice", product.price ? product.price.toString() : "");
      setValue(
        "offerPercentage",
        product.offer ? product.offer.toString() : ""
      );
      setValue("weight", product.weight ? product.weight.toString() : "");
      setValue("stockStatus", product.stockStatus || "inStock");
      setValue(
        "quantityInStock",
        product.stock ? product.stock.toString() : ""
      );
      setValue("statistics", product.statistic || "");
      setValue("description", product.description || "");
      setImages(product.image || []);
    }
  }, [product, setValue]);

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    toast.success("Image removed successfully");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ryqwyuez"); // Your actual upload preset

      try {
        console.log("Uploading image to Cloudinary...");
        // Show "Uploading..." toast notification
        const toastId = toast.loading("Uploading image...");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dw4xgovq5/image/upload",
          formData
        );
        console.log("Cloudinary response:", response);

        const newImages = [...images];
        const newImageUrl = response.data.secure_url;

        // Find the first null or undefined slot in the array
        const firstEmptyIndex = newImages.findIndex(
          (img) => img == null || img === undefined
        );

        if (firstEmptyIndex !== -1) {
          // If there's an empty slot, use that
          newImages[firstEmptyIndex] = newImageUrl;
        } else {
          // If no empty slots, add to the end of the array
          newImages.push(newImageUrl);
        }

        setImages(newImages);

        console.log("Image uploaded successfully:", newImageUrl);

        // Update the toast notification to show success
        toast.success("Image uploaded successfully", { id: toastId });
      } catch (error) {
        if (error.response) {
          // Check if there's any specific error message from Cloudinary
          console.error("Cloudinary Error:", error.response.data);
          toast.error(`Upload failed: ${error.response.data.error.message}`);
        } else {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image");
        }
      }
    }
  };

  const renderImageOrPlaceholder = (index) => {
    if (images[index]) {
      return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src={images[index]}
            alt={`Product image ${index + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <CloseButton onClick={() => handleRemoveImage(index)} />
        </div>
      );
    } else {
      return (
        <div
          onClick={() => fileInputRefs[index].current.click()}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <ImageIcon />
          <span>Browse Image</span>
          <input
            type="file"
            ref={fileInputRefs[index]}
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => handleImageUpload(e, index)}
          />
        </div>
      );
    }
  };

  const onSubmit = async (data) => {
    if (!product) {
      // This is a new product, so we should check if all fields are filled
      if (
        data.productName === "" ||
        data.category === "" ||
        data.regularPrice === "" ||
        data.offerPercentage === "" ||  // Ensure this is checked
        data.weight === "" ||
        data.quantityInStock === "" ||
        data.description === ""
      ) {
        toast.error("Please fill in all the fields");
        return;
      }
    }
  
    const newProduct = {
      name: data.productName,
      category: data.category,
      price: data.regularPrice,
      offer: data.offerPercentage, // Use offerPercentage for offer field
      weight: data.weight,
      stockStatus: data.stockStatus,
      stock: data.quantityInStock,
      statistic: data.statistics,
      description: data.description,
      image: images,
    };
  
    try {
      if (product) {
        await api.patch(`/products/${product._id}`, newProduct, {
          withCredentials: true,
        });
        onClose();
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", newProduct, {
          withCredentials: true,
        });
        toast.success("Product added successfully");
      }
  
      // Refetch products after successful update or addition
      refetchProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  

  useEffect(() => {
    const regularPrice = parseFloat(watch("regularPrice")) || 0;
    const offerPercentage = parseFloat(watch("offerPercentage")) || 0;
    const salePrice = regularPrice - (regularPrice * offerPercentage) / 100;
    setValue("salePrice", salePrice.toFixed(2));
  }, [watch("regularPrice"), watch("offerPercentage"), setValue]);

  return (
    <AnimatePresence>
      {(isOpen || isClosing) && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            <h2>{product ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="left-column">
                  <h3>Product Images</h3>
                  <div className="image-grid">
                    <div className="image-placeholder large">
                      {renderImageOrPlaceholder(0)}
                    </div>
                    <div className="image-placeholder large">
                      {renderImageOrPlaceholder(1)}
                    </div>
                    <div className="small-images-column">
                      <div className="image-placeholder small">
                        {renderImageOrPlaceholder(2)}
                      </div>
                      <div className="image-placeholder small">
                        {renderImageOrPlaceholder(3)}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea {...register("description")}></textarea>
                  </div>
                </div>
                <div className="right-column">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" {...register("productName")} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select {...register("category")} className="dropdown">
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Sports & Outdoors">
                        Sports & Outdoors
                      </option>
                      <option value="Peanuts">Peanuts</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Regular Price</label>
                      <input type="text" {...register("regularPrice")} />
                    </div>
                    <div className="form-group">
                      <label>Offer %</label>
                      <input type="text" {...register("offerPercentage")} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Sale Price</label>
                      <input type="text" {...register("salePrice")} disabled />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Weight,kg</label>
                      <input type="text" {...register("weight")} />
                    </div>
                    <div className="form-group">
                      <label>Stock status</label>
                      <select {...register("stockStatus")} className="dropdown">
                        <option value="inStock">In Stock</option>
                        <option value="outOfStock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Quantity in stock</label>
                    <input type="text" {...register("quantityInStock")} />
                  </div>
                  <div className="form-group">
                    <label>Statistics</label>
                    <select {...register("statistics")} className="dropdown">
                      <option value="">Select Statistics</option>
                      {product?.statistic && (
                        <option value={product.statistic}>{product.statistic}</option>
                      )}
                      <option value="Best Seller">Best Seller</option>
                      <option value="New Product">New Product</option>
                      <option value="Featured Product">Featured Product</option>
                      <option value="Repeat Purchases">Repeat Purchases</option>
                      <option value="Trending">Trending</option>
                      <option value="Popular">Popular</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="publish-btn">
                  {product ? "Update Product" : "Publish Product"}
                </button>
              </div>
            </form>
            <Toaster />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
