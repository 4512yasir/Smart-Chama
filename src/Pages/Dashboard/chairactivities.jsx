import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Wallet,
  Users,
  Shield,
  Calendar,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

/* ---------------- MOCK ACTIVITIES ---------------- */
const initialActivities = [
  {
    id: 1,
    type: "loan",
    title: "Loan Approved",
    description: "John Doe loan approved (KES 20,000)",
    time: "2 mins ago",
    severity: "low",
  },
  {
    id: 2,
    type: "governance",
    title: "Vote Completed",
    description: "Emergency fund policy passed",
    time: "1 hour ago",
    severity: "medium",
  },
  {
    id: 3,
    type: "risk",
    title: "Risk Alert",
    description: "Mary Wanjiku flagged as high-risk borrower",
    time: "3 hours ago",
    severity: "high",
  },
  {
    id: 4,
    type: "contribution",
    title: "Contribution Received",
    description: "KES 5,000 received from Peter Kimani",
    time: "Today",
    severity: "low",
  },
];

/* ---------------- ICON MAP ---------------- */
const iconMap = {
  loan: Wallet,
  governance: Shield,
  risk: AlertTriangle,
  contribution: Users,
};

/* ---------------- COLOR SYSTEM ---------------- */
const severityColor = {
  low: "bg-green-50 text-green-600 border-green-200",
  medium: "bg-yellow-50 text-yellow-600 border-yellow-200",
  high: "bg-red-50 text-red-600 border-red-200",
};

export default function ChairActivitiesPage() {
  const [activities] = useState(initialActivities);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Activity Intelligence Center
        </h1>
        <p className="text-gray-500">
          Real-time governance & financial event tracking
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Activities</p>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity size={18} /> {activities.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Financial</p>
          <h2 className="text-2xl font-bold text-green-600">
            {activities.filter((a) => a.type === "loan" || a.type === "contribution").length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Governance</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {activities.filter((a) => a.type === "governance").length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Risk Alerts</p>
          <h2 className="text-2xl font-bold text-red-600">
            {activities.filter((a) => a.type === "risk").length}
          </h2>
        </div>

      </div>

      {/* TIMELINE */}
      <div className="bg-white border rounded-2xl p-6">

        <h2 className="font-semibold mb-5 flex items-center gap-2">
          <Calendar size={16} /> Activity Timeline
        </h2>

        <div className="space-y-5 relative border-l pl-6">

          {activities.map((act) => {
            const Icon = iconMap[act.type];

            return (
              <motion.div
                key={act.id}
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >

                {/* DOT */}
                <div className="absolute -left-3 top-1 w-6 h-6 bg-white border rounded-full flex items-center justify-center">
                  <Icon size={14} />
                </div>

                {/* CONTENT */}
                <div className="bg-gray-50 p-4 rounded-xl border hover:shadow-sm transition">

                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">
                      {act.title}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {act.time}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {act.description}
                  </p>

                  {/* SEVERITY */}
                  <div className="mt-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full border ${severityColor[
                        act.severity
                      ]}`}
                    >
                      {act.severity.toUpperCase()} PRIORITY
                    </span>
                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>
      </div>

      {/* INSIGHT PANEL */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border p-5 rounded-2xl">
        <h2 className="font-semibold flex items-center gap-2">
          <CheckCircle size={16} /> System Insight
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          All activities are structured as audit-grade events. Future upgrade will
          connect this to real-time socket stream + blockchain-style immutable logs.
        </p>
      </div>

    </div>
  );
}