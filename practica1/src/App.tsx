import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { Courts } from './pages/Courts';
import { CourtDetail } from './pages/CourtDetail';
import { Login } from './pages/Login';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Profile } from './pages/Profile';
import { Bookings } from './pages/Bookings';

type Page = 'home' | 'courts' | 'court-detail' | 'login' | 'about' | 'contact' | 'profile' | 'bookings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCourtId, setSelectedCourtId] = useState<string | undefined>();

  const handleNavigate = (page: string, courtId?: string) => {
    setCurrentPage(page as Page);
    if (courtId) {
      setSelectedCourtId(courtId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'courts':
        return <Courts onNavigate={handleNavigate} />;
      case 'court-detail':
        return <CourtDetail courtId={selectedCourtId} onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      case 'bookings':
        return <Bookings onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;