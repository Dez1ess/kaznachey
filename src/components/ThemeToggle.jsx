import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded text-black dark:text-white"
      onClick={() => setDark(!dark)}
    >
      {dark ? "Світла тема" : "Темна тема"}
    </button>
  );
}
