import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, CheckCircle2, ChevronRight, AlertCircle, Building2, Sun, Shield, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import LeadForm from '../components/LeadForm';
import { areasData } from '../data/areasData';
import { servicesData } from '../data/servicesData';

export default function AreaDetail() {
  const { areaId } = useParams();
  const area = areasData.find((a) => a.id === areaId);
  const [openFaq, setOpenFaq] = useState(null);

  if (!area) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4">
        <AlertCircle className="w-12 h-12 text-[#F85000] mx-auto" />
        <h2 className="text-2xl font-bold text-[#002048]">Locality Not Found</h2>
        <p className="text-sm text-slate-600">The requested Surat area page does not exist in our system.</p>
        <Link to="/areas" className="inline-block bg-[#002048] text-white px-5 py-2.5 rounded-lg text-sm font-bold">
          View All Surat Areas
        </Link>
      </div>
    );
  }

  const pageTitle = `${area.name} Painting Services & Waterproofing Contractor | SuratPaintingSolution`;
  const metaDesc = `Top-rated house painters & waterproofing contractor in ${area.name}, Surat (${area.pincode}). Dust-free interior painting, monsoon terrace waterproofing, and texture walls. Call +91 94081 97990.`;

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Surat Localities', item: '/areas' },
    { name: area.name, item: `/areas/${area.id}` }
  ];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={metaDesc}
        faqData={area.faqs}
        breadcrumbData={breadcrumbItems}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-10 lg:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-600">
            <Link to="/" className="hover:text-[#F85000] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/areas" className="hover:text-[#F85000] transition-colors">Surat Localities</Link>
            <ChevronRight className="w-3 h-3 text-[#F85000]" />
            <span className="text-slate-900 font-extrabold">{area.name}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
                PINCODE: {area.pincode} • SURAT, GUJARAT
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0058B8] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                TIER {area.tier || 1} PRIORITY ZONE
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              House Painting & Waterproofing Services in {area.name}, Surat
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {area.tagline}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="tel:+919408197990"
                className="bg-[#F85000] hover:bg-[#e04800] text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" /> Call Painter in {area.name} (+91 94081 97990)
              </a>
              <a
                href={`https://wa.me/919408197990?text=Hi%20SuratPaintingSolution%2C%20I%20need%20a%20painting%20quote%20for%20my%20property%20in%20${encodeURIComponent(area.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-current" /> WhatsApp Instant Quote
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Main Area Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-7 space-y-10">
              
              {/* Locality Intro */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-[#002048]">
                  Trusted House Painters & Contractors in {area.name}, Surat
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {area.description}
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-slate-200 text-xs text-[#0058B8] font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F85000]" />
                  <span>Verified Presence: {area.recentProjectsCount}</span>
                </div>
              </div>

              {/* Housing Types in Area */}
              {area.popularHousing && area.popularHousing.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-[#002048] flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#F85000]" /> Popular Property Types We Paint in {area.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {area.popularHousing.map((h, i) => (
                      <div key={i} className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#F85000] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Climate & Weather Factor for Locality */}
              {area.weatherFactors && (
                <div className="p-5 bg-[#F8F0D8]/60 rounded-xl border border-[#F85000]/30 space-y-2">
                  <h3 className="text-base font-bold text-[#002048] flex items-center gap-2">
                    <Sun className="w-5 h-5 text-[#F85000]" /> Weather & Climate Factors in {area.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {area.weatherFactors}
                  </p>
                </div>
              )}

              {/* Recommended Services in Area (Direct Internal Links to Services) */}
              {area.recommendedServices && area.recommendedServices.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#002048]">
                    Recommended Services for {area.name} Properties
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {area.recommendedServices.map((rs, idx) => {
                      const fullService = servicesData.find(s => s.id === rs.id) || servicesData[0];
                      return (
                        <Link
                          key={idx}
                          to={`/services/${fullService.id}`}
                          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-[#F85000] hover:shadow-md transition-all group space-y-1.5"
                        >
                          <div className="text-sm font-bold text-[#002048] group-hover:text-[#F85000] transition-colors flex items-center justify-between">
                            <span>{rs.label || fullService.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F85000]" />
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {fullService.shortDesc}
                          </p>
                          <span className="text-[11px] font-bold text-[#0058B8] block">
                            View Service Details →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Local Testimonial */}
              {area.testimonialSnippet && (
                <div className="p-5 bg-[#FAF8F5] rounded-xl border border-slate-200 space-y-2 text-slate-700 text-sm">
                  <div className="font-bold text-[#002048] text-xs uppercase tracking-wider text-[#F85000] flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#F85000]" /> Verified Customer Review from {area.name}
                  </div>
                  <p className="italic">"{area.testimonialSnippet}"</p>
                </div>
              )}

              {/* Trust & Quality Guarantee */}
              <div className="bg-[#002048] text-white p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#F85000]" /> Our Quality Guarantee for {area.name}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F85000] shrink-0" />
                    <span>100% Dust-Free Vacuum Sanding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F85000] shrink-0" />
                    <span>Original Sealed Cans Opened On-Site</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F85000] shrink-0" />
                    <span>Complete Furniture & Tile Masking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F85000] shrink-0" />
                    <span>Written Performance Warranty</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Callout: Try AI Color Visualizer */}
              <div className="p-6 bg-gradient-to-r from-[#002048] to-[#0058B8] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-[#F8F0D8] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                    <Sparkles className="w-4 h-4 text-[#F85000]" /> Color Selection Tool
                  </span>
                  <h4 className="text-lg font-bold text-white">Not sure which shade suits your {area.name} home?</h4>
                  <p className="text-xs text-slate-200">Experiment with 50+ Asian Paints shades on our interactive visualizer.</p>
                </div>
                <Link
                  to="/#visualizer"
                  className="bg-[#F85000] hover:bg-[#e04800] text-white px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shadow transition-colors"
                >
                  Try AI Color Visualizer →
                </Link>
              </div>

              {/* FAQs Section */}
              {area.faqs && area.faqs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#002048]">
                    Frequently Asked Questions for {area.name} Homeowners
                  </h3>
                  <div className="space-y-3">
                    {area.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-200 bg-[#FAF8F5] cursor-pointer"
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      >
                        <div className="text-sm font-bold text-[#002048] flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-[#F85000] shrink-0" /> {faq.q}
                          </span>
                          <span className="text-xs text-[#0058B8] font-bold">{openFaq === idx ? '−' : '+'}</span>
                        </div>
                        {(openFaq === idx || idx === 0) && (
                          <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Services Grid */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xl font-bold text-[#002048]">
                  All Painting & Waterproofing Services Available in {area.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicesData.map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.id}`}
                      className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-[#F85000] hover:shadow-sm transition-all group"
                    >
                      <div className="text-sm font-bold text-[#002048] group-hover:text-[#F85000] transition-colors">
                        {s.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {s.shortDesc}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nearby Area Links */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-[#002048] uppercase tracking-wider">
                  Nearby Surat Localities Served:
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {areasData.filter(a => a.id !== area.id).slice(0, 12).map((a) => (
                    <Link
                      key={a.id}
                      to={`/areas/${a.id}`}
                      className="text-slate-600 hover:text-[#F85000] underline"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Lead Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <LeadForm
                  defaultArea={area.name}
                  title={`Request Quote in ${area.name}`}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
