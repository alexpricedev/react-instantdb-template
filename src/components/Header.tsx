import { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthProvider';
import { LoginModal } from './LoginModal';

interface HeaderProps {
  currentPage: 'home' | 'about' | 'account';
  onPageChange: (page: 'home' | 'about' | 'account') => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const { user, profile, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navMenuRef = useRef<HTMLDivElement>(null);

  // Profile is now available from auth context
  const userProfile = profile;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedInsideUserMenu =
        userMenuRef.current && userMenuRef.current.contains(target);
      const clickedInsideNavMenu =
        navMenuRef.current && navMenuRef.current.contains(target);

      if (!clickedInsideUserMenu && !clickedInsideNavMenu) {
        setShowUserMenu(false);
        setShowNavMenu(false);
      }
    }

    if (showUserMenu || showNavMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showUserMenu, showNavMenu]);

  // Prevent body scroll when nav menu is open on mobile
  useEffect(() => {
    if (showNavMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showNavMenu]);

  const openLoginModal = (mode: 'login' | 'signup') => {
    setLoginMode(mode);
    setShowLoginModal(true);
  };

  const handleNavClick = (page: 'home' | 'about' | 'account') => {
    onPageChange(page);
    setShowNavMenu(false);
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      description: 'Welcome page and getting started',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      ),
      page: 'home' as const,
    },
    {
      id: 'about',
      label: 'About',
      description: 'Learn about this template',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      page: 'about' as const,
    },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                Your App<span className="text-blue-600">.</span>
              </button>
              <p className="text-sm text-gray-600 ml-3 hidden md:block">
                Built with React + InstantDB
              </p>
            </div>

            {/* Navigation and Actions */}
            <div className="flex items-center gap-3">
              {/* Main Navigation Dropdown */}
              <div className="relative" ref={navMenuRef}>
                <button
                  type="button"
                  onClick={() => {
                    setShowNavMenu(!showNavMenu);
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                  <span className="hidden sm:inline">Menu</span>
                </button>

                {showNavMenu && (
                  <div
                    className="fixed left-4 right-4 mt-2 sm:absolute sm:left-auto sm:right-0 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-50"
                    style={{ top: '60px' }}
                  >
                    <div className="space-y-2">
                      {navItems.map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavClick(item.page)}
                          className={`w-full flex items-start gap-4 px-4 py-3 text-left rounded-lg transition-all duration-200 hover:shadow-sm ${
                            currentPage === item.page
                              ? 'bg-blue-50 text-blue-700 border border-transparent shadow-sm hover:bg-blue-100'
                              : 'text-gray-700 border border-transparent hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 mt-0.5 ${
                              currentPage === item.page
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }`}
                          >
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {item.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {item.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Primary CTA - Sign up for non-logged users */}
              {!user && (
                <button
                  type="button"
                  onClick={() => openLoginModal('signup')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <span className="hidden sm:inline">
                    Create a Free Account
                  </span>
                  <span className="sm:hidden">Sign Up</span>
                </button>
              )}

              {/* Login Icon Button - for non-logged users */}
              {!user && (
                <button
                  type="button"
                  onClick={() => openLoginModal('login')}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-700"
                  title="Sign in"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <title>Sign in</title>
                    <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
                  </svg>
                </button>
              )}

              {/* User Menu - Only for logged in users */}
              {user && (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(!showUserMenu);
                      setShowNavMenu(false);
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center text-white font-semibold text-sm sm:text-base"
                  >
                    {userProfile?.handle?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase()}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                        {userProfile?.handle && (
                          <div className="font-medium text-gray-900 mb-1">
                            {userProfile.handle}
                          </div>
                        )}
                        <div>{user.email}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleNavClick('about');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        About
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleNavClick('account');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Account Settings
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        mode={loginMode}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
