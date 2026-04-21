import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  AlertTriangle,
  CheckCircle,
  Clock,
  Bell,
  Download,
  CreditCard,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const contributions = [
  { month: "January", amount: 2000, status: "paid" },
  { month: "February", amount: 2000, status: "missed" },
  { month: "March", amount: 2000, status: "paid" },
  { month: "April", amount: 2000, status: "paid" },
];

export default function MemberContributions() {
  const [loadingPay, setLoadingPay] = useState(false);

  const missedPayments = contributions.filter((c) => c.status === "missed");

  const totalPaid = contributions
    .filter((c) => c.status === "paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalDue = contributions.reduce((acc, c) => acc + c.amount, 0);

  const recoveryScore =
    missedPayments.length === 0
      ? "Excellent"
      : missedPayments.length === 1
      ? "Good"
      : missedPayments.length === 2
      ? "At Risk"
      : "Critical";

  const handlePay = () => {
    setLoadingPay(true);

    setTimeout(() => {
      setLoadingPay(false);
      alert("M-Pesa payment flow will be integrated here 💳");
    }, 1200);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Contributions
          </h1>
          <p className="text-gray-500">
            Track payments, recovery status & financial health
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100">
          Recovery Status: {recoveryScore}
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">Total Paid</p>
          <h2 className="text-2xl font-bold text-green-600">
            KES {totalPaid}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">Total Expected</p>
          <h2 className="text-2xl font-bold">
            KES {totalDue}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">Missed Payments</p>
          <h2 className="text-2xl font-bold text-red-600">
            {missedPayments.length}
          </h2>
        </div>

      </div>

      {/* PAY NOW (M-PESA READY) */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-semibold text-green-800">
            Pay Contribution
          </h2>
          <p className="text-sm text-gray-600">
            M-Pesa integration will be enabled here
          </p>
        </div>

        <button
          onClick={handlePay}
          disabled={loadingPay}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          <CreditCard size={16} />
          {loadingPay ? "Processing..." : "Pay Now"}
        </button>
      </div>

      {/* CONTRIBUTION HISTORY */}
      <div className="bg-white p-6 rounded-3xl border shadow-sm">
        <h2 className="font-semibold mb-4">Contribution History</h2>

        <div className="space-y-3">
          {contributions.map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border rounded-xl"
            >
              <div className="flex items-center gap-3">
                {c.status === "paid" ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <AlertTriangle className="text-red-500" />
                )}

                <div>
                  <p className="font-medium">{c.month}</p>
                  <p className="text-sm text-gray-500">
                    KES {c.amount}
                  </p>
                </div>
              </div>

              <span
                className={`text-sm font-semibold ${
                  c.status === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {c.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SMART RECOVERY CENTER */}
      {missedPayments.length > 0 && (
        <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-5">

          <div>
            <h2 className="text-lg font-semibold text-red-600">
              Smart Recovery Center
            </h2>
            <p className="text-sm text-gray-500">
              You have missed payments. Choose recovery option.
            </p>
          </div>

          <div className="space-y-3">
            {missedPayments.map((m, i) => (
              <div
                key={i}
                className="flex justify-between bg-red-50 border border-red-100 p-4 rounded-xl"
              >
                <div>
                  <p className="font-medium">{m.month}</p>
                  <p className="text-sm text-gray-500">
                    KES {m.amount} overdue
                  </p>
                </div>

                <span className="text-red-600 font-semibold text-sm">
                  Overdue
                </span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-3">

            <button className="border p-4 rounded-xl text-left hover:bg-gray-50">
              <p className="font-semibold">Pay Now</p>
              <p className="text-xs text-gray-500">
                Clear full amount instantly
              </p>
            </button>

            <button className="border p-4 rounded-xl text-left hover:bg-gray-50">
              <p className="font-semibold">Split Payment</p>
              <p className="text-xs text-gray-500">
                Pay in installments
              </p>
            </button>

            <button className="border p-4 rounded-xl text-left hover:bg-gray-50">
              <p className="font-semibold">Promise to Pay</p>
              <p className="text-xs text-gray-500">
                Set future date
              </p>
            </button>

          </div>

        </div>
      )}

      {/* REMINDER SYSTEM */}
      <div className="bg-yellow-50 border border-yellow-100 p-5 rounded-2xl flex justify-between items-center">
        <div>
          <p className="font-semibold text-yellow-700">
            Smart Reminder System
          </p>
          <p className="text-sm text-gray-600">
            SMS / WhatsApp reminders coming soon
          </p>
        </div>

        <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm">
          Enable
        </button>
      </div>

    </div>
  );
}