import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import logo from "../assets/smartchamalogo.jpeg";

export default function LoginPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState("login"); // login | otp
  const [loading, setLoading] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");

  // Detect Kenyan phone
  const isPhone = /^0\d{9}$/.test(identifier);

  // ------------------------
  // LOGIN HANDLER
  // ------------------------
  const handleLogin = (e) => {
    e.preventDefault();

    if (!identifier) {
      setError("Enter email or phone");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (isPhone) {
        toast.success("OTP sent to your phone 📲");
        setStep("otp");
      } else {
        toast.success("Welcome back 🎉");
        navigate("/dashboard/member");
      }
    }, 800);
  };

  // ------------------------
  // OTP HANDLER
  // ------------------------
  const handleOTP = (e) => {
    e.preventDefault();

    if (otp.length < 4) {
      setError("Enter valid OTP");
      return;
    }

    toast.success("Logged in 🎉");
    navigate("/dashboard/member");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="w-12 h-12 rounded-full" />
          <h1 className="text-xl font-semibold mt-3 text-gray-900">
            SmartChama
          </h1>
          <p className="text-gray-500 text-sm">
            {step === "login"
              ? "Login to continue"
              : "Enter OTP sent to your phone"}
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [-5, 5, -5, 5, 0] }}
            className="text-red-500 text-sm mb-3 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* LOGIN STEP */}
        {step === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="text"
              placeholder="Email or 07XXXXXXXX"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />

            {!isPhone && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              />
            )}

            <button className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">
              {loading
                ? "Processing..."
                : isPhone
                ? "Send OTP"
                : "Login"}
            </button>

          </form>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <form onSubmit={handleOTP} className="space-y-4">

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 text-center tracking-widest rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">
              Verify & Login
            </button>

            <button
              type="button"
              onClick={() => setStep("login")}
              className="text-sm text-gray-500 w-full"
            >
              ← Back
            </button>
          </form>
        )}

        {/* FOOTER */}
        <div className="text-center mt-6 text-sm text-gray-500">
          New here?{" "}
          <Link to="/create" className="text-green-600 font-medium hover:underline">
            Create Chama
          </Link>
        </div>

      </motion.div>
    </main>
  );
}