// app/api/latest-updates/route.ts
// Returns posts from monitored WordPress sites.
// Server-side cache: revalidated once every 24 hours (86400 s).
// This prevents hammering the WordPress API on every request.

import { NextResponse } from "next/server";
import { MONITORED_SITES } from "@/lib/api";

const PER_SITE = 50; // fetch up to 50 newest posts per site

// Cache the entire route response for 24 hours — Next.js ISR.
// WordPress data only needs to be fetched once a day.
export const revalidate = 86400;

async function fetchSite(base: string) {
  const url = `${base}/wp-json/wp/v2/posts?_embed&per_page=${PER_SITE}&orderby=date&order=desc`;
  try {
    // Cache at the fetch level too — revalidate once per day
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const posts: any[] = await res.json();
    return posts.map((p: any) => ({
      id: p.id as number,
      slug: p.slug as string,
      title: p.title?.rendered as string,
      date: p.date as string,
    }));
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.allSettled(
    MONITORED_SITES.map((site) => fetchSite(site))
  );

  const all: { id: number; slug: string; title: string; date: string }[] = [];
  results.forEach((r) => {
    if (r.status === "fulfilled") all.push(...r.value);
  });

  // Newest first
  all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json(all);
}
