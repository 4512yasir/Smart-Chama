import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Wallet,
  Users,
} from "lucide-react";

/* ---------------- MOCK LOANS ---------------- */
const initialLoans = [
  {
    id: 1,
    name: "John Doe",
    amount: 20000,
    contribution: 15000,
    risk: "low",
    status: "pending",
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    amount: 50000,
    contribution: 12000,
    risk: "high",
    status: "pending",
  },
  {
    id: 3,
    name: "Peter Kimani",
    amount: 10000,
    contribution: 8000,
    risk: "medium",
    status: "approved",
  },
];

/* ---------------- RISK COLOR ---------------- */
const riskColor = (risk) => {
  if (risk === "low") return "text-green-600 bg-green-50";
  if (risk === "medium") return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};

export default function ChairLoanPage() {
  const [loans, setLoans] = useState(initialLoans);

  /* ---------------- ACTIONS ---------------- */
  const approveLoan = (id) => {
    setLoans((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "approved" } : l
      )
    );
  };

  const rejectLoan = (id) => {
    setLoans((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "rejected" } : l
      )
    );
  };

  /* ---------------- STATS ---------------- */
  const totalLoans = loans.length;
  const pending = loans.filter((l) => l.status === "pending").length;
  const approved = loans.filter((l) => l.status === "approved").length;
  const riskLoans = loans.filter((l) => l.risk === "high").length;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Loan Management Center
        </h1>
        <p className="text-gray-500">
          Approve, monitor and manage member loans
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Total Loans</p>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wallet size={18} /> {totalLoans}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            {pending}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Approved</p>
          <h2 className="text-2xl font-bold text-green-600">
            {approved}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">High Risk</p>
          <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <AlertTriangle size={18} /> {riskLoans}
          </h2>
        </div>

      </div>

      {/* LOAN QUEUE */}
      <div className="bg-white border rounded-2xl p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Users size={16} /> Loan Approval Queue
        </h2>

        <div className="space-y-3">

          {loans.map((loan) => (
            <motion.div
              key={loan.id}
              className="flex justify-between items-center border p-4 rounded-xl hover:shadow-sm transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >

              {/* LEFT */}
              <div>
                <p className="font-medium">{loan.name}</p>
                <p className="text-sm text-gray-500">
                  Request: KES {loan.amount}
                </p>
                <p className="text-xs text-gray-400">
                  Contribution: KES {loan.contribution}
                </p>
              </div>

              {/* CENTER RISK */}
              <span
                className={`text-xs px-3 py-1 rounded-full ${riskColor(
                  loan.risk
                )}`}
              >
                {loan.risk.toUpperCase()}
              </span>

              {/* STATUS + ACTIONS */}
              <div className="flex items-center gap-2">

                {loan.status === "pending" ? (
                  <>
                    <button
                      onClick={() => approveLoan(loan.id)}
                      className="text-green-600 hover:scale-110 transition"
                    >
                      <CheckCircle />
                    </button>

                    <button
                      onClick={() => rejectLoan(loan.id)}
                      className="text-red-600 hover:scale-110 transition"
                    >
                      <XCircle />
                    </button>
                  </>
                ) : (
                  <span
                    className={`text-sm font-semibold ${
                      loan.status === "approved"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {loan.status}
                  </span>
                )}

              </div>

            </motion.div>
          ))}

        </div>
      </div>

      {/* RISK INSIGHT PANEL */}
      <div className="bg-gradient-to-r from-red-50 to-yellow-50 border p-5 rounded-2xl">
        <h2 className="font-semibold flex items-center gap-2">
          <TrendingUp size={16} /> Risk Insight Engine
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          High-risk loans are flagged automatically based on contribution ratio
          vs requested amount. Future version will include AI scoring.
        </p>
      </div>

    </div>
  );
}