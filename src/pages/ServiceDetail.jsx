import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Phone, MessageSquare, Shield, HelpCircle, ChevronRight, Sparkles, AlertCircle, ArrowRight, MapPin } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import LeadForm from '../components/LeadForm';
import ColorVisualizer from '../components/ColorVisualizer';
import { servicesData } from '../data/servicesData';
import { areasData } from '../data/areasData';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = servicesData.find((s) => s.id === serviceId);
  const [openFaq, setOpenFaq] = useState(null);

  if (!service) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4">
        <AlertCircle className="w-12 h-12 text-[#F85000] mx-auto" />
        <h2 className="text-2xl font-bold text-[#002048]">Service Not Found</h2>
        <p className="text-sm text-slate-600">The requested painting service does not exist.</p>
        <Link to="/services" className="inline-block bg-[#002048] text-white px-5 py-2.5 rounded-lg text-sm font-bold">
          View All Painting Services
        </Link>
      </div>
    );
  }

  const pageTitle = `${service.title} Services in Surat | SuratPaintingSolution`;
  const metaDesc = `${service.title} in Surat by SuratPaintingSolution. ${service.shortDesc} Serving Vesu, Adajan, Piplod, Varachha, and all Surat areas. Call +91 94081 97990.`;

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
    { name: service.title, item: `/services/${service.id}` }
  ];

  const tier1Areas = areasData.filter(a => a.tier === 1);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={metaDesc}
        faqData={service.faqs}
        breadcrumbData={breadcrumbItems}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-10 lg:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-600">
            <Link to="/" className="hover:text-[#F85000] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/services" className="hover:text-[#F85000] transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3 text-[#F85000]" />
            <span className="text-slate-900 font-extrabold">{service.title}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#F85000] bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
              SURAT SPECIALIST SERVICE • MASTER PAINTERS (26+ YEARS EXP)
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              {service.title} Services in Surat
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {service.shortDesc}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="tel:+919408197990"
                className="bg-[#F85000] hover:bg-[#e04800] text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" /> Call Specialist (+91 94081 97990)
              </a>
              <a
                href={`https://wa.me/919408197990?text=Hi%20SuratPaintingSolution%2C%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" /> Get Free On-Site Estimate on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-7 space-y-10">
              
              {/* Feature Hero Image */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[16/9]">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#002048]">
                  Overview of {service.title} for Surat Properties
                </h2>
                <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3">
                  {service.fullDesc}
                </div>
              </div>

              {/* Service Highlights */}
              <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-[#002048]">Key Highlights & Guarantees</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#F85000] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Step by Step */}
              {service.process && service.process.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#002048]">Our Step-by-Step Execution Process</h3>
                  <div className="space-y-3">
                    {service.process.map((p, idx) => (
                      <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#002048] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-[#002048]">{p.title}</div>
                          <div className="text-xs text-slate-600 mt-0.5">{p.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Visualizer Callout */}
              <div className="p-6 bg-gradient-to-r from-[#002048] to-[#0058B8] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-[#F8F0D8] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                    <Sparkles className="w-4 h-4 text-[#F85000]" /> Color Studio
                  </span>
                  <h4 className="text-lg font-bold text-white">Preview shades before painting</h4>
                  <p className="text-xs text-slate-200">Test Asian Paints color palette on living rooms, bedrooms & exteriors.</p>
                </div>
                <Link
                  to="/#visualizer"
                  className="bg-[#F85000] hover:bg-[#e04800] text-white px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shadow transition-colors"
                >
                  Open Shade Visualizer →
                </Link>
              </div>

              {/* Popular Localities Serving Block (Internal Links to Area Detail Pages) */}
              <div className="space-y-3 p-6 bg-[#FAF8F5] rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-[#002048] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#F85000]" /> Popular Localities for {service.title} in Surat
                </h3>
                <p className="text-xs text-slate-600">
                  Our painters execute {service.title.toLowerCase()} across all major Surat neighborhoods. Click your area for localized services & free inspection:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                  {tier1Areas.map((area) => (
                    <Link
                      key={area.id}
                      to={`/areas/${area.id}`}
                      className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-[#F85000] text-xs font-bold text-[#002048] flex items-center justify-between group transition-all"
                    >
                      <span>{area.name}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#F85000]" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQs Accordion */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#002048]">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    {service.faqs.map((faq, idx) => (
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

            </div>

            {/* Lead Form Sticky Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <LeadForm
                  defaultService={service.title}
                  title={`Get Quote for ${service.title}`}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
