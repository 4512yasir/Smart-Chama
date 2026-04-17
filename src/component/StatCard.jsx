export default function StatCard({ title, value, sub }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 mt-1">{value}</h2>
      {sub && <p className="text-xs text-green-600 mt-1">{sub}</p>}
    </div>
  );
}