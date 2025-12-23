import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import logo from "../assets/smartchamalogo.jpeg";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // assumed token in URL
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Mock API call for password reset
    console.log("Resetting password with token:", token);
    setTimeout(() => {
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
          <img src={logo} alt="Smart Chama" className="w-14 h-14 mx-auto rounded-full mb-4" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">Password Reset Successful!</h2>
          <p className="text-gray-600 mb-6">Your password has been updated successfully.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Smart Chama" className="w-14 h-14 rounded-full mb-2" />
          <h1 className="text-2xl font-extrabold text-green-700">SmartChama</h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Reset Password</h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your new password below to regain access to your account.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Reset Password
          </button>
        </form>

        <p className="text-gray-600 text-center mt-6 text-sm">
          Remembered your password?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
