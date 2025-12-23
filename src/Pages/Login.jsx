import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import logo from "../assets/smartchamalogo.jpeg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { identifier, password } = credentials;

    if (!identifier || !password) {
      setError("Please enter both email/phone and password.");
      toast.error("All fields are required.");
      return;
    }

    try {
      // Call your backend API
      const res = await fetch("https://your-backend-api.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        toast.error(data.message || "Invalid credentials");
        return;
      }

      // On success, data should contain role: "chairperson" | "member"
      toast.success("Login successful! Redirecting...", { duration: 1500 });

      if (data.role === "chairperson") navigate("/dashboard/chairperson");
      else if (data.role === "member") navigate("/dashboard/member");
      else navigate("/"); // fallback
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* LEFT BRAND SECTION */}
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
          <h2 className="text-4xl font-bold leading-tight mb-6">Welcome Back 👋</h2>
          <p className="text-green-100 text-lg leading-relaxed">
            Log in to manage your Chama, track contributions, and grow together securely.
          </p>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="md:hidden flex items-center justify-center gap-2 mb-8">
            <img src={logo} alt="Smart Chama" className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-extrabold text-green-700">
              Smart<span className="text-green-500">Chama</span>
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
          <p className="text-gray-600 mb-8">Access your Chama account</p>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email or Phone Number
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="example@email.com or 07XXXXXXXX"
                  value={credentials.identifier}
                  onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-green-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="text-center space-y-3">
            <p className="text-gray-600">Don’t have a Chama?</p>
            <div className="flex justify-center gap-4">
              <Link to="/create" className="text-green-700 font-semibold hover:underline">
                Create Chama
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/join/:code" className="text-green-700 font-semibold hover:underline">
                Join Chama
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
