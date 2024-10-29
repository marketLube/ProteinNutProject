import React, { useState } from "react";

import "./login.css";
import api from "../../../services/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser } from "../../../App/generalSlice/generalSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [otpSended, setOtpSended] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const toastId = toast.loading("Sending otp to mail...");
    try {
      setLoading(true);
      const res = await api.post("/users/login", { email });
      setOtpSended(true);
      toast.success("Successfully sent Otp", { id: toastId });
    } catch (e) {
      console.log(e, "Error");
      setErr(e.response?.data?.message);
      toast.error("Otp senting failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const toastId = toast.loading("Verifying otp...");
    try {
      const res = await api.patch(`/users/verify-otp/${email}/${otp}`);
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(res.data.envelop?.user));
      navigate(-1);

      toast.success("Otp verified successfully", { id: toastId });
    } catch (e) {
      setErr(e.response?.data?.message);
      dispatch(setIsLoggedIn(false));
      console.log(e, "Error");
      toast.error("Otp verification failed", { id: toastId });
    }
  };

  const handleMailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleOtp = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <div>
          <h2 className="login-header">Login</h2>
        </div>

        <div className="login-form">
          <input
            type="text"
            placeholder="Email / Phone Number"
            value={email}
            onChange={handleMailChange}
            disabled={otpSended}
            style={{ opacity: otpSended ? 0.5 : 1 }}
          />
          <input
            type="text"
            style={{ opacity: otpSended ? 1 : 0.5 }}
            placeholder="OTP"
            value={otp}
            onChange={handleOtp}
            disabled={!otpSended}
          />
          <div className="button-otp">
            {otpSended ? (
              <button onClick={handleVerifyOtp}>Verify OTP</button>
            ) : (
              <button onClick={handleLogin}>Get OTP</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
