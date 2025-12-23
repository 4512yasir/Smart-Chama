import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/smartchamalogo.jpeg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-green-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Smart Chama"
            className="w-10 h-10 rounded-full object-contain border-2 border-green-500 group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-2xl font-extrabold text-green-700 tracking-tight">
            Smart<span className="text-green-500">Chama</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 hover:text-green-600 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>

          {/* Action Buttons */}
          <li>
            <Link
              to="/create"
              className="border border-green-600 text-green-700 px-5 py-2.5 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              Create Chama
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-700 hover:shadow-lg transition-all duration-300"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-green-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-green-100 shadow-lg">
          <ul className="flex flex-col items-center py-4 space-y-3 text-lg font-medium">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-green-600 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-green-600 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-green-600 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="border border-green-600 text-green-700 px-5 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Create Chama
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 hover:shadow-md transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
