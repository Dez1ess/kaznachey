import { useEffect, useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Транзакції", value: 124 },
    { label: "Звіти", value: 28 },
    { label: "Користувачі системи", value: 4 },
  ];

  return (
    <div
      className={`transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Заголовок */}
      <header className="mb-12 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-400 leading-tight mb-4">
          Казначейська інформаційна система
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto sm:mx-0">
          Демонстраційна система моніторингу умовних бюджетних транзакцій.
        </p>
      </header>

      {/* Статистика */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center"
          >
            <p className="text-gray-400 dark:text-gray-400 uppercase tracking-widest text-xs sm:text-sm mb-2">
              {s.label}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-300">
              {s.value}+
            </h2>
          </div>
        ))}
      </div>

      {/* Декоративні блоки */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-r from-blue-200 to-blue-400 dark:from-blue-700 dark:to-blue-900 p-6 sm:p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 dark:text-blue-200 mb-2">
            Проста демонстрація
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            Тут ви можете побачити базові показники та ознайомитись з
            інтерфейсом.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-200 to-green-400 dark:from-green-700 dark:to-green-900 p-6 sm:p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-900 dark:text-green-200 mb-2">
            Візуальна привабливість
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            Легкі тіні, плавні анімації та кольорові блоки роблять систему
            сучаснішою.
          </p>
        </div>
      </section>
    </div>
  );
}
