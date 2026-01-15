// app/admin/blog/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthChange, logoutAdmin } from '@/lib/auth';
import { getAllBlogs, createOrUpdateBlog } from '@/lib/firestore';
import AdminSidebar from '@/components/AdminSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminBlogPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    summary: '',
    content: '',
    image: '',
    author: 'PD Gupta & CO'
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadBlogs();
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadBlogs = async () => {
    const data = await getAllBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.slug || !formData.title) {
      toast.error('Slug and title are required');
      return;
    }

    setSaving(true);
    const result = await createOrUpdateBlog(formData.slug, formData);
    
    if (result.success) {
      toast.success('Blog post saved successfully!');
      setShowForm(false);
      setFormData({
        slug: '',
        title: '',
        summary: '',
        content: '',
        image: '',
        author: 'PD Gupta & CO'
      });
      loadBlogs();
    } else {
      toast.error('Failed to save blog post');
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Blog</h1>
              <p className="text-gray-600">Create and edit blog posts</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>{showForm ? 'Cancel' : 'New Post'}</span>
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Create/Edit Blog Post</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="gst-return-filing-guide"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Complete Guide to GST Return Filing"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Summary</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Brief summary for blog listing page..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content (HTML)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="<p>Your blog content here...</p>"
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Blog Post'}
              </button>
            </div>
          )}

          {/* Blog List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Published Posts ({blogs.length})</h2>
            </div>
            <div className="divide-y">
              {blogs.length === 0 ? (
                <div className="p-8 text-center text-gray-600">
                  No blog posts yet. Create your first one!
                </div>
              ) : (
                blogs.map((blog) => (
                  <div key={blog.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{blog.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{blog.summary}</p>
                        <p className="text-xs text-gray-500">Slug: {blog.slug}</p>
                      </div>
                      <button
                        onClick={() => {
                          setFormData(blog);
                          setShowForm(true);
                        }}
                        className="ml-4 text-primary-700 hover:text-primary-900"
                      >
                        <Edit size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
