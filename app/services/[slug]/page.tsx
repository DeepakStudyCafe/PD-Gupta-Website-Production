// app/services/[slug]/page.tsx
import { services } from "@/lib/services";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  params: { slug: string };
};

export default function ServicePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound(); // 404 page dikhega agar slug galat ho
  }

  return (
    <>
     <Navbar />
     <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 ">
        <div className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <Image
                src={service.img}
                alt={service.title}
                width={600}
                height={600}
                className="object-cover w-full h-96 md:h-full"
              />
            </div>
            <div className="md:w-2/3 p-8 md:p-12">
              <h1 className="text-4xl font-bold text-primary-900 mb-6">
                {service.title}
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {service.details}
              </p>
              <div className="text-gray-600">
                <p className="font-semibold mb-2">Key Highlights:</p>
                <p>{service.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
    
  );
}

// Static generation ke liye sab pages build time par bana dega
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Optional: SEO ke liye title aur description
export async function generateMetadata({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | PD Gupta & CO`,
    description: service.description,
  };
}