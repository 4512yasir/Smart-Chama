import { useState } from "react";
import {
  Download,
  TrendingUp,
  Wallet,
  AlertTriangle,
  Users,
  DollarSign,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ---------------- MOCK DATA ---------------- */
const trendData = [
  { month: "Jan", contributions: 12000, loans: 8000 },
  { month: "Feb", contributions: 15000, loans: 9000 },
  { month: "Mar", contributions: 18000, loans: 12000 },
  { month: "Apr", contributions: 22000, loans: 14000 },
  { month: "May", contributions: 30000, loans: 20000 },
];

const pieData = [
  { name: "Loans", value: 45, color: "#dc2626" },
  { name: "Savings", value: 35, color: "#16a34a" },
  { name: "Expenses", value: 20, color: "#2563eb" },
];

export default function ChairReportPage() {
  const [loading] = useState(false);

  const totalContributions = 97000;
  const totalLoans = 63000;
  const balance = totalContributions - totalLoans;
  const riskMembers = 4;

  const exportReport = () => {
    alert("📄 Exporting financial report...");
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Financial Reports Center
          </h1>
          <p className="text-gray-500">
            Insights, performance & financial health overview
          </p>
        </div>

        <button
          onClick={exportReport}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Contributions</p>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wallet size={18} /> {totalContributions}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Loans</p>
          <h2 className="text-2xl font-bold text-red-600">
            {totalLoans}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Balance</p>
          <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            <DollarSign size={18} />
            {balance}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Risk Members</p>
          <h2 className="text-2xl font-bold text-yellow-600 flex items-center gap-2">
            <AlertTriangle size={18} /> {riskMembers}
          </h2>
        </div>

      </div>

      {/* CHART SECTION */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* LINE CHART */}
        <div className="bg-white border rounded-2xl p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={16} /> Financial Trend
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="contributions"
                stroke="#16a34a"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="loans"
                stroke="#dc2626"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white border rounded-2xl p-5">
          <h2 className="font-semibold mb-4">
            Fund Distribution
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex gap-4 mt-3 text-sm">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: d.color }}
                />
                {d.name}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SUMMARY INSIGHT */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border p-5 rounded-2xl">

        <h2 className="font-semibold flex items-center gap-2">
          <Users size={16} /> Executive Insight
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          Your chama is financially stable with a positive balance ratio.
          Loan exposure is within safe limits. Risk level remains moderate
          but controlled.
        </p>

      </div>

    </div>
  );
}