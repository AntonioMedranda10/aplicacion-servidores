import React from 'react';
import { Users, Target, Heart, Award, MapPin, Phone } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const teamMembers = [
    {
      name: 'Yeiker López',
      role: 'Product Owner / UX Designer',
      image: 'https://static.vecteezy.com/system/resources/previews/007/113/275/non_2x/avatar-man-face-silhouette-user-sign-person-profile-picture-male-icon-in-circle-round-black-color-illustration-image-outline-contour-line-thin-style-vector.jpg',
      description: 'Especialista en investigación de mercado y diseño de experiencia usuario con enfoque en soluciones locales.'
    },
    {
      name: 'Antonio Medranda',
      role: 'Frontend Developer / Architect',
      image: 'https://static.vecteezy.com/system/resources/previews/007/113/275/non_2x/avatar-man-face-silhouette-user-sign-person-profile-picture-male-icon-in-circle-round-black-color-illustration-image-outline-contour-line-thin-style-vector.jpg',
      description: 'Desarrolladora React con experiencia en TypeScript y arquitecturas frontend escalables.'
    },
    {
      name: 'Angel conforme',
      role: 'UI Designer / QA Specialist',
      image: 'https://static.vecteezy.com/system/resources/previews/007/113/275/non_2x/avatar-man-face-silhouette-user-sign-person-profile-picture-male-icon-in-circle-round-black-color-illustration-image-outline-contour-line-thin-style-vector.jpg',
      description: 'Diseñador visual especializado en interfaces modernas y testing de calidad de software.'
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Pasión por el Deporte',
      description: 'Creemos que el deporte une comunidades y mejora la calidad de vida de las personas.'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Comunidad Local',
      description: 'Nos enfocamos en fortalecer el ecosistema deportivo de Manta y su zona metropolitana.'
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: 'Innovación Simple',
      description: 'Tecnología accesible que resuelve problemas reales de manera intuitiva y efectiva.'
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: 'Excelencia',
      description: 'Compromiso con la calidad en cada detalle, desde el código hasta el servicio al cliente.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sobre ReservaManta
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100">
            Conectamos a la comunidad deportiva de Manta con los espacios para practicar deporte.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Mision
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Dar acceso fácil y rápido a la información sobre canchas deportivas en Manta,
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
                <p className="text-gray-600">Deportistas registrados</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">5</div>
                <p className="text-gray-600">Canchas disponibles</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">2+</div>
                <p className="text-gray-600">Reservas realizadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              compromiso con la comunidad manteña
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estudiantes apasionados por el desarrollo de manta:v
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manta Connection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Como manteños, entendemos las necesidades específicas de nuestra ciudad. 
                
              </p>
              <p className="text-gray-700 mb-6">
                Nuestro objetivo es potenciar el talento deportivo local y crear una 
                plataforma que refleje la calidez
              </p>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={20} className="mr-3 text-blue-500" />
                <span>Manta, Ecuador</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={20} className="mr-3 text-green-500" />
                <span>disponibles para la comunidad local</span>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://manta.gob.ec/wp-content/uploads/2025/06/banner-de-manta-puertoyciudad.jpg"
                alt="Deporte en Manta"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-blue-600 opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para ser parte de nuestra comunidad?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a los deportistas que ReservaManta para organizar sus partidos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('courts')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Explorar Canchas
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Contactános
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};