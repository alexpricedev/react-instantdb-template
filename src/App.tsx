import { useState, useEffect } from 'react';
import './App.css';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { AccountPage } from './components/AccountPage';
import { DisplayNameModal } from './components/DisplayNameModal';
import { Header } from './components/Header';
import { AuthProvider } from './components/AuthProvider';
import { ToastProvider } from './components/ToastProvider';
import { useAuth } from './components/AuthProvider';

// Inner component that has access to auth context
function AppContent() {
  const { user, showDisplayNameModal, setDisplayNameAndCloseModal } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <AppRouter />

      {/* Display Name Modal */}
      <DisplayNameModal
        isOpen={showDisplayNameModal}
        onClose={setDisplayNameAndCloseModal}
        userEmail={user?.email || ''}
      />
    </div>
  );
}

function AppRouter() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'account'>(
    'home'
  );

  // URL routing function
  const handleRouting = () => {
    const path = window.location.pathname;

    // Handle URL routing
    if (path === '/') {
      setCurrentPage('home');
    } else if (path === '/about') {
      setCurrentPage('about');
    } else if (path === '/account') {
      setCurrentPage('account');
    } else {
      setCurrentPage('home');
    }
  };

  // Handle URL routing on app load and browser navigation
  useEffect(() => {
    // Handle initial URL routing
    handleRouting();

    // Listen for browser back/forward navigation
    const handlePopState = () => {
      handleRouting();
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup event listener
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handlePageChange = (page: 'home' | 'about' | 'account') => {
    setCurrentPage(page);

    if (page === 'home') {
      window.history.pushState({}, '', '/');
    } else if (page === 'about') {
      window.history.pushState({}, '', '/about');
    } else if (page === 'account') {
      window.history.pushState({}, '', '/account');
    }
  };

  return (
    <>
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {currentPage === 'home' ? (
          <HomePage onPageChange={handlePageChange} />
        ) : currentPage === 'about' ? (
          <AboutPage />
        ) : currentPage === 'account' ? (
          <AccountPage />
        ) : (
          <HomePage onPageChange={handlePageChange} />
        )}
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
