import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Нижня частина */}
      <div className="p-5 border-t border-gray-300 dark:border-gray-700 mt-8 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Казначейська система. Усі права захищено.
      </div>
    </footer>
  );
}
