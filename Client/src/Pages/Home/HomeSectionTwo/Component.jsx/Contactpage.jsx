import React from "react";
import { useForm } from "react-hook-form";

export const Contactpage = () => {
  const form = useForm({});
  const { register, handleSubmit } = form;

  const onSubmitftn = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div>
      <style>
        {`
          .form-container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            height: 100vh;
            // background-color: #f5f5e9;
            font-family: Arial, sans-serif;
            position: relative; /* Ensure form-container is the positioning context */
          }
          .form-container label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 20px;
            color: #00004d;
          }
          .form-container input,
          .form-container select {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
          }
          .form-container input::placeholder {
            color: #aaa;
            font-weight: normal;
          }
          .form-container .row {
            display: flex;
            justify-content: space-between;
            gap: 10px;
          }
          .form-container .input-small {
            width: 48%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
          }
          .form-container button {
            width: 100%;
            padding: 15px;
            background-color: #00004d;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .form-container button:hover {
            background-color: #000;
          }
          .login-link {
            position: absolute;
            top: 20px; /* Adjust as necessary */
            right: 20px; /* Adjust as necessary */
            color: #b3b3b3;
            text-decoration: none;
            font-size: 14px;
            font-weight: bold;
          }
          .form-delivery {
            margin-top: 20px; /* Adjust this value to increase the margin top */
          }
          .error {
            color: red;
            font-size: 14px;
            margin-top: -10px;
            margin-bottom: 10px;
            display: block;
          }
        `}
      </style>

      <div className="form-container">
        <a href="#" className="login-link">
          Log in
        </a>
        <form onSubmit={handleSubmit(onSubmitftn)}>
          <label>Contact</label>
          <input type="email" placeholder="Email" {...register("email")} />
          {/* {errors.email && <span className="error">{errors.email.message}</span>} */}

          <div className="form-delivery">
            <label>Delivery</label>

            <div className="row">
              <input
                type="text"
                placeholder="First name"
                className="input-small"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              <input
                type="text"
                placeholder="Last name"
                className="input-small"
                {...register("lastName", { required: "Last name is required" })}
              />
            </div>
            {/* {errors.firstName && <span className="error">{errors.firstName.message}</span>}
            {errors.lastName && <span className="error">{errors.lastName.message}</span>} */}

            <input
              type="text"
              placeholder="Address Line 1"
              {...register("addressLine1", { required: "Address is required" })}
            />
            {/* {errors.addressLine1 && <span className="error">{errors.addressLine1.message}</span>} */}

            <input
              type="text"
              placeholder="Address Line 2"
              {...register("addressLine2")}
            />

            <div className="row">
              <input
                type="text"
                placeholder="City"
                className="input-small"
                {...register("city", { required: "City is required" })}
              />
              <input
                type="text"
                placeholder="State"
                className="input-small"
                {...register("state", { required: "State is required" })}
              />
              <input
                type="text"
                placeholder="ZIP code"
                className="input-small"
                {...register("zipCode", {
                  required: "ZIP code is required",
                  pattern: {
                    // value: /^\d{5}(-\d{4})?$/,
                    message: "Invalid ZIP code",
                  },
                })}
              />
            </div>
            {/* {errors.city && <span className="error">{errors.city.message}</span>}
            {errors.state && <span className="error">{errors.state.message}</span>}
            {errors.zipCode && <span className="error">{errors.zipCode.message}</span>} */}

            <input
              type="tel"
              placeholder="Phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {/* {errors.phone && <span className="error">{errors.phone.message}</span>} */}

            <button type="submit">Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
};
