import { useContext, useState, useMemo } from "react";
import { TransactionsContext } from "../components/TransactionsContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const { transactions } = useContext(TransactionsContext);
  const [period, setPeriod] = useState("Поточний місяць");
  const [isOpen, setIsOpen] = useState(false);

  // Дані для графіку
  const chartData = useMemo(() => {
    if (period === "Поточний місяць") {
      // групуємо по днях поточного місяця
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      const days = Array.from({ length: 31 }, (_, i) => {
        const day = (i + 1).toString().padStart(2, "0");
        const dayTx = transactions.filter((t) => {
          const date = new Date(t.date);
          return (
            date.getDate() === i + 1 &&
            date.getMonth() + 1 === currentMonth &&
            date.getFullYear() === currentYear
          );
        });

        return {
          day: (i + 1).toString(),
          income: dayTx
            .filter((t) => t.type === "Надходження")
            .reduce((a, b) => a + b.sum, 0),
          expense: dayTx
            .filter((t) => t.type === "Видаток")
            .reduce((a, b) => a + b.sum, 0),
        };
      });

      return days.filter((d) => d.income > 0 || d.expense > 0);
    } else {
      // Рік - групуємо по місяцях
      const months = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const monthTx = transactions.filter((t) => {
          const date = new Date(t.date);
          return date.getMonth() + 1 === month;
        });

        return {
          month: month.toString(),
          income: monthTx
            .filter((t) => t.type === "Надходження")
            .reduce((a, b) => a + b.sum, 0),
          expense: monthTx
            .filter((t) => t.type === "Видаток")
            .reduce((a, b) => a + b.sum, 0),
        };
      });

      return months.filter((m) => m.income > 0 || m.expense > 0);
    }
  }, [transactions, period]);

  // Всього для карток
  const totalIncome = chartData.reduce((a, b) => a + b.income, 0);
  const totalExpense = chartData.reduce((a, b) => a + b.expense, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div>
      {/* Заголовок і перемикач */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-blue-900 dark:text-blue-400">
          Звіти
        </h1>
        <div className="relative inline-block">
          <select
            className="px-4 py-2 pr-10 rounded-xl shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 appearance-none cursor-pointer"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          >
            <option value="Поточний місяць">Поточний місяць</option>
            <option value="Рік">Рік</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className={`w-4 h-4 text-gray-800 dark:text-gray-200 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
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
      </div>

      {/* 3 картки зі звітами */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
          <h2 className="font-semibold text-lg text-gray-600 dark:text-gray-300 mb-2">
            Надходження
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {totalIncome.toLocaleString()} грн
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
          <h2 className="font-semibold text-lg text-gray-600 dark:text-gray-300 mb-2">
            Видатки
          </h2>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            {totalExpense.toLocaleString()} грн
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
          <h2 className="font-semibold text-lg text-gray-600 dark:text-gray-300 mb-2">
            Баланс
          </h2>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
            {balance.toLocaleString()} грн
          </p>
        </div>
      </div>

      {/* Графік */}
      <div className="bg-white dark:bg-gray-800 p-8 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200">
            Динаміка надходжень і витрат
          </h2>
        </div>
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className="md:w-full" style={{ minWidth: "600px" }}>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#aaa4" />
                <XAxis dataKey={period === "Поточний місяць" ? "day" : "month"} />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    background: "#1f2937",
                    borderRadius: "10px",
                    border: "1px solid #374151",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#00C49F"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#FF4C4C"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
