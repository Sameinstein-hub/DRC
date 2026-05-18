import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgrammesPage from './pages/ProgrammesPage';
import MentorEnrolPage from './pages/MentorEnrolPage';
import MenteeEnrolPage from './pages/MenteeEnrolPage';
import SubscriptionPage from './pages/SubscriptionPage';
import CrowdfundingPage from './pages/CrowdfundingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import MentorDashboard from './dashboards/MentorDashboard';
import MenteeDashboard from './dashboards/MenteeDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { state } = useApp();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const isDashboard = currentPage === 'dashboard' && state.auth.isLoggedIn;
  const isLogin = currentPage === 'login';

  // Show correct dashboard based on role
  if (isDashboard) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage={currentPage} setPage={setCurrentPage} />
        {state.auth.role === 'admin' && <AdminDashboard />}
        {state.auth.role === 'mentor' && <MentorDashboard />}
        {state.auth.role === 'mentee' && <MenteeDashboard />}
      </div>
    );
  }

  if (isLogin) {
    return (
      <>
        <Navbar currentPage={currentPage} setPage={setCurrentPage} />
        <LoginPage setPage={setCurrentPage} />
      </>
    );
  }

  // Public pages
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setPage={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'programmes': return <ProgrammesPage setPage={setCurrentPage} />;
      case 'mentor-enrol': return <MentorEnrolPage />;
      case 'mentee-enrol': return <MenteeEnrolPage />;
      case 'subscription': return <SubscriptionPage />;
      case 'crowdfunding': return <CrowdfundingPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
