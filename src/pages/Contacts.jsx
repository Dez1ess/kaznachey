import { useState } from "react";

export default function Contacts() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Контакти</h1>

      <p className="text-gray-700 mb-2">
        Адреса: м. Корець, вул. Київська 75-А
      </p>
      <p className="text-gray-700 mb-2">Телефон: (умовно)</p>
      <p className="text-gray-700 mb-4">Email: treasury@example.com</p>

      <button
        className="bg-blue-900 text-white px-4 py-2 rounded mb-4"
        onClick={() => setOpen(!open)}
      >
        {open ? "Сховати години роботи" : "Показати години роботи"}
      </button>

      {open && (
        <div className="mb-4 text-gray-700">
          <p>Пн–Пт: 09:00 – 17:00</p>
          <p>Обід: 13:00 – 14:00</p>
        </div>
      )}

      <iframe
        className="w-full h-64 border rounded-xl shadow mb-6"
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps?q=Корець%20Київська%2075-А&output=embed"
      ></iframe>

      <h2 className="text-xl font-bold mb-2">Написати нам</h2>
      {sent && <p className="text-green-600 mb-2">Повідомлення надіслано!</p>}
      <form onSubmit={handleSubmit} className="grid gap-2 mb-6">
        <input
          name="name"
          type="text"
          placeholder="Ім'я"
          className="border p-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Повідомлення"
          className="border p-2 rounded"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded"
          type="submit"
        >
          Надіслати
        </button>
      </form>
    </div>
  );
}
