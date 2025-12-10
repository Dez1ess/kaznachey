import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // При загрузке компонента - читаем тему из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  // Когда меняется тема - сохраняем в localStorage и обновляем DOM
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        relative flex items-center gap-2 
        px-4 py-2 rounded-xl 
        bg-gray-200 dark:bg-gray-800 
        text-gray-900 dark:text-gray-100
        shadow-sm hover:shadow 
        transition-all duration-300
        border border-gray-300 dark:border-gray-700 cursor-pointer
      "
    >
      {!dark ? (
        <>
          <Sun size={18} className="text-yellow-400" />
          <span className="text-sm">Світла тема</span>
        </>
      ) : (
        <>
          <Moon size={18} className="text-blue-600" />
          <span className="text-sm">Темна тема</span>
        </>
      )}
    </button>
  );
}
