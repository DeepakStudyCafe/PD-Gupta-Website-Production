// app/post/[slug]/page.tsx
// Detail page for a WordPress post fetched from a monitored site.
// Content links back to monitored sites are rewritten to local /post/<slug> routes.

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/lib/api";
import { sanitizeContent } from "@/lib/sanitize";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";

export const revalidate = 60;
export const dynamicParams = true;

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  const description = post.excerpt.rendered
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  return {
    title: `${post.title.rendered.replace(/<[^>]+>/g, "")} | PD Gupta & CO`,
    description,
    openGraph: {
      title: post.title.rendered.replace(/<[^>]+>/g, ""),
      description,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  const sanitizedContent = sanitizeContent(post.content.rendered);

  const publishDate = new Date(post.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const authorName = post._embedded?.author?.[0]?.name ?? "Admin";
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

  return (
    <>
      <Navbar />

      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <h1
            className="text-2xl md:text-4xl font-bold mb-4 leading-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="flex flex-wrap items-center gap-5 text-blue-200 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {publishDate}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {authorName}
            </span>
          </div>
        </div>
      </section>

      {/* ── Featured image ──────────────────────────────────────────────── */}
      {featuredImage && (
        <div className="container mx-auto px-4 max-w-4xl mt-8">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "16/9" }}>
            <Image
              src={featuredImage}
              alt={post.title.rendered.replace(/<[^>]+>/g, "")}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>
      )}

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <article className="container mx-auto px-4 max-w-4xl py-10">
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </article>

      {/* ── Back link ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 max-w-4xl pb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      <Footer />
    </>
  );
}
