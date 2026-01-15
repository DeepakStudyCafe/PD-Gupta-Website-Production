// app/services/page.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { getSiteContent } from '@/lib/firestore';
import { defaultContent } from '@/lib/defaultContent';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'Our Services - PD Gupta & CO | CA Firm',
  description: 'Comprehensive CA services including tax planning, GST compliance, audit, financial consulting, startup advisory, and accounting services.',
};

async function getServicesContent() {
  const content = await getSiteContent('services');
  return content || defaultContent.services;
}

export default async function ServicesPage() {
  const servicesContent = await getServicesContent();

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 reveal">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {servicesContent.title || defaultContent.services.title}
            </h1>
            <p className="text-xl text-gray-200">
              {servicesContent.subtitle || defaultContent.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50 reveal">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(servicesContent.list || defaultContent.services.list).map((service) => (
              <ServiceCard key={service.id} service={service} variant="detailed" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white reveal">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Expert Financial Advice?</h2>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Our team of experienced chartered accountants is ready to help you
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-lg font-semibold transition shadow-xl"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
