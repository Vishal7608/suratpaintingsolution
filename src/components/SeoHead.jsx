import { useEffect } from 'react';

const BASE_URL = 'https://suratpaintingsolution.onrender.com';

export default function SeoHead({
  title,
  description,
  schemaData,
  faqData,
  breadcrumbData,
  canonicalUrl,
  noindex = false,
  image = `${BASE_URL}/logo.png`,
  type = 'website'
}) {
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentFullUrl = canonicalUrl || `${BASE_URL}${currentPath === '/' ? '' : currentPath}`;

    // 1. Title
    const fullTitle = title
      ? (title.includes('SuratPaintingSolution') ? title : `${title} | SuratPaintingSolution`)
      : 'SuratPaintingSolution - House Painting & Waterproofing Contractor in Surat';
    document.title = fullTitle;

    // 2. Meta Description
    const metaDesc = description || "Professional house painters and waterproofing contractor in Surat, Gujarat. Serving Adajan, Vesu, Piplod, City Light, Varachha, and all Surat localities. Call +91 94081 97990.";
    
    const setMetaTag = (attrName, attrVal, contentVal) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    setMetaTag('name', 'description', metaDesc);

    // 3. Robots Meta Tag (Noindex check for admin or specified noindex)
    const isAdminRoute = currentPath.startsWith('/admin') || currentPath.startsWith('/contractor-login');
    if (noindex || isAdminRoute) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // 4. Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentFullUrl);

    // 5. OpenGraph Meta Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', currentFullUrl);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:site_name', 'SuratPaintingSolution');
    setMetaTag('property', 'og:locale', 'en_IN');

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', image);

    // 7. Inject JSON-LD Schema
    const schemaId = 'housepainters-jsonld';
    let scriptTag = document.getElementById(schemaId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemas = [];

    // Base Business Schema
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "SuratPaintingSolution",
      "legalName": "Surat Painting Solution",
      "image": `${BASE_URL}/logo.png`,
      "@id": BASE_URL,
      "url": BASE_URL,
      "telephone": "+919408197990",
      "email": "suratpenters01@gmail.com",
      "priceRange": "Contact for Estimate",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Adajan - Hazira Road",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "395009",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.1702,
        "longitude": 72.8311
      },
      "areaServed": [
        "Vesu", "Adajan", "Pal", "Piplod", "City Light", "Ghod Dod Road", "Althan", "Bhatar", "Palanpur", "L.P. Savani Road",
        "Jahangirpura", "Katargam", "Varachha", "Sagrampura", "Mota Varachha", "Nana Varachha", "Amroli", "Sarthana", "Bharthana", "Rander",
        "Dumas Road", "Umra", "Udhna", "Magob", "Ghala", "Dabholi", "Athwa", "Surat"
      ],
      "sameAs": [
        "https://www.facebook.com/SuratPaintingSolution",
        "https://www.instagram.com/SuratPaintingSolution",
        "https://g.co/kgs/SuratPaintingSolution"
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    };

    if (schemaData) {
      schemas.push(schemaData);
    } else {
      schemas.push(businessSchema);
    }

    // FAQ Schema if provided
    if (faqData && faqData.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      });
    }

    // Breadcrumb Schema if provided
    if (breadcrumbData && breadcrumbData.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbData.map((b, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": b.name,
          "item": b.item.startsWith('http') ? b.item : `${BASE_URL}${b.item}`
        }))
      });
    }

    scriptTag.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);

  }, [title, description, schemaData, faqData, breadcrumbData, canonicalUrl, noindex, image, type]);

  return null;
}
