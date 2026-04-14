import { Wallet, Calendar, CheckCircle } from "lucide-react";
import StatCard from "../../component/StatCard";

export default function MemberDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Welcome 👋</h1>
        <p className="text-gray-500">
          Track your contributions and chama activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={Wallet}
          title="Your Contributions"
          value="KES 15,000"
          color="bg-green-600"
        />
        <StatCard
          icon={Calendar}
          title="Next Contribution"
          value="5th Aug"
          color="bg-blue-600"
        />
        <StatCard
          icon={CheckCircle}
          title="Status"
          value="Active"
          color="bg-purple-600"
        />
      </div>

      {/* GROUP INFO */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-bold mb-3">Chama Info</h2>
        <p className="text-gray-600">
          Smart Savers Chama
        </p>
        <p className="text-gray-500 text-sm">
          24 Members • Monthly Contribution: KES 2,000
        </p>
      </div>

      {/* ACTIVITY */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>You contributed KES 2,000</li>
          <li>Meeting scheduled for Friday</li>
          <li>Payout cycle updated</li>
        </ul>
      </div>

    </div>
  );
}