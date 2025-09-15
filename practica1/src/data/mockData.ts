import { Court, User, Booking } from '../types';

export const mockCourts: Court[] = [
  {
    id: '1',
    name: 'Cancha ULEAM',
    sport: 'football',
    description: 'Cancha de césped natural ubicada en la universidad Eloy Alfaro.',
    image: 'https://pbs.twimg.com/media/Eo9tfLLXUAIs5WG.jpg',
    capacity: 22,
    location: 'Universidad Laica Eloy Alfaro, Manta',
    pricePerHour: 25,
    amenities: ['Iluminación LED', 'Vestidores', 'Estacionamiento', 'Wi-Fi'],
    availability: ['08:00', '09:00', '10:00', '16:00', '17:00', '18:00', '19:00']
  },
  {
    id: '2',
    name: 'Vóley Los Esteros',
    sport: 'volleyball',
    description: 'Cancha de vóley , perfecta para disfrutar del deporte .',
    image: 'https://i0.wp.com/zsfloortech.com/wp-content/uploads/2025/03/cancha-de-voleibol-cubierta-1.jpg?fit=1000%2C1024&ssl=1',
    capacity: 12,
    location: 'Playa Los Esteros, Manta',
    pricePerHour: 15,
    amenities: [ 'Red profesional', 'Área de descanso', 'Bar cafetería'],
    availability: ['07:00', '08:00', '16:00', '17:00', '18:00', '19:00']
  },
  {
    id: '3',
    name: 'Básquet Universidad Laica',
    sport: 'basketball',
    description: 'Cancha cubierta de básquetbol en las instalaciones universitarias.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUxDJXQXK-B6cQPEZxnR4MLupoOyXdfFzrzA&s',
    capacity: 10,
    location: 'Universidad Laica Eloy Alfaro, Manta(Juan Montalvo)',
    pricePerHour: 20,
    amenities: ['Cancha cubierta', 'Tableros regulamentarios', 'Gradas'],
    availability: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
  },
  {
    id: '4',
    name: 'Cancha de futbol 7 San Mateo',
    sport: 'football',
    description: 'Cancha de fútbol 7 con césped sintetico, ideal para partidos amistosos.',
    image: 'https://revistademanabi.com/wp-content/uploads/2016/12/cancha-de-fc3batbol-san-mateo.jpg?w=816',
    capacity: 14,
    location: 'San Mateo, Manta',
    pricePerHour: 18,
    amenities: ['Césped sintético', 'Iluminación', 'Camerinos', 'Área de parqueo'],
    availability: ['06:00', '07:00', '16:00', '17:00', '18:00', '19:00', '20:00']
  },
  {
    id: '5',
    name: 'Tenis la Quadra',
    sport: 'tennis',
    description: 'Cancha de tenis en las exclusivas instalaciones de la Quadra.',
    image: 'https://civideportes.com.co/wp-content/uploads/2020/08/asphalt-tennis-court-5354328_640.jpg',
    capacity: 4,
    location: 'Ña Quadra, Manta',
    pricePerHour: 30,
    amenities: ['Iluminación nocturna', 'Vestuarios exclusivos', 'Servicio de cafetería'],
    availability: ['06:00', '07:00', '08:00', '16:00', '17:00', '18:00']
  },
  {
    id: '6',
    name: 'Vóley Coliseo Manta',
    sport: 'volleyball',
    description: 'Cancha municipal de vóley',
    image: 'https://revistademanabi.com/wp-content/uploads/2017/02/juego-de-goalball-en-manta.jpg?w=816',
    capacity: 12,
    location: 'Manta',
    pricePerHour: 12,
    amenities: ['Red profesional', 'Tribunas', 'Iluminación'],
    availability: ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Carlos Mendoza',
  email: 'carlos@email.com',
  phone: '099-123-4567',
  isLoggedIn: false
};

export const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    courtId: '1',
    courtName: 'Cancha Central Malecón',
    date: '2024-01-15',
    time: '18:00',
    duration: 2,
    totalPrice: 50,
    status: 'confirmed',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    userId: '1',
    courtId: '2',
    courtName: 'Vóley Playa Los Esteros',
    date: '2024-01-20',
    time: '17:00',
    duration: 1,
    totalPrice: 15,
    status: 'confirmed',
    createdAt: '2024-01-12'
  }
];

export const sportCategories = [
  { id: 'football', name: 'Fútbol', icon: '⚽', color: '#059669' },
  { id: 'volleyball', name: 'Vóley', icon: '🏐', color: '#0284C7' },
  { id: 'basketball', name: 'Básquet', icon: '🏀', color: '#DC2626' },
  { id: 'tennis', name: 'Tenis', icon: '🎾', color: '#7C3AED' }
];

export const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];