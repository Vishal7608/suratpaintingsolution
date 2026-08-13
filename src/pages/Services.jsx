import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Search, Sparkles, Filter, Grid, LayoutList, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { servicesData } from '../data/servicesData';

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('compact'); // 'compact' | 'detailed'

  const categories = [
    { id: 'All', label: 'All Services (16)' },
    { id: 'Residential', label: 'Residential Homes' },
    { id: 'Waterproofing', label: 'Waterproofing & Repairs' },
    { id: 'Commercial', label: 'Commercial & Industrial' },
    { id: 'Specialty', label: 'Speciality Finishes' },
  ];

  const getServiceCategory = (id) => {
    if (['home-painting', 'interior-painting', 'exterior-painting', 'villa-painting', 'wall-painting'].includes(id)) {
      return 'Residential';
    }
    if (['waterproofing', 'metal-grill-gate-painting', 'pop-and-putty-work'].includes(id)) {
      return 'Waterproofing';
    }
    if (['commercial-painting', 'industrial-painting', 'epoxy-flooring', 'commercial-society-painting'].includes(id)) {
      return 'Commercial';
    }
    return 'Specialty';
  };

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const cat = getServiceCategory(service.id);
      const matchesCat = activeCategory === 'All' || cat === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.shortDesc.toLowerCase().includes(query) ||
        (service.highlights && service.highlights.some(h => h.toLowerCase().includes(query)));

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <>
      <SeoHead
        title="All 16 Painting & Waterproofing Services in Surat | SuratPaintingSolution"
        description="Explore Surat's complete 16 contractor services: interior painting, exterior monsoon coating, terrace waterproofing, texture walls, wood PU polishing, epoxy floors & society contracts."
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-10 lg:py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#F85000] bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200 inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#F85000]" /> Complete Contractor Directory • 16 Services
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            House Painting & Waterproofing Services in Surat
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Quickly filter and jump to any specialized service. Click any service card to view complete execution scope, process steps, color visualizer, and local FAQs.
          </p>

          {/* Quick Contact Bar */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3 text-xs font-bold text-slate-800">
            <a href="tel:+919408197990" className="hover:text-[#F85000] transition-colors flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
              <Phone className="w-3.5 h-3.5 text-[#F85000]" /> Call Specialist: +91 94081 97990
            </a>
            <a
              href="https://wa.me/919408197990?text=Hi%20SuratPaintingSolution%2C%20I%20want%20to%20know%20about%20your%20painting%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-emerald-100 transition-colors flex items-center gap-1.5 bg-emerald-50 text-emerald-900 px-3 py-2 rounded-xl border border-emerald-200 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" /> WhatsApp Fast Quote
            </a>
          </div>
        </div>
      </section>

      {/* Main Directory & Filtering Area */}
      <section className="py-8 lg:py-12 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Search Bar & Category Controls Header */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search service e.g. waterproofing, wood, villa, epoxy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F85000] focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* View Layout Toggle Buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
                <span className="text-slate-500 font-medium hidden sm:inline">Layout:</span>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                      viewMode === 'compact'
                        ? 'bg-[#002048] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" /> Compact Directory
                  </button>
                  <button
                    onClick={() => setViewMode('detailed')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                      viewMode === 'detailed'
                        ? 'bg-[#002048] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutList className="w-3.5 h-3.5" /> Detailed Cards
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-[#F85000]" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all border shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-[#F85000] text-white border-[#F85000] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>

          {/* Result Count Notice */}
          <div className="flex items-center justify-between text-xs text-slate-600 px-1">
            <div>
              Showing <span className="font-extrabold text-[#002048]">{filteredServices.length}</span> of 16 services
              {activeCategory !== 'All' && <span> in <strong>{activeCategory}</strong></span>}
              {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
            </div>
            {filteredServices.length === 0 && (
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="text-[#F85000] font-bold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* No Search Results Fallback */}
          {filteredServices.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
              <div className="text-slate-400 font-bold text-base">No services match your search query.</div>
              <p className="text-xs text-slate-500">Try searching for "interior", "terrace", "wood", or "epoxy".</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="bg-[#002048] text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                View All 16 Services
              </button>
            </div>
          )}

          {/* COMPACT MATRIX GRID VIEW (Zero Fluff, Fast & Space Efficient) */}
          {viewMode === 'compact' && filteredServices.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
              {filteredServices.map((service) => {
                const categoryName = getServiceCategory(service.id);
                return (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-[#F85000] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full relative"
                  >
                    <div className="space-y-2.5">
                      {/* Top Bar: Category Badge & Icon */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md bg-amber-50 text-[#F85000] border border-amber-200/60">
                          {categoryName}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#0058B8] flex items-center gap-0.5">
                          Surat Crew <ShieldCheck className="w-3 h-3 text-[#0058B8]" />
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-extrabold text-[#002048] group-hover:text-[#F85000] transition-colors leading-snug">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* Highlights Pill Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {service.highlights.slice(0, 2).map((h, i) => (
                          <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded truncate max-w-full">
                            ✓ {h.split(' ').slice(0, 4).join(' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Button Link */}
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#002048] group-hover:text-[#F85000]">
                      <span>View Service Page</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F85000] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* DETAILED CARDS VIEW */}
          {viewMode === 'detailed' && filteredServices.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden">
                      <img
                        src={service.heroImage}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-[#002048] text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                        Master Skilled Crew
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h2 className="text-2xl font-bold text-[#002048]">
                        {service.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {service.shortDesc}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {service.highlights.slice(0, 3).map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F85000] shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      to={`/services/${service.id}`}
                      className="w-full bg-[#002048] hover:bg-[#0058B8] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      View Scope, Process & FAQs <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
