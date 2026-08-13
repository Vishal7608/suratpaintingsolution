import { Link } from 'react-router-dom';
import { Shield, CheckCircle2, Phone, MessageSquare, ArrowRight, Sparkles, MapPin, Star, Droplets, Sun, Layers, Paintbrush, Building, Home as HomeIcon, Sparkle, Wrench } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import LeadForm from '../components/LeadForm';
import ColorVisualizer from '../components/ColorVisualizer';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import SiteLocationPicker from '../components/SiteLocationPicker';
import AreaServedSlider from '../components/AreaServedSlider';
import { servicesData } from '../data/servicesData';
import { areasData } from '../data/areasData';
import { testimonialsData } from '../data/testimonialsData';
import { galleryData } from '../data/galleryData';

import imgShowcase from '../assets/images/surat_master_painting_showcase_1786508573110.jpg';

export default function Home() {
  const tier1Areas = areasData.filter(a => a.tier === 1);

  return (
    <>
      <SeoHead
        title="House Painters in Surat | Waterproofing & Painting Contractor"
        description="SuratPaintingSolution provides professional interior, exterior house painting & terrace waterproofing in Surat. Serving Vesu, Adajan, Pal, Piplod, City Light, Varachha, and all 26+ Surat areas. Call +91 94081 97990."
      />

      {/* Hero Section - UAE Style Format with Warm Cream Canvas & Paint Splash Showcase */}
      <section className="relative bg-[#FFFBEB] text-slate-900 pt-4 sm:pt-8 lg:pt-14 pb-12 sm:pb-16 lg:pb-20 overflow-hidden border-b border-amber-200/60">
        
        {/* Decorative Background Vector Graphic */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none opacity-10 lg:opacity-25">
          <svg viewBox="0 0 500 500" className="w-full h-full fill-[#C81E1E]">
            <path d="M420,120Q380,240,430,350Q480,460,350,450Q220,440,160,370Q100,300,120,180Q140,60,270,70Q400,80,420,120Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Hero Left Column Copy (Shows BELOW image on mobile, LEFT on desktop) */}
            <div className="w-full lg:col-span-6 space-y-3.5 sm:space-y-5 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-[#C81E1E] text-[11px] sm:text-xs font-extrabold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#C81E1E] shrink-0" />
                <span>Surat's Premier Painting & Waterproofing Hub</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-slate-950 leading-[1.1] tracking-tight">
                Painting <br className="hidden sm:inline" />
                Services in <span className="text-[#C81E1E]">Surat</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-medium max-w-xl">
                Get top-quality residential and commercial painting, waterproofing, and wood polishing services in Surat.
              </p>

              {/* Red Phone Call CTA Button */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
                <a
                  href="tel:+919408197990"
                  className="bg-[#C81E1E] hover:bg-[#a61717] text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-2xl font-black tracking-wide shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                  <span>+91 94081 97990</span>
                </a>

                <Link
                  to="/contact"
                  className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 px-4 sm:px-6 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold text-center shadow-xs transition-all active:scale-95"
                >
                  Get Free Estimate
                </Link>
              </div>

              {/* Service Features Row */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-[11px] sm:text-xs font-extrabold text-slate-800">
                <span className="bg-white/90 border border-amber-200/80 px-2.5 py-1 rounded-full shadow-2xs">✓ 100% Dust-Free</span>
                <span className="bg-white/90 border border-amber-200/80 px-2.5 py-1 rounded-full shadow-2xs">✓ Monsoon Waterproofing</span>
                <span className="bg-white/90 border border-amber-200/80 px-2.5 py-1 rounded-full shadow-2xs">✓ Teak Wood Polish</span>
              </div>

              <div className="text-[10px] sm:text-xs text-slate-600 flex items-center gap-1.5 font-semibold pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#C81E1E] shrink-0" />
                <span>Serving Vesu, Adajan, Pal, Piplod, City Light & all 26+ Surat areas</span>
              </div>

            </div>

            {/* Hero Right Column: Plain Image over Paint Splash Graphic (Shows FIRST on Mobile, RIGHT on Desktop) */}
            <div className="w-full lg:col-span-6 relative flex justify-center">
              
              <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-none">
                
                {/* Red Paint Splash Backdrop Shape (Plain Vector Art behind image) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#C81E1E] via-[#E53E3E] to-[#F85000] rounded-[30%] sm:rounded-[40%] transform -rotate-3 scale-105 opacity-90 blur-xs" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-36 sm:h-36 bg-[#C81E1E] rounded-full opacity-40 blur-lg" />
                
                {/* Plain Clean Image Container - No Dark Frames, No Dark Overlays */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl aspect-[4/3] sm:aspect-[14/10] max-h-52 sm:max-h-72 lg:max-h-none mx-auto">
                  <img
                    src={imgShowcase}
                    alt="Painting Services in Surat"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Bottom Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-10 fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.06,150.3,121.28,219,115.8,253.3,113.1,287.5,91.2,321.39,56.44Z"></path>
          </svg>
        </div>

      </section>

      {/* Trust Indicators: Inline Number Row */}
      <section className="bg-[#F8F0D8] border-y border-[#F85000]/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-6 text-center text-[#002048]">
            <div className="px-4">
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#F85000]">15+ Years</span>
              <span className="text-xs sm:text-sm font-bold text-[#002048]">Surat Local Experience</span>
            </div>
            <div className="h-10 w-px bg-slate-300 hidden sm:block" />
            <div className="px-4">
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#002048]">1,200+</span>
              <span className="text-xs sm:text-sm font-bold text-[#002048]">Surat Homes Painted</span>
            </div>
            <div className="h-10 w-px bg-slate-300 hidden sm:block" />
            <div className="px-4">
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#0058B8]">100%</span>
              <span className="text-xs sm:text-sm font-bold text-[#002048]">On-Time Completion</span>
            </div>
            <div className="h-10 w-px bg-slate-300 hidden sm:block" />
            <div className="px-4">
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#F85000]">5 Stars</span>
              <span className="text-xs sm:text-sm font-bold text-[#002048]">350+ Customer Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Interactive Moment: Color Studio Visualizer */}
      <section id="visualizer" className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ColorVisualizer />
        </div>
      </section>

      {/* Services Section: Alternating Left-Right Zig-Zag Blocks */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-[#F8F0D8] px-3 py-1 rounded-full">
              Our Core Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002048]">
              Expert House Painting & Waterproofing for Surat Homes
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Each service is executed with precision using top brand materials, complete furniture masking, and clean post-job cleanup.
            </p>
          </div>

          {/* Service Zig-Zag Layout */}
          <div className="space-y-16">
            {servicesData.slice(0, 4).map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  className={`flex flex-col lg:flex-row gap-10 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Image Column */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/10]">
                      <img
                        src={service.heroImage}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-[#002048] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow">
                      Master Skilled Crew
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="w-full lg:w-1/2 space-y-4">
                    <span className="text-xs font-bold text-[#0058B8] uppercase tracking-wider">
                      Specialized Solution
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#002048]">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <ul className="space-y-2 py-2">
                      {service.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#F85000] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        to={`/services/${service.id}`}
                        className="bg-[#002048] hover:bg-[#0058B8] text-white px-5 py-2.5 rounded-lg text-sm font-bold inline-flex items-center gap-2 transition-colors"
                      >
                        Explore Details & Scope <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/contact"
                        className="text-sm font-bold text-[#F85000] hover:underline"
                      >
                        Book Quick Estimate →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-[#F85000] hover:bg-[#e04800] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-md transition-all"
            >
              View All 12 Painting & Waterproofing Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Work Before/After Comparison */}
      <section className="py-20 bg-[#FAF8F5] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-[#F8F0D8] px-3 py-1 rounded-full">
              Real Work Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002048]">
              Before & After Transformations in Surat
            </h2>
            <p className="text-sm text-slate-600">
              Drag the slider line to compare the real transformations we achieved for Surat homeowners in Adajan, Vesu, and Piplod.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BeforeAfterSlider
              beforeImage={galleryData[0].beforeImage}
              afterImage={galleryData[0].afterImage}
              title={galleryData[0].title}
              area={galleryData[0].area}
              description={galleryData[0].description}
            />
            <BeforeAfterSlider
              beforeImage={galleryData[1].beforeImage}
              afterImage={galleryData[1].afterImage}
              title={galleryData[1].title}
              area={galleryData[1].area}
              description={galleryData[1].description}
            />
          </div>

          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-[#002048] hover:bg-[#0058B8] text-white px-6 py-3 rounded-lg text-sm font-bold transition-colors"
            >
              View Full Gallery & Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Why Choose Us & Surat Climate Focus */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-[#F8F0D8] px-3 py-1 rounded-full">
                Surat Climate Specialist
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002048]">
                Why Surat Homes Require Specialized Painting & Waterproofing
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Surat’s unique weather features high summer heat, intense monsoon rain, and riverfront humidity from the Tapi River. Generic paint jobs peel, flake, and turn black with mold within 2 monsoons.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-4 items-start p-4 bg-[#FAF8F5] rounded-xl border border-slate-200">
                  <div className="p-2.5 bg-[#002048] text-white rounded-lg shrink-0">
                    <Droplets className="w-5 h-5 text-[#F85000]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#002048]">Tapi River Humidity Defense</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      We use vapor-permeable primers that let wall moisture escape without blistering the paint coat.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-[#FAF8F5] rounded-xl border border-slate-200">
                  <div className="p-2.5 bg-[#002048] text-white rounded-lg shrink-0">
                    <Sun className="w-5 h-5 text-[#F85000]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#002048]">UV-Resistant Exterior Coatings</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Apex Ultima and Weathercoat paints formulated with UV-lock pigments that don't fade under 40°C Surat summer sun.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-[#FAF8F5] rounded-xl border border-slate-200">
                  <div className="p-2.5 bg-[#002048] text-white rounded-lg shrink-0">
                    <Layers className="w-5 h-5 text-[#0058B8]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#002048]">Dust-Free Mechanized Execution</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Vacuum-assisted sanding equipment keeps your furniture, ACs, and kitchen 90% cleaner than traditional sanding.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 text-slate-900 p-8 rounded-2xl shadow-md border border-slate-200 space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-900 border-b border-slate-200 pb-4">
                Our 5-Step Quality Commitment
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F85000] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">1</span>
                  <div>
                    <div className="font-bold text-base text-slate-900">Digital Moisture Audit</div>
                    <div className="text-xs text-slate-600">We test all walls with digital moisture sensors before applying paint.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F85000] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">2</span>
                  <div>
                    <div className="font-bold text-base text-slate-900">100% Surface Masking</div>
                    <div className="text-xs text-slate-600">Sofas, TVs, floors, and door frames wrapped in plastic protective sheets.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F85000] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">3</span>
                  <div>
                    <div className="font-bold text-base text-slate-900">Genuine Brand Paint Sealing</div>
                    <div className="text-xs text-slate-600">Original sealed cans of Asian Paints, Berger, or Nerolac opened in front of you.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F85000] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">4</span>
                  <div>
                    <div className="font-bold text-base text-slate-900">Daily Supervisor Inspection</div>
                    <div className="text-xs text-slate-600">A dedicated lead supervisor manages progress and quality control daily.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F85000] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">5</span>
                  <div>
                    <div className="font-bold text-base text-slate-900">Post-Painting Cleaning & Warranty</div>
                    <div className="text-xs text-slate-600">Full floor cleaning, masking removal, and written warranty card issued.</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-block text-xs font-bold text-[#F85000] hover:underline"
                >
                  Learn More About Our Crew & Company Standards →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Site Location Picker Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-center space-y-2 mb-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#F85000] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Live Location Tech
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Select & Share Your Site Location in Surat
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Use live GPS, search your society/locality name, or drag the pin marker on the map. Send location directly to our WhatsApp for instant supervisor inspection dispatch!
            </p>
          </div>

          <SiteLocationPicker title="STEP 3: SITE LOCATION" />
        </div>
      </section>

      {/* Surat Areas Served Interactive Menu Slider Section */}
      <section className="py-16 bg-[#FAF8F5] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AreaServedSlider title="Painters & Waterproofers Near You in Surat" showHeader={true} />
        </div>
      </section>

      {/* Organic Reviews Layout */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-[#F8F0D8] px-3 py-1 rounded-full">
              Customer Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-[#002048]">
              What Surat Families Say About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.slice(0, 3).map((t) => (
              <div key={t.id} className="space-y-3 p-6 rounded-2xl bg-[#FAF8F5] border border-slate-200 relative">
                <div className="flex gap-1 text-[#F85000]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{t.comment}"
                </p>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#002048] block">{t.author}</span>
                    <span className="text-slate-500">{t.area}</span>
                  </div>
                  <span className="text-[#0058B8] font-medium bg-white px-2 py-1 rounded border border-slate-200">
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/testimonials"
              className="text-sm font-bold text-[#0058B8] hover:underline"
            >
              Read More 100% Verified Customer Reviews →
            </Link>
          </div>

        </div>
      </section>

      {/* Final Call to Action Block */}
      <section className="bg-gradient-to-r from-amber-50 via-white to-orange-50 text-slate-900 py-16 border-t-4 border-[#F85000] border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Ready to Give Your Surat Home a Beautiful, Dust-Free Finish?
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto font-medium">
            Get an exact on-site estimate in 30 minutes. Free shade card consultation included for all Adajan, Vesu, and Surat homeowners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <a
              href="tel:+919408197990"
              className="w-full sm:w-auto bg-[#F85000] hover:bg-[#e04800] text-white px-8 py-4 rounded-xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" /> Call +91 94081 97990
            </a>
            <a
              href="https://wa.me/919408197990?text=Hi%20SuratPaintingSolution%2C%20I%20need%20a%20painting%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 fill-current" /> WhatsApp Instant Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
