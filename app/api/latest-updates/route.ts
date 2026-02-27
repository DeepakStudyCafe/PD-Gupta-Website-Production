// app/api/latest-updates/route.ts
// Always returns FRESH posts from monitored WordPress sites (no cache).
// Called by UpdatesTicker on the client side so new articles appear immediately.

import { NextResponse } from "next/server";
import { MONITORED_SITES } from "@/lib/api";

const PER_SITE = 50; // fetch up to 50 newest posts per site

export const dynamic = "force-dynamic"; // never cache this route

async function fetchSite(base: string) {
  const url = `${base}/wp-json/wp/v2/posts?_embed&per_page=${PER_SITE}&orderby=date&order=desc`;
  try {
    const res = await fetch(url, { cache: "no-store" });
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
