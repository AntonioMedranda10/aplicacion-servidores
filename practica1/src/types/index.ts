// Definiciones de tipos TypeScript para la aplicación

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

export interface Court {
  id: string;
  name: string;
  sport: SportType;
  description: string;
  image: string;
  capacity: number;
  location: string;
  pricePerHour: number;
  amenities: string[];
  availability: string[];
}

export interface Booking {
  id: string;
  userId: string;
  courtId: string;
  courtName: string;
  date: string;
  time: string;
  duration: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export type SportType = 'football' | 'volleyball' | 'basketball' | 'tennis' | 'paddle';

export interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface BookingFormData {
  courtId: string;
  date: string;
  time: string;
  duration: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject: string;
}