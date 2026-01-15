// app/admin/home/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthChange, logoutAdmin } from '@/lib/auth';
import { getSiteContent, updateSiteContent } from '@/lib/firestore';
import { defaultContent } from '@/lib/defaultContent';
import AdminSidebar from '@/components/AdminSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function AdminHomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState(defaultContent.home);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadContent();
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadContent = async () => {
    const data = await getSiteContent('home');
    if (data) {
      setContent(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateSiteContent('home', content);
      if (result.success) {
        toast.success('Home content updated successfully!');
      } else {
        toast.error('Failed to update content: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      toast.error('Unexpected error: ' + (err.message || err.toString()));
    }
    setSaving(false);
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Home Page</h1>
            <p className="text-gray-600">Update hero section and featured services</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            {/* Hero Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={content.hero?.title || ''}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { ...content.hero, title: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={content.hero?.subtitle || ''}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { ...content.hero, subtitle: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={content.hero?.description || ''}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { ...content.hero, description: e.target.value }
                    })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
