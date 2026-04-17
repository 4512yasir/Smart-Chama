export default function Notifications() {
  const notifications = [
    { type: "warning", message: "Peter missed April contribution" },
    { type: "success", message: "John paid KES 2,000" },
    { type: "info", message: "New member joined your chama" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h2 className="font-semibold mb-4">Notifications</h2>

      <div className="space-y-3 text-sm">
        {notifications.map((n, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg flex items-center gap-2
              ${n.type === "warning" && "bg-red-50 text-red-600"}
              ${n.type === "success" && "bg-green-50 text-green-600"}
              ${n.type === "info" && "bg-blue-50 text-blue-600"}
            `}
          >
            • {n.message}
          </div>
        ))}
      </div>
    </div>
  );
}