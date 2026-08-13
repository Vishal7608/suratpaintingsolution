import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronLeft, ChevronRight, ArrowRight, Building2, ShieldCheck } from 'lucide-react';
import { areasData } from '../data/areasData';

export default function AreaServedSlider({ title = "Explore Surat Service Hubs", showHeader = true }) {
  const scrollRef = useRef(null);

  const popularAreas = areasData.slice(0, 12); // Top 12 Surat localities

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full space-y-4">
      {showHeader && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-[#F85000] text-xs font-extrabold tracking-wide border border-orange-200">
              <MapPin className="w-3.5 h-3.5 text-[#F85000]" />
              <span>Surat Area Network</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#002048] mt-1">
              {title}
            </h3>
          </div>

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#002048] hover:text-white hover:border-[#002048] transition-colors shadow-xs active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#002048] hover:text-white hover:border-[#002048] transition-colors shadow-xs active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Slider Container with Snap Scrolling */}
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 px-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popularAreas.map((area) => (
            <Link
              key={area.id}
              to={`/areas/${area.id}`}
              className="snap-start shrink-0 w-[240px] sm:w-[280px] bg-white rounded-2xl p-4 border border-slate-200 hover:border-[#F85000] hover:shadow-md transition-all flex flex-col justify-between group/card relative"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-mono font-extrabold text-[#F85000] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                    Pin {area.pincode}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Tier {area.tier}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-[#002048] group-hover/card:text-[#F85000] transition-colors flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#0058B8] shrink-0" />
                  <span className="truncate">{area.name}</span>
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {area.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs font-bold text-[#002048] group-hover/card:text-[#F85000]">
                <span className="text-[11px] text-slate-500 font-medium truncate max-w-[170px]">
                  {area.recentProjectsCount}
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover/card:translate-x-1 transition-transform text-[#F85000]" />
              </div>
            </Link>
          ))}

          {/* View All Card */}
          <Link
            to="/areas"
            className="snap-start shrink-0 w-[200px] sm:w-[220px] bg-gradient-to-br from-[#002048] to-[#003880] rounded-2xl p-5 text-white flex flex-col justify-center items-center text-center space-y-3 hover:opacity-95 transition-opacity shadow-md"
          >
            <div className="p-3 bg-white/10 rounded-full">
              <ShieldCheck className="w-8 h-8 text-[#F85000]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold">26+ Surat Areas</h4>
              <p className="text-xs text-slate-300">View complete local coverage map & pincodes</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#F85000] bg-white px-3 py-1.5 rounded-xl shadow-xs">
              Explore All →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
