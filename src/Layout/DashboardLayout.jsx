import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  LayoutDashboard,
  Users,
  Wallet,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "../assets/smartchamalogo.jpeg";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const chairLinks = [
    { name: "Dashboard", path: "/dashboard/chairperson", icon: LayoutDashboard },
    { name: "Members", path: "/dashboard/chairperson/members", icon: Users },
    { name: "Contributions", path: "/dashboard/chairperson/contributions", icon: Wallet },
    { name: "Reports", path: "/dashboard/chairperson/reports", icon: BarChart3 },
  ];

  const memberLinks = [
    { name: "Dashboard", path: "/dashboard/member", icon: LayoutDashboard },
    { name: "My Contributions", path: "/dashboard/member/contributions", icon: Wallet },
  ];

  const navLinks = user?.role === "chairperson" ? chairLinks : memberLinks;

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0
          h-screen bg-white border-r
          flex flex-col transition-all duration-300
          ${collapsed ? "w-20" : "w-68"}
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* TOP */}
        <div className="flex items-center justify-between px-4 py-5 border-b">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-10 h-10 rounded-full" />
            {!collapsed && (
              <span className="font-bold text-green-700">SmartChama</span>
            )}
          </div>

          {/* collapse toggle (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex text-gray-600 hover:text-green-600"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* USER */}
        <div className="px-4 py-4 border-b flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
            {user?.full_name?.charAt(0) || "U"}
          </div>

          {!collapsed && (
            <div>
              <p className="font-medium text-gray-800 text-sm">
                {user?.full_name || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || "member"}
              </p>
            </div>
          )}
        </div>

        {/* NAV */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition
                  ${isActive(link.path)
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"}
                `}
              >
                <Icon size={18} />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-3 border-t">
          <button
            onClick={logout}
            className="w-full py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
          >
            {!collapsed ? "Logout" : "⎋"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* TOPBAR */}
        <header className="bg-white border-b px-4 md:px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden"
            >
              <Menu />
            </button>

            <h1 className="font-semibold text-gray-800">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4 relative">

            {/* NOTIFICATIONS */}
            <button onClick={() => setShowNotif(!showNotif)} className="relative">
              <Bell className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            {/* NOTIF DROPDOWN */}
            <AnimatePresence>
              {showNotif && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-10 w-72 bg-white border shadow-lg rounded-xl p-3 z-50"
                >
                  <p className="text-sm font-semibold mb-2">Notifications</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>💰 New contribution received</p>
                    <p>👥 2 new members joined</p>
                    <p>📊 Monthly report ready</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* USER */}
            <div className="w-9 h-9 bg-green-600 text-white flex items-center justify-center rounded-full font-semibold">
              {user?.full_name?.charAt(0) || "U"}
            </div>

          </div>
        </header>

        {/* PAGE TRANSITIONS */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>

        </main>
      </div>
    </div>
  );
}