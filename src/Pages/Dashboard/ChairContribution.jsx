import { useState } from "react";
import {
  Download,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

/* ---------------- MOCK DATA ---------------- */
const initialData = [
  { id: 1, name: "John Doe", amount: 2000 },
  { id: 2, name: "Mary Wanjiku", amount: 1500 },
  { id: 3, name: "Peter Kimani", amount: 3000 },
];

export default function ChairContributionsPage() {
  const [data] = useState(initialData);

  /* ---------------- FINANCIAL ENGINE ---------------- */
  const totalCollected = data.reduce((sum, t) => sum + t.amount, 0);

// mock deductions
const totalLoans = 8000;
const totalActivities = 5000;

const availableFunds = totalCollected - (totalLoans + totalActivities);

const totalExpected = 50000;

const liquidityRatio = (availableFunds / totalExpected) * 100;

const burnRate = totalLoans + totalActivities;

const isLowLiquidity = availableFunds < totalExpected * 0.2;

const isOverSpent = availableFunds < 0;

const safeLoanLimit = availableFunds * 0.8;

/* ---------------- CASHFLOW DATA ---------------- */
const cashflowData = [
  { month: "Jan", inflow: 12000, outflow: 5000 },
  { month: "Feb", inflow: 18000, outflow: 7000 },
  { month: "Mar", inflow: 15000, outflow: 6000 },
  { month: "Apr", inflow: 22000, outflow: 12000 },
  { month: "May", inflow: 30000, outflow: 15000 },
];

/* ---------------- EXPORT ---------------- */
const exportPDF = () => {
  alert("PDF export coming soon");
};

return (
  <div className="space-y-8">

    {/* HEADER */}
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">
          Contribution Intelligence Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Financial control center for chama
        </p>
      </div>

      <button
        onClick={exportPDF}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl"
      >
        <Download size={16} />
        Export
      </button>
    </div>

    {/* ALERTS */}
    {isOverSpent && (
      <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl">
        🚨 Fraud Alert: Negative liquidity detected!
      </div>
    )}

    {isLowLiquidity && !isOverSpent && (
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 p-4 rounded-xl">
        ⚠️ Low liquidity warning: Funds below safe threshold.
      </div>
    )}

    {/* KPI CARDS */}
    <div className="grid md:grid-cols-4 gap-4">

      <div className="bg-white p-5 rounded-2xl border">
        <p className="text-sm text-gray-500">Collected</p>
        <h2 className="text-xl font-bold text-green-600">
          KES {totalCollected}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-2xl border">
        <p className="text-sm text-gray-500">Available Funds</p>
        <h2 className="text-xl font-bold text-blue-600">
          KES {availableFunds}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-2xl border">
        <p className="text-sm text-gray-500">Burn Rate</p>
        <h2 className="text-xl font-bold text-red-500">
          KES {burnRate}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-2xl border">
        <p className="text-sm text-gray-500">Safe Loan Limit</p>
        <h2 className="text-xl font-bold text-indigo-600">
          KES {safeLoanLimit}
        </h2>
      </div>

    </div>

    {/* CASHFLOW CHART */}
    <div className="bg-white p-5 rounded-2xl border">
      <h2 className="font-semibold mb-4">
        Cashflow Intelligence
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={cashflowData}>

          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="inflow"
            stroke="#16a34a"
            fill="#bbf7d0"
          />

          <Area
            type="monotone"
            dataKey="outflow"
            stroke="#dc2626"
            fill="#fecaca"
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* SIMPLE CONTRIBUTION LIST */}
    <div className="bg-white p-5 rounded-2xl border">
      <h2 className="font-semibold mb-4">
        Recent Contributions
      </h2>

      <div className="space-y-3">
        {data.map((t) => (
          <div
            key={t.id}
            className="flex justify-between border p-3 rounded-xl"
          >
            <p>{t.name}</p>
            <p className="font-bold text-green-600">
              KES {t.amount}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
);
}