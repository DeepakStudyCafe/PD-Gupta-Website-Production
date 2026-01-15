"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const galleryImages = [
  { id: 1, src: "/g2.jpeg", alt: "Gallery Image 1" },
  { id: 2, src: "/g24.jpeg", alt: "Gallery Image 2" },
  { id: 3, src: "/g4.jpeg", alt: "Gallery Image 3" },
  { id: 4, src: "/g5.jpeg", alt: "Gallery Image 4" },
  { id: 5, src: "/g6.jpeg", alt: "Gallery Image 5" },
  { id: 6, src: "/g7.jpeg", alt: "Gallery Image 6" },
  { id: 7, src: "/g8.jpeg", alt: "Gallery Image 7" },
  { id: 8, src: "/g9.jpeg", alt: "Gallery Image 8" },
  { id: 9, src: "/g10.jpeg", alt: "Gallery Image 9" },
  { id: 10, src: "/g11.jpeg", alt: "Gallery Image 10" },
  // { id: 11, src: "/g12.jpeg", alt: "Gallery Image 11" },
  { id: 12, src: "/g13.jpeg", alt: "Gallery Image 12" },
  // { id: 13, src: "/g14.jpeg", alt: "Gallery Image 13" },
  // { id: 14, src: "/g15.jpeg", alt: "Gallery Image 14" },
  { id: 15, src: "/g16.jpeg", alt: "Gallery Image 15" },
  { id: 16, src: "/g17.jpeg", alt: "Gallery Image 16" },
  { id: 17, src: "/g18.jpeg", alt: "Gallery Image 17" },
  { id: 18, src: "/g19.jpeg", alt: "Gallery Image 18" },
  { id: 19, src: "/g20.jpeg", alt: "Gallery Image 19" },
  { id: 20, src: "/g21.jpeg", alt: "Gallery Image 20" },
  { id: 21, src: "/g22.jpeg", alt: "Gallery Image 21" },
  { id: 22, src: "/g23.jpeg", alt: "Gallery Image 22" },
  // { id: 23, src: "/g3.jpeg", alt: "Gallery Image 23" },
  { id: 24, src: "/g5.jpeg", alt: "Gallery Image 24" },
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Gallery Section */}
      <section className="py-10 bg-gray-50 reveal">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-center text-primary-900 mb-4">
            Our Gallery
          </h1>
          <p className="text-gray-600 text-center mb-12">
            A glimpse of our work, events, and professional moments
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-full h-64">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="hover:scale-105 transition-transform duration-300 rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Popup */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 reveal"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300"
            onClick={closeLightbox}
          >
            ×
          </button>

          {/* Previous Arrow */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl font-light hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            ‹
          </button>

          {/* Next Arrow */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl font-light hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            ›
          </button>

          {/* Large Image */}
          <div className="relative w-[90vw] h-[80vh] max-w-5xl max-h-[80vh] p-4 flex items-center justify-center">
            <Image
              src={galleryImages[selectedIndex].src}
              alt={galleryImages[selectedIndex].alt}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}