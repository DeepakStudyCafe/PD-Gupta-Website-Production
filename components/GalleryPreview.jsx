"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryPreview({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div
            key={img.id}
            className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={300}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300"
            onClick={closeLightbox}
          >
            ×
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl font-light hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            ‹
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl font-light hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            ›
          </button>

          <div className="relative max-w-5xl max-h-full p-8">
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}