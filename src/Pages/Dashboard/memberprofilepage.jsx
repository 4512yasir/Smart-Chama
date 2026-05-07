import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

/* ---------------- MOCK DATA ---------------- */
const member = {
  name: "John Doe",
  phone: "0712345678",
  contributions: 25000,
  loans: 10000,
  riskScore: 32,
};

const contributionData = [
  { month: "Jan", value: 2000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 5000 },
  { month: "Apr", value: 7000 },
];

const loanData = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 2000 },
  { month: "Mar", value: 5000 },
  { month: "Apr", value: 3000 },
];

const comparison = [
  { name: "Contributions", value: member.contributions },
  { name: "Loans", value: member.loans },
];

/* ---------------- COMPONENT ---------------- */
export default function MemberProfilePage() {
  const navigate = useNavigate();

  const riskColor =
    member.riskScore < 30
      ? "text-green-600"
      : member.riskScore < 60
      ? "text-yellow-600"
      : "text-red-600";

  const riskBg =
    member.riskScore < 30
      ? "bg-green-500"
      : member.riskScore < 60
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-100 rounded-lg"
        >
          <ArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold">
            Member Intelligence
          </h1>
          <p className="text-gray-500">
            Financial behavior & risk insights
          </p>
        </div>
      </div>

      {/* HERO CARD */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between gap-6">

        <div>
          <h2 className="text-xl font-semibold">
            {member.name}
          </h2>
          <p className="text-green-100 text-sm">
            {member.phone}
          </p>

          <p className="mt-4 text-sm text-green-100">
            Net Position
          </p>
          <h3 className="text-2xl font-bold">
            KES {member.contributions - member.loans}
          </h3>
        </div>

        {/* RISK METER */}
        <div className="flex flex-col items-center justify-center">

          <p className="text-sm mb-2">Risk Score</p>

          <div className="w-28 h-28 rounded-full border-4 border-white flex items-center justify-center relative">
            <div
              className={`absolute inset-0 rounded-full opacity-30 ${riskBg}`}
            />

            <span className="text-xl font-bold">
              {member.riskScore}%
            </span>
          </div>

          <p className={`mt-2 text-sm ${riskColor}`}>
            {member.riskScore < 30
              ? "Low Risk"
              : member.riskScore < 60
              ? "Medium Risk"
              : "High Risk"}
          </p>

        </div>

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Total Contributions</p>
          <h2 className="text-xl font-bold text-green-600">
            KES {member.contributions}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Total Loans</p>
          <h2 className="text-xl font-bold">
            KES {member.loans}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Balance Strength</p>
          <h2 className="text-xl font-bold text-blue-600">
            {Math.round((member.contributions / (member.loans || 1)) * 100)}%
          </h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* CONTRIBUTIONS TREND */}
        <div className="bg-white p-5 rounded-2xl border">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={18} />
            Contributions Trend
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={contributionData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* COMPARISON */}
        <div className="bg-white p-5 rounded-2xl border">
          <h2 className="font-semibold mb-4">
            Contribution vs Loan
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparison}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* AI INSIGHTS */}
      <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl text-sm">

        <p className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
          <ShieldCheck size={16} />
          Smart Insights
        </p>

        <ul className="list-disc ml-5 space-y-1 text-gray-700">
          <li>Strong contribution consistency</li>
          <li>Loan usage within safe range</li>
          <li>Low probability of default</li>
        </ul>

      </div>

      {/* ACTIVITY TIMELINE */}
      <div className="bg-white p-5 rounded-2xl border">

        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle size={18} />
          Activity Timeline
        </h2>

        <div className="space-y-3 text-sm text-gray-600">
          <p>📅 April — Contributed KES 7,000</p>
          <p>📅 March — Took loan KES 5,000</p>
          <p>📅 February — Contributed KES 3,000</p>
          <p>📅 January — Joined chama</p>
        </div>

      </div>

    </div>
  );
}