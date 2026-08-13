import { useState } from 'react';
import logoSuratMain from '../assets/images/logo_surat_main.png';
import logoSuratClean from '../assets/images/logo_surat_clean.png';
import uploadedLogoImg from '../assets/images/logo_surat_uploaded.png';

export default function Logo({ className = '', variant = 'header' }) {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  // Primary brand logo sources in priority order
  const logoSources = [
    logoSuratMain,
    logoSuratClean,
    uploadedLogoImg,
    '/logo_surat_main.png',
    '/logo.png',
    '/logo_surat.png'
  ];

  const handleImageError = () => {
    if (currentSrcIndex < logoSources.length - 1) {
      setCurrentSrcIndex(prev => prev + 1);
    }
  };

  const defaultClasses = variant === 'footer' 
    ? "h-16 sm:h-20 lg:h-24 w-auto max-w-[280px] sm:max-w-[350px] object-contain object-left transition-opacity duration-200 hover:opacity-95"
    : "h-14 sm:h-18 lg:h-22 w-auto max-w-[280px] sm:max-w-[360px] object-contain object-left transition-transform duration-200 hover:scale-[1.02]";

  return (
    <img
      src={logoSources[currentSrcIndex]}
      alt="Surat Painting Solution Logo"
      referrerPolicy="no-referrer"
      className={className ? className : defaultClasses}
      onError={handleImageError}
    />
  );
}








