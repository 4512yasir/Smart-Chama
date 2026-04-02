import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Confetti from "react-confetti";
import logo from "../assets/smartchamalogo.jpeg";

export default function JoinChama() {
  const { code } = useParams(); // 🔗 invite code from URL

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const [personal, setPersonal] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [about, setAbout] = useState({
    occupation: "",
    description: "",
  });

  const [security, setSecurity] = useState({
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const profileFileRef = useRef(null);

  // 👥 fake chama data (simulate backend)
  const chamaData = {
    name: "Umoja Savings Group",
    members: 12,
  };

  // 🔐 Password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return "";
    if (pwd.length < 6) return "Weak";
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/)) return "Strong";
    return "Medium";
  };

  const passwordStrength = getPasswordStrength(security.password);

  const onProfileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (profilePreview) URL.revokeObjectURL(profilePreview);
    setProfilePreview(URL.createObjectURL(f));
  };

  const validateStep = () => {
    if (step === 1 && (!personal.fullName || !personal.email))
      return "Fill your personal info.";
    if (step === 2 && !about.description)
      return "Tell us about yourself.";
    if (step === 3) {
      if (!security.password || !security.confirmPassword)
        return "Enter password.";
      if (security.password !== security.confirmPassword)
        return "Passwords do not match.";
      if (!security.acceptTerms)
        return "Accept terms.";
    }
    return "";
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) return setError(err);

    setError("");

    if (step === 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(4);
        setShowConfetti(true);
      }, 800);
      return;
    }

    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setError("");
      setStep((s) => s - 1);
    }
  };

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
    };
  }, [profilePreview]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-10">
      {showConfetti && <Confetti />}

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <img src={logo} className="w-16 h-16 mx-auto rounded-full shadow mb-3" />
          <h1 className="text-3xl font-extrabold text-green-700">
            Join {chamaData.name}
          </h1>
          <p className="text-gray-600">
            Invite Code: <span className="font-bold">{code}</span>
          </p>

          {/* 👥 Members preview */}
          <p className="text-sm text-gray-500 mt-1">
            👥 {chamaData.members} members already joined
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border">

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-semibold mb-4">Personal Info</h2>

                <input
                  placeholder="Full name"
                  className="input"
                  value={personal.fullName}
                  onChange={(e) =>
                    setPersonal({ ...personal, fullName: e.target.value })
                  }
                />

                <input
                  placeholder="Email"
                  className="input mt-3"
                  value={personal.email}
                  onChange={(e) =>
                    setPersonal({ ...personal, email: e.target.value })
                  }
                />

                <input
                  placeholder="Phone"
                  className="input mt-3"
                  value={personal.phone}
                  onChange={(e) =>
                    setPersonal({ ...personal, phone: e.target.value })
                  }
                />

                {/* Upload */}
                <div className="mt-4">
                  <input type="file" onChange={onProfileChange} />
                  {profilePreview && (
                    <img
                      src={profilePreview}
                      className="w-14 h-14 rounded-full mt-2"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-semibold mb-4">About You</h2>

                <input
                  placeholder="Occupation"
                  className="input mb-3"
                  value={about.occupation}
                  onChange={(e) =>
                    setAbout({ ...about, occupation: e.target.value })
                  }
                />

                <textarea
                  placeholder="Tell us about yourself..."
                  className="input"
                  value={about.description}
                  onChange={(e) =>
                    setAbout({ ...about, description: e.target.value })
                  }
                />
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-semibold mb-4">Security</h2>

                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={security.password}
                  onChange={(e) =>
                    setSecurity({ ...security, password: e.target.value })
                  }
                />

                {/* 🔐 strength */}
                <p className={`text-sm mt-1 ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                  {passwordStrength && `Strength: ${passwordStrength}`}
                </p>

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input mt-3"
                  value={security.confirmPassword}
                  onChange={(e) =>
                    setSecurity({
                      ...security,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <label className="flex gap-2 mt-3 text-sm">
                  <input
                    type="checkbox"
                    checked={security.acceptTerms}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        acceptTerms: e.target.checked,
                      })
                    }
                  />
                  I agree to terms
                </label>

                {/* 📱 M-Pesa hint */}
                <p className="text-xs text-gray-500 mt-3">
                  💡 Payments in this chama are usually done via M-Pesa.
                </p>
              </motion.div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <motion.div
                key="4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-700">
                  Welcome 🎉
                </h2>
                <p className="text-gray-600">
                  You’ve joined {chamaData.name}
                </p>

                <a
                  href="/dashboard/member"
                  className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  Go to Dashboard
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {step !== 4 && (
          <div className="flex justify-between mt-6 items-center">
            <button onClick={handleBack} disabled={step === 1}>
              ← Back
            </button>

            <p className="text-red-600 text-sm">{error}</p>

            <button
              onClick={handleNext}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              {step === 3 ? (loading ? "Joining..." : "Join Chama") : "Next →"}
            </button>
          </div>
        )}
      </div>

      {/* styles */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          outline: none;
        }
        .input:focus {
          border-color: green;
          box-shadow: 0 0 0 2px rgba(0,128,0,0.2);
        }
      `}</style>
    </main>
  );
}