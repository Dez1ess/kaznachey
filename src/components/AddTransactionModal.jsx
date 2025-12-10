import { useState, useEffect } from "react";

export default function AddTransactionModal({ isOpen, onClose, onSave }) {
  const [date, setDate] = useState("");
  const [sum, setSum] = useState("");
  const [type, setType] = useState("Видаток");

  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // Відкриття/закриття модалки + блокування скролу
  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setShow(false), 300);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Очищення полів при закритті
  const handleClose = () => {
    setDate("");
    setSum("");
    setType("Видаток");
    onClose();
  };

  const handleSave = () => {
    if (!date || !sum) return;
    onSave({ date, sum: Number(sum), type });
    handleClose(); // очищаємо та закриваємо
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        animate ? "bg-black/30" : "bg-black/0"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4 transform transition-all duration-300 ${
          animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Додати транзакцію
        </h2>

        <input
          type="date"
          className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Сума"
          className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
        />
        <div className="relative inline-block w-full">
          <select
            className="w-full px-4 py-2 pr-10 rounded-xl shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 appearance-none cursor-pointer"
            value={type}
            onChange={(e) => setType(e.target.value)}
            onFocus={() => setIsSelectOpen(true)}
            onBlur={() => setTimeout(() => setIsSelectOpen(false), 150)}
          >
            <option>Видаток</option>
            <option>Надходження</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className={`w-4 h-4 text-gray-800 dark:text-gray-200 transition-transform duration-300 ${
                isSelectOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-4 cursor-pointer py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 transition"
            onClick={handleClose}
          >
            Відмінити
          </button>
          <button
            className="px-4 cursor-pointer py-2 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition"
            onClick={handleSave}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
