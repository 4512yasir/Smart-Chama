import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Save,
  LogOut,
  ShieldCheck,
  Smartphone,
  Clock,
  Camera,
} from "lucide-react";

/* ---------------- MOCK SESSIONS ---------------- */
const sessions = [
  { device: "Chrome - Windows", location: "Nairobi", active: true },
  { device: "Mobile App - Android", location: "Mombasa", active: false },
];

const logs = [
  "Login from Chrome - Nairobi",
  "Password changed",
  "Login from Android device",
];

/* ---------------- PASSWORD STRENGTH ---------------- */
function getStrength(password) {
  if (!password) return 0;
  if (password.length < 4) return 20;
  if (password.length < 8) return 50;
  if (/[A-Z]/.test(password) && /\d/.test(password)) return 80;
  return 100;
}

export default function MemberSettingsPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@email.com",
    phone: "0712345678",
    password: "",
    notifications: true,
    avatar: null,
  });

  const strength = getStrength(form.password);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("avatar", URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-28">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-gray-500">
          Manage security, profile & sessions
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white p-6 rounded-3xl border space-y-4">

        <div className="flex items-center gap-4">

          {/* AVATAR */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {form.avatar ? (
                <img src={form.avatar} className="w-full h-full object-cover" />
              ) : (
                <User />
              )}
            </div>

            <label className="absolute -bottom-1 -right-1 bg-green-600 p-1 rounded-full cursor-pointer">
              <Camera size={14} className="text-white" />
              <input type="file" className="hidden" onChange={handleImage} />
            </label>
          </div>

          {/* USER INFO */}
          <div>
            <h2 className="font-semibold flex items-center gap-2">
              {form.name}
              <ShieldCheck size={16} className="text-green-600" />
            </h2>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>

        </div>

        <input
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border p-3 rounded-xl"
          placeholder="Full Name"
        />
      </div>

      {/* SECURITY */}
      <div className="bg-white p-6 rounded-3xl border space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Lock size={18} /> Security
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="w-full border p-3 rounded-xl"
        />

        {/* PASSWORD STRENGTH */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              strength < 50
                ? "bg-red-500"
                : strength < 80
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${strength}%` }}
          />
        </div>

        <p className="text-xs text-gray-500">
          Password strength: {strength}%
        </p>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white p-6 rounded-3xl border flex justify-between items-center">
        <div>
          <p className="font-medium flex items-center gap-2">
            <Bell /> Notifications
          </p>
          <p className="text-sm text-gray-500">
            Payment alerts & reminders
          </p>
        </div>

        <button
          onClick={() =>
            handleChange("notifications", !form.notifications)
          }
          className={`w-12 h-6 rounded-full p-1 transition ${
            form.notifications ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transition ${
              form.notifications ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* ACTIVE SESSIONS */}
      <div className="bg-white p-6 rounded-3xl border space-y-3">
        <h2 className="font-semibold flex items-center gap-2">
          <Smartphone size={18} /> Active Sessions
        </h2>

        {sessions.map((s, i) => (
          <div
            key={i}
            className="flex justify-between text-sm border p-3 rounded-xl"
          >
            <div>
              <p>{s.device}</p>
              <p className="text-gray-500 text-xs">{s.location}</p>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                s.active
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {s.active ? "Active" : "Logged out"}
            </span>
          </div>
        ))}
      </div>

      {/* SECURITY LOG */}
      <div className="bg-white p-6 rounded-3xl border space-y-3">
        <h2 className="font-semibold flex items-center gap-2">
          <Clock size={18} /> Security Activity
        </h2>

        {logs.map((l, i) => (
          <p key={i} className="text-sm text-gray-600">
            • {l}
          </p>
        ))}
      </div>

      {/* SAVE */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSave}
        className="w-full bg-green-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
      >
        <Save size={18} />
        {loading ? "Saving..." : "Save Changes"}
      </motion.button>

      {/* LOGOUT */}
      <button className="w-full text-red-600 flex items-center justify-center gap-2">
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
}