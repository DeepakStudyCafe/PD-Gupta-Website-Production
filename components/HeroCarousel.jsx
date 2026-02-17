"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    title: (
      <>
        Lessons and insights <br />
        <span className="text-primary-900 font-extrabold">from 8 years</span>
      </>
    ),
    desc: "Grow your business with expert CA guidance, digital tools, and a community of 500+ happy clients.",
    img: "/hero1.jpeg",
    cta: "Register Now",
    ctaLink: "/contact",
  },
  {
    title: (
      <>
        Expert CA Services <br />
        <span className="text-primary-900 font-extrabold">
          for your growth
        </span>
      </>
    ),
    desc: "Tax planning, GST, audit, and more — trusted by businesses across India.",
    img: "/hero2.jpeg",
    cta: "Book Consultation",
    ctaLink: "/contact",
  },
  {
    title: (
      <>
        500+ Happy Clients <br />
        <span className="text-primary-900 font-extrabold">across India</span>
      </>
    ),
    desc: "Join our community and experience the difference with PD Gupta & CO.",
    img: "/hero3.jpeg",
    cta: "Get Started",
    ctaLink: "/contact",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // CTA click handler — popup kholega instead of navigating
  const handleCTAClick = (e) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  // Form close karne ke liye
  const closeForm = () => {
    setIsFormOpen(false);
    setSuccess("");
    setError("");
    setLoading(false);
  };

  // Backend submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const form = e.target;
    const data = {
      formType: "contact",
      name: form.name?.value?.trim() || "",
      email: form.email?.value?.trim() || "",
      phone: form.phone?.value?.trim() || "",
      message: form.message?.value?.trim() || "",
    };

    if (!data.name || !data.email || !data.phone) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess("Request submitted successfully!");
        form.reset();
        setTimeout(() => {
          closeForm();
        }, 1500);
      } else {
        setError(result.error || "Submission failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden" style={{height:'80vh'}}>
        {/* Blurred Blue-Tinted Background Image */}
        <img
          src={slides[current].img}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center  scale-105 z-0 transition-all duration-700"
          style={{ minHeight: '80vh', minWidth: '100vw', filter: '' }}
        />
        {/* Blue Overlay for tint */}
        <div className="absolute inset-0 z-10 bg-black bg-opacity-30" />
        {/* Centered Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full min-h-[80vh] px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-blue-50 drop-shadow-lg">
            {slides[current].title}
          </h1>
          <p className="text-blue-100 mb-6 text-lg drop-shadow-md max-w-2xl mx-auto">{slides[current].desc}</p>
          <button
            onClick={handleCTAClick}
            className="inline-block rounded-lg px-7 py-3 font-semibold text-base text-blue-50 shadow-md 
             bg-gradient-to-br from-blue-600 to-blue-900 
             transition-all duration-500 ease-in-out 
             hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-lg"
          >
            {slides[current].cta}
          </button>
          {/* Carousel Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === current ? "bg-blue-900" : "bg-blue-200"
                } inline-block`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popup Consultation Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} // popup ke andar click se band na ho
          >
            {/* Close Button */}
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 text-primary-900">
              Book a Consultation
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your name"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+91 "
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tell us how we can help..."
                  disabled={loading}
                />
              </div>

              {error && <div className="text-red-600 text-center mb-2 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-center mb-2 text-sm">{success}</div>}

              <button
                type="submit"
                className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-br from-green-500 to-green-900 
                           hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}