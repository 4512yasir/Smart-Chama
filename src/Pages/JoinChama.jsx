import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import logo from "../assets/smartchamalogo.jpeg";

export default function JoinChama() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChama, setLoadingChama] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [chama, setChama] = useState(null);

  // 🔥 Load Chama Preview (Mock)
  useEffect(() => {
    if (code) {
      setInviteCode(code.toUpperCase());

      setTimeout(() => {
        setChama({
          name: "Umoja Savings Group",
          members: 12,
          type: "Monthly Contributions",
          schedule: "Every 1st Saturday",
          contribution: "KES 5,000",
          description:
            "A trusted Nairobi-based chama focused on savings and small investments.",
        });
        setLoadingChama(false);
      }, 800);
    }
  }, [code]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // ✅ Validation
  const validate = () => {
    if (!form.name || !form.email || !form.phone) {
      return "All fields are required";
    }

    if (!form.password || !form.confirmPassword) {
      return "Enter password";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  // 🚀 JOIN + AUTO LOGIN
  const handleJoin = (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // 🔐 Mock user (simulate backend response)
      const user = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: "member",
        chama: chama.name,
      };

      // Save auth
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access", "mock_access_token");

      toast.success("Welcome to the Chama 🎉");

      // Redirect to dashboard
      navigate("/dashboard/member");

    }, 900);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="SmartChama" className="w-14 h-14 rounded-full shadow" />
          <h1 className="text-green-700 font-bold mt-2">SmartChama</h1>
        </div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >

          {/* LOADING */}
          {loadingChama ? (
            <div className="text-center py-10 text-gray-500 animate-pulse">
              Loading chama details...
            </div>
          ) : (
            <>
              {/* CHAMA PREVIEW */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">{chama.name}</h2>
                <p className="text-green-600 text-sm mt-1">
                  Invite Code: {inviteCode}
                </p>
              </div>

              {/* DETAILS */}
              <div className="bg-green-50 rounded-xl p-4 text-sm space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Members</span>
                  <span className="font-semibold">{chama.members}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contribution</span>
                  <span className="font-semibold">{chama.contribution}</span>
                </div>
                <div className="flex justify-between">
                  <span>Meetings</span>
                  <span className="font-semibold">{chama.schedule}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm text-center mb-6">
                {chama.description}
              </p>

              {/* FORM */}
              <form onSubmit={handleJoin} className="space-y-4">

                <input
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500"
                />

                <input
                  placeholder="Phone (07XXXXXXXX)"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="password"
                  placeholder="Create Password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition shadow-md"
                >
                  {loading ? "Joining..." : "Join This Chama"}
                </button>
              </form>

              {/* ALT */}
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-500">Not your chama?</p>
                <Link to="/" className="text-green-700 font-semibold hover:underline">
                  Go Back
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}