import { Calendar, BarChart2, CheckCircle2, MinusCircle } from 'lucide-react';

const greenDays = [2, 6, 8, 10, 12, 14, 16, 20, 22, 24, 26, 28, 30];
const yellowDays = [4, 18];

export default function PetTracker() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ліва частина: Календар на 31 день */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Календар активності: Барсик</h2>
          </div>

          <div className="grid grid-cols-7 gap-2.5">
            {days.map((day) => {
              const isGreen = greenDays.includes(day);
              const isYellow = yellowDays.includes(day);

              let cellStyle = 'bg-gray-50 border-gray-200 text-gray-700';
              if (isGreen) cellStyle = 'bg-green-100/80 border-green-300 text-green-900';
              if (isYellow) cellStyle = 'bg-amber-100/80 border-amber-300 text-amber-900';

              return (
                <div
                  key={day}
                  className={`border rounded-xl py-2.5 flex flex-col items-center justify-center gap-1 ${cellStyle}`}
                >
                  <span className="text-sm font-bold">{day}</span>
                  {isGreen || isYellow ? (
                    <CheckCircle2 size={15} className="text-green-600" />
                  ) : (
                    <MinusCircle size={15} className="text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Права частина: Огляд місяця */}
        <div className="border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="text-blue-600" size={20} />
              <h2 className="text-lg font-bold text-gray-800">Огляд місяця</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-1">Харчування</p>
                <div className="h-12 bg-blue-50/50 rounded-lg p-2 flex items-end">
                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                    <path d="M0 25 Q 25 5, 45 18 T 80 10 T 100 5" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-700 mb-1">Чистота</p>
                <div className="h-12 bg-amber-50/50 rounded-lg p-2 flex items-end">
                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                    <path d="M0 28 Q 20 8, 40 22 T 75 8 T 100 12" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Імітація радіальної діаграми */}
          <div className="mt-6 flex flex-col items-center">
            <svg viewBox="0 0 200 180" className="w-48 h-44">
              <polygon points="100,20 170,70 145,150 55,150 30,70" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              <polygon points="100,45 145,78 128,130 72,130 55,78" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              <polygon
                points="100,35 150,75 132,135 68,132 45,75"
                fill="rgba(34, 197, 94, 0.25)"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <text x="100" y="12" textAnchor="middle" className="text-[10px] fill-gray-600">Харчування</text>
              <text x="185" y="72" textAnchor="middle" className="text-[10px] fill-gray-600">Вправи</text>
              <text x="155" y="168" textAnchor="middle" className="text-[10px] fill-gray-600">Чистота</text>
              <text x="45" y="168" textAnchor="middle" className="text-[10px] fill-gray-600">Медицина</text>
              <text x="15" y="72" textAnchor="middle" className="text-[10px] fill-gray-600">Соціалізація</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}