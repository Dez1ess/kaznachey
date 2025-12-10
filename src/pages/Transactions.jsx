import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Transactions() {
  const [data, setData] = useState([
    { id: 1, date: "2025-12-01", sum: 12500, type: "Видаток" },
    { id: 2, date: "2025-12-02", sum: 8200, type: "Надходження" },
    { id: 3, date: "2025-12-03", sum: 3400, type: "Видаток" },
    { id: 4, date: "2025-12-05", sum: 15200, type: "Надходження" },
  ]);

  const [typeFilter, setTypeFilter] = useState("Всі");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = data.filter((t) => {
    const byType = typeFilter === "Всі" || t.type === typeFilter;
    const byFrom = !from || t.date >= from;
    const byTo = !to || t.date <= to;
    return byType && byFrom && byTo;
  });

  const total = filtered.reduce((a, b) => a + b.sum, 0);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Транзакції", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [["ID", "Дата", "Сума", "Тип"]],
      body: filtered.map((t) => [t.id, t.date, t.sum.toLocaleString(), t.type]),
    });
    doc.save("transactions.pdf");
  };

  const addTransaction = () => {
    const newT = {
      id: data.length + 1,
      date: "2025-12-06",
      sum: 5000,
      type: "Видаток",
    };
    setData([...data, newT]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Транзакції</h1>

      <div className="mb-4 flex gap-4 flex-wrap">
        <select
          className="border p-2 rounded"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option>Всі</option>
          <option>Надходження</option>
          <option>Видаток</option>
        </select>
        <input
          type="date"
          className="border p-2 rounded"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button
          className="bg-green-700 text-white px-4 py-2 rounded"
          onClick={exportPDF}
        >
          Експорт PDF
        </button>
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded"
          onClick={addTransaction}
        >
          Додати транзакцію
        </button>
      </div>

      <p className="mb-4 text-gray-700 font-semibold">
        Загальна сума: {total.toLocaleString()} грн
      </p>

      <table className="w-full bg-white dark:bg-gray-800 shadow border">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Дата</th>
            <th className="p-2 border">Сума</th>
            <th className="p-2 border">Тип</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td className="p-2 border">{t.id}</td>
              <td className="p-2 border">{t.date}</td>
              <td className="p-2 border">{t.sum.toLocaleString()} грн</td>
              <td className="p-2 border">{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
