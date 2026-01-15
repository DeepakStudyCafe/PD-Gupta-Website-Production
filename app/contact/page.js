// app/contact/page.js
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { submitContactForm } from '@/lib/firestore';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitContactForm(formData);
    
    if (result.success) {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      toast.error('Failed to send message. Please try again.');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 reveal">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-200">
              Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-gray-50 reveal">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin size={24} className="text-primary-700 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600 text-sm">
                        1003, MODI TOWER 98 10th FLOOR, Nehru Place, Delhi, 110019
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone size={24} className="text-primary-700 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600 text-sm">+91 7303082229</p>
                      <p className="text-gray-600 text-sm">+91 7303082229 (WhatsApp)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail size={24} className="text-primary-700 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600 text-sm">gupta.k.deepak@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock size={24} className="text-primary-700 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Office Hours</h4>
                      <p className="text-gray-600 text-sm">Monday - Saturday</p>
                      <p className="text-gray-600 text-sm">9:30 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-700 hover:bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
             
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7395971431083!2d77.24989027456945!3d28.547545787936667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce305e7dca5df%3A0xe34e5c885e400d30!2sPD%20GUPTA%20%26%20CO%20CHARTERED%20ACCOUNTANT!5e0!3m2!1sen!2sin!4v1768444570663!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
