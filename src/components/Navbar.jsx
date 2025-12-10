import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo/Brand (optional) */}
        <div className="font-bold text-xl sm:hidden">Фінанси</div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-6">
          <Link to="/" className="hover:text-blue-200 transition">
            Головна
          </Link>
          <Link to="/transactions" className="hover:text-blue-200 transition">
            Транзакції
          </Link>
          <Link to="/reports" className="hover:text-blue-200 transition">
            Звіти
          </Link>
          <Link to="/about" className="hover:text-blue-200 transition">
            Про систему
          </Link>
          <Link to="/contacts" className="hover:text-blue-200 transition">
            Контакти
          </Link>
        </div>

        {/* Right side - always visible */}
        <div className="flex gap-4 items-center">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 hover:bg-blue-800 rounded"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 pb-2">
          <Link
            to="/"
            className="hover:text-blue-200 transition py-2"
            onClick={() => setIsOpen(false)}
          >
            Головна
          </Link>
          <Link
            to="/transactions"
            className="hover:text-blue-200 transition py-2"
            onClick={() => setIsOpen(false)}
          >
            Транзакції
          </Link>
          <Link
            to="/reports"
            className="hover:text-blue-200 transition py-2"
            onClick={() => setIsOpen(false)}
          >
            Звіти
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-200 transition py-2"
            onClick={() => setIsOpen(false)}
          >
            Про систему
          </Link>
          <Link
            to="/contacts"
            className="hover:text-blue-200 transition py-2"
            onClick={() => setIsOpen(false)}
          >
            Контакти
          </Link>
        </div>
      )}
    </nav>
  );
}
