// src/components/ProductModal/ProductForm.jsx

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';

const ProductForm = ({ product, refetchProducts, initialImages }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      productName: product?.name || "",
      category: product?.category || "",
      regularPrice: product?.price || "",
      offerPercentage: product?.offerPercentage || "",
      salePrice: product?.salePrice || "",
      weight: product?.weight || "",
      stockStatus: product?.stockStatus || "inStock",
      quantityInStock: product?.stock.toString() || "",
      statistics: product?.statistic || "",
      description: product?.description || "",
    },
  });

  const handleRemoveImage = (index) => {
    // Implement image removal logic here
    console.log(`Removing image at index ${index}`);
  };

  const handleImageUpload = async (event) => {
    // Implement image upload logic here
    console.log("Uploading image...");
    
    try {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ryqwyuez"); // Replace with your actual Cloudinary upload preset

      const response = await fetch("https://api.cloudinary.com/v1_1/dw4xgovq5/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log(data);

      // Update state with uploaded image URL
      setValue("image", data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const renderImageOrPlaceholder = (index) => {
    // Implement image rendering logic here
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <img
          src={initialImages[index] || "/path/to/default-image.jpg"}
          alt={`Product image ${index + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <CloseButton onClick={() => handleRemoveImage(index)} />
      </div>
    );
  };

  const onSubmit = async (data) => {
    if (!product) {
      // This is a new product, so we should check if all fields are filled
      if (
        data?.productName === "" ||
        data?.category === "" ||
        data?.regularPrice === "" ||
        data?.offerPercentage === "" ||
        data?.weight === "" ||
        data?.quantityInStock === "" ||
        data?.description === ""
      ) {
        alert("Please fill in all the fields");
        return;
      }
    }

    const newProduct = {
      name: data?.productName,
      category: data?.category,
      price: parseFloat(data?.regularPrice) * (1 - parseFloat(data.offerPercentage) / 100),
      offerPercentage: parseFloat(data?.offerPercentage),
      weight: data?.weight,
      stockStatus: data?.stockStatus,
      stock: parseInt(data?.quantityInStock),
      statistic: data?.statistics,
      description: data?.description,
      image: initialImages.concat(data?.image || []), // Combine existing images with new ones
    };

    try {
      if (product) {
        await api.patch(`/products/${product?._id}`, newProduct);
        onClose();
        alert("Product updated successfully");
      } else {
        await api.post("/products", newProduct);
        alert("Product added successfully");
      }

      refetchProducts();

      // handleMainModalClose();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    const regularPrice = parseFloat(watch("regularPrice")) || 0;
    const offerPercentage = parseFloat(watch("offerPercentage")) || 0;
    const salePrice = regularPrice - (regularPrice * offerPercentage) / 100;
    setValue("salePrice", salePrice.toFixed(2));
  }, [watch("regularPrice"), watch("offerPercentage"), setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <option value="Best Seller">Best Seller</option>
            <option value="New Product">New Product</option>
            <option value="Featured Product">Featured Product</option>
            <option value="Repeat Purchases">Repeat Purchases</option>
            <option value="Trending">Trending</option>
            <option value="Popular">Popular</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;