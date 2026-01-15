// app/blog/page.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllBlogs } from '@/lib/firestore';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: 'Blog - PD Gupta & CO | Tax & Finance Insights',
  description: 'Read the latest articles on taxation, GST, financial planning, and business advisory from our expert chartered accountants.',
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 reveal">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-gray-200">
              Expert insights on taxation, finance, and business management
            </p>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="section-padding bg-gray-50 reveal">
        <div className="container-custom">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {blog.image && (
                    <div className="relative h-48 bg-gradient-to-br from-primary-700 to-primary-900">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <Calendar size={16} />
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {blog.summary || blog.excerpt}
                    </p>
                    <div className="flex items-center text-primary-700 font-semibold">
                      <span>Read More</span>
                      <ArrowRight size={18} className="ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
