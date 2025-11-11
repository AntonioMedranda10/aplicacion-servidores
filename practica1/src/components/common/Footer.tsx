import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
                RM
              </div>
              <div>
                <h3 className="text-xl font-bold">ReservaManta</h3>
                <p className="text-gray-400 text-sm">Canchas Deportivas</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Conectando a la comunidad deportiva de Manta con los mejores espacios deportivos de la ciudad. 
              Reserva fácil, juego seguro.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2 text-blue-400" />
                <span className="text-sm">Av. Malecón, Manta, Ecuador</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2 text-green-400" />
                <span className="text-sm">+593 5 262-XXXX</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2 text-yellow-400" />
                <span className="text-sm">info@reservamanta.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock size={16} className="mr-2 text-red-400" />
                <span className="text-sm">Lun - Dom: 6:00 - 22:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Términos y Condiciones
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Política de Privacidad
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Preguntas Frecuentes
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Soporte Técnico
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ReservaManta. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0">
            Desarrollado con ❤️ para la comunidad deportiva de Manta
          </p>
        </div>
      </div>
    </footer>
  );
};