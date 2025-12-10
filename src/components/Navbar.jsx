import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="
      bg-white dark:bg-gray-900 
      text-gray-900 dark:text-gray-100
      border-b border-gray-200 dark:border-gray-700
      shadow-sm
    "
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-full lg:max-w-6xl mx-auto py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl sm:hidden text-blue-900 dark:text-blue-400">
          Фінанси
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-6">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Головна
          </Link>
          <Link
            to="/transactions"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Транзакції
          </Link>
          <Link
            to="/reports"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Звіти
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Про систему
          </Link>
          <Link
            to="/contacts"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Контакти
          </Link>
        </div>

        {/* Right side */}
        <div className="flex gap-4 items-center">
          <ThemeToggle />

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-lg transition
                       hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          sm:hidden overflow-hidden transition-all duration-300 ease-in-out 
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 sm:px-6 lg:px-8 pb-4 flex flex-col gap-3">
          {[
            { to: "/", label: "Головна" },
            { to: "/transactions", label: "Транзакції" },
            { to: "/reports", label: "Звіти" },
            { to: "/about", label: "Про систему" },
            { to: "/contacts", label: "Контакти" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="py-2 transition
                         hover:text-blue-600 dark:hover:text-blue-400"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
