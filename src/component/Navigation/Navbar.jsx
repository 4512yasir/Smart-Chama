import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/smartchamalogo.jpeg";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative px-1 py-1 transition ${
      isActive
        ? "text-green-600 font-semibold"
        : "text-gray-600 hover:text-green-600"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={logo}
              alt="SmartChama"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div className="absolute inset-0 rounded-xl bg-green-500/20 blur-md opacity-0 group-hover:opacity-100 transition"></div>
          </div>

          <span className="text-xl font-semibold text-gray-900 tracking-tight">
            SmartChama
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["/", "/features", "/subscription"].map((path, i) => {
            const label = ["Home", "Features", "Pricing"][i];
            return (
              <NavLink key={path} to={path} className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-600 rounded"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Login
          </Link>

          <Link
            to="/create"
            className="relative px-5 py-2 rounded-xl text-white bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition shadow-lg overflow-hidden"
          >
            <span className="relative z-10">Create Chama</span>
            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition"></span>
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-6 bg-white/90 backdrop-blur-xl border-t border-gray-200 space-y-4"
          >
            <NavLink
              onClick={() => setOpen(false)}
              to="/"
              className="block text-gray-700 hover:text-green-600"
            >
              Home
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              to="/features"
              className="block text-gray-700 hover:text-green-600"
            >
              Features
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              to="/subscription"
              className="block text-gray-700 hover:text-green-600"
            >
              Pricing
            </NavLink>

            <Link
              onClick={() => setOpen(false)}
              to="/auth/login"
              className="block text-gray-600"
            >
              Login
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/auth/register"
              className="block bg-linear-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-center shadow"
            >
              Create Chama
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;