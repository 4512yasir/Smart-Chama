import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Upload, CheckCircle } from "lucide-react";

export default function JoinChama() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const onProfileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (profilePreview) URL.revokeObjectURL(profilePreview);
    setProfilePreview(URL.createObjectURL(f));
  };

  const validateStep = () => {
    if (step === 1 && (!personal.fullName || !personal.email))
      return "Please fill your personal info.";
    if (step === 2 && !about.description)
      return "Please add a short description about yourself.";
    if (step === 3) {
      if (!security.password || !security.confirmPassword)
        return "Please enter and confirm your password.";
      if (security.password !== security.confirmPassword)
        return "Passwords do not match.";
      if (!security.acceptTerms)
        return "Please accept the terms to continue.";
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
      }, 700);
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
    <main className="min-h-screen bg-linear-to-b from-green-50 to-white px-3 sm:px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-700">
            Join a Chama
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Complete your profile to join the Chama.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.section
                key="s1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Step 1 — Personal Info
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Full name"
                    className="input"
                    value={personal.fullName}
                    onChange={(e) =>
                      setPersonal({ ...personal, fullName: e.target.value })
                    }
                  />
                  <input
                    placeholder="Email address"
                    className="input"
                    value={personal.email}
                    onChange={(e) =>
                      setPersonal({ ...personal, email: e.target.value })
                    }
                  />
                  <input
                    placeholder="Phone (optional)"
                    className="input"
                    value={personal.phone}
                    onChange={(e) =>
                      setPersonal({ ...personal, phone: e.target.value })
                    }
                  />

                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      ref={profileFileRef}
                      onChange={onProfileChange}
                      className="text-sm"
                    />
                    {profilePreview && (
                      <img
                        src={profilePreview}
                        alt="preview"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </motion.section>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.section
                key="s2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Step 2 — About You
                </h2>

                <input
                  placeholder="Occupation (optional)"
                  className="input mb-4"
                  value={about.occupation}
                  onChange={(e) =>
                    setAbout({ ...about, occupation: e.target.value })
                  }
                />

                <textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="input"
                  value={about.description}
                  onChange={(e) =>
                    setAbout({ ...about, description: e.target.value })
                  }
                />
              </motion.section>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.section
                key="s3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Step 3 — Security
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="password"
                    placeholder="Create password"
                    className="input"
                    value={security.password}
                    onChange={(e) =>
                      setSecurity({ ...security, password: e.target.value })
                    }
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="input"
                    value={security.confirmPassword}
                    onChange={(e) =>
                      setSecurity({ ...security, confirmPassword: e.target.value })
                    }
                  />
                </div>

                <label className="flex items-start gap-2 mt-4 text-sm">
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
                  <span>I agree to the terms & privacy policy</span>
                </label>
              </motion.section>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <motion.section
                key="s4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-green-700">
                  Welcome to the Chama!
                </h2>
                <p className="text-gray-600 mt-2 mb-6 text-sm sm:text-base">
                  Your profile has been created successfully.
                </p>

                <a
                  href="/dashboard/member"
                  className="block w-full sm:w-auto sm:inline-block px-6 py-3 bg-green-600 text-white rounded-lg"
                >
                  Go to Dashboard
                </a>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {step !== 4 && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
            <button
              onClick={handleBack}
              disabled={step === 1 || loading}
              className="text-sm disabled:opacity-40"
            >
              ← Back
            </button>

            <p className="text-sm text-red-600 text-center">{error}</p>

            <button
              onClick={handleNext}
              disabled={loading}
              className="bg-green-600 text-white px-5 py-3 rounded-lg"
            >
              {step === 3 ? (loading ? "Joining..." : "Join Chama") : "Next →"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
