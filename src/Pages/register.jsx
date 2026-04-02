import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Copy, CircleDollarSign } from "lucide-react";
import Confetti from "react-confetti";
import logo from "../assets/smartchamalogo.jpeg";

export default function RegisterChama() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [shake, setShake] = useState(false);

  const [chama, setChama] = useState({
    name: "",
    shortName: "",
    type: "savings",
    contributionFrequency: "monthly",
  });

  const [chair, setChair] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [generated, setGenerated] = useState({
    chamaCode: "CHAMA1234",
    inviteLink: `${window.location.origin}/join/CHAMA1234`,
  });

  const profileFileRef = useRef(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed — select and copy manually");
    }
  };

  const validateStep = () => {
    if (step === 1 && !chama.name) return "Please enter the Chama name.";
    if (step === 2 && (!chair.fullName || !chair.email))
      return "Please fill your personal details.";
    return "";
  };

  const handleNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20 },
  };

  const stepTitles = {
    1: "Step 1 — Chama Details",
    2: "Step 2 — Chairperson Details",
    3: "Step 3 — Confirmation",
    4: "Step 4 — Success 🎉",
  };

  return (
    <main className="min-h-screen relative bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-start px-4 py-8 overflow-hidden">
      {/* Top Logo (Floating, optional) */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <img
          src={logo}
          alt="SmartChama"
          className="w-12 h-12 rounded-full shadow-md"
        />
        <span className="text-green-700 font-bold text-xl hidden sm:block">
          SmartChama
        </span>
      </div>

      {/* Floating coins */}
      <motion.div
        animate={{ y: ["0%", "20%", "0%"], x: ["0%", "15%", "-10%", "0%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute top-10 left-5 opacity-30"
      >
        <CircleDollarSign className="w-12 h-12 text-yellow-400" />
      </motion.div>
      <motion.div
        animate={{ y: ["0%", "25%", "-10%", "0%"], x: ["0%", "-15%", "10%", "0%"] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        className="absolute bottom-20 right-10 opacity-30"
      >
        <CircleDollarSign className="w-16 h-16 text-green-400" />
      </motion.div>

      <div className="w-full max-w-4xl flex flex-col gap-6 z-10 mt-16">
        {/* Step Progress */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-2 md:gap-0">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              <motion.div
                animate={step === i ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  step >= i ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                {i}
              </motion.div>
              <div className="text-xs mt-1 text-gray-600 text-center">{stepTitles[i]}</div>
              {i < 4 && (
                <div
                  className={`h-1 w-full ${
                    step > i ? "bg-green-600" : "bg-gray-200"
                  } mt-2 rounded-full`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100 ${
              shake ? "animate-shake" : ""
            }`}
          >
            {/* Logo inside card */}
            <div className="flex flex-col items-center mb-6">
              <img src={logo} alt="SmartChama" className="w-20 h-20 rounded-full shadow-md mb-2" />
              <h2 className="text-2xl font-bold text-green-700">{stepTitles[step]}</h2>
            </div>

            {/* Step 1: Chama Details */}
            {step === 1 && (
              <div className="space-y-4">
                <input
                  value={chama.name}
                  onChange={(e) => setChama({ ...chama, name: e.target.value })}
                  placeholder="Chama Name"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none hover:ring-green-400 transition"
                />
                <input
                  value={chama.shortName}
                  onChange={(e) =>
                    setChama({ ...chama, shortName: e.target.value })
                  }
                  placeholder="Short Name (optional)"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none hover:ring-green-400 transition"
                />
                <div className="flex flex-col md:flex-row gap-4">
                  <select
                    value={chama.type}
                    onChange={(e) => setChama({ ...chama, type: e.target.value })}
                    className="w-full md:w-1/2 p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none hover:ring-green-400 transition"
                  >
                    <option value="savings">Savings</option>
                    <option value="investment">Investment</option>
                    <option value="rotational">Rotational</option>
                  </select>
                  <select
                    value={chama.contributionFrequency}
                    onChange={(e) =>
                      setChama({ ...chama, contributionFrequency: e.target.value })
                    }
                    className="w-full md:w-1/2 p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none hover:ring-green-400 transition"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Chair Details */}
            {step === 2 && (
              <div className="space-y-4">
                <input
                  value={chair.fullName}
                  onChange={(e) => setChair({ ...chair, fullName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none hover:ring-green-400 transition"
                />
                <input
                  value={chair.email}
                  onChange={(e) => setChair({ ...chair, email: e.target.value })}
                  placeholder="Email"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none hover:ring-green-400 transition"
                />
                <input
                  value={chair.phone}
                  onChange={(e) => setChair({ ...chair, phone: e.target.value })}
                  placeholder="Phone"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none hover:ring-green-400 transition"
                />
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      if (profilePreview) URL.revokeObjectURL(profilePreview);
                      setProfilePreview(URL.createObjectURL(f));
                    }}
                    ref={profileFileRef}
                    className="p-2 border rounded-xl"
                  />
                  {profilePreview && (
                    <img
                      src={profilePreview}
                      alt="preview"
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="text-center space-y-4">
                <CheckCircle className="mx-auto text-green-700 w-12 h-12" />
                <h3 className="text-lg font-semibold">All Set! 🎉</h3>
                <p className="text-gray-600">Share this invite link with members:</p>
                <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between">
                  <span className="break-all">{generated.inviteLink}</span>
                  <button
                    onClick={() => copyToClipboard(generated.inviteLink)}
                    className="px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    {copied ? "Copied!" : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="text-center space-y-6">
                <Confetti width={window.innerWidth} height={window.innerHeight} />
                <CheckCircle className="mx-auto text-green-700 w-16 h-16" />
                <h3 className="text-2xl font-bold text-green-700">Chama Created!</h3>
                <p className="text-gray-600">Your members can now join using the link above.</p>
                <button
                  onClick={() => (window.location.href = "/auth/login")}
                  className="mt-4 px-8 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition transform hover:scale-105"
                >
                  🚀 Take Me to Login
                </button>
              </div>
            )}

            {error && <div className="text-red-600 mt-4 text-center">{error}</div>}

            {/* Controls */}
            {step < 4 && (
              <div className="flex flex-col md:flex-row justify-between mt-6 gap-4 md:gap-0">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                >
                  {step === 3 ? "Finish" : "Next →"}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Shake animation */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </main>
  );
}