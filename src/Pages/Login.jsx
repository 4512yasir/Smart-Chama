import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import logo from "../assets/smartchamalogo.jpeg";

const LOGIN_URL = "http://127.0.0.1:8000/api/auth/login/";
const ME_URL = "http://127.0.0.1:8000/api/auth/me/";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

      /* =========================
         1. LOGIN (JWT)
      ========================== */
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

      // Save tokens
      localStorage.setItem("access", loginData.access);
      localStorage.setItem("refresh", loginData.refresh);

      /* =========================
         2. FETCH CURRENT USER
      ========================== */
      const meRes = await fetch(ME_URL, {
        headers: {
          Authorization: `Bearer ${loginData.access}`,
        },
      });

      const user = await meRes.json();

      if (!meRes.ok) {
        toast.error("Failed to fetch user profile");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");

      /* =========================
         3. ROLE-BASED REDIRECT
      ========================== */
      if (user.role === "chairperson") {
        navigate("/dashboard/chairperson");
      } else {
        navigate("/dashboard/member");
      }

    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* LEFT BRAND */}
        <div className="hidden md:flex flex-col justify-center bg-green-600 text-white p-12">
          <div className="flex items-center gap-3 mb-10">
            <img
              src={logo}
              alt="Smart Chama"
              className="w-14 h-14 rounded-full border-2 border-white"
            />
            <h1 className="text-3xl font-extrabold">
              Smart<span className="text-green-200">Chama</span>
            </h1>
          </div>

          <h2 className="text-4xl font-bold mb-6">Welcome Back 👋</h2>
          <p className="text-green-100 text-lg">
            Manage your Chama, track contributions, and grow together securely.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <div className="md:hidden flex justify-center gap-2 mb-8">
            <img src={logo} alt="Smart Chama" className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-extrabold text-green-700">
              Smart<span className="text-green-500">Chama</span>
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-gray-600 mb-8">Access your Chama account</p>

          <form className="space-y-6" onSubmit={handleLogin}>

            {/* IDENTIFIER */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email or Phone
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="email@example.com or 07XXXXXXXX"
                  value={credentials.identifier}
                  onChange={(e) =>
                    setCredentials({ ...credentials, identifier: e.target.value })
                  }
                  className="w-full pl-10 py-3 rounded-xl border focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-3 rounded-xl border focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-green-600">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="text-center space-y-2">
            <p className="text-gray-600">Don’t have a Chama?</p>
            <div className="flex justify-center gap-4">
              <Link to="/create" className="text-green-700 font-semibold">
                Create Chama
              </Link>
              <span>|</span>
              <Link to="/join" className="text-green-700 font-semibold">
                Join Chama
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
