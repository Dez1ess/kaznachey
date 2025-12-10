import { useState } from "react";
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
  const [period, setPeriod] = useState("Місяць");

  const dataMonth = [
    { day: "1", income: 12000, expense: 8000 },
    { day: "5", income: 15000, expense: 5000 },
    { day: "10", income: 8000, expense: 6000 },
    { day: "15", income: 17000, expense: 12000 },
    { day: "20", income: 9000, expense: 7000 },
    { day: "25", income: 13000, expense: 4000 },
    { day: "30", income: 11000, expense: 9000 },
  ];

  const dataYear = [
    { month: "Січ", income: 120000, expense: 80000 },
    { month: "Лют", income: 110000, expense: 70000 },
    { month: "Бер", income: 140000, expense: 90000 },
    { month: "Кві", income: 130000, expense: 95000 },
    { month: "Тра", income: 150000, expense: 100000 },
    { month: "Чер", income: 125000, expense: 80000 },
    { month: "Лип", income: 160000, expense: 120000 },
    { month: "Сер", income: 140000, expense: 90000 },
    { month: "Вер", income: 130000, expense: 95000 },
    { month: "Жов", income: 150000, expense: 110000 },
    { month: "Лис", income: 160000, expense: 120000 },
    { month: "Гру", income: 170000, expense: 130000 },
  ];

  const chartData = period === "Місяць" ? dataMonth : dataYear;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Звіти</h1>

      <div className="mb-6">
        <select
          className="border p-2 rounded"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option>Місяць</option>
          <option>Рік</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl border">
          <h2 className="font-bold text-xl mb-2">Надходження</h2>
          <p className="text-2xl font-bold text-green-700">
            {chartData.reduce((a, b) => a + b.income, 0).toLocaleString()} грн
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl border">
          <h2 className="font-bold text-xl mb-2">Видатки</h2>
          <p className="text-2xl font-bold text-red-700">
            {chartData.reduce((a, b) => a + b.expense, 0).toLocaleString()} грн
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl border">
          <h2 className="font-bold text-xl mb-2">Баланс</h2>
          <p className="text-2xl font-bold text-blue-700">
            {chartData
              .reduce((a, b) => a + b.income - b.expense, 0)
              .toLocaleString()}{" "}
            грн
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-xl border">
        <h2 className="font-bold text-xl mb-4">
          Динаміка надходжень та витрат
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={period === "Місяць" ? "day" : "month"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#00C49F" />
            <Line type="monotone" dataKey="expense" stroke="#FF4C4C" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
