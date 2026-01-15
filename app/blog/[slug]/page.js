// app/blog/[slug]/page.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogBySlug, getAllBlogs } from '@/lib/firestore';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.log('Error generating static params for blogs:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const blog = await getBlogBySlug(params.slug);
    
    if (!blog) {
      return {
        title: 'Blog Not Found',
      };
    }

    return {
      title: `${blog.title} - PD Gupta & CO Blog`,
      description: blog.summary || blog.excerpt || blog.title,
      openGraph: {
        title: blog.title,
        description: blog.summary || blog.excerpt,
        images: blog.image ? [blog.image] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Blog Not Found',
    };
  }
}

export default async function BlogPostPage({ params }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <Navbar />
      
      {/* Blog Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12">
        <div className="container-custom">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-200 hover:text-white mb-6 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>
                  {blog.createdAt?.toDate ? 
                    blog.createdAt.toDate().toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 
                    'Recently'
                  }
                </span>
              </div>
              {blog.author && (
                <div className="flex items-center space-x-2">
                  <User size={18} />
                  <span>{blog.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {blog.image && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-auto"
                />
              </div>
            )}
            
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-lg mb-6 text-gray-200">
              Our expert team is here to help with all your financial needs
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
