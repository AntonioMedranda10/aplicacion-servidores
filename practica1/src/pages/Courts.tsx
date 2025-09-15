import React, { useState } from 'react';
import { MapPin, Clock, Users, Star, Filter } from 'lucide-react';
import { mockCourts, sportCategories } from '../data/mockData';
import { SportType } from '../types';

interface CourtsProps {
  onNavigate: (page: string, courtId?: string) => void;
}

export const Courts: React.FC<CourtsProps> = ({ onNavigate }) => {
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'rating'>('name');

  const filteredCourts = mockCourts
    .filter(court => selectedSport === 'all' || court.sport === selectedSport)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerHour - b.pricePerHour;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return Math.random() - 0.5; 
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Canchas Deportivas en Manta
          </h1>
          <p className="text-lg text-gray-600">
            Descubre {mockCourts.length} espacios deportivos disponibles en toda la ciudad
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <div className="flex items-center mb-4">
                <Filter size={20} className="text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
              </div>

              {/* Sport Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Deporte</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedSport('all')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedSport === 'all'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Todos los deportes ({mockCourts.length})
                  </button>
                  {sportCategories.map((sport) => (
                    <button
                      key={sport.id}
                      onClick={() => setSelectedSport(sport.id as SportType)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center ${
                        selectedSport === sport.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-2">{sport.icon}</span>
                      {sport.name} ({mockCourts.filter(c => c.sport === sport.id).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Ordenar por</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price' | 'name' | 'rating')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Nombre A-Z</option>
                  <option value="price">Precio: Menor a Mayor</option>
                  <option value="rating">Mejor Valoradas</option>
                </select>
              </div>

              {/* Price Range Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Rango de Precios</h4>
                <p className="text-sm text-blue-700">
                  $12 - $30 por hora
                </p>
              </div>
            </div>
          </div>

          {/* Courts Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Mostrando {filteredCourts.length} de {mockCourts.length} canchas
              </p>
              <div className="flex space-x-2">
                {/* Mobile filter button */}
                <button className="lg:hidden p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourts.map((court) => (
                <div key={court.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${court.pricePerHour}/hora
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                        <Star size={14} className="text-yellow-400 fill-current mr-1" />
                        <span className="text-xs font-medium text-gray-900">4.8</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {sportCategories.find(s => s.id === court.sport)?.name}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{court.name}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{court.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Users size={16} className="mr-1" />
                        <span className="text-sm">Hasta {court.capacity} personas</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span className="text-sm">{court.availability.length} horarios</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{court.description}</p>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {court.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {court.amenities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{court.amenities.length - 3} más
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => onNavigate('court-detail', court.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors font-medium"
                    >
                      Ver Detalles y Reservar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron canchas
                </h3>
                <p className="text-gray-600">
                  Intenta ajustar los filtros para ver más opciones
                </p>
                <button
                  onClick={() => setSelectedSport('all')}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};