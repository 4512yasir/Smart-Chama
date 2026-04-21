import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  X,
} from "lucide-react";

/* ---------------- MOCK ---------------- */
const initialVotes = [
  {
    id: 1,
    title: "Approve Loan for John (KES 10,000)",
    yes: 8000,
    no: 2000,
    voters: 10,
    totalMembers: 20,
    deadline: "2026-05-01",
  },
];

export default function MemberVotingPage() {
  const [votes, setVotes] = useState(initialVotes);
  const [myVotes, setMyVotes] = useState({});
  const [openModal, setOpenModal] = useState(null);

  /* 🔥 FAKE REAL-TIME UPDATES */
  useEffect(() => {
    const interval = setInterval(() => {
      setVotes((prev) =>
        prev.map((v) => ({
          ...v,
          yes: v.yes + Math.floor(Math.random() * 500),
          no: v.no + Math.floor(Math.random() * 300),
        }))
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleVote = (id, type) => {
    if (myVotes[id]) return;

    const weight = 2000;

    setVotes((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              yes: type === "yes" ? v.yes + weight : v.yes,
              no: type === "no" ? v.no + weight : v.no,
              voters: v.voters + 1,
            }
          : v
      )
    );

    setMyVotes({ ...myVotes, [id]: type });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-bold">Voting Center</h1>
        <p className="text-gray-500">
          Real-time decision system
        </p>
      </div>

      {votes.map((v) => {
        const total = v.yes + v.no;
        const yesPercent = (v.yes / total) * 100;
        const participation = (v.voters / v.totalMembers) * 100;

        const leading = yesPercent > 50 ? "yes" : "no";

        return (
          <div
            key={v.id}
            className="bg-white p-6 rounded-3xl border space-y-4"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold">{v.title}</h2>
              <span className="text-xs flex gap-1 items-center text-gray-500">
                <Clock size={14} /> Live
              </span>
            </div>

            {/* PROGRESS */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Yes {Math.round(yesPercent)}%</span>
                <span>No {100 - Math.round(yesPercent)}%</span>
              </div>

              <div className="flex h-3 rounded-full overflow-hidden">
                <div
                  className={`${
                    leading === "yes"
                      ? "bg-green-600"
                      : "bg-green-400"
                  }`}
                  style={{ width: `${yesPercent}%` }}
                />
                <div
                  className={`${
                    leading === "no"
                      ? "bg-red-600"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${100 - yesPercent}%` }}
                />
              </div>
            </div>

            {/* PARTICIPATION */}
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <Users size={14} />
              {v.voters}/{v.totalMembers} voted (
              {Math.round(participation)}%)
            </div>

            {/* PREDICTION */}
            <div className="text-sm text-gray-600">
              🧠 Likely outcome:{" "}
              <span className="font-semibold capitalize">
                {leading}
              </span>
            </div>

            {/* ACTIONS */}
            {!myVotes[v.id] && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleVote(v.id, "yes")}
                  className="flex-1 bg-green-600 text-white py-2 rounded-xl"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleVote(v.id, "no")}
                  className="flex-1 bg-red-500 text-white py-2 rounded-xl"
                >
                  No
                </button>
              </div>
            )}

            {myVotes[v.id] && (
              <p className="text-green-600 text-sm flex items-center gap-1">
                <CheckCircle size={14} />
                You voted {myVotes[v.id]}
              </p>
            )}

            {/* DETAILS */}
            <button
              onClick={() => setOpenModal(v.id)}
              className="text-sm text-green-600 flex items-center gap-1"
            >
              <BarChart3 size={14} />
              View Breakdown
            </button>

            {/* MODAL */}
            {openModal === v.id && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4">
                  <div className="flex justify-between">
                    <h2 className="font-semibold">
                      Vote Breakdown
                    </h2>
                    <button onClick={() => setOpenModal(null)}>
                      <X />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600">
                    Yes Votes: {v.yes}
                  </p>
                  <p className="text-sm text-gray-600">
                    No Votes: {v.no}
                  </p>

                  <p className="text-sm text-gray-500">
                    Participation: {Math.round(participation)}%
                  </p>
                </div>
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
}