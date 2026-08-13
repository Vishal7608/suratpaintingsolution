import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Shield, Sparkles, Building2, Factory } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import AreaServedSlider from '../components/AreaServedSlider';
import { areasData } from '../data/areasData';

export default function Areas() {
  const tier1Areas = areasData.filter(a => a.tier === 1);
  const tier2Areas = areasData.filter(a => a.tier === 2);
  const tier3Areas = areasData.filter(a => a.tier === 3);

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Surat Localities Served', item: '/areas' }
  ];

  return (
    <>
      <SeoHead
        title="Surat Areas Served | House Painting Contractor Local Hubs"
        description="SuratPaintingSolution provides local painting & waterproofing across 26+ Surat localities including Vesu, Adajan, Pal, Piplod, City Light, Ghod Dod Road, Varachha, Katargam, and Udhna GIDC."
        breadcrumbData={breadcrumbItems}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-10 lg:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-orange-100/80 px-3.5 py-1.5 rounded-full border border-orange-200">
            Local Surat Presence Across 26+ Neighborhoods
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Areas We Serve Across Surat
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Our painting supervisors and crews are stationed locally across all major residential, commercial, and industrial zones in Surat for rapid 30-minute site visits.
          </p>
        </div>
      </section>

      {/* Areas Network Hub Content */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Quick Slider Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <AreaServedSlider title="Quick Local Hubs Selector" showHeader={true} />
          </div>

          {/* TIER 1 SECTION */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-[#F8F0D8] px-3 py-1 rounded-full">
                  Tier 1 Priority Hubs
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002048] mt-2 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-[#F85000]" /> Prime Residential & Commercial Localities
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">10 Primary Service Hubs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tier1Areas.map((area) => (
                <div
                  key={area.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-[#002048] group-hover:text-[#F85000] transition-colors flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#F85000]" /> {area.name}
                      </h3>
                      <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-slate-200 text-xs font-mono font-bold text-slate-600">
                        {area.pincode}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {area.description}
                    </p>

                    <div className="text-xs font-bold text-[#0058B8]">
                      {area.recentProjectsCount}
                    </div>
                  </div>

                  <Link
                    to={`/areas/${area.id}`}
                    className="bg-[#002048] hover:bg-[#0058B8] text-white py-2.5 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    View Services in {area.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 2 SECTION */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0058B8] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Tier 2 Suburbs & Outer Zones
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002048] mt-2 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#0058B8]" /> Major Residential & Industrial Suburbs
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">10 Active Localities</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tier2Areas.map((area) => (
                <div
                  key={area.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-[#002048] group-hover:text-[#F85000] transition-colors flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#0058B8]" /> {area.name}
                      </h3>
                      <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-slate-200 text-xs font-mono font-bold text-slate-600">
                        {area.pincode}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {area.description}
                    </p>

                    <div className="text-xs font-bold text-[#0058B8]">
                      {area.recentProjectsCount}
                    </div>
                  </div>

                  <Link
                    to={`/areas/${area.id}`}
                    className="bg-[#002048] hover:bg-[#0058B8] text-white py-2.5 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    View Services in {area.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 3 SECTION */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-200 px-3 py-1 rounded-full">
                  Tier 3 Extended Coverage
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002048] mt-2 flex items-center gap-2">
                  <Factory className="w-6 h-6 text-slate-700" /> Extended Coverage & GIDC Industrial Belts
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">Extended Surat Reach</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tier3Areas.map((area) => (
                <div
                  key={area.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-[#002048] group-hover:text-[#F85000] transition-colors flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-slate-600" /> {area.name}
                      </h3>
                      <span className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-slate-200 text-xs font-mono font-bold text-slate-600">
                        {area.pincode}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {area.description}
                    </p>

                    <div className="text-xs font-bold text-[#0058B8]">
                      {area.recentProjectsCount}
                    </div>
                  </div>

                  <Link
                    to={`/areas/${area.id}`}
                    className="bg-[#002048] hover:bg-[#0058B8] text-white py-2.5 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    View Services in {area.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
