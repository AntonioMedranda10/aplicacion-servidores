import React from 'react';
import { Calendar, MapPin, Clock, Star, ChevronRight } from 'lucide-react';
import { mockCourts, sportCategories } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';

interface HomeProps {
  onNavigate: (page: string, courtId?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { isLoggedIn } = useAuth();

  const featuredCourts = mockCourts.slice(0, 3);

  const handleBookNow = () => {
    if (isLoggedIn) {
      onNavigate('courts');
    } else {
      onNavigate('login');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Reserva tu Cancha en 
              <span className="text-yellow-300"> Manta</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Descubre y reserva los mejores espacios deportivos de la ciudad costera. 
               Manta tu sitio deportivo te espera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookNow}
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Reservar Ahora
              </button>
              <button
                onClick={() => onNavigate('courts')}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                Ver Canchas
              </button>
            </div>
          </div>
        </div>

        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://revistademanabi.com/wp-content/uploads/2022/05/nuevo-paseo-turistico-manta-espigon.jpg)'
          }}
        ></div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir ReservaManta?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Facilitamos el acceso a espacios deportivos de calidad en toda la ciudad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reserva Fácil</h3>
              <p className="text-gray-600">
                Sistema intuitivo para reservar en pocos clicks. 
                Ve disponibilidad en tiempo real y confirma al instante.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ubicaciones Premium</h3>
              <p className="text-gray-600">
                Canchas en las mejores zonas de Manta: malecón, universidades, 
                clubes y espacios municipales.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Horarios Flexibles</h3>
              <p className="text-gray-600">
                Desde las 6:00 AM hasta las 10:00 PM. 
                Encuentra el horario perfecto para tu equipo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Deportes Disponibles
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra la cancha perfecta para tu deporte favorito
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sportCategories.map((sport) => (
              <button
                key={sport.id}
                onClick={() => onNavigate('courts')}
                className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ borderTop: `4px solid ${sport.color}` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {sport.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{sport.name}</h3>
                <p className="text-sm text-gray-600">
                  {mockCourts.filter(c => c.sport === sport.id).length} canchas
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Canchas Destacadas
              </h2>
              <p className="text-lg text-gray-600">
                Las canchas más populares de Manta
              </p>
            </div>
            <button
              onClick={() => onNavigate('courts')}
              className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas <ChevronRight size={20} className="ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourts.map((court) => (
              <div key={court.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${court.pricePerHour}/hora
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{court.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{court.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">4.8 (32 reseñas)</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{court.description}</p>
                  
                  <button
                    onClick={() => onNavigate('court-detail', court.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <button
              onClick={() => onNavigate('courts')}
              className="flex items-center mx-auto text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas las canchas <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¡Únete a la comunidad deportiva de Manta!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Más de 500 deportistas ya confían en nosotros para organizar sus partidos
          </p>
          <button
            onClick={handleBookNow}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Comenzar Ahora
          </button>
        </div>
      </section>
    </div>
  );
};