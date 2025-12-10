export default function About() {
  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-4xl font-extrabold text-blue-900 dark:text-blue-400">
          Про систему
        </h1>
      </div>

      {/* Опис */}
      <div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
          Це демонстраційна інформаційна система, що імітує роботу елементів
          казначейського обліку. Створена з навчальною метою та демонструє
          базові принципи організації електронних бюджетних даних.
        </p>
      </div>

      {/* Картка з можливостями */}
      <div className="p-6 sm:p-8 rounded-2xl border bg-white dark:bg-gray-800 shadow-md space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Основні можливості
          </h2>
        </div>

        <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          <li>Перегляд та фільтрація транзакцій з PDF-експортом</li>
          <li>Інтерактивні графіки надходжень та витрат</li>
          <li>Dashboard із ключовими показниками</li>
          <li>Контактна форма та інтерактивна карта</li>
          <li>Темна/світла тема</li>
        </ul>
      </div>

      {/* Заключення */}
      <div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
          Всі дані умовні, але дизайн повторює реальний вигляд внутрішніх систем
          казначейства.
        </p>
      </div>
    </div>
  );
}
