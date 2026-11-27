import { useState } from 'react';
import { X, HeartPulse, Tag, Utensils, Calendar, Sparkles } from 'lucide-react';
import PetCard from '../components/PetCard';

const needsEnclosureCleanliness = (category) =>
  ['Екзотичні', 'Риби', 'Гризуни', 'Птахи'].includes(category);

const enclosureLabel = {
  'Екзотичні': 'Чистота тераріуму / вольєру (%)',
  'Риби': 'Чистота акваріума (%)',
  'Гризуни': 'Чистота клітки (%)',
  'Птахи': 'Чистота клітки (%)',
};

export default function Dashboard({
  pets,
  isDeleteMode,
  onDeletePet,
  isAddModalOpen,
  onCloseAddModal,
  onAddPet,
}) {
  // Стан для модального вікна "Більше"
  const [selectedPet, setSelectedPet] = useState(null);

  // Стан для форми додавання тварини
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Домашні');
  const [healthStatus, setHealthStatus] = useState('Здоровий');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [diet, setDiet] = useState('Корм');
  const [cleanliness, setCleanliness] = useState(95);
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddPet({
      name,
      category,
      healthStatus,
      breed,
      age,
      diet,
      cleanliness,
      image,
    });
    setName('');
    setCategory('Домашні');
    setHealthStatus('Здоровий');
    setBreed('');
    setAge('');
    setDiet('Корм');
    setCleanliness(95);
    setImage('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[22px] font-bold text-gray-900">Головний довідник тварин</h1>
        {isDeleteMode && (
          <span className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
            Натисніть на іконку кошика на картці, щоб видалити тварину
          </span>
        )}
      </div>

      {/* Адаптивна сітка карток */}
      {pets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              isDeleteMode={isDeleteMode}
              onDelete={onDeletePet}
              onOpenDetails={(item) => setSelectedPet(item)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
          Тварин не знайдено. Спробуйте змінити пошуковий запит або додайте нову тварину.
        </div>
      )}

      {/* МОДАЛЬНЕ ВІКНО "БІЛЬШЕ" (Детальний профіль тварини) */}
      {selectedPet && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md overflow-hidden">
            {/* Шапка профілю */}
            <div className={`${selectedPet.headerBg} p-5 flex items-center justify-between`}>
              <div className="flex items-center gap-3.5">
                {selectedPet.image && (
                  <img
                    src={selectedPet.image}
                    alt={selectedPet.name}
                    className="w-16 h-16 rounded-xl object-cover bg-white/60"
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedPet.name}</h2>
                  <span
                    className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      selectedPet.healthStatus === 'Здоровий'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                    }`}
                  >
                    {selectedPet.healthStatus}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPet(null)}
                className="text-gray-600 hover:text-gray-900 bg-white/60 p-1.5 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Детальна інформація */}
            <div className="p-5 space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="flex items-center gap-2 text-gray-500">
                  <Tag size={16} className="text-blue-500" /> Категорія
                </span>
                <span className="font-semibold text-gray-900">{selectedPet.category}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="flex items-center gap-2 text-gray-500">
                  <HeartPulse size={16} className="text-rose-500" /> Стан здоров'я
                </span>
                <span
                  className={`font-semibold ${
                    selectedPet.healthStatus === 'Здоровий' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {selectedPet.healthStatus}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Порода / вид</span>
                <span className="font-semibold text-gray-900">{selectedPet.breed}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="flex items-center gap-2 text-gray-500">
                  <Calendar size={16} className="text-indigo-500" /> Вік
                </span>
                <span className="font-semibold text-gray-900">{selectedPet.age}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="flex items-center gap-2 text-gray-500">
                  <Utensils size={16} className="text-amber-500" /> Харчування
                </span>
                <span className="font-semibold text-gray-900">{selectedPet.diet}</span>
              </div>

              {needsEnclosureCleanliness(selectedPet.category) && (
                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-gray-500">
                    <Sparkles size={16} className="text-emerald-500" /> Чистота місця
                  </span>
                  <span className="font-semibold text-emerald-600">{selectedPet.cleanliness}%</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setSelectedPet(null)}
                className="w-full mt-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛЬНЕ ВІКНО ДОДАВАННЯ ТВАРИНИ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Додати нову тварину</h2>
              <button
                type="button"
                onClick={onCloseAddModal}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Кличка *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Наприклад: Мурчик"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Категорія</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Домашні">Домашні (кіт, пес)</option>
                    <option value="Екзотичні">Екзотичні (лисиця, ігуана...)</option>
                    <option value="Риби">Риби</option>
                    <option value="Гризуни">Гризуни (щур, хом'як...)</option>
                    <option value="Птахи">Птахи (папуги...)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Стан здоров'я</label>
                  <select
                    value={healthStatus}
                    onChange={(e) => setHealthStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Здоровий">Здоровий</option>
                    <option value="Хворий">Хворий</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Порода / вид</label>
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="Наприклад: Тхір / Хом'як"
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Вік</label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Наприклад: 1 рік"
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Чим харчується</label>
                <select
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Корм">Корм</option>
                  <option value="Натуральне харчування">Натуральне харчування</option>
                </select>
              </div>

              {needsEnclosureCleanliness(category) && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {enclosureLabel[category]}: {cleanliness}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cleanliness}
                    onChange={(e) => setCleanliness(e.target.value)}
                    className="w-full accent-emerald-600"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Посилання на фото (необов'язково)</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={onCloseAddModal}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl"
                >
                  Зберегти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}