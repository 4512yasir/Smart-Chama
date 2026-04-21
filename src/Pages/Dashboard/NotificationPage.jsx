import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCheck,
  Wallet,
  AlertTriangle,
  CreditCard,
  Info,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const initialNotifications = [
  {
    id: 1,
    type: "payment",
    message: "You paid KES 2,000",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "loan",
    message: "Loan approved 🎉",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "alert",
    message: "Payment due tomorrow",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "system",
    message: "New member joined",
    time: "Yesterday",
    read: true,
  },
];

/* ---------------- ICON MAP ---------------- */
const iconMap = {
  payment: Wallet,
  loan: CreditCard,
  alert: AlertTriangle,
  system: Info,
};

/* ---------------- COMPONENT ---------------- */
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  /* ---------------- FILTER ---------------- */
  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  /* ---------------- MARK ONE ---------------- */
  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  /* ---------------- MARK ALL ---------------- */
  const markAll = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Notifications
          </h1>
          <p className="text-gray-500">
            Stay updated with your chama activity
          </p>
        </div>

        <button
          onClick={markAll}
          className="flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          <CheckCheck size={16} /> Mark all
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        {["all", "payment", "loan", "alert"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm capitalize
              ${
                filter === f
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="bg-white rounded-3xl border overflow-hidden">

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            <Bell className="mx-auto mb-3" />
            No notifications
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((n) => {
              const Icon = iconMap[n.type];

              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={() => markRead(n.id)}
                  className={`flex items-center gap-4 px-6 py-4 border-b cursor-pointer transition
                    ${
                      n.read
                        ? "bg-white"
                        : "bg-green-50"
                    }
                    hover:bg-gray-50
                  `}
                >

                  {/* ICON */}
                  <div
                    className={`p-2 rounded-xl
                      ${
                        n.type === "payment"
                          ? "bg-green-100 text-green-600"
                          : n.type === "loan"
                          ? "bg-blue-100 text-blue-600"
                          : n.type === "alert"
                          ? "bg-red-100 text-red-500"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    <Icon size={18} />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {n.time}
                    </p>
                  </div>

                  {/* UNREAD DOT */}
                  {!n.read && (
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

      </div>

    </div>
  );
}