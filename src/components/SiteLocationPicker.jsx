import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Search, MessageSquare, Check, Loader2 } from 'lucide-react';
import L from 'leaflet';

// Surat locality coordinates for instant fast lookup
const SURAT_LOCALITIES = [
  { name: 'Adajan, Surat', lat: 21.1959, lng: 72.7933 },
  { name: 'Vesu, Surat', lat: 21.1398, lng: 72.7725 },
  { name: 'Pal, Surat', lat: 21.1915, lng: 72.7663 },
  { name: 'Piplod, Surat', lat: 21.1565, lng: 72.7712 },
  { name: 'City Light, Surat', lat: 21.1685, lng: 72.7932 },
  { name: 'Varachha, Surat', lat: 21.2158, lng: 72.8530 },
  { name: 'Katargam, Surat', lat: 21.2291, lng: 72.8248 },
  { name: 'Althan, Surat', lat: 21.1492, lng: 72.8068 },
  { name: 'Bhatar, Surat', lat: 21.1623, lng: 72.8122 },
  { name: 'Jahangirpura, Surat', lat: 21.2290, lng: 72.7785 },
  { name: 'Hazira, Surat', lat: 21.1090, lng: 72.6468 },
  { name: 'Gopipura, Surat', lat: 21.1944, lng: 72.8251 },
  { name: 'Parvat Patiya, Surat', lat: 21.1892, lng: 72.8682 },
  { name: 'Udhna, Surat', lat: 21.1541, lng: 72.8361 },
  { name: 'Dindoli, Surat', lat: 21.1421, lng: 72.8631 }
];

