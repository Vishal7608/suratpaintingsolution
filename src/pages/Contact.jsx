import { Phone, Mail, MapPin, Clock, MessageSquare, Shield, CheckCircle2 } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import LeadForm from '../components/LeadForm';
import SiteLocationPicker from '../components/SiteLocationPicker';

export default function Contact() {
  return (
    <>
      <SeoHead
        title="Contact Us | SuratPaintingSolution - Phone +91 94081 97990"
        description="Contact SuratPaintingSolution for free home inspection and painting quotes in Surat. Call +91 94081 97990 or WhatsApp us directly. Email: suratpenters01@gmail.com."
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shadow-xs">
            30-Minute Callback Guarantee
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
            Contact SuratPaintingSolution
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Get an exact on-site measurement and written estimate. Call, WhatsApp, or send a request online.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details & Map */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Direct Contact Information
                </h2>

                <div className="space-y-4 text-sm">
                  <a
                    href="tel:+919408197990"
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                    <div className="p-2.5 bg-[#F85000] text-white rounded-lg shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">Call Senior Supervisor</div>
                      <div className="text-base font-extrabold text-slate-900">+91 94081 97990</div>
                      <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Available 8 AM - 8 PM daily</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919408197990?text=Hi%20SuratPaintingSolution%2C%20I%20need%20a%20painting%20quote"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100/80 transition-colors border border-emerald-200"
                  >
                    <div className="p-2.5 bg-[#25D366] text-white rounded-lg shrink-0">
                      <MessageSquare className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-800 font-bold">WhatsApp Direct Line</div>
                      <div className="text-sm font-bold text-emerald-950">+91 94081 97990</div>
                      <div className="text-[11px] text-emerald-700">Send room photos for instant estimate</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="p-2.5 bg-slate-900 text-white rounded-lg shrink-0">
                      <Mail className="w-5 h-5 text-[#F85000]" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">Official Business Email</div>
                      <a href="mailto:suratpenters01@gmail.com" className="text-sm font-bold text-slate-900 hover:underline">
                        suratpenters01@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="p-2.5 bg-slate-900 text-white rounded-lg shrink-0">
                      <MapPin className="w-5 h-5 text-[#0058B8]" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">Surat Office & Hub</div>
                      <div className="text-sm font-bold text-slate-900">Adajan – Hazira Road, Surat</div>
                      <div className="text-xs text-slate-500">Gujarat, India - 395009</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="p-2.5 bg-slate-900 text-white rounded-lg shrink-0">
                      <Clock className="w-5 h-5 text-[#F85000]" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">Operating Hours</div>
                      <div className="text-xs font-bold text-slate-900">Monday – Sunday: 8:00 AM – 8:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Surat Google Map */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Surat Service Coverage Map
                </h3>
                <div className="rounded-xl overflow-hidden border border-slate-200 h-64 relative bg-slate-100">
                  <iframe
                    title="SuratPaintingSolution Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709424758!2d72.75225621456566!3d21.170240103730043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

            </div>

            {/* Right Column Form & Site Location Picker */}
            <div className="lg:col-span-7 space-y-8">
              <LeadForm title="Book Your Free Inspection & Quote" />
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <SiteLocationPicker title="Share Your Exact Site Location" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
