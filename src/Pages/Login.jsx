import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import logo from "../assets/smartchamalogo.jpeg";

export default function LoginPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");

  const isPhone = /^0\d{9}$/.test(identifier);

  /* ---------------- FAKE USERS ---------------- */
  const users = [
    {
      email: "member@demo.com",
      password: "123456",
      role: "member",
      full_name: "John Member",
    },
    {
      email: "chair@demo.com",
      password: "123456",
      role: "chairperson",
      full_name: "Chair Admin",
    },
  ];

  /* ---------------- LOGIN ---------------- */
  const handleLogin = (e) => {
    e.preventDefault();

    if (!identifier) {
      setError("Enter email or phone");
      return;
    }

    if (!isPhone && !password) {
      setError("Enter password");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // 📱 PHONE LOGIN
      if (isPhone) {
        toast.success("OTP sent 📲 (use 1234)");
        setStep("otp");
        return;
      }

      // 📧 EMAIL LOGIN
      const user = users.find(
        (u) =>
          u.email === identifier.toLowerCase() &&
          u.password === password
      );

      if (!user) {
        setError("Invalid email or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome ${user.full_name} 🎉`);

      
       console.log("USER:", user);

      if (user.role === "chairperson") {
        navigate("/dashboard/chairperson");
      } else {
        navigate("/dashboard/member");
      }
    }, 800);
  };

  /* ---------------- OTP ---------------- */
  const handleOTP = (e) => {
    e.preventDefault();

    if (otp !== "1234") {
      setError("Invalid OTP (use 1234)");
      return;
    }

    // default phone users = member
    const user = {
      full_name: "Mobile User",
      role: "member",
    };

    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Logged in 🎉");

    navigate("/dashboard/member");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-6"
      >

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="w-12 h-12 rounded-full" />
          <h1 className="text-xl font-semibold mt-3">SmartChama</h1>
          <p className="text-gray-500 text-sm">
            {step === "login"
              ? "Login to continue"
              : "Enter OTP (1234)"}
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-red-500 text-sm mb-3 text-center">
            {error}
          </div>
        )}

        {/* LOGIN */}
        {step === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="text"
              placeholder="Email or 07XXXXXXXX"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
            />

            {!isPhone && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
              />
            )}

            <button className="w-full py-3 bg-green-600 text-white rounded-xl">
              {loading ? "Processing..." : isPhone ? "Send OTP" : "Login"}
            </button>

          </form>
        )}

        {/* OTP */}
        {step === "otp" && (
          <form onSubmit={handleOTP} className="space-y-4">

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 text-center tracking-widest rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button className="w-full py-3 bg-green-600 text-white rounded-xl">
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

        {/* DEMO HELP */}
        <div className="mt-6 text-xs text-gray-400 text-center space-y-1">
          <p>Demo Accounts:</p>
          <p>👤 member@demo.com / 123456</p>
          <p>👑 chair@demo.com / 123456</p>
          <p>📱 0712345678 → OTP: 1234</p>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-6 text-sm text-gray-500">
          New here?{" "}
          <Link to="/create" className="text-green-600 font-medium">
            Create Chama
          </Link>
        </div>

      </motion.div>
    </main>
  );
}