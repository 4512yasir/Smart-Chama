import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download } from "lucide-react";

/* ---------------- FAKE API ---------------- */
const fakeFetchMembers = (page, limit, search, filter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const all = Array.from({ length: 57 }, (_, i) => ({
        id: i + 1,
        name: `Member ${i + 1}`,
        phone: `07${Math.floor(10000000 + Math.random() * 90000000)}`,
        contributions: Math.floor(Math.random() * 30000),
        loans: Math.floor(Math.random() * 15000),
        status: ["VIP", "Active", "Risk"][Math.floor(Math.random() * 3)],
      }));

      const filtered = all.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) &&
          (filter === "All" || m.status === filter)
      );

      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      resolve({
        data: paginated,
        total: filtered.length,
      });
    }, 600);
  });
};

/* ---------------- STATUS ---------------- */
const statusConfig = {
  VIP: "bg-green-100 text-green-700",
  Active: "bg-blue-100 text-blue-700",
  Risk: "bg-red-100 text-red-700",
};

export default function ChairMembersPage() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 6;

  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const totalPages = Math.ceil(total / limit);

  /* ---------------- FETCH ---------------- */
  const loadMembers = async () => {
    setLoading(true);

    const res = await fakeFetchMembers(page, limit, search, filter);

    setMembers(res.data);
    setTotal(res.total);

    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
  }, [page, search, filter]);

  /* ---------------- EXPORT ---------------- */
  const exportCSV = () => {
    alert("📄 Export will connect to backend later");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Members</h1>
          <p className="text-sm text-gray-500">
            {total} total members
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm flex gap-2 items-center"
        >
          <Download size={16} /> Export
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          placeholder="Search..."
          className="flex-1 border px-4 py-2 rounded-xl text-sm"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={filter}
          onChange={(e) => {
            setPage(1);
            setFilter(e.target.value);
          }}
          className="border px-4 py-2 rounded-xl text-sm"
        >
          <option>All</option>
          <option>VIP</option>
          <option>Active</option>
          <option>Risk</option>
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading members...
        </div>
      )}

      {/* ================= MEMBERS ================= */}
      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white border rounded-2xl p-4 space-y-3"
            >
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-xs text-gray-500">{m.phone}</p>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>💰 KES {m.contributions}</p>
                <p>📉 KES {m.loans}</p>
                <p className="font-medium">
                  Net: KES {m.contributions - m.loans}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full ${statusConfig[m.status]}`}
              >
                {m.status}
              </span>

              <button
                onClick={() =>
                  navigate(`/dashboard/chairperson/members/${m.id}`)
                }
                className="w-full bg-black text-white py-2 rounded-xl text-sm"
              >
                View Profile →
              </button>
            </div>
          ))}

        </div>
      )}

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-between items-center mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded-xl text-sm disabled:opacity-50"
        >
          Prev
        </button>

        <p className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </p>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded-xl text-sm disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}