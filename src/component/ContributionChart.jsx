import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", amount: 2000 },
  { month: "Feb", amount: 4000 },
  { month: "Mar", amount: 6000 },
  { month: "Apr", amount: 8000 },
];

export default function ContributionChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h2 className="font-semibold mb-4">Contribution Trend</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}