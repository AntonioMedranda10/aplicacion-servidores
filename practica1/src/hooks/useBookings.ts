import { useState, useEffect } from 'react';
import { Booking, BookingFormData } from '../types';
import { mockBookings, mockCourts } from '../data/mockData';

const STORAGE_KEY = 'reservaManta_bookings';

export const useBookings = (userId?: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Cargar reservas desde localStorage
    const savedBookings = localStorage.getItem(STORAGE_KEY);
    if (savedBookings) {
      const parsedBookings: Booking[] = JSON.parse(savedBookings);
      setBookings(userId ? parsedBookings.filter(b => b.userId === userId) : parsedBookings);
    } else {
      // Usar datos mock iniciales
      setBookings(userId ? mockBookings.filter(b => b.userId === userId) : mockBookings);
    }
  }, [userId]);

  const createBooking = async (bookingData: BookingFormData): Promise<boolean> => {
    if (!userId) return false;

    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 800));

    const court = mockCourts.find(c => c.id === bookingData.courtId);
    if (!court) {
      setIsLoading(false);
      return false;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      userId,
      courtId: bookingData.courtId,
      courtName: court.name,
      date: bookingData.date,
      time: bookingData.time,
      duration: bookingData.duration,
      totalPrice: court.pricePerHour * bookingData.duration,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Obtener todas las reservas existentes
    const allBookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updatedBookings = [...allBookings, newBooking];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
    setBookings(prev => [...prev, newBooking]);
    setIsLoading(false);
    return true;
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Actualizar en localStorage
    const allBookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updatedBookings = allBookings.map((booking: Booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
    
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    ));
    
    setIsLoading(false);
    return true;
  };

  const getCourtAvailability = (courtId: string, date: string): string[] => {
    const court = mockCourts.find(c => c.id === courtId);
    if (!court) return [];

    // Obtener todas las reservas para esta cancha en la fecha específica
    const allBookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(mockBookings));
    const bookedSlots = allBookings
      .filter((booking: Booking) => 
        booking.courtId === courtId && 
        booking.date === date && 
        booking.status === 'confirmed'
      )
      .map((booking: Booking) => booking.time);

    // Retornar slots disponibles (horarios no reservados)
    return court.availability.filter(slot => !bookedSlots.includes(slot));
  };

  return {
    bookings,
    isLoading,
    createBooking,
    cancelBooking,
    getCourtAvailability
  };
};