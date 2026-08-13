import { Link, useParams } from 'react-router-dom';
import { Clock, ChevronRight, AlertCircle, ArrowLeft, Share2 } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { blogData } from '../data/blogData';
import LeadForm from '../components/LeadForm';

export default function BlogPostDetail() {
  const { postId } = useParams();
  const post = blogData.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4">
        <AlertCircle className="w-12 h-12 text-[#F85000] mx-auto" />
        <h2 className="text-2xl font-bold text-[#002048]">Article Not Found</h2>
        <p className="text-sm text-slate-600">The requested blog post does not exist.</p>
        <Link to="/blog" className="inline-block bg-[#002048] text-white px-5 py-2.5 rounded-lg text-sm font-bold">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SeoHead
        title={`${post.title} | SuratPaintingSolution Blog`}
        description={post.summary}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-10 lg:py-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Link to="/" className="hover:text-[#F85000]">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/blog" className="hover:text-[#F85000]">Blog</Link>
            <ChevronRight className="w-3 h-3 text-[#F85000]" />
            <span className="text-slate-900 font-bold truncate max-w-xs">{post.title}</span>
          </div>

          <span className="inline-block bg-orange-100/80 text-[#F85000] border border-orange-200 text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-96">
            <img
              src={post.image}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {post.content}
          </div>

          <div className="pt-8 border-t border-slate-200">
            <LeadForm title="Have Questions About Waterproofing or Painting?" />
          </div>

          <div className="pt-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002048] hover:text-[#F85000]"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Articles
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
