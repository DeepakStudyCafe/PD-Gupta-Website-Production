// components/Footer.jsx
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white reveal">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkuwUOqxf_S3gCb07oCrDcVU8rlFH4SPVLQA&s"
                    alt="PD GUPTA & CO Logo"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              <div>
                <h3 className="text-lg font-bold">PD Gupta & CO</h3>
                <p className="text-xs text-gray-300">Chartered Accountants</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Trusted Chartered Accountants for tax, audit, compliance, and business growth. We deliver reliable financial solutions, expert advice, and dedicated support for individuals, startups, and businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 hover:text-gold-400 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-300 hover:text-gold-400 transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-gold-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-300 hover:text-gold-400 transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 hover:text-gold-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">Tax Planning & Filing</li>
              <li className="text-sm text-gray-300">GST Registration</li>
              <li className="text-sm text-gray-300">Business Auditing</li>
              <li className="text-sm text-gray-300">Financial Consulting</li>
              <li className="text-sm text-gray-300">Startup Advisory</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin
                  size={18}
                  className="text-gold-400 mt-1 flex-shrink-0"
                />
                <span className="text-sm text-gray-300">
                  1003, 10th Floor, Modi Tower- 98, Nehru Place, Delhi - 110019
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gold-400 flex-shrink-0" />
                <a
                  href="tel:+91 7303082229,"
                  className="text-sm text-gray-300 hover:text-gold-400 transition"
                >
                  +91 7303082229
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gold-400 flex-shrink-0" />
                <a
                  href="mailto:gupta.k.deepak@gmail.com"
                  className="text-sm text-gray-300 hover:text-gold-400 transition"
                >
                  gupta.k.deepak@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2026 PD Gupta & CO. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/Studycafe.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://x.com/studycafe_in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/studycafe/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/studycafe.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCQlf6kGtJ21wemVeTLA3T1g"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.495 20.5 12 20.5 12 20.5s7.505 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a
              href="https://t.me/studycafe_in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9.036 16.569l-.398 5.601c.57 0 .816-.244 1.113-.54l2.664-2.537 5.522 4.033c1.012.557 1.729.264 1.98-.937l3.594-16.84c.327-1.513-.547-2.104-1.523-1.747L1.36 9.47c-1.487.575-1.47 1.4-.254 1.77l4.59 1.434 10.654-6.72c.5-.324.956-.144.581.18z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
