import { Users, Wallet, Clock } from "lucide-react";
import StatCard from "../../component/StatCard";
import InviteCard from "../../component/inviteCard";

export default function ChairpersonDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard 👑</h1>
        <p className="text-gray-500">
          Manage your chama and members
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          title="Total Members"
          value="24"
          color="bg-green-600"
        />
        <StatCard
          icon={Wallet}
          title="Total Contributions"
          value="KES 120,000"
          color="bg-blue-600"
        />
        <StatCard
          icon={Clock}
          title="Pending Requests"
          value="5"
          color="bg-yellow-500"
        />
      </div>

      {/* INVITE */}
      <InviteCard />

      {/* ACTIVITY */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>John joined the chama</li>
          <li>Mary contributed KES 2,000</li>
          <li>3 new join requests</li>
        </ul>
      </div>

    </div>
  );
}