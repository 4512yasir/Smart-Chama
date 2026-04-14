import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import logo from "../assets/smartchamalogo.jpeg";

const LOGIN_URL = "http://127.0.0.1:8000/api/auth/login/";
const ME_URL = "http://127.0.0.1:8000/api/auth/me/";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
    remember: false,
  });

  const validate = () => {
    const err = {};
    if (!credentials.identifier) err.identifier = "Required";
    if (!credentials.password) err.password = "Required";
    return err;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const loginRes = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: credentials.identifier,
          password: credentials.password,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        setErrors({ general: "Invalid email/phone or password" });
        return;
      }

      localStorage.setItem("access", loginData.access);
      localStorage.setItem("refresh", loginData.refresh);

      if (credentials.remember) {
        localStorage.setItem("rememberUser", "true");
      }

      const meRes = await fetch(ME_URL, {
        headers: {
          Authorization: `Bearer ${loginData.access}`,
        },
      });

      const user = await meRes.json();

      if (!meRes.ok) {
        setErrors({ general: "Failed to fetch user" });
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Welcome back 👋");

      if (user.role === "chairperson") {
        navigate("/dashboard/chairperson");
      } else {
        navigate("/dashboard/member");
      }
    } catch (err) {
      setErrors({ general: "Server error. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >

        {/* LOGO + HEADER */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} className="w-14 h-14 rounded-full shadow-sm" />
          <h1 className="text-2xl font-semibold mt-4 text-gray-900">
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm">
            Login to your SmartChama account
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          {/* ERROR */}
          {errors.general && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* IDENTIFIER */}
            <div>
              <label className="text-sm text-gray-600">Email or Phone</label>
              <input
                type="text"
                value={credentials.identifier}
                onChange={(e) =>
                  setCredentials({ ...credentials, identifier: e.target.value })
                }
                className={`mt-1 w-full px-4 py-3 rounded-xl border outline-none transition
                  ${errors.identifier
                    ? "border-red-400 ring-1 ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-green-500"
                  }
                `}
                placeholder="you@example.com or 07XXXXXXXX"
              />
              {errors.identifier && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.identifier}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className={`w-full px-4 py-3 pr-12 rounded-xl border outline-none transition
                    ${errors.password
                      ? "border-red-400 ring-1 ring-red-200"
                      : "border-gray-300 focus:ring-2 focus:ring-green-500"
                    }
                  `}
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={credentials.remember}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      remember: e.target.checked,
                    })
                  }
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-green-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* BUTTON */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Don’t have a Chama?{" "}
          <Link to="/create" className="text-green-600 font-medium hover:underline">
            Create one
          </Link>{" "}
          or{" "}
          <Link to="/join" className="text-green-600 font-medium hover:underline">
            Join one
          </Link>
        </div>

      </motion.div>
    </main>
  );
}