import { useState } from 'react';
import { useApp } from '../store';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

export default function Navbar({ currentPage, setPage }: NavbarProps) {
  const { state, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const publicLinks = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About Us' },
    { key: 'programmes', label: 'Programmes' },
    { key: 'mentor-enrol', label: 'Mentors' },
    { key: 'mentee-enrol', label: 'Mentees' },
    { key: 'subscription', label: 'Mentor Plan' },
    { key: 'crowdfunding', label: 'Crowdfunding' },
    { key: 'contact', label: 'Contact' },
  ];

  const handleNav = (key: string) => {
    setPage(key);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-[#0a1628] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
            <img src="/images/logo.png" alt="DRC Logo" className="h-20 w-20 rounded-full object-cover logo-spin" />
            <div className="hidden sm:block">
              <span className="font-bold text-lg leading-tight">Data Revolution</span>
              <span className="text-xs text-cyan-400 block -mt-1">Consults Ltd®</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {publicLinks.map(l => (
              <button key={l.key} onClick={() => handleNav(l.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === l.key ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {state.auth.isLoggedIn ? (
              <>
                <button onClick={() => handleNav('dashboard')}
                  className="flex items-center gap-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm font-medium transition-colors">
                  <LayoutDashboard size={16} /> Dashboard
                </button>
                <button onClick={() => { logout(); handleNav('home'); }}
                  className="flex items-center gap-1 px-4 py-2 bg-red-600/80 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <button onClick={() => handleNav('login')}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-sm font-medium transition-colors">
                Login / Register
              </button>
            )}
          </div>

          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0d1f3c] border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {publicLinks.map(l => (
              <button key={l.key} onClick={() => handleNav(l.key)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${currentPage === l.key ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}>
                {l.label}
              </button>
            ))}
            <div className="border-t border-white/10 pt-2 mt-2">
              {state.auth.isLoggedIn ? (
                <>
                  <button onClick={() => handleNav('dashboard')}
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-cyan-400 hover:bg-white/10">
                    Dashboard
                  </button>
                  <button onClick={() => { logout(); handleNav('home'); }}
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-white/10">
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={() => handleNav('login')}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-cyan-400 hover:bg-white/10">
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
