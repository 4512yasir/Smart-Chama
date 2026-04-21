import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  CheckCircle,
  Clock,
  X,
  AlertCircle,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const totalContributions = 12000;
const maxLoanMultiplier = 2;
const interestRate = 10;

const activeLoan = {
  amount: 10000,
  balance: 6000,
  monthsLeft: 3,
  totalMonths: 6,
};

const loanHistory = [
  { id: 1, amount: 8000, status: "completed" },
  { id: 2, amount: 5000, status: "completed" },
];

export default function MemberLoanPage() {
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(1);

  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState(3);
  const [loading, setLoading] = useState(false);

  const maxLoan = totalContributions * maxLoanMultiplier;

  /* ---------------- CALCULATIONS ---------------- */
  const interest = amount ? (amount * interestRate) / 100 : 0;
  const totalRepay = amount ? Number(amount) + interest : 0;
  const monthly = months ? totalRepay / months : 0;

  const tooHigh = amount > maxLoan;

  const progress =
    activeLoan &&
    ((activeLoan.totalMonths - activeLoan.monthsLeft) /
      activeLoan.totalMonths) *
      100;

  /* ---------------- APPLY ---------------- */
  const handleApply = () => {
    if (!amount || tooHigh) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  return (
    <div className="space-y-8">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 rounded-3xl shadow">
        <p className="text-sm opacity-80">Loan Limit</p>
        <h2 className="text-3xl font-bold">
          KES {maxLoan.toLocaleString()}
        </h2>
        <p className="text-sm mt-2 opacity-80">
          Based on your contributions
        </p>
      </div>

      {/* ACTIVE LOAN */}
      {activeLoan && (
        <div className="bg-white p-6 rounded-3xl border space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">
              Active Loan
            </h2>
            <span className="text-sm text-gray-500">
              {activeLoan.monthsLeft} months left
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Balance</span>
            <span className="font-semibold text-red-500">
              KES {activeLoan.balance}
            </span>
          </div>

          {/* PROGRESS */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl">
            Pay Loan
          </button>
        </div>
      )}

      {/* APPLY BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Apply Loan
        </button>
      </div>

      {/* REPAYMENT TIMELINE */}
      {activeLoan && (
        <div className="bg-white p-6 rounded-3xl border">
          <h2 className="font-semibold mb-4">
            Repayment Schedule
          </h2>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <div key={m} className="flex items-center gap-4 text-sm">
                <div
                  className={`w-3 h-3 rounded-full ${
                    m <= 3 ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <p>
                  Month {m} —{" "}
                  {m <= 3 ? "Paid" : "Pending"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOAN HISTORY */}
      <div className="bg-white p-6 rounded-3xl border">
        <h2 className="font-semibold mb-4">
          Loan History
        </h2>

        {loanHistory.map((loan) => (
          <div
            key={loan.id}
            className="flex justify-between text-sm mb-3"
          >
            <span>KES {loan.amount}</span>
            <span className="text-green-600">
              {loan.status}
            </span>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenModal(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-md rounded-3xl p-6 space-y-6 z-50"
          >

            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Apply Loan</h2>
              <button onClick={() => setOpenModal(false)}>
                <X />
              </button>
            </div>

            {step === 1 && (
              <div className="space-y-4">

                <input
                  type="number"
                  placeholder="Loan amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full border p-3 rounded-xl"
                />

                {tooHigh && (
                  <p className="text-xs text-red-500 flex gap-1">
                    <AlertCircle size={14} />
                    Exceeds limit
                  </p>
                )}

                <select
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value={3}>3 months</option>
                  <option value={6}>6 months</option>
                  <option value={9}>9 months</option>
                </select>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-green-600 text-white py-3 rounded-xl"
                >
                  Continue
                </button>

              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">

                <div className="bg-gray-50 p-4 rounded-xl text-sm">
                  <p>Total: KES {totalRepay}</p>
                  <p>Monthly: KES {Math.round(monthly)}</p>
                </div>

                <button
                  onClick={handleApply}
                  className="w-full bg-green-600 text-white py-3 rounded-xl"
                >
                  Apply
                </button>

              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-3">
                <CheckCircle className="mx-auto text-green-600" />
                <p>Loan Submitted</p>
              </div>
            )}

          </motion.div>
        </div>
      )}

    </div>
  );
}