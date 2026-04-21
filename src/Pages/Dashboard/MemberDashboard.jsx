import { useState, useEffect } from "react";
import {
  Wallet,
  Users,
  Send,
  Bell,
  Copy,
  Trophy,
  Flame,
} from "lucide-react";
import QRCode from "react-qr-code";
import ContributionChart from "../../component/ContributionChart";

/* ---------------- MOCK DATA ---------------- */
const inviteLink = "https://smartchama.app/join/ABC123";

const leaderboard = [
  { name: "John", amount: 24000, badge: "🔥 Top Saver" },
  { name: "Mary", amount: 18000, badge: "💰 Consistent" },
  { name: "You", amount: 12000, badge: "🚀 Rising" },
];

const activities = [
  "You paid KES 2,000",
  "New member joined",
  "Cycle started",
];

/* ---------------- DASHBOARD ---------------- */
export default function MemberDashboard() {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);
  const [streak] = useState(4);

  const [loanAmount, setLoanAmount] = useState("");
  const [loanLoading, setLoanLoading] = useState(false);

  /* ---------------- COPY INVITE ---------------- */
  const copyInvite = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setToast("Invite link copied!");
    setTimeout(() => {
      setCopied(false);
      setToast(null);
    }, 1500);
  };

  /* ---------------- QUICK ACTIONS ---------------- */
  const handleQuickAction = (type) => {
    switch (type) {
      case "pay":
        setToast("Redirecting to payment...");
        break;
      case "members":
        setToast("Opening members...");
        break;
      case "send":
        setToast("Opening transfer...");
        break;
      case "alerts":
        setToast("Showing notifications...");
        break;
      default:
        break;
    }

    setTimeout(() => setToast(null), 1500);
  };

  /* ---------------- LOAN REQUEST ---------------- */
  const handleLoanRequest = () => {
    if (!loanAmount) {
      setToast("Enter loan amount");
      setTimeout(() => setToast(null), 1500);
      return;
    }

    setLoanLoading(true);

    setTimeout(() => {
      setLoanLoading(false);
      setLoanAmount("");
      setToast("Loan request submitted ✅");
      setTimeout(() => setToast(null), 1500);
    }, 1200);
  };

  /* ---------------- FAKE LIVE NOTIFICATIONS ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        activities[Math.floor(Math.random() * activities.length)];
      setToast(random);

      setTimeout(() => setToast(null), 2000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 bg-black text-white px-4 py-2 rounded-xl shadow-lg text-sm z-50">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Smart financial management</p>
        </div>

        <button
          onClick={copyInvite}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Invite"}
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Contributions</p>
          <h2 className="text-xl font-bold">KES 12,000</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Next Payment</p>
          <h2 className="text-xl font-bold">KES 2,000</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Streak</p>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Flame className="text-orange-500" /> {streak} months
          </h2>
        </div>

        <div className="bg-green-600 text-white p-5 rounded-2xl">
          <p className="text-sm">Status</p>
          <h2 className="text-xl font-bold">Active</h2>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* CHART */}
          <div className="bg-white p-6 rounded-3xl border">
            <h2 className="font-semibold mb-4">Contribution Trends</h2>
            <ContributionChart />
          </div>

          {/* ACTIVITY */}
          <div className="bg-white p-6 rounded-3xl border">
            <h2 className="font-semibold mb-4">Activity</h2>

            {activities.map((a, i) => (
              <div key={i} className="text-sm text-gray-600 mb-2">
                • {a}
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* QR INVITE */}
          <div className="bg-white p-5 rounded-3xl border text-center">
            <h2 className="font-semibold mb-3">Invite via QR</h2>

            <div className="bg-white p-3 inline-block rounded-xl">
              <QRCode value={inviteLink} size={120} />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Scan to join your chama
            </p>
          </div>

          {/* LEADERBOARD */}
          <div className="bg-white p-5 rounded-3xl border">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="text-yellow-500" />
              <h2 className="font-semibold">Leaderboard</h2>
            </div>

            {leaderboard.map((m, i) => (
              <div key={i} className="flex justify-between text-sm mb-2">
                <div>
                  <p>{m.name}</p>
                  <p className="text-xs text-gray-400">{m.badge}</p>
                </div>
                <span className="font-semibold">KES {m.amount}</span>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white p-5 rounded-3xl border">
            <h2 className="font-semibold mb-3">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickAction("pay")}
                className="p-3 bg-gray-50 hover:bg-green-50 rounded-xl flex gap-2 items-center transition"
              >
                <Wallet size={16} /> Pay
              </button>

              <button
                onClick={() => handleQuickAction("members")}
                className="p-3 bg-gray-50 hover:bg-green-50 rounded-xl flex gap-2 items-center transition"
              >
                <Users size={16} /> Members
              </button>

              <button
                onClick={() => handleQuickAction("send")}
                className="p-3 bg-gray-50 hover:bg-green-50 rounded-xl flex gap-2 items-center transition"
              >
                <Send size={16} /> Send
              </button>

              <button
                onClick={() => handleQuickAction("alerts")}
                className="p-3 bg-gray-50 hover:bg-green-50 rounded-xl flex gap-2 items-center transition"
              >
                <Bell size={16} /> Alerts
              </button>
            </div>
          </div>

          {/* LOAN */}
          <div className="bg-white p-5 rounded-3xl border">
            <h2 className="font-semibold mb-3">Request Loan</h2>

            <input
              type="number"
              placeholder="Amount (KES)"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              onClick={handleLoanRequest}
              disabled={loanLoading}
              className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              {loanLoading ? "Processing..." : "Request Loan"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}