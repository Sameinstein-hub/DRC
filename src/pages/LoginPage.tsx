import { useState } from 'react';
import { useApp } from '../store';
import { Lock, Mail, AlertCircle } from 'lucide-react';

interface Props { setPage: (p: string) => void; }

export default function LoginPage({ setPage }: Props) {
  const { login, state } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const inputEmail = email.toLowerCase().trim();

    if (!inputEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    // 1. Admin login restriction with specific secure password
    if (inputEmail === 'samsonoluwayomi@gmail.com') {
      if (password !== 'admin1234') {
        setError('Incorrect password for the Admin account.');
        return;
      }
      login('admin', 'admin-1');
      setPage('dashboard');
      return;
    }

    // 2. Mentor lookup with specific password check
    const mentor = state.mentors.find(m => m.email.toLowerCase() === inputEmail);
    if (mentor) {
      const correctPassword = mentor.password || 'drc1234';
      if (password !== correctPassword) {
        setError('Incorrect password for the Mentor account.');
        return;
      }
      login('mentor', mentor.id);
      setPage('dashboard');
      return;
    }

    // 3. Mentee lookup with specific password check
    const mentee = state.mentees.find(m => m.email.toLowerCase() === inputEmail);
    if (mentee) {
      const correctPassword = mentee.password || 'drc1234';
      if (password !== correctPassword) {
        setError('Incorrect password for the Mentee account.');
        return;
      }
      login('mentee', mentee.id);
      setPage('dashboard');
      return;
    }

    // 4. Account not found
    setError('Account not found. Please verify your email address or enrol first.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0f3460] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="DRC Logo" className="h-20 w-20 rounded-full object-cover mx-auto mb-4 logo-spin" />
          <h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to Data Revolution Consults Ltd® platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2 font-medium">
              <AlertCircle size={18} className="shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              />
            </div>
          </div>

          <button onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/25 active:scale-95">
            Sign In
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <button onClick={() => setPage('mentee-enrol')} className="text-cyan-600 font-medium hover:underline">Enrol Now</button>
          </p>
        </div>
      </div>
    </div>
  );
}
