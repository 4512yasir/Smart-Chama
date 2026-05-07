import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Shield,
  Brain,
  Download,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const initialVotes = [
  {
    id: 1,
    title: "Loan Limit Increase",
    description: "Should we increase loan limit to 3x contributions?",
    status: "open",
    yes: 24,
    no: 8,
  },
  {
    id: 2,
    title: "Emergency Fund Policy",
    description: "Create emergency fund deduction (5%)?",
    status: "open",
    yes: 14,
    no: 10,
  },
];

/* ---------------- AI ENGINE ---------------- */
const getAIInsight = (vote) => {
  const total = vote.yes + vote.no;
  const ratio = vote.yes / total;

  if (ratio > 0.7)
    return { decision: "APPROVE", color: "green", confidence: "High support" };

  if (ratio > 0.5)
    return { decision: "REVIEW", color: "yellow", confidence: "Mixed support" };

  return { decision: "REJECT", color: "red", confidence: "Low support" };
};

/* ---------------- FRAUD DETECTOR ---------------- */
const detectFraud = (vote) => {
  const total = vote.yes + vote.no;

  if (total > 50 && (vote.yes === total || vote.no === total)) {
    return "⚠️ Suspicious unanimous pattern detected";
  }

  return null;
};

export default function ChairVotingLevel6() {
  const [votes, setVotes] = useState(initialVotes);
  const [logs, setLogs] = useState([]);

  /* ---------------- LIVE SIMULATION ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setVotes((prev) =>
        prev.map((v) => ({
          ...v,
          yes: v.status === "open" ? v.yes + Math.floor(Math.random() * 2) : v.yes,
          no: v.status === "open" ? v.no + Math.floor(Math.random() * 1) : v.no,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- LOG ENGINE ---------------- */
  const addLog = (action, vote) => {
    setLogs((prev) => [
      {
        id: Date.now(),
        action,
        vote: vote.title,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  /* ---------------- ACTIONS ---------------- */
  const closeVote = (id) => {
    setVotes((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, status: "closed" } : v
      )
    );
  };

  const exportReport = () => {
    alert("📄 Exporting governance report...");
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Governance Control Center
          </h1>
          <p className="text-gray-500">
            Real-time voting • AI decisions • Audit security
          </p>
        </div>

        <button
          onClick={exportReport}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow"
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* VOTING PANEL */}
        <div className="lg:col-span-2 space-y-5">

          {votes.map((vote) => {
            const ai = getAIInsight(vote);
            const fraud = detectFraud(vote);

            return (
              <motion.div
                key={vote.id}
                className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >

                {/* TITLE */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg">
                      {vote.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {vote.description}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      vote.status === "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {vote.status}
                  </span>
                </div>

                {/* VOTES */}
                <div className="flex gap-6 mt-4 text-sm">
                  <p className="text-green-600 font-medium">
                    👍 Yes: {vote.yes}
                  </p>
                  <p className="text-red-600 font-medium">
                    👎 No: {vote.no}
                  </p>
                </div>

                {/* AI INSIGHT */}
                <div className="mt-4 bg-blue-50 p-3 rounded-xl text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-700">
                      AI Decision: {ai.decision}
                    </span>
                  </div>

                  <span className="text-xs text-gray-600">
                    {ai.confidence}
                  </span>
                </div>

                {/* FRAUD ALERT */}
                {fraud && (
                  <div className="mt-3 bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {fraud}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="flex gap-3 mt-4">

                  {vote.status === "open" && (
                    <button
                      onClick={() => {
                        closeVote(vote.id);
                        addLog("CLOSED", vote);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs"
                    >
                      Close Vote
                    </button>
                  )}

                  <button
                    onClick={() => addLog("VIEWED", vote)}
                    className="text-xs text-gray-600 border px-3 py-1 rounded-lg"
                  >
                    Log Action
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-5">

          {/* SYSTEM STATUS */}
          <div className="bg-white border rounded-2xl p-5">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity size={16} /> System Status
            </h3>

            <p className="text-sm text-green-600 mt-2">
              ● Live voting active
            </p>
            <p className="text-sm text-gray-500">
              Socket sync running
            </p>
          </div>

          {/* AUDIT LOG */}
          <div className="bg-white border rounded-2xl p-5">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield size={16} /> Audit Log
            </h3>

            <div className="mt-3 space-y-2 max-h-60 overflow-auto text-xs">
              {logs.map((l) => (
                <div
                  key={l.id}
                  className="bg-gray-50 p-2 rounded-lg"
                >
                  {l.action} → {l.vote} <br />
                  <span className="text-gray-400">{l.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}