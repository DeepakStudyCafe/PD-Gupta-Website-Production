// app/admin/contacts/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthChange, logoutAdmin } from '@/lib/auth';
import { getContactMessages, markContactAsRead } from '@/lib/firestore';
import AdminSidebar from '@/components/AdminSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Mail, Phone, Calendar, CheckCircle } from 'lucide-react';

export default function AdminContactsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadContacts();
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadContacts = async () => {
    const data = await getContactMessages();
    setContacts(data);
    setLoading(false);
  };

  const handleMarkAsRead = async (contactId) => {
    const result = await markContactAsRead(contactId);
    if (result.success) {
      toast.success('Marked as read');
      loadContacts();
    } else {
      toast.error('Failed to update status');
    }
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

  const unreadCount = contacts.filter(c => c.status === 'unread').length;

  return (
    <div className="flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h1>
            <p className="text-gray-600">
              {contacts.length} total messages · {unreadCount} unread
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {contacts.length === 0 ? (
              <div className="p-12 text-center text-gray-600">
                <Mail size={48} className="mx-auto mb-4 text-gray-400" />
                <p>No contact messages yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {contacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className={`p-6 ${contact.status === 'unread' ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                          {contact.status === 'unread' && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                              New
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <Mail size={16} />
                            <a href={`mailto:${contact.email}`} className="hover:text-primary-700">
                              {contact.email}
                            </a>
                          </div>
                          
                          {contact.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone size={16} />
                              <a href={`tel:${contact.phone}`} className="hover:text-primary-700">
                                {contact.phone}
                              </a>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>
                              {contact.createdAt?.toDate ? 
                                contact.createdAt.toDate().toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }) : 
                                'Recently'
                              }
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                      </div>
                      
                      {contact.status === 'unread' && (
                        <button
                          onClick={() => handleMarkAsRead(contact.id)}
                          className="ml-4 flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                          <CheckCircle size={16} />
                          <span>Mark Read</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
