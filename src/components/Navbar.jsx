import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, ChevronDown, Shield } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  
  // Mobile accordion state (collapsed by default for compact height)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  
  const location = useLocation();
  const lastScrollY = useRef(0);

  // Auto close mobile menu smoothly on page scroll or route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileAreasOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    let accumulatedScroll = 0;
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      accumulatedScroll += scrollDiff;
      lastScrollY.current = currentScrollY;

      // When user scrolls down/up on the page beyond 40px, gently close mobile slider
      if (accumulatedScroll > 40) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', dropdownType: 'services' },
    { name: 'Areas Served', path: '/areas', dropdownType: 'areas' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const quickServices = [
    { name: 'Interior House Painting', path: '/services/interior-painting', tag: 'Dust-Free' },
    { name: 'Exterior House Painting', path: '/services/exterior-painting', tag: 'Weatherproof' },
    { name: 'Terrace & Wall Waterproofing', path: '/services/waterproofing', tag: 'Monsoon' },
    { name: 'Texture Wall Painting', path: '/services/texture-wall-painting', tag: 'Royale Play' },
    { name: 'Wood Polishing & Varnish', path: '/services/wood-polishing-varnishing', tag: 'PU Finish' },
    { name: 'Commercial & Office Painting', path: '/services/commercial-painting', tag: 'Contract' },
  ];

  const quickAreas = [
    { name: 'Vesu (VIP Road)', path: '/areas/vesu', tag: 'Luxury' },
    { name: 'Adajan (L.P. Savani)', path: '/areas/adajan', tag: 'Popular' },
    { name: 'Pal (Gaurav Path)', path: '/areas/pal', tag: 'New Flats' },
    { name: 'Piplod (Dumas Road)', path: '/areas/piplod', tag: 'Bungalows' },
    { name: 'City Light', path: '/areas/city-light', tag: 'Central' },
    { name: 'Ghod Dod Road', path: '/areas/ghod-dod-road', tag: 'Commercial' },
    { name: 'Althan & Bhatar', path: '/areas/althan', tag: 'Societies' },
    { name: 'Katargam & Varachha', path: '/areas/katargam', tag: 'Diamond Belt' },
    { name: 'Udhna GIDC', path: '/areas/udhna', tag: 'Industrial Sheds' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      {/* Top Banner Bar */}
      <div className="bg-slate-100 text-slate-800 py-1.5 px-4 text-xs sm:text-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-900 font-bold">
              <Shield className="w-3.5 h-3.5 text-[#F85000]" /> 100% Guaranteed Quality in Surat
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-700 font-medium">
              Master Skilled Painters (26+ Years Experience)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+919408197990"
              className="flex items-center gap-1.5 hover:text-[#F85000] transition-colors font-bold text-slate-900"
            >
              <Phone className="w-3.5 h-3.5 text-[#F85000]" /> +91 94081 97990
            </a>
            <a
              href="https://wa.me/919408197990?text=Hi%20SuratPaintingSolution%2C%20I%20need%20a%20painting%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-2.5 py-0.5 rounded text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center gap-1 shadow-xs"
            >
              <MessageSquare className="w-3 h-3" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 lg:h-28">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center py-1.5 shrink-0 transition-opacity hover:opacity-95">
            <Logo variant="header" className="h-14 sm:h-18 lg:h-22 w-auto max-w-[260px] sm:max-w-[340px] lg:max-w-[420px] object-contain object-left shrink-0" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdownType === 'services' ? (
                  <div
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                    className="relative"
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 text-sm font-semibold py-2 transition-colors ${
                        isActive(link.path)
                          ? 'text-[#F85000]'
                          : 'text-[#002048] hover:text-[#0058B8]'
                      }`}
                    >
                      {link.name} <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#0058B8]" />
                    </Link>

                    {/* Services Sleek Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-2xl p-3 border border-slate-200 z-50 transition-all animate-fadeIn">
                        <div className="px-2 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                          Popular Services
                        </div>
                        <div className="space-y-0.5 my-1">
                          {quickServices.map((qs) => (
                            <Link
                              key={qs.path}
                              to={qs.path}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="group flex items-center justify-between px-3 py-2 text-xs text-slate-800 hover:bg-amber-50 hover:text-[#F85000] font-semibold rounded-xl transition-colors"
                            >
                              <span className="truncate">{qs.name}</span>
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-slate-100 group-hover:bg-amber-100 text-slate-500 group-hover:text-[#F85000] rounded shrink-0 ml-1">
                                {qs.tag}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-slate-100 pt-2 px-1">
                          <Link
                            to="/services"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="block text-center py-2 px-3 text-xs font-extrabold text-white bg-[#002048] hover:bg-[#F85000] rounded-xl transition-colors shadow-xs"
                          >
                            Explore All 16 Services →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : link.dropdownType === 'areas' ? (
                  <div
                    onMouseEnter={() => setAreasDropdownOpen(true)}
                    onMouseLeave={() => setAreasDropdownOpen(false)}
                    className="relative"
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 text-sm font-semibold py-2 transition-colors ${
                        isActive(link.path)
                          ? 'text-[#F85000]'
                          : 'text-[#002048] hover:text-[#0058B8]'
                      }`}
                    >
                      {link.name} <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#0058B8]" />
                    </Link>

                    {/* Areas Served Menu Slider Dropdown Menu */}
                    {areasDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white shadow-xl rounded-2xl p-3 border border-slate-200 z-50 transition-all animate-fadeIn">
                        <div className="px-2 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                          <span>Surat Local Hubs</span>
                          <span className="text-[#F85000] text-[9px] font-bold">26+ Areas</span>
                        </div>
                        <div className="space-y-0.5 my-1 max-h-72 overflow-y-auto pr-1">
                          {quickAreas.map((qa) => (
                            <Link
                              key={qa.path}
                              to={qa.path}
                              onClick={() => setAreasDropdownOpen(false)}
                              className="group flex items-center justify-between px-3 py-2 text-xs text-slate-800 hover:bg-amber-50 hover:text-[#F85000] font-semibold rounded-xl transition-colors"
                            >
                              <span className="truncate">{qa.name}</span>
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-slate-100 group-hover:bg-amber-100 text-slate-500 group-hover:text-[#F85000] rounded shrink-0 ml-1">
                                {qa.tag}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-slate-100 pt-2 px-1">
                          <Link
                            to="/areas"
                            onClick={() => setAreasDropdownOpen(false)}
                            className="block text-center py-2 px-3 text-xs font-extrabold text-white bg-[#002048] hover:bg-[#F85000] rounded-xl transition-colors shadow-xs"
                          >
                            View All 26+ Surat Areas →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-sm font-semibold transition-colors py-2 ${
                      isActive(link.path)
                        ? 'text-[#F85000] border-b-2 border-[#F85000]'
                        : 'text-[#002048] hover:text-[#0058B8]'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/contact"
              className="bg-[#F85000] text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e04800] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Free Estimate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="tel:+919408197990"
              className="bg-[#002048] text-white p-2 rounded-md hover:bg-[#0058B8]"
              aria-label="Call Us"
            >
              <Phone className="w-5 h-5 text-[#F85000]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#002048] hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu - Compact, Animated & Auto-Scroll Dismissible */}
      {mobileMenuOpen && (
        <>
          {/* Subtle backdrop overlay - Clicking outside immediately closes menu */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 top-[108px] bg-slate-900/30 backdrop-blur-[2px] z-40 transition-opacity duration-300 animate-fadeIn"
            aria-hidden="true"
          />

          {/* Drawer container with slide-in animation and max-height */}
          <div className="lg:hidden relative z-50 bg-white border-b border-slate-200 shadow-2xl max-h-[72vh] overflow-y-auto px-4 pt-3 pb-6 space-y-2 transition-all duration-300 animate-fadeIn">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdownType === 'services' ? (
                  <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/70 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between py-2.5 px-3 text-sm font-bold text-slate-800 hover:bg-slate-100/80 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F85000]"></span>
                        {link.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="text-[11px] font-semibold text-[#F85000]">
                          {mobileServicesOpen ? 'Hide' : 'Quick Menu'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 text-slate-400 ${
                            mobileServicesOpen ? 'rotate-180 text-[#F85000]' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {mobileServicesOpen && (
                      <div className="p-2 pt-0 space-y-1 bg-white border-t border-slate-100 animate-fadeIn">
                        {quickServices.slice(0, 5).map((qs) => (
                          <Link
                            key={qs.path}
                            to={qs.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between text-xs py-2 px-2.5 rounded-lg text-slate-700 hover:bg-amber-50 hover:text-[#F85000] font-medium transition-colors"
                          >
                            <span className="truncate">• {qs.name}</span>
                            <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded shrink-0 ml-1">
                              {qs.tag}
                            </span>
                          </Link>
                        ))}
                        <div className="pt-1.5 pb-1">
                          <Link
                            to="/services"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-center py-2 px-3 text-xs font-bold text-white bg-[#002048] hover:bg-[#F85000] rounded-lg transition-colors shadow-xs"
                          >
                            Visit All 18+ Services →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : link.dropdownType === 'areas' ? (
                  <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/70 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                      className="w-full flex items-center justify-between py-2.5 px-3 text-sm font-bold text-slate-800 hover:bg-slate-100/80 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0058B8]"></span>
                        {link.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="text-[11px] font-semibold text-[#0058B8]">
                          {mobileAreasOpen ? 'Hide' : 'Quick Menu'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 text-slate-400 ${
                            mobileAreasOpen ? 'rotate-180 text-[#0058B8]' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {mobileAreasOpen && (
                      <div className="p-2 pt-0 space-y-1 bg-white border-t border-slate-100 animate-fadeIn">
                        {quickAreas.slice(0, 5).map((qa) => (
                          <Link
                            key={qa.path}
                            to={qa.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between text-xs py-2 px-2.5 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-[#0058B8] font-medium transition-colors"
                          >
                            <span className="truncate">📍 {qa.name}</span>
                            <span className="text-[9px] bg-amber-50 text-[#F85000] border border-amber-200 font-bold px-1.5 py-0.5 rounded shrink-0 ml-1">
                              {qa.tag}
                            </span>
                          </Link>
                        ))}
                        <div className="pt-1.5 pb-1">
                          <Link
                            to="/areas"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-center py-2 px-3 text-xs font-bold text-white bg-[#002048] hover:bg-[#F85000] rounded-lg transition-colors shadow-xs"
                          >
                            Visit All 30+ Surat Areas →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 px-3 text-sm font-semibold rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-[#F8F0D8] text-[#F85000] font-bold'
                        : 'text-[#002048] hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Quick CTA Actions */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-[#F85000] hover:bg-[#e04800] text-white py-2.5 px-2 rounded-lg text-xs font-bold shadow-xs transition-colors"
              >
                Get Free Estimate
              </Link>
              <a
                href="https://wa.me/919408197990?text=Hi%20SuratPaintingSolution%2C%20I%20need%20a%20painting%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center bg-[#25D366] hover:bg-emerald-600 text-white py-2.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
