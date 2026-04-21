import { useState } from "react";
import {
  Download,
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react";
import ContributionChart from "../../component/ContributionChart";

export default function MemberReportsPage() {
  const [range, setRange] = useState("monthly");

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500">
            Financial insights & performance
          </p>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded-xl flex gap-2">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* RANGE FILTER */}
      <div className="flex gap-2">
        {["monthly", "quarterly", "yearly"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-lg text-sm ${
              range === r
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Growth Rate</p>
          <h2 className="text-xl font-bold flex gap-1 items-center">
            <TrendingUp size={16} /> +18%
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Loan Usage</p>
          <h2 className="text-xl font-bold">65%</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Repayment Rate</p>
          <h2 className="text-xl font-bold text-green-600">
            92%
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Risk Level</p>
          <h2 className="text-xl font-bold text-yellow-500">
            Medium
          </h2>
        </div>

      </div>

      {/* MAIN CHART */}
      <div className="bg-white p-6 rounded-3xl border">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <BarChart3 size={18} /> Contributions Trend
        </h2>
        <ContributionChart />
      </div>

      {/* SECONDARY INSIGHTS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-white p-6 rounded-3xl border">
          <h2 className="font-semibold mb-3">
            Loan vs Contributions
          </h2>
          <p className="text-sm text-gray-600">
            Loans are increasing faster than contributions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border">
          <h2 className="font-semibold mb-3 flex gap-2 items-center">
            <Activity size={16} /> Behavior Insight
          </h2>
          <p className="text-sm text-gray-600">
            Members are consistent but loan demand is rising.
          </p>
        </div>

      </div>

    </div>
  );
}