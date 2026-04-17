import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Wallet,
  Users,
  Send,
  Copy,
  Trophy,
  Calendar,
} from "lucide-react";

import ContributionChart from "../../component/ContributionChart";

/* ---------------- MOCK DATA ---------------- */
const inviteLink = "https://smartchama.app/join/ABC123";

const leaderboard = [
  { name: "John Doe", amount: 24000 },
  { name: "Mary Wanjiku", amount: 18000 },
  { name: "You", amount: 12000 },
];

const activityFeed = [
  { text: "You paid KES 2,000", time: "2h ago", type: "success" },
  { text: "Member joined your chama", time: "1d ago", type: "info" },
  { text: "Contribution cycle started", time: "2d ago", type: "system" },
];

/* ---------------- DASHBOARD ---------------- */
export default function MemberDashboard() {
  const [copied, setCopied] = useState(false);

  const copyInvite = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Member Dashboard
          </h1>
          <p className="text-gray-500">
            Manage your chama activity in real time
          </p>
        </div>

        {/* INVITE BUTTON */}
        <button
          onClick={copyInvite}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Invite Members"}
        </button>
      </div>

      {/* TOP STATS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">Contributions</p>
          <h2 className="text-2xl font-bold mt-1">KES 12,000</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">Next Payment</p>
          <h2 className="text-2xl font-bold mt-1">KES 2,000</h2>
        </div>

        <div className="bg-green-600 text-white p-5 rounded-2xl">
          <p className="text-sm text-green-100">Status</p>
          <h2 className="text-2xl font-bold mt-1">Active</h2>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* CHART */}
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-green-600" />
              <h2 className="font-semibold">Contribution Trends</h2>
            </div>
            <ContributionChart />
          </div>

          {/* ACTIVITY FEED */}
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <h2 className="font-semibold mb-4">Live Activity Feed</h2>

            <div className="space-y-4">
              {activityFeed.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm font-medium">{a.text}</p>
                    <p className="text-xs text-gray-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* INVITE CARD */}
          <div className="bg-white p-5 rounded-3xl border shadow-sm">
            <h2 className="font-semibold mb-3">Invite Members</h2>

            <div className="bg-gray-100 p-3 rounded-xl text-xs break-all">
              {inviteLink}
            </div>

            <button
              onClick={copyInvite}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              Copy Invite Link
            </button>
          </div>

          {/* LEADERBOARD */}
          <div className="bg-white p-5 rounded-3xl border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-yellow-500" />
              <h2 className="font-semibold">Leaderboard</h2>
            </div>

            <div className="space-y-3">
              {leaderboard.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center"
                >
                  <p className="text-sm">{m.name}</p>
                  <span className="text-sm font-semibold">
                    KES {m.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white p-5 rounded-3xl border shadow-sm">
            <h2 className="font-semibold mb-3">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-3">

              <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Wallet size={16} /> Pay
              </button>

              <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Users size={16} /> Members
              </button>

              <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Send size={16} /> Send
              </button>

              <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Bell size={16} /> Alerts
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}