import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard, { TestimonialSlider } from "@/components/TestimonialCard";
import { getSiteContent } from "@/lib/firestore";
import { defaultContent } from "@/lib/defaultContent";
import { Users, Building2, CalendarCheck, CreditCard } from "lucide-react";
import dynamic from "next/dynamic";
import HeroCarousel from "@/components/HeroCarousel";
import WhatsNewSidebar from "@/components/WhatsNewSidebar";
import ServicesSection from "@/components/ServicesSection";
import UpdatesTicker from "@/components/UpdatesTicker";
import { getPostsForSites } from "@/lib/api";
import Image from "next/image";
import GalleryPreview from "@/components/GalleryPreview";

export const revalidate = 30;

export const metadata = {
  title: "Home - PD Gupta & CO | Chartered Accountants",
  description:
    "Expert CA services for tax planning, GST compliance, audit, and financial consulting. Trusted by 500+ clients across India.",
};

async function getHomeContent() {
  const content = await getSiteContent("home");
  return content || defaultContent.home;
}

async function getTestimonials() {
  const content = await getSiteContent("testimonials");
  return content?.list || defaultContent.testimonials;
}

const galleryImages = [
  { id: 1, src: "/banner.png", alt: "Gallery Image 1" },
  { id: 2, src: "/about.png", alt: "Gallery Image 2" },
  { id: 3, src: "/banner.jfif", alt: "Gallery Image 3" },
  { id: 4, src: "/about.png", alt: "Gallery Image 4" },
  { id: 5, src: "/banner.jfif", alt: "Gallery Image 5" },
  { id: 6, src: "/about.png", alt: "Gallery Image 6" },
  { id: 7, src: "/banner.png", alt: "Gallery Image 7" },
  { id: 8, src: "/banner.jfif", alt: "Gallery Image 8" },
];

const Counter = dynamic(() => import("@/components/Counter"), { ssr: false });
const CounterSection = dynamic(() => import("@/components/CounterSection"), { ssr: false });

export default async function Home() {
  const homeContent = await getHomeContent();
  const testimonials = await getTestimonials();

  // Fetch latest WP posts from monitored sites for the ticker widget.
  // Errors are handled inside getPostsForSites — falls back to [].
  const tickerRaw = await getPostsForSites(undefined, 50);
  const tickerItems = tickerRaw.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    date: p.date,
  }));

  return (
    <main>
      <Navbar />
      <HeroCarousel />


      <div className="container mx-auto px-4 py-8 reveal">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
          Our Services
        </h2>
        <p className="text-gray-400 text-sm mb-12 text-center">
          We provide reliable, scalable, and high-quality solutions tailored to
          your needs.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ServicesSection />
          </div>
          {/* UpdatesTicker replaces the static WhatsNewSidebar with live WP data */}
          <UpdatesTicker items={tickerItems} />
        </div>
      </div>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 items-center p-8 my-8 reveal">
        <div className="flex ">
          <img
            src="/about.png"
            alt="CA Team"
            className="w-80 h-80 object-contain "
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900">
            Trusted CA Firm for Your Business Growth
          </h3>
          <p className="text-gray-600 mb-4">
            We empower businesses with expert tax planning, GST, audit, and compliance solutions. Join 500+ satisfied clients who trust us for their financial success.
          </p>
          <Link
            href="/about"
            className="inline-block rounded-lg px-7 py-3 font-semibold text-base text-white shadow-md
             bg-gradient-to-br from-green-500 to-green-900
             transition-all duration-500 ease-in-out
             hover:from-green-600 hover:to-green-800 hover:scale-105 hover:shadow-lg"
          >
            Learn More
          </Link>
        </div>
      </section>

      

      <section className="py-12 bg-white overflow-hidden reveal">
        {/* <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
            Our Clients
          </h2>
          <p className="text-gray-400 text-sm mb-12">
            We have been working with some Fortune 500+ clients
          </p>
        </div> */}
        <div className="relative">
          {/* <div className="animate-marquee inline-block whitespace-nowrap hover:pause-marquee">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-16 mx-12">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
                  alt="Client 1"
                  className="h-8 opacity-80 inline-block"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                  alt="Microsoft"
                  className="h-8 opacity-80 inline-block"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                  alt="IBM"
                  className="h-8 opacity-80 inline-block"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                  alt="Google"
                  className="h-8 opacity-80 inline-block"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                  alt="Netflix"
                  className="h-8 opacity-80 inline-block"
                />
              </span>
            ))}
          </div> */}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="">
        {/* <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-gray-600 text-center mb-12">
            A glimpse of our work, events, and professional moments
          </p>

          <GalleryPreview images={galleryImages} />

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-block rounded-lg px-8 py-4 font-semibold text-white bg-gradient-to-br from-green-500 to-green-900 hover:from-green-600 hover:to-green-800 transition-all duration-300 hover:scale-105 shadow-md"
            >
              View More
            </Link>
          </div>
        </div> */}
      </section>

      <section className="bg-[#f5f7fa] py-10 reveal">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center px-6 mt-16 mb-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
              Empowering Businesses <br />
              <span className="text-primary-600 font-bold">
                with Trusted CA Services
              </span>
            </h3>
            <p className="text-sm text-gray-500 mt-2 max-w-md">
              Our numbers reflect our commitment to your financial growth and compliance.
            </p>
          </div>
          <CounterSection />
  
        </div>
      </section>

      <section className="py-16 bg-white reveal">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            What Our Clients Say
          </h2>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

