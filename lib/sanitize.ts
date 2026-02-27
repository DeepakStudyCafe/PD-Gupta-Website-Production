// lib/sanitize.ts
// Rewrites external monitored-site links to internal /post/<slug> routes,
// then sanitises the resulting HTML with sanitize-html.

import sanitizeHtml from "sanitize-html";

// ── Monitored domains ────────────────────────────────────────────────────────
// Add the domain (without scheme, without trailing slash) for every site to monitor.
// Both www and non-www variants should be listed if applicable.

const MONITORED_DOMAINS = [
  "studycafe.in",
  "www.studycafe.in",
  // Add more domains here as you configure additional sites:
  // "site2.example.com",
];

// ── Link rewriting ───────────────────────────────────────────────────────────

/** Build a single regex that matches any full URL on a monitored domain. */
function buildDomainPattern(): RegExp {
  const domainAlts = MONITORED_DOMAINS.map((d) =>
    d.replace(/\./g, "\\.")
  ).join("|");
  // Matches https?://<domain><path> where <path> may be absent
  return new RegExp(`https?://(?:${domainAlts})(/[^"'\\s>)<]*)?`, "gi");
}

/**
 * Derive a clean slug from a WordPress URL pathname.
 *
 * Examples:
 *   /negative-gst-ledger-balances/          → negative-gst-ledger-balances
 *   /2024/01/my-headline/                   → my-headline  (date segments stripped)
 *   /category/sub/headline-text/            → headline-text (last useful segment)
 *   /my-post.html                           → my-post
 *   /?p=123  or  /#anchor                  → null  (query/anchor – handle separately)
 */
function slugFromPath(path: string | null | undefined): string | null {
  if (!path) return null;

  // Query-based / anchor-only URL: cannot derive a clean slug here
  if (/^\/?((\?[^#])|#)/.test(path)) return null;

  const cleaned = path
    .replace(/\.html?$/, "")   // strip .html / .htm extension
    .replace(/\/+$/, "");      // strip trailing slash

  const segments = cleaned.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  // Prefer the last non-numeric segment (skip year/month segments like 2024/01)
  const slug =
    [...segments].reverse().find((s) => !/^\d{1,4}$/.test(s)) ??
    segments[segments.length - 1];

  // WordPress sometimes appends a long numeric ID suffix (e.g. headline-123456).
  // Strip only when the suffix is ≥5 digits to avoid false stripping of normal slugs.
  return slug.replace(/-\d{5,}$/, "");
}

/**
 * Replace every monitored-domain href/src in an HTML string with the
 * corresponding local /post/<slug> route.
 * - https://studycafe.in/my-post/      → /post/my-post
 * - https://studycafe.in/?p=12345      → /post?wpid=12345 (resolved at render time)
 * - https://studycafe.in/              → /post  (bare root → post index)
 */
export function rewriteMonitoredLinks(html: string): string {
  const pattern = buildDomainPattern();

  return html.replace(pattern, (_match: string, path: string | undefined) => {
    // Query-based WP permalinks (?p=<id>)
    if (path && /^\/?(\?p=\d+)/.test(path)) {
      const idMatch = path.match(/p=(\d+)/);
      return idMatch ? `/post?wpid=${idMatch[1]}` : "/post";
    }

    const slug = slugFromPath(path);
    return slug ? `/post/${slug}` : "/post";
  });
}

// ── HTML sanitization ────────────────────────────────────────────────────────

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "a", "strong", "b", "em", "i", "u", "s", "del", "ins", "mark",
  "ul", "ol", "li", "dl", "dt", "dd",
  "blockquote", "pre", "code", "kbd", "var", "samp",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
  "figure", "figcaption", "img",
  "div", "span", "section", "article", "aside", "header", "footer", "main",
  "details", "summary",
  "sub", "sup", "abbr", "cite", "q", "time",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a:   ["href", "title", "rel", "target", "aria-label"],
  img: ["src", "alt", "width", "height", "loading", "class"],
  td:  ["colspan", "rowspan"],
  th:  ["colspan", "rowspan", "scope"],
  time: ["datetime"],
  "*": ["class", "id"],
};

/**
 * Sanitise WordPress post HTML.
 *  1. Rewrites every monitored-domain anchor to an internal /post/<slug> route.
 *  2. Strips any unsafe tags/attributes via sanitize-html.
 *  3. Forces external links to open in a new tab with safe rel attributes.
 */
export function sanitizeContent(html: string): string {
  const rewritten = rewriteMonitoredLinks(html);

  return sanitizeHtml(rewritten, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const isInternal = href.startsWith("/") || href.startsWith("#");
        return {
          tagName: "a",
          attribs: {
            ...attribs,
            href,
            // External links open in a new tab; internal links stay in same tab
            ...(isInternal
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" }),
          },
        };
      },
    },
  });
}
