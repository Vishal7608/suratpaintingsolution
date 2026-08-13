import { Shield, Award, CheckCircle2, Phone, MessageSquare, Users, Sparkles, Building2 } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { Link } from 'react-router-dom';

export default function About() {
  const brands = [
    { name: 'Asian Paints', desc: 'Royale, Apex Ultima, SmartCare Waterproofing' },
    { name: 'Berger Paints', desc: 'Silk Glamor, WeatherCoat Long Life, Express Painting' },
    { name: 'Nerolac', desc: 'Impressions Ultra HD, Excel Topcoat' },
    { name: 'Dulux', desc: 'Velvet Touch, Aquatech Waterproofing' },
    { name: 'Dr. Fixit', desc: 'Pidilite Waterproofing & Crack Sealing' }
  ];

  return (
    <>
      <SeoHead
        title="About Us | SuratPaintingSolution - Local Painting Contractor"
        description="Learn about SuratPaintingSolution, Surat's family-owned painting and waterproofing contractor. Over 15 years experience, 1,200+ homes completed in Adajan, Vesu, and across Surat."
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-10 lg:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
            For Surat's Families, For Their Homes
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            About SuratPaintingSolution
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
            A dedicated team of local Surat painters and waterproofing specialists bringing quality, punctuality, and dust-free execution to homes across Surat since 2010.
          </p>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#F85000] uppercase tracking-wider bg-[#F8F0D8] px-3 py-1 rounded-full">
                Our Story
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002048]">
                Rooted in Surat, Built on Trust & Craftsmanship
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Founded over 15 years ago, SuratPaintingSolution started with a simple belief: house painting should bring joy and freshness to a home, not days of chalk dust, ruined furniture, or hidden costs. Our senior lead painters carry over 26+ years of specialized hands-on experience in surface preparation, texture work, and monsoon waterproofing.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Over the past decade, we have completed over 1,200 home painting and terrace waterproofing projects across Adajan, Vesu, Piplod, City Light, Varachha, and Katargam. We understand how Surat’s climate—from intense summer heatwaves to heavy monsoon downpours—affects plaster, wood, and exterior paint.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#FAF8F5] p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-[#002048] border-b border-slate-200 pb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#F85000]" /> Our Core Standards
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F85000] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#002048]">Zero Dust Hassle</h4>
                    <p className="text-xs text-slate-600">Vacuum-assisted electrical sanding machines keep your air clean and furniture dust-free.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F85000] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#002048]">Punctual Schedule Guarantee</h4>
                    <p className="text-xs text-slate-600">We commit to a firm start and handover date in writing. No endless delays.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F85000] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#002048]">Genuine Sealed Materials</h4>
                    <p className="text-xs text-slate-600">All paint cans (Asian Paints, Berger, Nerolac) are opened on-site in front of the homeowner.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F85000] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#002048]">Transparent Itemized Pricing</h4>
                    <p className="text-xs text-slate-600">Clear square-footage measurement and written estimate with zero hidden extras.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Partnerships */}
      <section className="py-16 bg-[#FAF8F5] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-[#F8F0D8] px-3 py-1 rounded-full">
              Authorized Materials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002048]">
              Premium Paint Brands We Use
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We exclusively apply top-tier paints and chemical waterproofing systems tested for durability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {brands.map((b) => (
              <div key={b.name} className="p-4 bg-white rounded-xl border border-slate-200 text-center space-y-1 shadow-sm">
                <div className="text-base font-extrabold text-[#002048]">{b.name}</div>
                <div className="text-[11px] text-slate-500">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-[#F8F0D8] px-3 py-1 rounded-full">
              Our Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002048]">
              How We Paint Your Surat Home in 5 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'On-Site Inspection', desc: 'Free site visit, moisture check, and shade card selection.' },
              { step: '2', title: 'Complete Masking', desc: 'Covering furniture, flooring, doors, and electronics with protective sheets.' },
              { step: '3', title: 'Surface Prep & Putty', desc: 'Crack repair, wall putty, and vacuum sanding for smooth walls.' },
              { step: '4', title: 'Double Topcoat', desc: 'Applying primer and 2 coats of premium washable emulsion.' },
              { step: '5', title: 'Unmasking & Clean Up', desc: 'Removing plastic sheets, floor cleaning, and warranty handover.' }
            ].map((p) => (
              <div key={p.step} className="p-5 bg-[#FAF8F5] rounded-xl border border-slate-200 space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-[#002048] text-[#F85000] font-bold flex items-center justify-center text-sm">
                  {p.step}
                </div>
                <h3 className="text-sm font-bold text-[#002048]">{p.title}</h3>
                <p className="text-xs text-slate-600">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/contact"
              className="bg-[#F85000] hover:bg-[#e04800] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all inline-block"
            >
              Book Free Home Inspection in Surat
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
