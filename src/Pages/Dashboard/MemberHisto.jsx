import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Banknote,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const payments = [
  { id: 1, amount: 2000, date: "April 2026", status: "paid" },
  { id: 2, amount: 2000, date: "March 2026", status: "paid" },
  { id: 3, amount: 2000, date: "February 2026", status: "missed" },
];

const loans = [
  { id: 1, amount: 10000, status: "approved", date: "Jan 2026" },
  { id: 2, amount: 5000, status: "pending", date: "March 2026" },
];

const activity = [
  "Paid KES 2,000 - April",
  "Loan approved - KES 10,000",
  "Missed contribution - February",
];

/* ---------------- PAGE ---------------- */
export default function MemberHistoryPage() {
  const [tab, setTab] = useState("payments");
  const [filter, setFilter] = useState("all");

  const renderStatus = (status) => {
    if (status === "paid" || status === "approved") {
      return (
        <span className="text-green-600 flex items-center gap-1">
          <CheckCircle size={14} /> {status}
        </span>
      );
    }
    if (status === "missed" || status === "rejected") {
      return (
        <span className="text-red-500 flex items-center gap-1">
          <XCircle size={14} /> {status}
        </span>
      );
    }
    return (
      <span className="text-yellow-600 flex items-center gap-1">
        <Clock size={14} /> {status}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Financial History
        </h1>
        <p className="text-gray-500">
          Track your contributions, loans & activity
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {["payments", "loans", "activity"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              tab === t
                ? "bg-white shadow font-medium"
                : "text-gray-600"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border">
        <div className="flex items-center gap-2 text-gray-600">
          <Filter size={16} />
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="outline-none bg-transparent text-sm"
          >
            <option value="all">All</option>
            <option value="recent">Recent</option>
            <option value="this-year">This Year</option>
          </select>
        </div>

        <p className="text-xs text-gray-400">
          Filter transactions
        </p>
      </div>

      {/* PAYMENTS */}
      {tab === "payments" && (
        <div className="space-y-4">
          {payments.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-5 rounded-2xl border flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <Wallet className="text-green-600" />
                <div>
                  <p className="font-medium">KES {p.amount}</p>
                  <p className="text-xs text-gray-500">{p.date}</p>
                </div>
              </div>

              {renderStatus(p.status)}
            </motion.div>
          ))}
        </div>
      )}

      {/* LOANS */}
      {tab === "loans" && (
        <div className="space-y-4">
          {loans.map((l) => (
            <motion.div
              key={l.id}
              className="bg-white p-5 rounded-2xl border flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <Banknote className="text-blue-600" />
                <div>
                  <p className="font-medium">KES {l.amount}</p>
                  <p className="text-xs text-gray-500">{l.date}</p>
                </div>
              </div>

              {renderStatus(l.status)}
            </motion.div>
          ))}
        </div>
      )}

      {/* ACTIVITY */}
      {tab === "activity" && (
        <div className="bg-white p-6 rounded-2xl border space-y-3">
          {activity.map((a, i) => (
            <p key={i} className="text-sm text-gray-600">
              • {a}
            </p>
          ))}
        </div>
      )}

    </div>
  );
}