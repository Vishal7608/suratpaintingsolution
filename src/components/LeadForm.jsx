import { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { areasData } from '../data/areasData';
import { servicesData } from '../data/servicesData';

export default function LeadForm({ defaultService = '', defaultArea = '', title = 'Request a Free Inspection & Quote' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: defaultArea || 'Adajan',
    serviceNeeded: defaultService || 'Interior House Painting',
    message: ''
  });

  useEffect(() => {
    if (defaultArea || defaultService) {
      setFormData((prev) => ({
        ...prev,
        area: defaultArea || prev.area,
        serviceNeeded: defaultService || prev.serviceNeeded
      }));
    }
  }, [defaultArea, defaultService]);

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name and phone number so our team can reach you.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try calling us directly at +91 94081 97990.');
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      setStatus('error');
      setErrorMessage('Unable to connect. You can call us directly at +91 94081 97990 or message us on WhatsApp.');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi SuratPaintingSolution, I want a free quote.\nName: ${formData.name || 'Visitor'}\nArea: ${formData.area}\nService: ${formData.serviceNeeded}\nNote: ${formData.message || 'Please call me back.'}`
  );

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl border border-slate-200">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-[#002048]">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Our Surat supervisor will inspect your site, provide exact measurements, and share a written estimate within 30 minutes.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center space-y-4 animate-fadeIn">
          <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-lg font-bold text-emerald-900">Quote Request Received!</h4>
          <p className="text-sm text-emerald-800">
            Thank you, <strong>{formData.name}</strong>! Our senior Surat painter lead will call you at <strong>{formData.phone}</strong> shortly.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/919408197990?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Continue on WhatsApp
            </a>
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({ name: '', phone: '', area: 'Adajan', serviceNeeded: 'Interior House Painting', message: '' });
              }}
              className="text-xs text-slate-600 underline hover:text-[#002048] py-2"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm p-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-name" className="block text-xs font-bold text-[#002048] mb-1">
                Your Full Name <span className="text-[#F85000]">*</span>
              </label>
              <input
                id="lead-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jayesh Patel"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#F85000] focus:ring-1 focus:ring-[#F85000] text-sm text-[#002048]"
              />
            </div>

            <div>
              <label htmlFor="lead-phone" className="block text-xs font-bold text-[#002048] mb-1">
                Phone / WhatsApp Number <span className="text-[#F85000]">*</span>
              </label>
              <input
                id="lead-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98250 XXXXX"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#F85000] focus:ring-1 focus:ring-[#F85000] text-sm text-[#002048]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-area" className="block text-xs font-bold text-[#002048] mb-1">
                Surat Locality / Area
              </label>
              <select
                id="lead-area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#F85000] focus:ring-1 focus:ring-[#F85000] text-sm text-[#002048]"
              >
                {areasData.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
                <option value="Other Area in Surat">Other Locality in Surat</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead-service" className="block text-xs font-bold text-[#002048] mb-1">
                Service Needed
              </label>
              <select
                id="lead-service"
                name="serviceNeeded"
                value={formData.serviceNeeded}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#F85000] focus:ring-1 focus:ring-[#F85000] text-sm text-[#002048]"
              >
                {servicesData.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Multiple Services / Full House">Full House Multi-Service</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="lead-message" className="block text-xs font-bold text-[#002048] mb-1">
              Brief Project Details (Optional)
            </label>
            <textarea
              id="lead-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. 3BHK flat in Adajan, need interior painting and terrace waterproofing before monsoons."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#F85000] focus:ring-1 focus:ring-[#F85000] text-sm text-[#002048]"
            />
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#F85000] hover:bg-[#e04800] text-white py-3.5 px-6 rounded-lg font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting Request...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Request Free Inspection & Quote
                </>
              )}
            </button>

            <div className="text-center">
              <span className="text-xs text-slate-600">Or send direct WhatsApp message:</span>
              <a
                href={`https://wa.me/919408197990?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center justify-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
              >
                <MessageSquare className="w-4 h-4" /> Quick WhatsApp Quote (+91 94081 97990)
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
