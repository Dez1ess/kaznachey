import { createContext, useState } from "react";

export const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([
    // 2024
    { id: 1, date: "2024-01-05", sum: 12000, type: "Надходження" },
    { id: 2, date: "2024-01-10", sum: 5000, type: "Видаток" },
    { id: 3, date: "2024-02-15", sum: 18000, type: "Надходження" },
    { id: 4, date: "2024-02-20", sum: 7000, type: "Видаток" },
    { id: 5, date: "2024-03-03", sum: 9000, type: "Надходження" },
    { id: 6, date: "2024-03-18", sum: 4000, type: "Видаток" },
    { id: 7, date: "2024-04-12", sum: 15000, type: "Надходження" },
    { id: 8, date: "2024-04-22", sum: 6000, type: "Видаток" },
    { id: 9, date: "2024-05-05", sum: 13000, type: "Надходження" },
    { id: 10, date: "2024-05-15", sum: 3000, type: "Видаток" },
    // 2025
    { id: 11, date: "2025-01-08", sum: 14000, type: "Надходження" },
    { id: 12, date: "2025-01-18", sum: 8000, type: "Видаток" },
    { id: 13, date: "2025-02-10", sum: 12000, type: "Надходження" },
    { id: 14, date: "2025-02-25", sum: 4500, type: "Видаток" },
    { id: 15, date: "2025-03-05", sum: 16000, type: "Надходження" },
    { id: 16, date: "2025-03-20", sum: 5000, type: "Видаток" },
    { id: 17, date: "2025-04-15", sum: 11000, type: "Надходження" },
    { id: 18, date: "2025-04-30", sum: 6000, type: "Видаток" },
    { id: 19, date: "2025-05-10", sum: 9000, type: "Надходження" },
    { id: 20, date: "2025-05-25", sum: 4000, type: "Видаток" },
    { id: 21, date: "2025-12-01", sum: 12500, type: "Видаток" },
    { id: 22, date: "2025-12-02", sum: 8200, type: "Надходження" },
    { id: 23, date: "2025-12-03", sum: 3400, type: "Видаток" },
    { id: 24, date: "2025-12-05", sum: 5200, type: "Надходження" },
  ]);

  const addTransaction = (newTransaction) => {
    setTransactions([
      ...transactions,
      { id: transactions.length + 1, ...newTransaction },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
