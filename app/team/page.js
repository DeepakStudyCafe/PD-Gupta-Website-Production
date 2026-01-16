"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

export default function TeamPage() {
  const [expanded, setExpanded] = useState([]);
  const aboutRefs = useRef([]);
  const teamMembers = [
    {
      name: "CA Pratibha Goyal",
      role: "Managing Partner",
      image: "Pratibha.jpeg",
      bio: "",
      linkedin: "https://www.linkedin.com/in/pratibha-goyal-269b27186/",
      x: "https://x.com/PratibhaGoyal",
    },
    {
      name: "CA Pranjal Goyal",
      role: "Managing Partner",
      image: "PranjalGoyal.jpeg",
      bio: "",
      linkedin: "#",
      x: "#",
    },
    {
      name: "CA Deepak Gupta",
      role: "Manager",
      image: "DeepakGupta.jpeg",
      bio: "",
      linkedin: "#",
      x: "https://x.com/cadeepakgupta_",
    },
    {
      name: "Raja Mehta",
      role: "Account Manager",
      image: "Raja.jpeg",
      bio: "",
      linkedin: "https://www.linkedin.com/in/raja-mehta-91741a1a3/",
      x: "#",
    },

    {
      name: "Lucy Karn",
      role: "Senior Accountant / Accounts Head",
      image: "/LuckKarn.jpeg",
      bio: "",
      linkedin: "https://www.linkedin.com/in/lucy-karn-866a6a243/",
      x: "#",
    },
    {
      name: "Jatin",
      role: "CA Article Trainee",
      image: "Jatin.jpeg",
      bio: "",
      linkedin: "https://www.linkedin.com/in/jatin-kumar-3a449b254/",
      x: "#",
    },

    {
      name: "Deepesh Mangla",
      role: "CA Article Trainee",
      image: "Deepesh.jpeg",
      bio: "",
      linkedin: "https://www.linkedin.com/in/deepesh-mangla-82550b242/",
      x: "#",
    },
    {
      name: "Sujal Negi",
      role: "Accountant",
      image: "sujalNegi.jpeg",
      bio: "",
      linkedin: "https://www.linkedin.com/in/sujal-negi-8b52083a6/",
      x: "#",
    },
  ];

  const values = [
    {
      title: "Innovation",
      desc: "We continuously explore new ideas and technologies to stay ahead of the curve.",
    },
    {
      title: "Collaboration",
      desc: "Teamwork and open communication drive our success and creativity.",
    },
    {
      title: "Integrity",
      desc: "We value honesty, transparency, and trust in everything we do.",
    },
    {
      title: "Customer Focus",
      desc: "Our clients are at the heart of every decision and project.",
    },
  ];

  // Helper to split bio into preview and rest
  function splitBio(bio) {
    // Split by ". " for sentences, or fallback to 2-3 lines
    const sentences = bio.split(/(?<=\.)\s+/);
    if (sentences.length <= 2) {
      return [bio, ""];
    }
    return [sentences.slice(0, 2).join(" "), sentences.slice(2).join(" ")];
  }

  const handleReadMore = (idx) => {
    setExpanded((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });
    setTimeout(() => {
      if (aboutRefs.current[idx]) {
        aboutRefs.current[idx].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleReadLess = (idx) => {
    setExpanded((prev) => {
      const updated = [...prev];
      updated[idx] = false;
      return updated;
    });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-indigo-100 py-20 text-center reveal">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet Our Dedicated Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re a passionate group of creators, developers, and strategists
            working together to build impactful digital experiences.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20 reveal">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Core Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            The people who make everything possible — combining creativity,
            technology, and vision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => {
              const [preview, rest] = splitBio(member.bio);
              return (
                <div
                  key={index}
                  ref={(el) => (aboutRefs.current[index] = el)}
                  className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200 ring-offset-4 ring-offset-white bg-white flex items-center justify-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        style={{
                          aspectRatio: "1/1",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.src = "/banner.jfif";
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <div className="flex justify-center gap-3 mb-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin size={20} color="#0A66C2" />
                    </a>
                    <a
                      href={member.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 transition"
                      aria-label="X"
                    >
                      <FaSquareXTwitter size={20} color="#111" />
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {expanded[index] ? (
                      <>
                        {preview} {rest && rest.length > 0 && <>{rest}</>}
                        {rest && rest.length > 0 && (
                          <>
                            {" "}
                            <span
                              className="font-bold text-blue-700 cursor-pointer hover:underline ml-2"
                              onClick={() => handleReadLess(index)}
                            >
                              Read Less
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {preview}
                        {rest && rest.length > 0 && (
                          <>
                            ...{" "}
                            <span
                              className="font-bold text-blue-700 cursor-pointer hover:underline"
                              onClick={() => handleReadMore(index)}
                            >
                              Read More
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20 border-t border-gray-100 reveal">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Values
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We believe in fostering a culture of creativity, responsibility, and
            excellence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-xl p-8 hover:bg-blue-50 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16 text-center reveal">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Want to Work With Us?
          </h2>
          <p className="max-w-2xl mx-auto text-indigo-100 mb-6">
            We’re always looking for talented people to join our growing team.
            Let’s build something amazing together.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Join Our Team
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
