import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import PetTracker from './pages/PetTracker';
import Login from './pages/Login';
import Register from './pages/Register';

const initialPets = [
  {
    id: 1,
    name: 'Барсик',
    category: 'Домашні',
    healthStatus: 'Здоровий',
    breed: 'Британський короткошерстий кіт',
    age: '2 роки',
    diet: 'Корм',
    metric1: '1.8 км (ігри)',
    metric2: '15 год/добу',
    headerBg: 'bg-[#dceafe]',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Драко',
    category: 'Екзотичні',
    healthStatus: 'Здоровий',
    breed: 'Зелена ігуана',
    age: '1.5 роки',
    diet: 'Натуральне харчування',
    metric1: '75% вологість',
    cleanliness: 94,
    headerBg: 'bg-[#fef3c7]',
    image: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    name: 'Немо',
    category: 'Риби',
    healthStatus: 'Здоровий',
    breed: 'Риба-клоун',
    age: '8 місяців',
    diet: 'Корм',
    metric1: '26 °C',
    cleanliness: 98,
    headerBg: 'bg-[#cffafe]',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=200&h=200&fit=crop',
  },
  {
    id: 4,
    name: 'Пухнастик',
    category: 'Гризуни',
    healthStatus: 'Хворий',
    breed: 'Шиншила',
    age: '1 рік',
    diet: 'Корм',
    metric1: '3.2 км у колесі',
    cleanliness: 85,
    headerBg: 'bg-[#f3e8ff]',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=200&h=200&fit=crop',
  },
  {
    id: 5,
    name: 'Сільва',
    category: 'Птахи',
    healthStatus: 'Здоровий',
    breed: 'Амазонський папуга',
    age: '2 роки',
    diet: 'Натуральне харчування',
    metric1: '56 хв',
    cleanliness: 99,
    headerBg: 'bg-[#d4f3df]',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=200&h=200&fit=crop',
  },
];

export default function App() {
  const [pets, setPets] = useState(initialPets);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddPet = (newPet) => {
    const bgByCategory = {
      'Домашні': 'bg-[#dceafe]',
      'Екзотичні': 'bg-[#fef3c7]',
      'Риби': 'bg-[#cffafe]',
      'Гризуни': 'bg-[#f3e8ff]',
      'Птахи': 'bg-[#d4f3df]',
    };

    setPets((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newPet.name || 'Без імені',
        category: newPet.category || 'Домашні',
        healthStatus: newPet.healthStatus || 'Здоровий',
        breed: newPet.breed || 'Не вказано',
        age: newPet.age || 'Не вказано',
        diet: newPet.diet || 'Корм',
        metric1: newPet.metric1 || '',
        cleanliness: Number(newPet.cleanliness) || 95,
        headerBg: bgByCategory[newPet.category] || 'bg-[#e5e7eb]',
        image: newPet.image || null,
      },
    ]);
    setIsAddModalOpen(false);
  };

  const handleDeletePet = (id) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <MainLayout
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isDeleteMode={isDeleteMode}
              setIsDeleteMode={setIsDeleteMode}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <Dashboard
                pets={filteredPets}
                isDeleteMode={isDeleteMode}
                onDeletePet={handleDeletePet}
                isAddModalOpen={isAddModalOpen}
                onCloseAddModal={() => setIsAddModalOpen(false)}
                onAddPet={handleAddPet}
              />
            }
          />
          <Route path="tracker" element={<PetTracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}