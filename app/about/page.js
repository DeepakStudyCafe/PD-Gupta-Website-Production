// app/about/page.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { defaultContent } from '@/lib/defaultContent';
import Image from 'next/image';
import { Target, Eye, Award } from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: 'About Us - PD Gupta & CO | Leading CA Firm',
  description: 'Learn about our experienced team, vision, and mission. Serving clients since 2010 with excellence in accounting and taxation.',
};




export default function AboutPage() {
  const aboutContent = defaultContent.about;

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 reveal">
        <div className="container-custom">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {aboutContent.title}
            </h1>
            <p className="text-sm tracking-wide text-gray-200">
              {aboutContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-white reveal">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                {aboutContent.vision}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                {aboutContent.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50 reveal">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your financial success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutContent.team.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <div className="relative h-64 bg-gradient-to-br from-primary-700 to-primary-900  flex items-center justify-center">
                  {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover w-full h-full"
                      />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-700 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white reveal">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Integrity', desc: 'Unwavering commitment to ethical practices' },
              { title: 'Excellence', desc: 'Delivering superior quality in every service' },
              { title: 'Innovation', desc: 'Embracing modern solutions and technology' },
              { title: 'Client Focus', desc: 'Your success is our top priority' }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-14 h-14 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
