"use client";

import { useState, useEffect } from "react";

const whatsNew = [
  {
    date: "08-01-2026",
    text: "Negative GST ledger balances may block GSTR-3B filing from January 2026",
  },
  {
    date: "07-01-2026",
    text: "RBI: Over 98.41% of ₹2000 notes returned; small savings rates unchanged for Jan-Mar 2026",
  },
  {
    date: "06-01-2026",
    text: "New Income Tax Act 2025 provisions to take effect from 1 April 2026",
  },
  {
    date: "05-01-2026",
    text: "RSP-based GST valuation for Pan Masala, Tobacco & Cigarettes w.e.f. 1 Feb 2026",
  },
  {
    date: "04-01-2026",
    text: "No belated/revised ITR for FY 2024-25 after 31 Dec 2025; only ITR-U option",
  },
  {
    date: "03-01-2026",
    text: "Add bank details in GST registration to avoid automatic suspension",
  },
  {
    date: "02-01-2026",
    text: "PAN-Aadhaar linking mandatory to avoid higher TDS from Jan 2026",
  },
  {
    date: "01-01-2026",
    text: "MCA extends annual filings deadline to 31 January 2026 without additional fees",
  },
];

export default function WhatsNewSidebar() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState(whatsNew);

  // Real-time search on input change
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredNews(whatsNew);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = whatsNew.filter(
        (item) =>
          item.date.toLowerCase().includes(lowerSearch) ||
          item.text.toLowerCase().includes(lowerSearch)
      );
      setFilteredNews(filtered);
    }
  }, [searchTerm]);

  // Handle Search Button Click (optional - same as typing)
  const handleSearch = () => {
    // Already filtered real-time, but can add alert or something if needed
    // For now, just triggers the same filter
  };

  return (
    <div className="lg:col-span-1 flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center py-4 font-bold text-xl">
        What's New
      </div>

      {/* Fixed Height Scrolling Area with Fade Edges */}
      <div className="relative px-6 py-5 h-[20rem] overflow-hidden bg-gradient-to-b from-blue-50/30 to-white">
        {/* Fade Top */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Content */}
        <div
          className={`space-y-6 ${
            isPlaying && filteredNews.length > 0
              ? "animate-infinite-scroll"
              : ""
          }`}
        >
          {/* Duplicate for seamless infinite loop only if playing */}
          {(isPlaying ? [...filteredNews, ...filteredNews] : filteredNews).map(
            (item, idx) => (
              <div key={idx} className="border-l-4 border-blue-600 pl-4">
                <p className="text-sm font-bold text-blue-900">{item.date}:</p>
                <p className="text-sm text-gray-800 leading-relaxed mt-1">
                  {item.text}
                </p>
              </div>
            )
          )}
        </div>

        {/* Show message if no results */}
        {filteredNews.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No news found matching your search.
          </p>
        )}

        {/* Fade Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      </div>

      {/* Play/Pause Button */}
      {/* <div className="p-4 flex justify-center">
        <button
          onClick={() => setIsPlaying(prev => !prev)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-3"
        >
          {isPlaying ? (
            <>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 4h4v12H6V4zm6 0h4v12h-4V4z" clipRule="evenodd" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4v12l12-6L4 4z" clipRule="evenodd" />
              </svg>
              Play
            </>
          )}
        </button>
      </div> */}

      {/* Updated Till */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-950 text-white text-center py-3 text-sm font-semibold">
        Updated Till: 08-01-2026
      </div>

      {/* Search Bar - Now filter on typing + button click */}
      <div className="p-5">
        <div className="relative shadow-lg rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search news (e.g. GST, ITR, RBI)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-16 py-4 text-gray-700 focus:outline-none"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
