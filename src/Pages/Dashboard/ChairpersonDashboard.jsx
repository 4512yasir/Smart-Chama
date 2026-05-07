import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Download,
  TrendingUp,
  AlertTriangle,
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

// Contributions trend
const chartData = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 18000 },
  { month: "Mar", value: 15000 },
  { month: "Apr", value: 22000 },
  { month: "May", value: 30000 },
];

// Loan queue
const loanQueue = [
  { id: 1, name: "John Doe", amount: 20000, status: "pending" },
  { id: 2, name: "Mary Wanjiku", amount: 15000, status: "pending" },
  { id: 3, name: "Peter Kimani", amount: 5000, status: "approved" },
];

// Contribution stats
const contributionStats = {
  total: 320000,
};

// Fund usage
const fundUsage = [
  { name: "Loans Issued", value: 180000 },
  { name: "Savings Pool", value: 80000 },
  { name: "Emergency Fund", value: 40000 },
  { name: "Available", value: 20000 },
];

export default function ChairpersonDashboard() {
  const [queue, setQueue] = useState(loanQueue);

  /* ---------------- REAL-TIME SIMULATION ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("📡 syncing live financial state...");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- LOAN ACTIONS ---------------- */
  const approveLoan = (id) => {
    setQueue((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "approved" } : l
      )
    );
  };

  const rejectLoan = (id) => {
    setQueue((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "rejected" } : l
      )
    );
  };

  /* ---------------- CORE FINANCIAL ENGINE ---------------- */

  const totalFunds = contributionStats.total;
  const available = fundUsage.find(f => f.name === "Available")?.value || 0;
  const loansIssued = fundUsage.find(f => f.name === "Loans Issued")?.value || 0;

  // 💡 Liquidity ratio
  const liquidityRatio = ((available / totalFunds) * 100).toFixed(1);

  // 🚨 Smart alerts logic
  const alerts = [];

  if (liquidityRatio < 10) {
    alerts.push({
      type: "critical",
      message: "Liquidity critically low. Risk of default.",
    });
  } else if (liquidityRatio < 20) {
    alerts.push({
      type: "warning",
      message: "Liquidity is below safe threshold.",
    });
  }

  if (loansIssued > totalFunds * 0.7) {
    alerts.push({
      type: "danger",
      message: "Over 70% of funds issued as loans.",
    });
  }

  if (queue.filter(q => q.status === "pending").length > 5) {
    alerts.push({
      type: "info",
      message: "High pending loan approvals.",
    });
  }

  /* ---------------- EXPORT ---------------- */
  const exportPDF = () => {
    alert("📄 PDF export coming with backend");
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Chairperson Control Center
          </h1>
          <p className="text-gray-500">
            Financial intelligence dashboard
          </p>
        </div>

        <button
          onClick={exportPDF}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* 🔥 SMART ALERTS */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl flex items-center gap-3 border ${
                alert.type === "critical"
                  ? "bg-red-50 border-red-200 text-red-700"
                  : alert.type === "warning"
                  ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                  : alert.type === "danger"
                  ? "bg-orange-50 border-orange-200 text-orange-700"
                  : "bg-blue-50 border-blue-200 text-blue-700"
              }`}
            >
              <AlertTriangle size={18} />
              <span className="text-sm font-medium">
                {alert.message}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Total Funds</p>
          <h2 className="text-2xl font-bold text-green-600">
            KES {totalFunds}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Available Cash</p>
          <h2 className="text-2xl font-bold">
            KES {available}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Loans Issued</p>
          <h2 className="text-2xl font-bold">
            KES {loansIssued}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-sm text-gray-500">Liquidity Ratio</p>
          <h2
            className={`text-2xl font-bold ${
              liquidityRatio < 15
                ? "text-red-500"
                : liquidityRatio < 25
                ? "text-yellow-500"
                : "text-green-600"
            }`}
          >
            {liquidityRatio}%
          </h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-2xl border">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={18} /> Contributions Trend
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
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

        <div className="bg-white p-5 rounded-2xl border">
          <h2 className="font-semibold mb-4">
            Fund Allocation
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={fundUsage} dataKey="value" outerRadius={90}>
                {fundUsage.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      ["#16a34a", "#2563eb", "#f59e0b", "#6b7280"][index]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* LOAN QUEUE */}
      <div className="bg-white p-5 rounded-2xl border">
        <h2 className="font-semibold mb-4">
          Loan Approval Queue
        </h2>

        <div className="space-y-3">
          {queue.map((loan) => (
            <div
              key={loan.id}
              className="flex justify-between items-center border p-3 rounded-xl"
            >
              <div>
                <p className="font-medium">{loan.name}</p>
                <p className="text-sm text-gray-500">
                  KES {loan.amount}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {loan.status === "pending" ? (
                  <>
                    <button
                      onClick={() => approveLoan(loan.id)}
                      className="text-green-600"
                    >
                      <CheckCircle />
                    </button>

                    <button
                      onClick={() => rejectLoan(loan.id)}
                      className="text-red-600"
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
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}