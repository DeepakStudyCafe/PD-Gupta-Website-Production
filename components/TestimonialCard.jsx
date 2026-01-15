"use client";
import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";

// Auto-sliding grid for testimonials
export function TestimonialSlider({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef();
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % totalSlides);
      }, 3000);
    }
    return () => clearInterval(timerRef.current);
  }, [totalSlides, paused]);

  const startIdx = current * cardsPerSlide;
  const visible = testimonials.slice(startIdx, startIdx + cardsPerSlide);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {visible.map((testimonial, idx) => (
          <TestimonialCard
            key={testimonial.id || idx}
            testimonial={testimonial}
          />
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? "bg-primary-900" : "bg-gray-300"
            } inline-block`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialCard({ testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 100;
  const text = testimonial.message || "";
  const showReadMore = text.length > maxLength;
  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full w-full sm:w-72"
      style={{
        minHeight: 320,
        maxHeight: 320,
        overflow: "hidden",
        minWidth: 220,
      }}
    >
      {/* Name and profile image */}
      <div className="flex items-center gap-3 mb-2">
        {testimonial.profile_photo_url && (
          <img
            src={testimonial.profile_photo_url}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">
            {testimonial.name}
          </h4>
          {testimonial.company && (
            <p className="text-sm text-gray-600 mt-1">{testimonial.company}</p>
          )}
          {testimonial.company && (
            <div className="w-full  border-gray-200 mt-1" />
          )}
        </div>
      </div>
      {/* Rating */}
      <div className="flex gap-1">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      {/* Message */}
      <div
        className="text-gray-700 italic mb-4 leading-relaxed"
        style={{
          maxHeight: expanded ? 180 : undefined,
          minHeight: expanded ? 180 : undefined,
          overflowY: expanded ? "auto" : "visible",
          transition: "max-height 0.3s",
        }}
      >
        {expanded || !showReadMore ? (
          <>
            {`"${text}"`}
            {showReadMore && (
              <div className="w-full flex justify-center mt-2">
                <button
                  className="text-blue-600 underline text-sm"
                  onClick={() => setExpanded(false)}
                >
                  Read less
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {`"${text.slice(0, maxLength)}..."`}
            <div className="w-full flex justify-center mt-2">
              <button
                className="text-blue-600 underline text-sm"
                onClick={() => setExpanded(true)}
              >
                Read more
              </button>
            </div>
          </>
        )}
      </div>
      {/* Company */}
    </div>
  );
}
