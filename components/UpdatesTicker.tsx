"use client";

// components/UpdatesTicker.tsx
// Latest Updates sidebar widget with:
//  - continuous upward auto-scroll (pause on hover / focus)
//  - live search filter with clear button
//  - Prev / Pause-Play / Next controls
//  - client-side refresh on mount so brand-new WP posts show immediately

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { LuBellRing } from "react-icons/lu";

// ── Types ────────────────────────────────────────────────────────────────────

export interface TickerItem {
  id: number;
  slug: string;
  title: string; // may contain WP HTML entities
  date: string;  // ISO 8601
}

interface UpdatesTickerProps {
  items: TickerItem[];
  className?: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 5; // items per page in search / manual browse mode

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

function decodeEntities(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/<[^>]*>/g, "");
}

// ── Sub-component ────────────────────────────────────────────────────────────

function TickerRow({ item }: { item: TickerItem }) {
  return (
    <div className="border-l-4 border-blue-500 pl-3 group">
      <p className="text-xs font-semibold text-blue-700 tabular-nums mb-0.5">
        {formatDate(item.date)}
      </p>
      <Link
        href={`/post/${item.slug}`}
        className="text-sm text-gray-800 leading-snug
                   group-hover:text-blue-700 focus:text-blue-700
                   focus:outline-none focus-visible:underline
                   transition-colors duration-150 line-clamp-2"
      >
        {decodeEntities(item.title)}
      </Link>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function UpdatesTicker({
  items: initialItems,
  className = "",
}: UpdatesTickerProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Live items state — starts with SSR data, updated on mount with fresh WP data
  const [items, setItems] = useState<TickerItem[]>(initialItems);
  const [loading, setLoading] = useState(false);

  // ── Client-side refresh ───────────────────────────────────────────────────
  // Fetch fresh posts every time the component mounts (and every 60 s after).
  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/latest-updates", { cache: "no-store" });
      if (res.ok) {
        const fresh: TickerItem[] = await res.json();
        if (fresh.length > 0) setItems(fresh);
      }
    } catch {
      // silently keep existing items on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh(); // immediate refresh on mount
    const id = setInterval(refresh, 60_000); // then every 60 s
    return () => clearInterval(id);
  }, [refresh]);

  // ── Derived values ────────────────────────────────────────────────────────

  // Always display newest first regardless of prop order
  const sortedItems = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const query = search.trim().toLowerCase();
  const isSearching = query !== "";

  const filtered = isSearching
    ? sortedItems.filter(
        (item) =>
          decodeEntities(item.title).toLowerCase().includes(query) ||
          formatDate(item.date).toLowerCase().includes(query)
      )
    : sortedItems;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const paginated = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  // Duplicate for seamless CSS loop in auto-scroll mode
  const scrollItems = [...sortedItems, ...sortedItems];

  const shouldPause = !isPlaying || hovered || isSearching;

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.animationPlayState = shouldPause ? "paused" : "running";
    }
  }, [shouldPause]);

  
  useEffect(() => {
    setPage(0);
  }, [search]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <aside
      className={`relative flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 ${className}`}
      aria-label="Latest updates"
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-4 py-3 flex items-center justify-between">
        <span className="text-white font-bold text-base tracking-wide flex items-center">
          <LuBellRing className="w-5 h-5 mr-4 text-[#61DAFB]" aria-hidden="true" />
          Latest Updates
        </span>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="w-3 h-3 rounded-full border-2 border-blue-300 border-t-white animate-spin inline-block" title="Refreshing…" />
          )}
          <span className="bg-blue-500/40 text-blue-100 text-xs px-2 py-0.5 rounded-full font-medium">
            Live
          </span>
        </div>
      </div>

      {/* ── Scroll / paginated area ────────────────────────────────────────── */}
      <div
        className={`relative bg-blue-50/20 pb-20 ${isSearching ? "overflow-y-auto" : "overflow-hidden"}`}
        style={{ height: "20rem" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="region"
        aria-live="polite"
      >
        {/* fade edges */}
        <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

        {items.length === 0 ? (
          /* empty */
          <p className="text-center text-gray-400 text-sm mt-20 px-4">
            No updates available right now.
          </p>
        ) : isSearching ? (
          /* search results — static, paginated */
          <div className="px-4 py-4 space-y-4">
            {paginated.length === 0 ? (
              <p className="text-center text-gray-400 text-sm mt-16">
                No results found.
              </p>
            ) : (
              paginated.map((item) => <TickerRow key={item.id} item={item} />)
            )}
          </div>
        ) : (
          /* auto-scroll mode */
          <div
            ref={innerRef}
            className="px-4 py-4 space-y-4 animate-ticker-scroll"
            aria-label="Scrolling updates"
          >
            {scrollItems.map((item, idx) => (
              <TickerRow key={`${item.id}-${idx}`} item={item} />
            ))}
          </div>
        )}
      </div>


      {/* ── Bottom card: search + controls ───────────────────────────────── */}
      <div className="absolute left-0 right-0 bottom-0 px-4 pb-4">
        <div className="bg-white rounded-xl ">
          {/* Search input */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none"
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
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onPaste={(e) => {
                // Explicitly capture pasted text so it always triggers a search,
                // even in browsers where onChange may lag behind paste events.
                const pasted = e.clipboardData?.getData("text") ?? "";
                if (pasted) {
                  e.preventDefault();
                  setSearch(pasted);
                }
              }}
              placeholder="Search updates…"
              aria-label="Search updates"
              className="w-full pl-9 pr-8 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50
                         focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                         transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path
                    fillRule="evenodd"
                    d="M10 8.586L4.707 3.293a1 1 0 00-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 101.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.293-5.293a1 1 0 00-1.414-1.414L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* controls row */}
          <div className="flex items-center justify-between gap-2 mt-3">
            <button
              onClick={prevPage}
              disabled={safePage === 0}
              aria-label="Previous page"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-xs font-semibold
                         border border-gray-200 bg-white text-gray-600
                         hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700
                         disabled:opacity-35 disabled:cursor-not-allowed
                         transition-all duration-150 select-none"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? "Pause scroll" : "Resume scroll"}
              className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-semibold
                          border transition-all duration-150 select-none
                          ${
                            isPlaying
                              ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                              : "bg-white border-blue-500 text-blue-700 hover:bg-blue-50"
                          }`}
            >
              {isPlaying ? (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <button
              onClick={nextPage}
              disabled={safePage >= totalPages - 1}
              aria-label="Next page"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-xs font-semibold
                         border border-gray-200 bg-white text-gray-600
                         hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700
                         disabled:opacity-35 disabled:cursor-not-allowed
                         transition-all duration-150 select-none"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* page indicator */}
          {isSearching && totalPages > 1 && (
            <p className="text-center text-xs text-gray-400 mt-3">
              Page {safePage + 1} / {totalPages}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

