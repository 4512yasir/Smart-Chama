import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, Copy } from "lucide-react";

export default function RegisterChama() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [chama, setChama] = useState({
    name: "",
    shortName: "",
    type: "savings",
    contributionFrequency: "monthly",
  });

  const [meta, setMeta] = useState({
    description: "",
    rules: "",
    meetingSchedule: "",
  });

  const [chair, setChair] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const profileFileRef = useRef(null);

  const [security, setSecurity] = useState({
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [generated, setGenerated] = useState({
    chamaCode: "",
    inviteLink: "",
  });

  // utils
  const makeSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 12);

  const generateChamaCode = (name) => {
    const prefix = "sm";
    const slug = (chama.shortName || makeSlug(name) || "cha").slice(0, 3);
    const seq = Math.floor(1 + Math.random() * 999)
      .toString()
      .padStart(3, "0");
    return `${prefix}-${slug}-${seq}`;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed — select and copy manually");
    }
  };

  const onProfileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (profilePreview) URL.revokeObjectURL(profilePreview); // cleanup old preview
    setProfilePreview(URL.createObjectURL(f));
  };

  // inline validation
  const validateStep = () => {
    if (step === 1) {
      if (!chama.name) return "Please enter the Chama name.";
    }
    if (step === 2) {
      if (!meta.description) return "Please add a short description.";
    }
    if (step === 3) {
      if (!chair.fullName || !chair.email)
        return "Please fill your personal details.";
    }
    if (step === 4) {
      if (!security.password || !security.confirmPassword)
        return "Please enter and confirm your password.";
      if (security.password !== security.confirmPassword)
        return "Passwords do not match.";
      if (!security.acceptTerms)
        return "Please accept the terms to continue.";
    }
    return "";
  };

  const handleNext = async () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    if (step === 4) {
      setLoading(true);
      setTimeout(() => {
        const code = generateChamaCode(chama.name);
        const link = `${window.location.origin}/join/${code}`;
        setGenerated({ chamaCode: code, inviteLink: link });
        setLoading(false);
        setStep(5);
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

  // cleanup profile URL on unmount
  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
    };
  }, [profilePreview]);

  return (
    <main className="min-h-screen bg-linear-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header + Step Indicator */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-700">
            Register a Chama
          </h1>
          <p className="text-gray-600 mt-2">
            Create your Chama and invite members with a friendly invite link.
          </p>

          <div className="mt-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-green-600 rounded-full transition-all"
                    style={{ width: `${((step - 1) / 4) * 100}%` }}
                    aria-hidden
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span
                    className={step >= 1 ? "text-green-700 font-medium" : "text-gray-500"}
                  >
                    Chama
                  </span>
                  <span
                    className={step >= 2 ? "text-green-700 font-medium" : "text-gray-500"}
                  >
                    Description
                  </span>
                  <span
                    className={step >= 3 ? "text-green-700 font-medium" : "text-gray-500"}
                  >
                    Chairperson
                  </span>
                  <span
                    className={step >= 4 ? "text-green-700 font-medium" : "text-gray-500"}
                  >
                    Security
                  </span>
                  <span
                    className={step === 5 ? "text-green-700 font-medium" : "text-gray-500"}
                  >
                    Done
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Step 1 — Chama details
                </h2>

                <label className="block text-sm text-gray-600 mb-1">Chama name</label>
                <input
                  value={chama.name}
                  onChange={(e) => setChama({ ...chama, name: e.target.value })}
                  placeholder="e.g. Tustahimili"
                  className="w-full p-3 rounded-lg border border-gray-200 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <label className="block text-sm text-gray-600 mb-1">Short name (optional)</label>
                <input
                  value={chama.shortName}
                  onChange={(e) => setChama({ ...chama, shortName: e.target.value })}
                  placeholder="three-letter short slug (e.g. tsm)"
                  className="w-full p-3 rounded-lg border border-gray-200 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <label className="block text-sm text-gray-600 mb-1">Chama type</label>
                <select
                  value={chama.type}
                  onChange={(e) => setChama({ ...chama, type: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-200 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="savings">Savings</option>
                  <option value="investment">Investment</option>
                  <option value="rotational">Rotational</option>
                </select>

                <label className="block text-sm text-gray-600 mb-1">Contribution frequency</label>
                <select
                  value={chama.contributionFrequency}
                  onChange={(e) =>
                    setChama({ ...chama, contributionFrequency: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border border-gray-200 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Step 2 — Description & rules
                </h2>

                <label className="block text-sm text-gray-600 mb-1">Short description</label>
                <textarea
                  value={meta.description}
                  onChange={(e) => setMeta({ ...meta, description: e.target.value })}
                  rows={4}
                  placeholder="Describe the purpose and goals of the chama..."
                  className="w-full p-3 rounded-lg border border-gray-200 mb-3 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <label className="block text-sm text-gray-600 mb-1">Rules / meeting schedule (optional)</label>
                <textarea
                  value={meta.rules}
                  onChange={(e) => setMeta({ ...meta, rules: e.target.value })}
                  rows={4}
                  placeholder="Add rules, meeting schedule, penalties, decision-making rules..."
                  className="w-full p-3 rounded-lg border border-gray-200 mb-3 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <label className="block text-sm text-gray-600 mb-1">Meeting schedule (optional)</label>
                <input
                  value={meta.meetingSchedule}
                  onChange={(e) => setMeta({ ...meta, meetingSchedule: e.target.value })}
                  placeholder="e.g. 1st Saturday of every month, 6PM"
                  className="w-full p-3 rounded-lg border border-gray-200 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Step 3 — Chairperson details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Full name</label>
                    <input
                      value={chair.fullName}
                      onChange={(e) => setChair({ ...chair, fullName: e.target.value })}
                      placeholder="Your full name"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                      value={chair.email}
                      onChange={(e) => setChair({ ...chair, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone</label>
                    <input
                      value={chair.phone}
                      onChange={(e) => setChair({ ...chair, phone: e.target.value })}
                      placeholder="+254..."
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">National ID (optional)</label>
                    <input
                      placeholder="ID/passport"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm text-gray-600 mb-1">Profile picture</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onProfileChange}
                      ref={profileFileRef}
                      className="p-2 border border-gray-200 rounded-lg"
                    />
                    <Upload className="text-green-600" />
                    {profilePreview && (
                      <img
                        src={profilePreview}
                        alt="preview"
                        className="w-14 h-14 rounded-full object-cover border"
                      />
                    )}
                  </div>
                </div>
              </motion.section>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <motion.section
                key="s4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Step 4 — Security
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Create password</label>
                    <input
                      type="password"
                      value={security.password}
                      onChange={(e) => setSecurity({ ...security, password: e.target.value })}
                      placeholder="Strong password"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Confirm password</label>
                    <input
                      type="password"
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={security.acceptTerms}
                      onChange={(e) =>
                        setSecurity({ ...security, acceptTerms: e.target.checked })
                      }
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the Chama terms & privacy policy
                    </span>
                  </label>
                </div>
              </motion.section>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <motion.section
                key="s5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <div className="inline-block bg-green-50 p-4 rounded-full mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <h2 className="text-2xl font-bold text-green-700 mb-2">Chama Created</h2>
                <p className="text-gray-600 mb-4">
                  Your invite link is ready — share it with members to let them join.
                </p>

                <div className="bg-white border border-green-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500">Chama code</p>
                  <div className="font-mono font-semibold text-lg">{generated.chamaCode}</div>
                  <p className="text-sm text-gray-500 mt-3">Invite link</p>
                  <div className="flex gap-2 items-center mt-2">
                    <div className="wrap-break-words">{generated.inviteLink}</div>
                    <button
                      onClick={() => copyToClipboard(generated.inviteLink)}
                      className="ml-auto p-2 rounded-md bg-gray-50 border hover:bg-gray-100"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <a href="/dashboard/chairperson" className="px-6 py-2 rounded-lg bg-green-600 text-white">
                    Go to Dashboard
                  </a>
                  <button
                    onClick={() => {
                      if(profilePreview) URL.revokeObjectURL(profilePreview);
                      setStep(1);
                      setChama({ name: "", shortName: "", type: "savings", contributionFrequency: "monthly" });
                      setMeta({ description: "", rules: "", meetingSchedule: "" });
                      setChair({ fullName: "", email: "", phone: "" });
                      setProfilePreview(null);
                      setSecurity({ password: "", confirmPassword: "", acceptTerms: false });
                      setGenerated({ chamaCode: "", inviteLink: "" });
                    }}
                    className="px-6 py-2 rounded-lg border"
                  >
                    Register another Chama
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom toolbar */}
        {step !== 5 && (
          <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center px-2">
            <button
              onClick={handleBack}
              disabled={step === 1 || loading}
              className={`px-4 py-2 rounded-lg ${
                step === 1 || loading ? "text-gray-400" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              ← Back
            </button>

            <div className="text-sm text-red-600">{error}</div>

            <button
              onClick={handleNext}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-green-600 text-white"
            >
              {step === 4 ? (loading ? "Creating..." : "Create Chama") : "Next →"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
