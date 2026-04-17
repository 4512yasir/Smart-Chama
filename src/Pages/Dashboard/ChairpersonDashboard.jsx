import StatCard from "../../component/StatCard";
import ContributionChart from "../../component/ContributionChart";
import Notifications from "../../component/Notification";

export default function ChairpersonDashboard() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Chairperson Dashboard</h1>
        <p className="text-gray-500">Manage your chama efficiently</p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Total Balance" value="KES 120,000" />
        <StatCard title="Members" value="24" />
        <StatCard title="Monthly Contribution" value="KES 2,000" />
        <StatCard title="Pending Payments" value="KES 8,000" sub="4 members" />
      </div>

      {/* CHART + NOTIFICATIONS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ContributionChart />
        </div>

        <Notifications />
      </div>

      {/* ACTIVITY */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h2 className="font-semibold mb-4">Recent Activity</h2>

        <ul className="space-y-3 text-sm">
          <li>💰 John contributed KES 2,000</li>
          <li>👤 Mary joined the chama</li>
          <li>⚠️ Peter missed contribution</li>
        </ul>
      </div>
    </div>
  );
}