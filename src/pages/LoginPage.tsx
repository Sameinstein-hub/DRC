import { useState } from 'react';
import { useApp } from '../store';
import { Lock, User, Shield } from 'lucide-react';
import type { UserRole } from '../types';

interface Props { setPage: (p: string) => void; }

export default function LoginPage({ setPage }: Props) {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');

  const roles: { role: UserRole; label: string; desc: string; icon: typeof User; userId: string; color: string }[] = [
    { role: 'admin', label: 'Admin', desc: 'Platform administration and oversight', icon: Shield, userId: 'admin-1', color: 'from-red-500 to-orange-600' },
    { role: 'mentor', label: 'Mentor', desc: 'Course access, mentee management, gigs', icon: User, userId: 'mentor-1', color: 'from-cyan-500 to-blue-600' },
    { role: 'mentee', label: 'Mentee', desc: 'Courses, gigs, wallet, business ideas', icon: Lock, userId: 'mentee-1', color: 'from-purple-500 to-pink-600' },
  ];

  const handleLogin = () => {
    if (!selectedRole) return;
    const r = roles.find(r => r.role === selectedRole)!;
    login(r.role, r.userId);
    setPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0f3460] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="DRC Logo" className="h-16 w-16 rounded-full object-cover mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to Data Revolution Company® platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" placeholder="your@email.com" defaultValue="demo@drc.ng"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" placeholder="••••••••" defaultValue="demo1234"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Role (Demo)</label>
            <div className="space-y-2">
              {roles.map(r => (
                <button key={r.role} onClick={() => setSelectedRole(r.role)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${selectedRole === r.role ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center shrink-0`}>
                    <r.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{r.label}</div>
                    <div className="text-xs text-gray-500">{r.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleLogin} disabled={!selectedRole}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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
