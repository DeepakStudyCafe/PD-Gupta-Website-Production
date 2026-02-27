// app/post/page.tsx
// Handles /post?wpid=<id>  – resolves a WordPress post ID to its slug
// and redirects to the canonical /post/<slug> URL.
// Falls back to the home page if resolution fails.

import { redirect } from "next/navigation";
import { MONITORED_SITES, getPostById } from "@/lib/api";

export const revalidate = 60;

export default async function PostIndexPage({
  searchParams,
}: {
  searchParams: { wpid?: string };
}) {
  const wpid = searchParams?.wpid;

  if (wpid) {
    const numericId = parseInt(wpid, 10);

    if (!isNaN(numericId)) {
      // Try every monitored site until we resolve the slug
      for (const site of MONITORED_SITES) {
        const post = await getPostById(site, numericId);
        if (post?.slug) {
          redirect(`/post/${post.slug}`);
        }
      }
    }
  }

  // Could not resolve – go home
  redirect("/");
}
