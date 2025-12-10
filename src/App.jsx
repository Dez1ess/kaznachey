import { TransactionsProvider } from "./components/TransactionsContext";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Contacts from "./pages/Contacts";

export default function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDark(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 flex flex-col ">
      <Navbar user={user} setUser={setUser} />
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-full lg:max-w-6xl mx-auto w-full">
        <TransactionsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </TransactionsProvider>
      </div>
      <Footer />
    </div>
  );
}
