// lib/api.ts
// WordPress REST API helpers for fetching latest posts from monitored sites.
// Configure MONITORED_SITES with your six WordPress site base URLs.

// ── Types ────────────────────────────────────────────────────────────────────

export interface WPPost {
  id: number;
  slug: string;
  date: string; // ISO 8601
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: Array<{ name: string }>;
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

export interface PostCard {
  id: number;
  slug: string;
  title: string;
  date: string;      // ISO 8601
  excerpt: string;   // raw HTML
  featuredImage: string | null;
  author: string;
  site: string;      // base URL of the originating site
}

// ── Site configuration ───────────────────────────────────────────────────────
// Replace the placeholder entries with the six actual site base URLs
// (no trailing slash).  Only uncomment/add real domains.

export const MONITORED_SITES: string[] = [
  "https://studycafe.in",
  // "https://site2.example.com",
  // "https://site3.example.com",
  // "https://site4.example.com",
  // "https://site5.example.com",
  // "https://site6.example.com",
];

const DEFAULT_PER_PAGE = 50;

// ── Internal helpers ─────────────────────────────────────────────────────────

/** Fetch WP posts from a single site; returns [] on any error. */
async function fetchPostsFromSite(
  siteBase: string,
  perPage: number
): Promise<WPPost[]> {
  const url = `${siteBase}/wp-json/wp/v2/posts?_embed&per_page=${perPage}&orderby=date&order=desc`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // revalidate once per day — WordPress posts don't change that frequently
    });
    if (!res.ok) return [];
    return (await res.json()) as WPPost[];
  } catch {
    return [];
  }
}

/** Map a raw WP post to the flatter PostCard shape. */
export function mapPostToCard(post: WPPost, site: string): PostCard {
  const featuredMedia = post._embedded?.["wp:featuredmedia"];
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered
      .replace(/&amp;/g, "&")
      .replace(/&#8217;/g, "\u2019")
      .replace(/&#8216;/g, "\u2018")
      .replace(/&#8220;/g, "\u201C")
      .replace(/&#8221;/g, "\u201D"),
    date: post.date,
    excerpt: post.excerpt.rendered,
    featuredImage: featuredMedia?.[0]?.source_url ?? null,
    author: post._embedded?.author?.[0]?.name ?? "Admin",
    site,
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch and merge posts from all (or specified) monitored sites,
 * sorted newest-first.
 */
export async function getPostsForSites(
  sites: string[] = MONITORED_SITES,
  perSite: number = DEFAULT_PER_PAGE
): Promise<PostCard[]> {
  const results = await Promise.allSettled(
    sites.map((site) => fetchPostsFromSite(site, perSite))
  );

  const allPosts: PostCard[] = [];
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      result.value.forEach((post) =>
        allPosts.push(mapPostToCard(post, sites[i]))
      );
    }
  });

  // Newest first
  allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return allPosts;
}

/**
 * Convenience: fetch posts from the primary site only.
 */
export async function getPosts(
  perPage: number = DEFAULT_PER_PAGE
): Promise<PostCard[]> {
  const posts = await fetchPostsFromSite(MONITORED_SITES[0], perPage);
  return posts.map((p) => mapPostToCard(p, MONITORED_SITES[0]));
}

/**
 * Fetch a single post by slug from all monitored sites (first match wins).
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  for (const site of MONITORED_SITES) {
    try {
      const url = `${site}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`;
      const res = await fetch(url, { next: { revalidate: 86400 } }); // posts don't change after publish
      const posts: WPPost[] = await res.json();
      if (posts.length > 0) return posts[0];
    } catch {
      /* try next site */
    }
  }
  return null;
}

/**
 * Fetch a single post by numeric WP ID from a specific site.
 * Used to resolve ?p=<id> query-based permalinks.
 */
export async function getPostById(
  siteBase: string,
  id: number
): Promise<WPPost | null> {
  try {
    const url = `${siteBase}/wp-json/wp/v2/posts/${id}?_embed`;
    const res = await fetch(url, { next: { revalidate: 86400 } }); // posts don't change after publish
    if (!res.ok) return null;
    return (await res.json()) as WPPost;
  } catch {
    return null;
  }
}
