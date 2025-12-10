import { useState } from "react";
import emailjs from "@emailjs/browser";

emailjs.init("sD7paSo32BfoWa3wx"); // Public Key

export default function Contacts() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Валідація email
    if (!validateEmail(form.email)) {
      setError("Будь ласка, введіть коректну email адресу");
      setLoading(false);
      return;
    }

    // Валідація полів
    if (!form.name.trim() || !form.message.trim()) {
      setError("Будь ласка, заповніть усі поля");
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        "service_9bwd6p4", // Service ID
        "template_89hwf4u", // Template ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: "kul_ak22@nuwm.edu.ua", // Email отримувача
        }
      );

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError("Помилка при надсиланні. Спробуйте пізніше.");
      console.error("EmailJS error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div>
        <h1 className="text-4xl font-extrabold text-blue-900 dark:text-blue-400">
          Контакти
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Інформація для звʼязку, години роботи та форма звернення
        </p>
      </div>

      {/* Форма */}
      <div className="bg-white dark:bg-gray-800 shadow border rounded-xl p-6">
        <div className="space-y-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Написати нам
            </h2>
          </div>

          {sent && (
            <div className="my-4">
              <p className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                ✓ Повідомлення успішно надіслано!
              </p>
            </div>
          )}

          {error && (
            <p className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              ✗ {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <input
                name="name"
                type="text"
                placeholder="Ім'я"
                className="border p-3 rounded-lg w-full bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="border p-3 rounded-lg w-full bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <textarea
                name="message"
                placeholder="Повідомлення"
                className="border p-3 rounded-lg w-full bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-200 h-32 resize-none"
                value={form.message}
                onChange={handleChange}
                required
                disabled={loading}
              ></textarea>
            </div>

            <button
              className="bg-blue-900 dark:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow hover:opacity-90 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Надсилання..." : "Надіслати"}
            </button>
          </form>
        </div>
      </div>

      {/* Блок інформації */}
      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow border space-y-3">
        <div className="mb-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Основна інформація
          </h2>
        </div>
        <div className="space-y-1 text-gray-700 dark:text-gray-300">
          <p>Адреса: м. Корець, вул. Київська 75-А</p>
          <p>Телефон: (умовно)</p>
          <p>Email: treasury@example.com</p>
        </div>
      </div>

      {/* Години роботи */}
      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow border space-y-5">
        <div className="mb-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Години роботи
          </h2>
        </div>
        <div className="space-y-1 text-gray-700 dark:text-gray-300">
          <p>Пн–Пт: 09:00 – 17:00</p>
          <p>Обід: 13:00 – 14:00</p>
        </div>
      </div>

      {/* Карта */}
      <div className="rounded-xl overflow-hidden shadow border">
        <iframe
          className="w-full h-64"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps?q=Корець%20Київська%2075-А&output=embed"
        ></iframe>
      </div>
    </div>
  );
}
