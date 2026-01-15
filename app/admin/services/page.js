// app/admin/services/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthChange, logoutAdmin } from '@/lib/auth';
import { getSiteContent, updateSiteContent } from '@/lib/firestore';
import { defaultContent } from '@/lib/defaultContent';
import AdminSidebar from '@/components/AdminSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function AdminServicesPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState(defaultContent.services);
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
    const data = await getSiteContent('services');
    if (data) {
      setContent(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateSiteContent('services', content);
    
    if (result.success) {
      toast.success('Services content updated successfully!');
    } else {
      toast.error('Failed to update content');
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Services</h1>
            <p className="text-gray-600">Update services page content and descriptions</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Page Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Page Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Services List</h3>
              <p className="text-sm text-gray-600 mb-4">
                To edit individual services, modify the content below. Use JSON format for structured data.
              </p>
              <textarea
                value={JSON.stringify(content.list, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setContent({ ...content, list: parsed });
                  } catch (err) {
                    // Invalid JSON, don't update
                  }
                }}
                rows={20}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm"
              />
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
