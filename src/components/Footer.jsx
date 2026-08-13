import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Shield, MessageSquare, ExternalLink } from 'lucide-react';
import { areasData } from '../data/areasData';
import { servicesData } from '../data/servicesData';
import Logo from './Logo';

export default function Footer() {
  const tier1Areas = areasData.filter(a => a.tier === 1);

  return (
    <footer className="bg-white text-slate-700 pt-10 pb-20 lg:pt-12 lg:pb-8 border-t-4 border-[#F85000] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b border-slate-200 items-start">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3">
            <Link to="/" className="inline-block py-1 transition-opacity hover:opacity-90">
              <Logo variant="footer" className="h-16 sm:h-20 lg:h-22 w-auto max-w-[280px] sm:max-w-[340px] object-contain object-left" />
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed">
              Professional house painting and waterproofing contractors in Surat, Gujarat (Legal: Surat Painting Solution). Dedicated to bringing vibrant colors, clean finish, and monsoon protection to Surat’s families and homes.
            </p>
            <div className="pt-1 flex flex-col gap-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Shield className="w-4 h-4 text-[#F85000] shrink-0" /> Master Skilled Painters (26+ Yrs Exp)
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-[#0058B8] shrink-0" /> Working Hours: Mon – Sun: 8 AM – 8 PM
              </div>
            </div>
          </div>

          {/* Col 2: Services Links */}
          <div className="space-y-3">
            <h3 className="text-slate-900 font-extrabold uppercase tracking-wider text-xs border-b border-[#F85000]/40 pb-2 inline-block">
              Painting & Waterproofing Services
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-slate-700 hover:text-[#F85000] transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <span className="text-[#F85000]">›</span> {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Areas Served in Surat */}
          <div className="space-y-3">
            <h3 className="text-slate-900 font-extrabold uppercase tracking-wider text-xs border-b border-[#F85000]/40 pb-2 inline-block">
              Surat Localities Served
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
              {tier1Areas.map((area) => (
                <Link
                  key={area.id}
                  to={`/areas/${area.id}`}
                  className="hover:text-[#F85000] text-slate-700 transition-colors flex items-center gap-1 font-medium"
                >
                  <span className="text-[#0058B8]">•</span> {area.name}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <Link
                to="/areas"
                className="text-xs font-bold text-[#F85000] hover:underline inline-flex items-center gap-1"
              >
                View All 26+ Surat Areas Served →
              </Link>
            </div>
          </div>

          {/* Col 4: Contact & Direct Call */}
          <div className="space-y-3">
            <h3 className="text-slate-900 font-extrabold uppercase tracking-wider text-xs border-b border-[#F85000]/40 pb-2 inline-block">
              Direct Contact
            </h3>
            <div className="space-y-2 text-xs">
              <a
                href="tel:+919408197990"
                className="flex items-center gap-2.5 p-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 transition-all text-slate-900 font-bold shadow-xs group"
              >
                <div className="p-1.5 bg-[#F85000] text-white rounded-lg group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-normal">Call Us Anytime</div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900">+91 94081 97990</div>
                </div>
              </a>

              <a
                href="https://wa.me/919408197990?text=Hi%20SuratPaintingSolution%2C%20I%20need%20a%20painting%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-all text-emerald-950 font-bold shadow-xs group"
              >
                <div className="p-1.5 bg-[#25D366] text-white rounded-lg group-hover:scale-105 transition-transform shrink-0">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-700 font-normal">WhatsApp Instant Chat</div>
                  <div className="text-xs font-bold text-emerald-900">Send Photo for Fast Quote</div>
                </div>
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-700 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#F85000] shrink-0" />
                <a href="mailto:suratpenters01@gmail.com" className="hover:underline font-semibold text-slate-800 truncate">
                  suratpenters01@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#0058B8] shrink-0 mt-0.5" />
                <span>Adajan – Hazira Road, Surat, Gujarat - 395009</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-5 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} SuratPaintingSolution. All Rights Reserved.
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/contact" className="hover:text-[#F85000] font-semibold">Get Free Estimate</Link>
            <span>•</span>
            <a href="/sitemap.xml" target="_blank" className="hover:text-[#F85000] font-semibold flex items-center gap-1">
              Sitemap <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
