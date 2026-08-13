import { Star, Shield, Quote } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { testimonialsData } from '../data/testimonialsData';
import { Link } from 'react-router-dom';

export default function TestimonialsPage() {
  return (
    <>
      <SeoHead
        title="Customer Reviews & Ratings | SuratPaintingSolution"
        description="Read real customer reviews from homeowners in Adajan, Vesu, City Light, Piplod, and Varachha who hired SuratPaintingSolution for house painting and waterproofing."
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-10 lg:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
            100% Verified Feedback
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Customer Reviews & Ratings
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
            See why Surat homeowners consistently rate SuratPaintingSolution 5 stars for punctuality, dust-free sanding, and flawless paint finishes.
          </p>
        </div>
      </section>

      {/* Testimonials List */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex text-[#F85000]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{t.date}</span>
                  </div>

                  <p className="text-slate-700 text-sm italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#002048] block">{t.author}</span>
                    <span className="text-slate-500">{t.area}</span>
                  </div>
                  <span className="bg-[#FAF8F5] text-[#0058B8] px-2.5 py-1 rounded border border-slate-200 font-bold">
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-[#002048]">
              Are You a Recent SuratPaintingSolution Client?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We take pride in every home we paint. If you’ve recently hired our team in Surat, share your feedback or call us if you need any touch-up service.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#002048] text-white px-6 py-3 rounded-xl font-bold text-xs"
            >
              Contact Our Customer Service (+91 94081 97990)
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
