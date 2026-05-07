import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Wallet,
  Vote,
  UserX,
  Save,
} from "lucide-react";

export default function ChairSettingsPage() {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    /* 👤 PERSONAL */
    name: "Chair Admin",
    email: "chair@demo.com",
    phone: "0712345678",

    /* 🔐 SECURITY */
    password: "",
    confirmPassword: "",

    /* ⚙️ LOAN RULES */
    contribution: 5000,
    maxLoanMultiplier: 3,
    interestRate: 5,
    maxLoanAmount: 50000,
    autoApprovalLimit: 20000,

    /* 🗳️ VOTING RULES */
    votingAccess: "all",
    votingQuorum: 60,
    votingDuration: 24,
    votingType: "open",

    /* 🚫 MEMBER REMOVAL */
    maxMissedPayments: 3,
    gracePeriod: 7,
    removalType: "manual",
    warningThreshold: 2,
  });

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const saveSettings = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("chair_settings", JSON.stringify(data));
      setLoading(false);
      alert("Settings saved successfully ✅");
    }, 800);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Chair Settings
        </h1>
        <p className="text-gray-500">
          Control loans, voting rules, security and member governance
        </p>
      </div>

      {/* 👤 PERSONAL */}
      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <User size={18} /> Personal Details
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border p-3 rounded-xl w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border p-3 rounded-xl w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="border p-3 rounded-xl w-full"
            />
          </div>
        </div>
      </div>

      {/* 🔐 SECURITY */}
      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Lock size={18} /> Security
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="border p-3 rounded-xl w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              value={data.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            />
          </div>

        </div>
      </div>

      {/* ⚙️ LOAN RULES */}
      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Wallet size={18} /> Loan Rules
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div>
            <label className="text-sm text-gray-600">
              Monthly Contribution
            </label>
            <input
              type="number"
              value={data.contribution}
              onChange={(e) => handleChange("contribution", e.target.value)}
              className="border p-3 rounded-xl w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Loan Multiplier
            </label>
            <input
              type="number"
              value={data.maxLoanMultiplier}
              onChange={(e) =>
                handleChange("maxLoanMultiplier", e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Interest Rate %
            </label>
            <input
              type="number"
              value={data.interestRate}
              onChange={(e) =>
                handleChange("interestRate", e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            />
          </div>

        </div>
      </div>

      {/* 🗳️ VOTING RULES */}
      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Vote size={18} /> Voting Rules
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-600">
              Voting Access
            </label>
            <select
              value={data.votingAccess}
              onChange={(e) =>
                handleChange("votingAccess", e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            >
              <option value="all">All Members</option>
              <option value="active">Active Members Only</option>
              <option value="vip">VIP Members Only</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Quorum %
            </label>
            <input
              type="number"
              value={data.votingQuorum}
              onChange={(e) =>
                handleChange("votingQuorum", e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            />
          </div>

        </div>
      </div>

      {/* 🚫 MEMBER REMOVAL */}
      <div className="bg-white border rounded-2xl p-6 space-y-5">

        <h2 className="font-semibold flex items-center gap-2">
          <UserX size={18} /> Member Removal Rules
        </h2>

        <p className="text-sm text-gray-500">
          Define when members should be warned, flagged, or removed.
        </p>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm text-gray-600">
              Max Missed Contributions
            </label>
            <p className="text-xs text-gray-400">
              After this limit, member gets flagged
            </p>
            <input
              type="number"
              value={data.maxMissedPayments}
              onChange={(e) =>
                handleChange("maxMissedPayments", e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Grace Period (Days)
            </label>
            <p className="text-xs text-gray-400">
              Time before action is taken
            </p>
            <input
              type="number"
              value={data.gracePeriod}
              onChange={(e) =>
                handleChange("gracePeriod", e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Removal Mode
            </label>
            <p className="text-xs text-gray-400">
              Manual = safer, Auto = strict system
            </p>
            <select
              value={data.removalType}
              onChange={(e) =>
                handleChange("removalType", e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            >
              <option value="manual">Chair Approval Required</option>
              <option value="auto">Automatic Removal</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Warning Threshold
            </label>
            <p className="text-xs text-gray-400">
              Early warning before removal
            </p>
            <input
              type="number"
              value={data.warningThreshold}
              onChange={(e) =>
                handleChange("warningThreshold", e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            />
          </div>

        </div>
      </div>

      {/* SAVE BUTTON */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={saveSettings}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-medium"
      >
        {loading ? "Saving..." : "Save Settings"}
      </motion.button>

    </div>
  );
}