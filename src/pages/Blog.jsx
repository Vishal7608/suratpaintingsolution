import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { blogData } from '../data/blogData';

export default function Blog() {
  return (
    <>
      <SeoHead
        title="Painting Care & Waterproofing Blog | SuratPaintingSolution"
        description="Read house painting tips, Asian Paints shade recommendations, monsoon waterproofing guides, and home care advice tailored for Surat homeowners."
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-10 lg:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
            Surat Home Maintenance Guides
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Painting & Waterproofing Blog
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Expert advice on monsoon wall protection, Asian Paints color selection, dust-free painting, and wall care for Surat homes.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogData.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#002048] text-white text-[11px] font-bold px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>

                    <h2 className="text-lg font-bold text-[#002048] leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-xs font-bold text-[#F85000] hover:underline flex items-center gap-1"
                  >
                    Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
