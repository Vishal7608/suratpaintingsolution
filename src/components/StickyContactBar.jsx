import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StickyContactBar() {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling past the hero section (> 300px)
      if (window.scrollY > 300) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showBar) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-md transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-5">
      <div className="grid grid-cols-3 gap-2 px-1">
        
        {/* Call Now Button - Dark Navy */}
        <a
          href="tel:+919408197990"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 bg-[#001C38] hover:bg-[#002b54] text-white rounded-2xl text-xs sm:text-sm font-black active:scale-95 transition-all shadow-xl border border-white/20 text-center"
        >
          <Phone className="w-4 h-4 text-[#F85000] shrink-0" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button - Vibrant Green */}
        <a
          href="https://wa.me/919408197990?text=Hi%20SuratPaintingSolution%2C%20I%20need%20a%20painting%20quote"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-2xl text-xs sm:text-sm font-black active:scale-95 transition-all shadow-xl border border-white/20 text-center"
        >
          <MessageSquare className="w-4 h-4 fill-current shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Get Quote Button - Bright Orange */}
        <Link
          to="/contact"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 bg-[#F85000] hover:bg-[#e04800] text-white rounded-2xl text-xs sm:text-sm font-black active:scale-95 transition-all shadow-xl border border-white/20 text-center"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Get Quote</span>
        </Link>

      </div>
    </div>
  );
}
