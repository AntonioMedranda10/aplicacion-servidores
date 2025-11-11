import React, { useState } from 'react';
import { Calendar, Clock, MapPin, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';

interface BookingsProps {
  onNavigate: (page: string) => void;
}

export const Bookings: React.FC<BookingsProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { bookings, cancelBooking, isLoading } = useBookings(user?.id);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Acceso Requerido
          </h2>
          <p className="text-gray-600 mb-4">
            Debes iniciar sesión para ver tus reservas
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  const handleCancel = async (bookingId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      return;
    }

    setCancelingId(bookingId);
    await cancelBooking(bookingId);
    setCancelingId(null);
  };

  const activeBookings = bookings.filter(booking => booking.status === 'confirmed');
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <X size={16} />;
      case 'pending':
        return <Clock size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'cancelled':
        return 'Cancelada';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Reservas</h1>
          <p className="text-gray-600 mt-2">
            Administra todas tus reservas de canchas deportivas en Manta
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={64} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No tienes reservas aún
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Explora nuestras canchas y haz tu primera reserva!
            </p>
            <button
              onClick={() => onNavigate('courts')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Explorar Canchas
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Active Bookings */}
            {activeBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Reservas Activas ({activeBookings.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{getStatusText(booking.status)}</span>
                          </span>
                          <span className="text-sm text-gray-500">#{booking.id}</span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {booking.courtName}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar size={16} className="mr-2" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock size={16} className="mr-2" />
                            <span className="text-sm">{booking.time} ({booking.duration}h)</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin size={16} className="mr-2" />
                            <span className="text-sm">Manta</span>
                          </div>
                        </div>

                        <div className="border-t pt-4 flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              ${booking.totalPrice}
                            </span>
                            <p className="text-xs text-gray-500">Total pagado</p>
                          </div>

                          <button
                            onClick={() => handleCancel(booking.id)}
                            disabled={cancelingId === booking.id}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            {cancelingId === booking.id ? 'Cancelando...' : 'Cancelar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancelled Bookings */}
            {cancelledBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Historial - Canceladas ({cancelledBookings.length})
                </h2>
                <div className="space-y-4">
                  {cancelledBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg shadow-sm border p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3 ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1">{getStatusText(booking.status)}</span>
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {booking.courtName}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {booking.date}
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {booking.time}
                            </div>
                            <div className="flex items-center">
                              <span>Duración: {booking.duration}h</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-semibold text-gray-500">
                            ${booking.totalPrice}
                          </span>
                          <p className="text-xs text-gray-400">Cancelada</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ¿Necesitas hacer otra reserva?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('courts')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Explorar Canchas
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-6 py-3 rounded-lg font-medium"
            >
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};