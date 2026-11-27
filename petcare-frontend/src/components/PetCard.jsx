import React from 'react';
import { Image as ImageIcon, CheckSquare, Square, Trash2 } from 'lucide-react';

export default function PetCard({ pet, isDeleteMode, onDelete, onOpenDetails }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col transition-all hover:shadow-md">
      {/* Кнопка видалення в режимі редагування */}
      {isDeleteMode && (
        <button
          type="button"
          onClick={() => onDelete(pet.id)}
          className="absolute top-2.5 right-2.5 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-transform hover:scale-105"
          title="Видалити тварину"
        >
          <Trash2 size={16} />
        </button>
      )}

      {/* Верхня кольорова плашка: ТІЛЬКИ фото та кличка */}
      <div className={`${pet.headerBg} p-3.5 m-2 rounded-xl flex items-center gap-3.5`}>
        <div className="w-16 h-16 bg-white/70 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
          {pet.image ? (
            <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="text-gray-400" size={30} />
          )}
        </div>
        <div className="min-w-0 pr-6">
          <h2 className="text-xl font-bold text-gray-900 leading-tight truncate">{pet.name}</h2>
        </div>
      </div>

      {/* Тіло картки з різними графіками під кожну категорію */}
      <div className="p-4 pt-2 flex-1 flex flex-col justify-between">
        
        {/* 1. ДОМАШНІ (Кіт, пес): Хвилястий графік прогулянок/ігор + Стовпчаста діаграма сну */}
        {pet.category === 'Домашні' && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-[11px] font-bold text-gray-800 mb-2">Ігри / прогулянки</p>
              <svg viewBox="0 0 100 45" className="w-full h-12 overflow-visible">
                <defs>
                  <linearGradient id={`domGrad-${pet.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 40 Q 15 12, 25 26 T 48 14 T 72 6 T 100 10 L 100 42 L 0 42 Z"
                  fill={`url(#domGrad-${pet.id})`}
                />
                <path
                  d="M0 40 Q 15 12, 25 26 T 48 14 T 72 6 T 100 10"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.2"
                />
              </svg>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Пн</span><span>Ср</span><span>Пт</span><span>{pet.metric1 || '3.5 км'}</span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-800 mb-2">Режим сну (%)</p>
              <div className="h-12 flex items-end gap-1.5 pt-1">
                <div className="w-1/5 bg-blue-500 h-[45%] rounded-t"></div>
                <div className="w-1/5 bg-blue-500 h-[95%] rounded-t"></div>
                <div className="w-1/5 bg-blue-500 h-[75%] rounded-t"></div>
                <div className="w-1/5 bg-blue-500 h-[85%] rounded-t"></div>
                <div className="w-1/5 bg-blue-200 h-[40%] rounded-t"></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>0</span><span>50</span><span>{pet.metric2 || '14 год'}</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. ЕКЗОТИЧНІ (Лисиця, тхір, ігуана, змія): Графік вологості + Шкала чистоти тераріуму */}
        {pet.category === 'Екзотичні' && (
          <div className="space-y-3.5 mb-4">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1">
                <span>Вологість тераріуму</span>
                <span className="text-amber-600 font-semibold">{pet.metric1 || '75%'}</span>
              </div>
              <svg viewBox="0 0 120 26" className="w-full h-7 overflow-visible">
                <defs>
                  <linearGradient id={`exoGrad-${pet.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 20 Q 20 6, 40 16 T 80 8 T 120 12 L 120 26 L 0 26 Z"
                  fill={`url(#exoGrad-${pet.id})`}
                />
                <path
                  d="M0 20 Q 20 6, 40 16 T 80 8 T 120 12"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1.5">
                <span>Чистота тераріуму / вольєру</span>
                <span className="text-gray-500 font-normal">{pet.cleanliness ?? 94}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${pet.cleanliness ?? 94}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* 3. РИБИ: Графік стабільності температури + Сегментована шкала чистоти акваріума */}
        {pet.category === 'Риби' && (
          <div className="space-y-3.5 mb-4">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1">
                <span>Температура води</span>
                <span className="text-cyan-600 font-semibold">{pet.metric1 || '26 °C'}</span>
              </div>
              <svg viewBox="0 0 120 26" className="w-full h-7 overflow-visible">
                <path
                  d="M0 15 Q 30 10, 60 14 T 120 11"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="14" r="3" fill="#06b6d4" />
                <circle cx="120" cy="11" r="3" fill="#06b6d4" />
              </svg>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1.5">
                <span>Чистота акваріума</span>
                <span className="text-gray-500 font-normal">{pet.cleanliness ?? 98}%</span>
              </div>
              <div className="grid grid-cols-5 gap-1 h-2">
                {[20, 40, 60, 80, 95].map((step) => (
                  <div
                    key={step}
                    className={`rounded-full ${
                      (pet.cleanliness ?? 98) >= step ? 'bg-cyan-500' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. ГРИЗУНИ (Щури, хом'яки, шиншили, морські свинки): Стовпчики нічного бігу + Прогрес чистоти клітки */}
        {pet.category === 'Гризуни' && (
          <div className="space-y-3.5 mb-4">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1.5">
                <span>Біг у колесі (ніч)</span>
                <span className="text-purple-600 font-semibold">{pet.metric1 || '3.2 км'}</span>
              </div>
              <div className="h-8 flex items-end gap-1.5">
                <div className="w-1/6 bg-purple-200 h-[40%] rounded-t"></div>
                <div className="w-1/6 bg-purple-400 h-[70%] rounded-t"></div>
                <div className="w-1/6 bg-purple-500 h-[90%] rounded-t"></div>
                <div className="w-1/6 bg-purple-400 h-[60%] rounded-t"></div>
                <div className="w-1/6 bg-purple-600 h-full rounded-t"></div>
                <div className="w-1/6 bg-purple-300 h-[50%] rounded-t"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1.5">
                <span>Чистота клітки</span>
                <span className="text-gray-500 font-normal">{pet.cleanliness ?? 85}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full"
                  style={{ width: `${pet.cleanliness ?? 85}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* 5. ПТАХИ (Папуги тощо): Шкала польотів + Чекліст чистоти клітки як на макеті */}
        {pet.category === 'Птахи' && (
          <div className="space-y-3 mb-4">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1.5">
                <span>Активність (Flight time)</span>
                <span className="text-gray-500 font-normal">{pet.metric1 || '56 хв'}</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[78%] rounded-full"></div>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-800 mb-1.5">Чистота клітки</p>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckSquare size={14} className="text-emerald-500 fill-emerald-500/20" />
                    Піддон клітки
                  </span>
                  <span>{pet.cleanliness ?? 99}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckSquare size={14} className="text-emerald-500 fill-emerald-500/20" />
                    Годівниця
                  </span>
                  <span>95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Square size={14} className="text-gray-300" />
                    Поїлка
                  </span>
                  <span>15%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Кнопка "Більше" */}
        <button
          type="button"
          onClick={() => onOpenDetails(pet)}
          className="w-full py-2 bg-slate-50 hover:bg-blue-50 text-blue-600 font-semibold text-xs rounded-xl border border-slate-200/70 transition-colors mt-auto"
        >
          Більше
        </button>
      </div>
    </div>
  );
}