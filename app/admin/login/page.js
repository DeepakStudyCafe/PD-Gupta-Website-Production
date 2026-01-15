// app/admin/login/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin, onAuthChange } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await loginAdmin(email, password);

    if (result.success) {
      toast.success('Login successful!');
      router.push('/admin');
    } else {
      toast.error(result.error || 'Login failed. Please check your credentials.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">S&A</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">PD Gupta & CO</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="admin@sharmaassociates.in"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-primary-700 hover:text-primary-800 transition">
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
