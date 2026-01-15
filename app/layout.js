// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
// import TransitionProvider from '@/components/TransitionProvider';
import ScrollRevealProvider from '@/components/ScrollRevealProvider';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial']
});

export const metadata = {
  title: 'PD Gupta & CO - Chartered Accountants',
  description:
    'Professional CA services including tax planning, GST compliance, audit, and financial consulting for businesses and individuals.',
  keywords:
    'chartered accountant, CA firm, tax consultant, GST services, audit, financial consulting, Bangalore',
  authors: [{ name: 'PD Gupta & CO' }],
  openGraph: {
    title: 'PD Gupta & CO - Chartered Accountants',
    description: 'Expert financial consulting, tax filing, and audit services',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ScrollRevealProvider>
          {children}
        </ScrollRevealProvider>

        <WhatsAppFloat />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
