import { useState } from "react";
import { Copy, RefreshCw, Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function InviteCard() {
  const [code, setCode] = useState("CHAMA123");

  const generateCode = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCode(newCode);
    toast.success("New invite code generated");
  };

  const inviteLink = `${window.location.origin}/join/${code}`;

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied!");
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Join my Chama",
        text: "You're invited to join our chama 🎉",
        url: inviteLink,
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-xl space-y-4">
      <h2 className="text-xl font-bold">Invite Members 🔗</h2>

      {/* CODE */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-xl">
        <span className="font-mono text-lg tracking-widest">{code}</span>
        <button onClick={generateCode}>
          <RefreshCw className="w-5 h-5 text-gray-600 hover:rotate-90 transition" />
        </button>
      </div>

      {/* LINK */}
      <div className="flex gap-2">
        <input
          value={inviteLink}
          readOnly
          className="flex-1 border rounded-xl px-4 py-2 text-sm"
        />
        <button
          onClick={copyLink}
          className="bg-green-600 text-white px-4 rounded-xl flex items-center gap-2"
        >
          <Copy size={16} /> Copy
        </button>
      </div>

      {/* SHARE */}
      <button
        onClick={shareLink}
        className="w-full border border-green-600 text-green-700 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-green-50"
      >
        <Share2 size={16} /> Share Invite
      </button>
    </div>
  );
}