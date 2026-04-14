import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4"
    >
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="text-white w-5 h-5" />
      </div>

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </motion.div>
  );
}