export default function SiteLocationPicker({ onLocationSelect, title = 'STEP 3: SITE LOCATION' }) {
  const [position, setPosition] = useState({ lat: 21.1702, lng: 72.8311 }); // Surat Default
  const [address, setAddress] = useState('Adajan - Hazira Road, Surat, Gujarat');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [copied, setCopied] = useState(false);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      // Create custom pin icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="
          width: 32px; 
          height: 32px; 
          background-color: #0058B8; 
          border: 3px solid #ffffff; 
          border-radius: 50% 50% 50% 0; 
          transform: rotate(-45deg); 
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        "><div style="
          width: 10px; 
          height: 10px; 
          background-color: #F85000; 
          border-radius: 50%;
        "></div></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const map = L.map(mapContainerRef.current, {
        center: [position.lat, position.lng],
        zoom: 14,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const marker = L.marker([position.lat, position.lng], {
        draggable: true,
        icon: customIcon
      }).addTo(map);

      // Handle marker dragend
      marker.on('dragend', () => {
        const latLng = marker.getLatLng();
        updateLocation(latLng.lat, latLng.lng);
      });

      // Handle map click
      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        updateLocation(e.latlng.lat, e.latlng.lng);
      });

      mapRef.current = map;
      markerRef.current = marker;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Function to update location, lat/lng and trigger reverse geocode
  const updateLocation = (lat, lng, locAddress = null) => {
    const fixedLat = parseFloat(lat.toFixed(6));
    const fixedLng = parseFloat(lng.toFixed(6));
    setPosition({ lat: fixedLat, lng: fixedLng });

    if (locAddress) {
      setAddress(locAddress);
    } else {
      // Reverse geocode via Nominatim API
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${fixedLat}&lon=${fixedLng}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.display_name) {
            // Trim long address
            const parts = data.display_name.split(',');
            const shortName = parts.slice(0, 4).join(',');
            setAddress(shortName || data.display_name);
          } else {
            setAddress(`Site Lat: ${fixedLat}, Lng: ${fixedLng}, Surat`);
          }
        })
        .catch(() => {
          setAddress(`Site Lat: ${fixedLat}, Lng: ${fixedLng}, Surat`);
        });
    }

    const mapLink = `https://maps.google.com/?q=${fixedLat},${fixedLng}`;

    if (onLocationSelect) {
      onLocationSelect({
        lat: fixedLat,
        lng: fixedLng,
        address: locAddress || address,
        mapLink
      });
    }
  };

  // Move map & marker programmatically
  const moveToCoordinates = (lat, lng, locAddress) => {
    if (mapRef.current && markerRef.current) {
      mapRef.current.flyTo([lat, lng], 15);
      markerRef.current.setLatLng([lat, lng]);
    }
    updateLocation(lat, lng, locAddress);
  };

  // Get current GPS location
  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        moveToCoordinates(latitude, longitude, 'Your Current Live GPS Location, Surat');
      },
      (err) => {
        setIsLocating(false);
        console.warn('GPS location error:', err);
        alert('Could not fetch exact GPS location. Defaulting to Surat center.');
        moveToCoordinates(21.1702, 72.8311, 'Surat Center');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Search locality / address handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 1) {
      const filtered = SURAT_LOCALITIES.filter((l) =>
        l.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item) => {
    setSearchQuery(item.name);
    setSuggestions([]);
    moveToCoordinates(item.lat, item.lng, `${item.name}, Gujarat`);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSuggestions([]);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + ', Surat, Gujarat'
        )}`
      );
      const data = await res.json();
      setIsSearching(false);

      if (data && data.length > 0) {
        const first = data[0];
        moveToCoordinates(
          parseFloat(first.lat),
          parseFloat(first.lon),
          first.display_name.split(',').slice(0, 3).join(',')
        );
      } else {
        alert('Address not found on map. Please try clicking or dragging the pin on the map.');
      }
    } catch (err) {
      setIsSearching(false);
      console.error(err);
    }
  };

  // Direct WhatsApp Message generator with location link
  const googleMapsUrl = `https://maps.google.com/?q=${position.lat},${position.lng}`;
  const whatsappLocationMsg = encodeURIComponent(
    `🎨 *Surat Painting Solution - Site Location Share*\n` +
    `-----------------------------------\n` +
    `📍 *Site Address:* ${address}\n` +
    `🗺️ *Google Maps Pin:* ${googleMapsUrl}\n` +
    `📌 *Coordinates:* Lat: ${position.lat}, Lng: ${position.lng}\n` +
    `-----------------------------------\n` +
    `Please send a painting supervisor to inspect this site.`
  );

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-md space-y-4">
      
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#F85000]" />
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-wider">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleUseGPS}
          disabled={isLocating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-300 shadow-xs"
        >
          {isLocating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0058B8]" />
          ) : (
            <Navigation className="w-3.5 h-3.5 text-[#0058B8]" />
          )}
          <span>{isLocating ? 'Locating...' : 'Use GPS'}</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search site address / community name (e.g. Adajan, Vesu, Pal)..."
            className="w-full pl-10 pr-20 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0058B8] focus:bg-white shadow-xs"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-1.5 px-3 py-1 bg-[#0058B8] text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            {isSearching ? '...' : 'Search'}
          </button>
        </form>

        {/* Locality Auto-suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-amber-50 hover:text-[#F85000] border-b border-slate-100 last:border-0 flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Map Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-inner h-64 sm:h-72">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-xs z-20 pointer-events-none">
          💡 Drag pin or click map to select site
        </div>
      </div>

      {/* Dark Live Coordinates Status Bar (Matching User Screenshot) */}
      <div className="bg-slate-900 text-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono flex flex-wrap items-center justify-between gap-2 shadow-sm border border-slate-800">
        <div className="flex items-center gap-2 truncate max-w-xs sm:max-w-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-slate-300 truncate">Surat Site: {address}</span>
        </div>
        <div className="text-amber-400 font-bold shrink-0">
          Lat: {position.lat} | Lng: {position.lng}
        </div>
      </div>

      {/* WhatsApp Direct Share Button */}
      <div className="pt-1 flex flex-col sm:flex-row gap-2">
        <a
          href={`https://wa.me/919408197990?text=${whatsappLocationMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Share Site Location on WhatsApp (+91 94081 97990)</span>
        </a>

        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(googleMapsUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          }}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors border border-slate-200"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <MapPin className="w-4 h-4 text-slate-500" />}
          <span>{copied ? 'Link Copied!' : 'Copy Map Link'}</span>
        </button>
      </div>

    </div>
  );
}
