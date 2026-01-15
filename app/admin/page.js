// app/admin/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthChange } from '@/lib/auth';
import AdminSidebar from '@/components/AdminSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { logoutAdmin } from '@/lib/auth';
import toast from 'react-hot-toast';
import { BarChart3, Users, FileText, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    const result = await logoutAdmin();
    if (result.success) {
      toast.success('Logged out successfully');
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.email}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Total Services', value: '6', icon: BarChart3, color: 'bg-blue-500' },
              { title: 'Team Members', value: '3', icon: Users, color: 'bg-green-500' },
              { title: 'Blog Posts', value: '—', icon: FileText, color: 'bg-purple-500' },
              { title: 'Messages', value: '—', icon: MessageSquare, color: 'bg-orange-500' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/admin/home')}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-left"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Edit Home Page</h3>
                <p className="text-sm text-gray-600">Update hero section and featured services</p>
              </button>
              <button
                onClick={() => router.push('/admin/services')}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-left"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Manage Services</h3>
                <p className="text-sm text-gray-600">Add or edit service details</p>
              </button>
              <button
                onClick={() => router.push('/admin/blog')}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-left"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Create Blog Post</h3>
                <p className="text-sm text-gray-600">Write and publish new articles</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
