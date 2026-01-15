// components/AdminSidebar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Users, FileText, MessageSquare, LogOut } from 'lucide-react';

export default function AdminSidebar({ onLogout }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: Home, exact: true },
    { href: '/admin/home', label: 'Home Content', icon: Home },
    { href: '/admin/services', label: 'Services', icon: Briefcase },
    { href: '/admin/about', label: 'About Us', icon: Users },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/contacts', label: 'Contact Messages', icon: MessageSquare },
  ];

  const isActive = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname?.startsWith(item.href);
  };

  return (
    <div className="w-64 bg-primary-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
        <p className="text-sm text-gray-300">PD Gupta & CO</p>
      </div>
      
      <nav className="px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition ${
                isActive(item)
                  ? 'bg-white/20 text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
        
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg mt-8 text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
