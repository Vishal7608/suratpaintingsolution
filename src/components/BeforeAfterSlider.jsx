import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function BeforeAfterSlider({ beforeImage, afterImage, title, area, description }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX, rect) => {
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-lg">
      
      {/* Before/After Interactive Canvas */}
      <div
        className="relative h-64 sm:h-80 w-full select-none cursor-ew-resize overflow-hidden"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER Image (Background Base) */}
        <img
          src={afterImage}
          alt={`After painting - ${title}`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <span className="absolute top-3 right-3 bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow backdrop-blur-sm z-10">
          AFTER
        </span>

        {/* BEFORE Image (Clipped Layer on Left) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={`Before painting - ${title}`}
            referrerPolicy="no-referrer"
            className="absolute inset-y-0 left-0 h-full object-cover max-w-none"
            style={{ width: '100%', height: '100%' }}
          />
          <span className="absolute top-3 left-3 bg-[#002048]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow backdrop-blur-sm z-10">
            BEFORE
          </span>
        </div>

        {/* Vertical Dragging Divider Line */}
        <div
          className="absolute inset-y-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F85000] text-white flex items-center justify-center shadow-lg border-2 border-white">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-base font-bold text-[#002048]">{title}</h4>
          {area && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#F8F0D8] text-[#F85000] shrink-0">
              {area}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-slate-600 mt-1">{description}</p>}
        <div className="mt-2 text-[11px] text-slate-400 font-medium">
          💡 Drag slider left or right to compare transformational before & after finish
        </div>
      </div>

    </div>
  );
}
