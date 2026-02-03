// components/Navbar.jsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { services } from "@/lib/services";
import { usePathname } from "next/navigation";
import PageLoader from "./LoadingSpinner";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (pathname === "/") {
      setLoading(false);
      return;
    }
    setLoading(true);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/gallery", label: "Gallery" },
    { href: "/query", label: "Query" },
    { href: "/career", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  // Helper function to get active class (since cn is not available)
  const getLinkClass = (href) => {
    const base = "text-gray-700 hover:text-primary-700 font-medium transition-colors duration-200";
    return pathname === href ? `${base} text-primary-700 font-semibold` : base;
  };

  const getServiceLinkClass = (slug) => {
    const servicePath = `/services/${slug}`;
    const base = "block px-6 py-2 text-gray-700 hover:bg-green-50 hover:text-primary-900 transition-colors";
    return pathname === servicePath ? `${base} bg-green-50 text-primary-900 font-medium` : base;
  };

  const getMobileLinkClass = (href) => {
    const base = "block text-gray-700 hover:text-primary-700 font-medium py-2 transition";
    return pathname === href ? `${base} text-primary-700 font-semibold` : base;
  };

  const getMobileServiceClass = (slug) => {
    const servicePath = `/services/${slug}`;
    const base = "block text-gray-600 hover:text-primary-700 py-2 pl-4 transition";
    return pathname === servicePath ? `${base} text-primary-700 font-medium` : base;
  };

  return (
    <>
      {/* Top Bar */}

      

      <div className="bg-green-800 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a
              href="tel: +917303082229,"
              className="flex items-center space-x-2 hover:text-yellow-300 transition"
            >
              <Phone size={14} />
              <span>+91 7303082229</span>
            </a>
            <a
              href="mailto:gupta.k.deepak@gmail.com"
              className="flex items-center space-x-2 hover:text-yellow-300 transition hidden md:flex"
            >
              <Mail size={14} />
              <span>gupta.k.deepak@gmail.com</span>
            </a>
          </div>
          <div className="text-xs">Mon - Sat : 9:30 AM - 7:00 PM</div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" onClick={handleClick} className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkuwUOqxf_S3gCb07oCrDcVU8rlFH4SPVLQA&s"
                    alt="PD GUPTA & CO Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary-900">
                  PD Gupta & CO
                </h1>
                <p className="text-xs text-gray-600">Chartered Accountants</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Home, About */}
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getLinkClass(link.href)}
                  onClick={handleClick}
                >
                  {link.label}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-primary-700 font-medium transition-colors duration-200 flex items-center">
                  Services
                  <svg
                    className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-3 w-[13rem] bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                  <div className="py-3">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className={getServiceLinkClass(service.slug)}
                        onClick={handleClick}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Remaining Links */}
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getLinkClass(link.href)}
                  onClick={handleClick}
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA Button */}
              <Link
                href="/contact"
                className="bg-gradient-to-r from-primary-700 to-primary-900 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-200"
                onClick={handleClick}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-primary-700 transition"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Regular Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={getMobileLinkClass(link.href)}
                  
                >
                  {link.label}
                </Link>
              ))}

              {/* Services Section in Mobile */}
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-800 mb-3">Services</p>
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={getMobileServiceClass(service.slug)}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-gradient-to-r from-primary-700 to-primary-900 text-white px-6 py-3 rounded-lg text-center hover:shadow-lg transition mt-4"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
      {loading && <PageLoader />}
    </>
  );
}
