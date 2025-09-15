import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Users, Star, Calendar, CheckCircle } from 'lucide-react';
import { mockCourts } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';

interface CourtDetailProps {
  courtId?: string;
  onNavigate: (page: string) => void;
}

export const CourtDetail: React.FC<CourtDetailProps> = ({ courtId, onNavigate }) => {
  const { user, isLoggedIn } = useAuth();
  const { createBooking, getCourtAvailability } = useBookings(user?.id);
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const court = mockCourts.find(c => c.id === courtId);

  if (!court) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancha no encontrada</h2>
          <button
            onClick={() => onNavigate('courts')}
            className="text-blue-600 hover:text-blue-700"
          >
            Volver a canchas
          </button>
        </div>
      </div>
    );
  }

  const availableSlots = getCourtAvailability(court.id, selectedDate);
  const totalPrice = court.pricePerHour * duration;

  const handleBooking = async () => {
    if (!isLoggedIn) {
      onNavigate('login');
      return;
    }

    if (!selectedTime) {
      alert('Por favor selecciona un horario');
      return;
    }

    setIsBooking(true);
    const success = await createBooking({
      courtId: court.id,
      date: selectedDate,
      time: selectedTime,
      duration
    });

    if (success) {
      setBookingSuccess(true);
      setTimeout(() => {
        onNavigate('bookings');
      }, 2000);
    } else {
      alert('Error al realizar la reserva. Intenta nuevamente.');
    }
    setIsBooking(false);
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Reserva Confirmada!</h2>
          <p className="text-gray-600 mb-4">
            Tu reserva en {court.name} ha sido confirmada para el {selectedDate} a las {selectedTime}
          </p>
          <p className="text-sm text-gray-500">
            Redirigiendo a tus reservas...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('courts')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver a canchas
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{court.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <img
                src={court.image}
                alt={court.name}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-current mr-1" size={20} />
                  <span className="text-lg font-semibold">4.8</span>
                  <span className="text-gray-600 ml-2">(32 reseñas)</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ${court.pricePerHour}/hora
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>{court.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-2" />
                  <span>Hasta {court.capacity} personas</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" />
                  <span>{court.availability.length} horarios disponibles</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{court.description}</p>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Servicios incluidos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {court.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Calendar size={20} className="inline mr-2" />
                Realizar Reserva
              </h3>

              {!isLoggedIn && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 text-sm">
                    Debes iniciar sesión para realizar una reserva
                  </p>
                  <button
                    onClick={() => onNavigate('login')}
                    className="mt-2 text-sm text-yellow-700 underline hover:text-yellow-900"
                  >
                    Iniciar sesión
                  </button>
                </div>
              )}

              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Time Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horario disponible
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {availableSlots.length === 0 && (
                  <p className="text-sm text-gray-500">No hay horarios disponibles para esta fecha</p>
                )}
              </div>

              {/* Duration */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración (horas)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1 hora</option>
                  <option value={2}>2 horas</option>
                  <option value={3}>3 horas</option>
                  <option value={4}>4 horas</option>
                </select>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>${court.pricePerHour}/hora × {duration} hora(s)</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              {/* Booking Button */}
              <button
                onClick={handleBooking}
                disabled={!isLoggedIn || !selectedTime || isBooking || availableSlots.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {isBooking ? 'Procesando...' : 'Confirmar Reserva'}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Podrás cancelar tu reserva hasta 2 horas antes del horario seleccionado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};