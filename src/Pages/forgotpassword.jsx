import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import logo from "../assets/smartchamalogo.jpeg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Mock submit (replace with real API call)
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Smart Chama" className="w-14 h-14 rounded-full mb-2" />
          <h1 className="text-2xl font-extrabold text-green-700">SmartChama</h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Forgot Password</h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        {submitted ? (
          <div className="text-center space-y-4">
            <p className="text-green-700 font-semibold">
              Password reset link sent to <br />
              <span className="text-gray-700">{email}</span>
            </p>
            <Link
              to="/login"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Send Reset Link
            </button>
          </form>
        )}

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
