import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    subject: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '', subject: 'general' });
    setIsSubmitting(false);

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contacto
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            ¿Tienes preguntas sobre ReservaManta? ¡Estamos aquí para ayudarte!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Información de Contacto
            </h2>
            <p className="text-gray-600 mb-8">
              Como emprendimiento local de Manta, estamos comprometidos con brindar 
              el mejor servicio a nuestra comunidad deportiva. No dudes en contactarnos.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Ubicación</h3>
                  <p className="text-gray-600">
                    Av. Malecón Escénico, Manta<br />
                    Manabí, Ecuador
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Teléfono</h3>
                  <p className="text-gray-600">
                    +593 97 893 9262<br />
                    +593 99 123-4567 (WhatsApp)
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="text-yellow-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">
                    info@reservamanta.com<br />
                    soporte@reservamanta.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Horarios de Atención</h3>
                  <p className="text-gray-600">
                    Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                    Sábados: 9:00 AM - 2:00 PM<br />
                    
                  </p>
                </div>
              </div>
            </div>

            {/* Manta Image */}
            <div className="mt-8">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e9/MANTA_%2817427130779%29.jpg"
                alt="Playa de Manta"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageCircle className="mr-2" size={24} />
              Envíanos un Mensaje
            </h2>

            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                ¡Gracias por contactarnos! Te responderemos pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">Consulta General</option>
                  <option value="reservas">Problemas con Reservas</option>
                  <option value="canchas">Agregar Nueva Cancha</option>
                  <option value="tecnico">Soporte Técnico</option>
                  <option value="sugerencias">Sugerencias</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send className="mr-2" size={18} />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Cómo puedo cancelar una reserva?
              </h3>
              <p className="text-gray-600 text-sm">
                Puedes cancelar tu reserva hasta 2 horas antes del horario programado 
                desde tu panel de usuario o contactándonos directamente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Qué métodos de pago aceptan?
              </h3>
              <p className="text-gray-600 text-sm">
                Actualmente trabajamos con pago en efectivo al momento de usar la cancha. 
                Pronto implementaremos pagos digitales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Puedo reservar para un grupo grande?
              </h3>
              <p className="text-gray-600 text-sm">
                Sí, cada cancha tiene su capacidad máxima. Puedes ver esta información 
                en el detalle de cada cancha antes de reservar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Cómo agrego mi cancha a la plataforma?
              </h3>
              <p className="text-gray-600 text-sm">
                Contáctanos a través de este formulario seleccionando "Agregar Nueva Cancha" 
                y te explicaremos el proceso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};