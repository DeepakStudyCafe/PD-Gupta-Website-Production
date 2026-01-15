// components/ServicesSection.jsx
"use client";

import { services } from "@/lib/services";
import Link from "next/link";
import Image from "next/image";

export default function ServicesSection() {
  return (
   <section className="bg-gray-50">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {services.map((service) => (
      <Link
        href={`/services/${service.slug}`}
        key={service.slug}
        className="block"
      >
        <div className="flex flex-col items-center text-center bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
          
          <Image
            src={service.img}
            alt={service.title}
            width={300}
            height={300}
            className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary-100 shadow-sm"
          />

          <h3 className="text-xl font-semibold text-primary-900 mb-2 hover:text-primary-700 transition">
            {service.title}
          </h3>

          <p className="text-gray-600 text-sm leading-snug mb-3">
            {service.description}
          </p>

          <span className="text-primary-700 font-medium text-sm hover:text-primary-900 transition-colors">
            Read More →
          </span>
        </div>
      </Link>
    ))}
  </div>
</section>

  );
}
