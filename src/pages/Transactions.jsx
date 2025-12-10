import { useState, useContext } from "react";
import { TransactionsContext } from "../components/TransactionsContext";
import AddTransactionModal from "../components/AddTransactionModal";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ptSansNormal from "../fonts/PTSans-Regular-normal";

export default function Transactions() {
  const { transactions, addTransaction, deleteTransaction } =
    useContext(TransactionsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [typeFilter, setTypeFilter] = useState("Всі");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = transactions.filter((t) => {
    const byType = typeFilter === "Всі" || t.type === typeFilter;
    const byFrom = !from || t.date >= from;
    const byTo = !to || t.date <= to;
    return byType && byFrom && byTo;
  });

  const total = filtered.reduce((a, b) => a + b.sum, 0);

  const exportPDF = () => {
    if (!filtered || filtered.length === 0) {
      alert("Немає транзакцій для експорту");
      return;
    }

    const doc = new jsPDF();

    // Підключаємо PT Sans
    doc.addFileToVFS("PTSans-Regular.ttf", ptSansNormal["PTSans-Regular.ttf"]);
    doc.addFont("PTSans-Regular.ttf", "PTSans", "normal");
    doc.setFont("PTSans");

    doc.setFontSize(18);
    doc.text("Транзакції", 14, 16);

    const tableColumn = ["ID", "Date", "Sum", "Type"];
    const tableRows = filtered.map((t) => [
      t.id,
      t.date,
      t.sum.toLocaleString() + " грн",
      t.type,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { font: "PTSans", fontSize: 12 },
      headStyles: { fillColor: [41, 98, 255] },
    });

    doc.save("transactions.pdf");
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-400">
          Транзакції
        </h1>
      </div>

      {/* Фільтри та дії */}
      <div className="flex flex-col lg:flex-row gap-4 lg:justify-between">
        {/* Фільтри */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <select
              className="w-full sm:w-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 pr-10 rounded-xl shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 150)}
            >
              <option>Всі</option>
              <option>Надходження</option>
              <option>Видаток</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className={`w-4 h-4 text-gray-800 dark:text-gray-200 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
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

          <div className="relative w-full sm:w-auto">
            <input
              type="date"
              className="w-full sm:w-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-xl shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-5 h-5 text-gray-800 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <input
              type="date"
              className="w-full sm:w-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-xl shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-5 h-5 text-gray-800 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Дії */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <button
            className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl shadow-md transition cursor-pointer"
            onClick={exportPDF}
          >
            Експорт PDF
          </button>
          <button
            className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-xl shadow-md transition cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            Додати транзакцію
          </button>

          <AddTransactionModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={(transaction) => {
              addTransaction(transaction);
            }}
          />

          <button
            className="w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl shadow-md transition cursor-pointer"
            onClick={() => {
              if (transactions.length === 0) return;
              const lastId = transactions[transactions.length - 1].id;
              handleDelete(lastId);
            }}
          >
            Видалити останню
          </button>
        </div>
      </div>

      {/* Загальна сума */}
      <div>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Загальна сума:{" "}
          <span className="text-blue-900 dark:text-blue-400">
            {total.toLocaleString()} грн
          </span>
        </p>
      </div>

      {/* Таблиця */}
      <div className="overflow-x-auto shadow-md border border-gray-200 dark:border-gray-700 rounded-xl">
        <table className="w-full bg-white dark:bg-gray-900 min-w-max border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-3 border dark:border-gray-700">ID</th>
              <th className="p-3 border dark:border-gray-700">Дата</th>
              <th className="p-3 border dark:border-gray-700">Сума</th>
              <th className="p-3 border dark:border-gray-700">Тип</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-3 border dark:border-gray-700 dark:text-gray-300">
                  {t.id}
                </td>
                <td className="p-3 border dark:border-gray-700 dark:text-gray-300">
                  {t.date}
                </td>
                <td className="p-3 border dark:border-gray-700 dark:text-gray-300">
                  {t.sum.toLocaleString()} грн
                </td>
                <td
                  className={`p-3 border dark:border-gray-700 font-semibold ${
                    t.type === "Надходження"
                      ? "text-green-700 dark:text-green-400"
                      : "text-red-700 dark:text-red-400"
                  }`}
                >
                  {t.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
