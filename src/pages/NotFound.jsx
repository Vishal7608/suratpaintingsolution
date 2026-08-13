import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import SeoHead from '../components/SeoHead';

export default function NotFound() {
  return (
    <>
      <SeoHead title="404 Page Not Found" description="The requested page was not found on SuratPaintingSolution." />
      <div className="py-24 bg-[#FAF8F5] text-center px-4">
        <div className="max-w-md mx-auto space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
          <AlertTriangle className="w-16 h-16 text-[#F85000] mx-auto" />
          <h1 className="text-3xl font-extrabold text-[#002048]">Page Not Found</h1>
          <p className="text-sm text-slate-600">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#002048] hover:bg-[#0058B8] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors"
            >
              <Home className="w-4 h-4" /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
