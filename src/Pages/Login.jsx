import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import logo from "../assets/smartchamalogo.jpeg";

const LOGIN_URL = "http://127.0.0.1:8000/api/auth/login/";
const ME_URL = "http://127.0.0.1:8000/api/auth/me/";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState("");

  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.identifier || !credentials.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const loginRes = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        toast.error("Invalid credentials");
        return;
      }

      localStorage.setItem("access", loginData.access);
      localStorage.setItem("refresh", loginData.refresh);

      const meRes = await fetch(ME_URL, {
        headers: {
          Authorization: `Bearer ${loginData.access}`,
        },
      });

      const user = await meRes.json();

      if (!meRes.ok) {
        toast.error("Failed to fetch user");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Welcome back 🎉");

      if (user.role === "chairperson") {
        navigate("/dashboard/chairperson");
      } else {
        navigate("/dashboard/member");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">

      {/* Floating background glow */}
      <div className="absolute w-72 h-72 bg-green-300/30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-green-200/30 blur-3xl rounded-full bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl grid md:grid-cols-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40"
      >

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-600 to-green-700 text-white p-12 relative">

          <div className="flex items-center gap-3 mb-10">
            <img src={logo} className="w-14 h-14 rounded-full border-2 border-white shadow" />
            <h1 className="text-3xl font-extrabold">
              Smart<span className="text-green-200">Chama</span>
            </h1>
          </div>

          <h2 className="text-4xl font-bold mb-4">Welcome Back 👋</h2>
          <p className="text-green-100 text-lg">
            Track contributions, manage members, and grow your Chama.
          </p>

          {/* subtle floating animation */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute bottom-10 right-10 text-green-200 text-sm"
          >
            🇰🇪 Built for Kenyan Chamas
          </motion.div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center items-center gap-2 mb-6">
            <img src={logo} className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-bold text-green-700">SmartChama</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-gray-600 mb-8">
            Access your Chama account
          </p>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL / PHONE */}
            <div>
              <label className="text-sm font-medium">Email or Phone</label>
              <div className={`relative mt-1`}>
                <Mail className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="email@example.com or 07XXXXXXXX"
                  value={credentials.identifier}
                  onFocus={() => setFocus("id")}
                  onBlur={() => setFocus("")}
                  onChange={(e) =>
                    setCredentials({ ...credentials, identifier: e.target.value })
                  }
                  className={`w-full pl-10 py-3 rounded-xl border outline-none transition
                    ${focus === "id" ? "ring-2 ring-green-500 border-green-500" : ""}
                  `}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Use your email or Kenyan phone number
              </p>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={credentials.password}
                  onFocus={() => setFocus("pw")}
                  onBlur={() => setFocus("")}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border outline-none transition
                    ${focus === "pw" ? "ring-2 ring-green-500 border-green-500" : ""}
                  `}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:scale-110 transition"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* FORGOT */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* BUTTON */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          {/* DIVIDER */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ACTIONS */}
          <div className="text-center space-y-2">
            <p className="text-gray-600">New here?</p>
            <div className="flex justify-center gap-4 text-sm">
              <Link to="/create" className="text-green-700 font-semibold hover:underline">
                Create Chama
              </Link>
              <span>|</span>
              <Link to="/join" className="text-green-700 font-semibold hover:underline">
                Join Chama
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
    </main>
  );
}