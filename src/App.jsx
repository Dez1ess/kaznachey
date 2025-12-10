import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Contacts from "./pages/Contacts";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar user={user} setUser={setUser} />
      <div className="py-8 sm:px-4 lg:px-0 max-w-full sm:max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}
