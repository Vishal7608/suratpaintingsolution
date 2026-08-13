import { useState, useRef, useEffect } from 'react';
import { Sparkles, Check, ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ColorVisualizer() {
  const [selectedRoom, setSelectedRoom] = useState('living-room');
  const [selectedColor, setSelectedColor] = useState({
    name: 'Morning Dew Beige',
    hex: '#EADBC8',
    brand: 'Asian Paints Royale Silk',
    code: '0931',
    description: 'Warm, airy neutral shade that amplifies natural light in Surat apartments.'
  });
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const rooms = [
    { id: 'living-room', name: 'Living Room', icon: '🛋️' },
    { id: 'bedroom', name: 'Master Bedroom', icon: '🛏️' },
    { id: 'exterior', name: 'Exterior Facade', icon: '🏡' },
    { id: 'accent-wall', name: 'Feature Accent Wall', icon: '✨' },
  ];

  const colorPalettes = [
    {
      name: 'Morning Dew Beige',
      hex: '#EADBC8',
      brand: 'Asian Paints Royale Silk',
      code: '0931',
      description: 'Warm, airy neutral shade that amplifies natural light in Surat apartments.'
    },
    {
      name: 'Tapi Breeze Blue',
      hex: '#B4D4E1',
      brand: 'Asian Paints Velvet Touch',
      code: '7381',
      description: 'Cooling, relaxing coastal blue inspired by Tapi river breezes.'
    },
    {
      name: 'Surat Sunrise Orange',
      hex: '#F88379',
      brand: 'Berger WeatherCoat Smooth',
      code: 'B-412',
      description: 'Vibrant Gujarati warm coral accent ideal for feature dining & living walls.'
    },
    {
      name: 'Soft Sage Green',
      hex: '#C1CFA1',
      brand: 'Asian Paints Royale Health Shield',
      code: '8412',
      description: 'Soothing organic green that promotes relaxation in master bedrooms.'
    },
    {
      name: 'Elegance Charcoal Grey',
      hex: '#5A636A',
      brand: 'Asian Paints Apex Ultima',
      code: '6104',
      description: 'Modern, high-contrast exterior & accent wall shade favored in Vesu towers.'
    },
    {
      name: 'Terracotta Earth',
      hex: '#D97757',
      brand: 'Berger Silk Glamor',
      code: 'B-908',
      description: 'Rich earthy warmth with subtle metallic luster for traditional bungalow entryways.'
    }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsColorDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-slate-200/80">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#F85000] text-xs font-extrabold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Surat Color Studio
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#002048]">
            Preview Wall Colors for Your Home
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Select room area and choose a paint shade from the dropdown menu to test live wall previews.
          </p>
        </div>

        {/* Room Area Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="room-select" className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:inline">
            Select Room:
          </label>
          <div className="relative w-full sm:w-auto">
            <select
              id="room-select"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-900 text-xs sm:text-sm font-extrabold rounded-xl px-3.5 py-2.5 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F85000]/20 transition-all"
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.icon} {room.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
        
        {/* Wall Preview Canvas */}
        <div 
          className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-inner border border-slate-200/80 h-56 sm:h-72 lg:h-80 transition-all duration-500" 
          style={{ backgroundColor: selectedColor.hex }}
        >
          {/* Room Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 flex flex-col justify-between p-4 sm:p-5">
            
            {/* Top Info Tags */}
            <div className="flex justify-between items-center gap-2">
              <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-[#002048] shadow-sm">
                {rooms.find(r => r.id === selectedRoom)?.icon} {rooms.find(r => r.id === selectedRoom)?.name}
              </span>
              <span className="bg-[#002048]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-white shadow-sm">
                {selectedColor.brand}
              </span>
            </div>

            {/* Middle Room Silhouette Description */}
            <div className="text-center py-2">
              {selectedRoom === 'living-room' && (
                <div className="text-white/90 drop-shadow-md text-xs sm:text-sm font-semibold">
                  🛋️ Living Room Main Wall & Window Frame
                </div>
              )}
              {selectedRoom === 'bedroom' && (
                <div className="text-white/90 drop-shadow-md text-xs sm:text-sm font-semibold">
                  🛏️ Bed Backdrop Wall with Ambient Accent Lighting
                </div>
              )}
              {selectedRoom === 'exterior' && (
                <div className="text-white/90 drop-shadow-md text-xs sm:text-sm font-semibold">
                  🏡 Weatherproof Exterior Facade & Parapet Wall
                </div>
              )}
              {selectedRoom === 'accent-wall' && (
                <div className="text-white/90 drop-shadow-md text-xs sm:text-sm font-semibold">
                  ✨ Designer Royale Play Texture Accent Backdrop
                </div>
              )}
            </div>

            {/* Bottom Active Color Bar inside Preview */}
            <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-md border border-white/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-3">
                <span 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/15 shadow-inner shrink-0" 
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-[#F85000]">Code: {selectedColor.code}</div>
                  <div className="text-sm sm:text-base font-extrabold text-[#002048]">{selectedColor.name}</div>
                </div>
              </div>

              <Link
                to="/contact"
                className="bg-[#F85000] hover:bg-[#e04800] text-white text-xs font-extrabold px-3.5 py-2 rounded-xl shrink-0 flex items-center justify-center gap-1 transition-all w-full sm:w-auto text-center"
              >
                Get Swatch Sample <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* Color Palette Dropdown & Details Selector Column */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Dropdown Box Label */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Select Paint Shade (Asian Paints / Berger):
            </label>

            {/* Custom Interactive Color Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                className="w-full bg-slate-50 hover:bg-slate-100 border-2 border-slate-300 focus:border-[#F85000] p-3 sm:p-3.5 rounded-2xl flex items-center justify-between text-left transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span 
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/15 shadow-sm shrink-0"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base font-black text-slate-900 truncate">
                      {selectedColor.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {selectedColor.brand} • Code: <span className="font-extrabold text-slate-800">{selectedColor.code}</span>
                    </div>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ml-2 ${isColorDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Panel */}
              {isColorDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-30 p-2 max-h-64 overflow-y-auto space-y-1 divide-y divide-slate-100">
                  {colorPalettes.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color);
                          setIsColorDropdownOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-colors ${
                          isSelected
                            ? 'bg-amber-50 text-[#F85000] font-extrabold'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className="w-6 h-6 rounded-full border border-black/15 shadow-xs shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-extrabold truncate">{color.name}</div>
                            <div className="text-[10px] sm:text-xs text-slate-500 truncate">{color.brand} • {color.code}</div>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-4 h-4 text-[#F85000] shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Active Shade Description Box */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-slate-700 leading-relaxed">
            <span className="font-black text-[#002048] block mb-0.5">🎨 Shade Profile:</span>
            {selectedColor.description}
          </div>

          {/* Surat On-Site Tip */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Free On-Site Shade Card Visit:</strong> Our supervisor brings physical Asian Paints & Berger shade catalogs to your home in Adajan, Vesu, or City Light.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
