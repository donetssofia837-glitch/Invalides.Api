import { Outlet, NavLink } from 'react-router-dom';
import { Search, Plus, Trash2, LayoutDashboard, CalendarDays, Settings, User, PawPrint } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Бічне меню (Sidebar) */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col shrink-0">
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-gray-100">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <PawPrint size={20} />
          </div>
          <span className="text-lg font-bold text-gray-800">PetCare Tracker</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <LayoutDashboard size={19} />
            Дашборд
          </NavLink>

          <NavLink
            to="/tracker"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <CalendarDays size={19} />
            Календар / Трекер
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Settings size={19} />
            Налаштування
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <User size={19} />
            Профіль
          </NavLink>
        </nav>
      </aside>

      {/* Права частина: Шапка + Контент */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 gap-4 shrink-0">
          {/* Поле пошуку */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Пошук за кличкою..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Кнопки швидких дій */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-sm font-medium transition-colors">
              <Plus size={18} />
              <span className="hidden sm:inline">Додати тварину</span>
            </button>
            <button className="flex items-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-gray-200 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors">
              <Trash2 size={18} />
              <span className="hidden sm:inline">Видалити тварину</span>
            </button>
          </div>
        </header>

        {/* Основна робоча область */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}