import { contentService } from '../contentService.js';

const BASE_URL = 'https://suratpaintingsolution.onrender.com';
const DEFAULT_IMAGE = `${BASE_URL}/logo_surat_main.png`;

// Service SEO Metadata Map
const SERVICES_SEO = {
  'home-painting': {
    title: 'Residential Home Painting in Surat',
    description: 'Complete house interior & exterior painting services in Surat. 100% dust-free sanding, furniture masking, and 3-year warranty.'
  },
  'interior-painting': {
    title: 'Interior House Painting in Surat',
    description: 'Dust-free, premium interior wall painting with Asian Paints Royale Silk emulsions, color consultation, and furniture wrapping.'
  },
  'exterior-painting': {
    title: 'Exterior Wall Painting & Weatherproofing in Surat',
    description: 'Long-lasting exterior painting with Asian Paints Apex Ultima weather-guard emulsions for Surat homes and buildings.'
  },
  'waterproofing': {
    title: 'Terrace & Wall Waterproofing Contractor in Surat',
    description: 'Permanent terrace liquid membrane, balcony anti-damp treatment, and pre-monsoon waterproofing in Surat with written warranty.'
  },
  'texture-wall-painting': {
    title: 'Designer Texture Wall & Stucco Painting in Surat',
    description: 'Asian Paints Royale Play textures, Italian Stucco marble finishes, and metallic accent walls for luxury Surat residences.'
  },
  'wood-polishing-varnishing': {
    title: 'Wood Polishing & Teak Door PU Finish in Surat',
    description: 'Italian PU gloss & matte door polishing, furniture re-varnishing, and teak wood grain restoration in Surat.'
  },
  'metal-grill-gate-painting': {
    title: 'Metal Gate, Grill & Structural Anti-Rust Painting in Surat',
    description: 'Anti-corrosive primer coating, PU enamel gloss, and metal grill painting for homes and factories in Surat.'
  },
  'pop-and-putty-work': {
    title: 'POP False Ceiling & Acrylic Wall Putty in Surat',
    description: 'Mirror-finish 2-coat acrylic wall putty levelling and decorative POP false ceiling design work in Surat.'
  },
  'commercial-society-painting': {
    title: 'Commercial Building & Housing Society Painting in Surat',
    description: 'High-rise housing society exterior repainting, commercial complex painting, and industrial epoxy flooring in Surat.'
  }
};

// Area SEO Metadata Map
const AREAS_SEO = {
  'vesu': { name: 'Vesu', pincode: '395007', desc: 'Luxury house painting, Italian Stucco, and terrace waterproofing in Vesu, Surat.' },
  'adajan': { name: 'Adajan', pincode: '395009', desc: 'Trusted house painting, dust-free sanding, and waterproofing in Adajan, Surat.' },
  'pal': { name: 'Pal', pincode: '395009', desc: 'Premium interior & exterior house painting services in Pal, Surat.' },
  'piplod': { name: 'Piplod', pincode: '395007', desc: 'Bungalow painting, PU wood polishing, and Royale Silk finishes in Piplod, Surat.' },
  'city-light': { name: 'City Light', pincode: '395007', desc: 'Apartment painting, texture wall art, and balcony waterproofing in City Light, Surat.' },
  'athwa': { name: 'Athwa', pincode: '395001', desc: 'Heritage bungalow painting and premium interior wall finishes in Athwa, Surat.' },
  'varachha': { name: 'Varachha', pincode: '395006', desc: 'Affordable house painting and waterproofing services in Varachha, Surat.' },
  'katargam': { name: 'Katargam', pincode: '395004', desc: 'Dust-free house painting and damp-proof wall treatment in Katargam, Surat.' }
};

export function resolvePageMeta(pathname = '/') {
  const cleanPath = pathname.split('?')[0].replace(/\/$/, '') || '/';

  let title = 'Surat Painting Solution | Best House Painters & Waterproofing in Surat';
  let description = 'Surat’s #1 professional house painting contractor & waterproofing expert. 26+ years exp, 100% dust-free sanding, 3-year warranty on Asian Paints & Royale Silk emulsions.';
  let ogType = 'website';
  let ogImage = DEFAULT_IMAGE;
  let canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;

  let schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${BASE_URL}/#business`,
    'name': 'Surat Painting Solution',
    'url': BASE_URL,
    'logo': DEFAULT_IMAGE,
    'image': DEFAULT_IMAGE,
    'description': description,
    'telephone': '+919408197990',
    'priceRange': '₹₹',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Adajan - Hazira Road',
      'addressLocality': 'Surat',
      'addressRegion': 'Gujarat',
      'postalCode': '395009',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 21.1702,
      'longitude': 72.8311
    }
  };

  if (cleanPath === '/') {
    // Default
  } else if (cleanPath === '/services') {
    title = 'Painting Services in Surat | Interior, Exterior & Waterproofing | Surat Painting Solution';
    description = 'Explore top-rated house painting services in Surat: Dust-free interior painting, weatherproof exterior wall coatings, balcony waterproofing & epoxy flooring.';
  } else if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    const meta = SERVICES_SEO[slug];

    if (meta) {
      title = `${meta.title} | Surat Painting Solution`;
      description = meta.description;
    } else {
      const formatted = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      title = `${formatted} Services in Surat | Surat Painting Solution`;
      description = `Professional ${formatted} services in Surat with dust-free sanding and written 3-year warranty.`;
    }
  } else if (cleanPath === '/areas') {
    title = 'Areas Served in Surat | Professional House Painters in Vesu, Adajan, Varachha & More';
    description = 'Surat Painting Solution provides doorstep house painting, texture wall art & waterproofing across 28+ Surat localities including Vesu, Adajan, Pal, Piplod, and City Light.';
  } else if (cleanPath.startsWith('/areas/')) {
    const slug = cleanPath.replace('/areas/', '');
    const area = AREAS_SEO[slug];

    if (area) {
      title = `Best House Painters in ${area.name}, Surat | ${area.pincode} | Surat Painting Solution`;
      description = `${area.desc} Guaranteed dust-free painting, 3-year warranty & free estimate in ${area.name}.`;
    } else {
      const formatted = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      title = `House Painters in ${formatted}, Surat | Surat Painting Solution`;
      description = `Top-rated house painting & terrace waterproofing services in ${formatted}, Surat. Call +91 94081 97990 for free estimate.`;
    }
  } else if (cleanPath === '/blog') {
    title = 'Painting & Waterproofing Blog | Expert Tips for Surat Homeowners';
    description = 'Read practical home painting guides, pre-monsoon waterproofing tips, Asian Paints shade trends, and interior maintenance advice tailored for Surat homes.';
  } else if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const blogs = contentService.getBlogs(false);
    const blog = blogs.find(b => b.id === slug);

    if (blog) {
      title = `${blog.title} | Surat Painting Solution Blog`;
      description = blog.summary || blog.seoDescription || description;
      ogType = 'article';
      if (blog.image) ogImage = blog.image.startsWith('http') ? blog.image : `${BASE_URL}${blog.image}`;
    }
  } else if (cleanPath === '/about') {
    title = 'About Us | 26+ Years Experienced House Painters in Surat';
    description = 'Learn about Surat Painting Solution, Surat’s most trusted painting contractors with 26+ years of experience and 1,200+ completed projects.';
  } else if (cleanPath === '/contact') {
    title = 'Contact Us | Free On-Site Painting Estimate in Surat | +91 94081 97990';
    description = 'Book a free on-site digital wall moisture test and painting estimate in Surat. Call us at +91 94081 97990 or visit our Adajan office.';
  } else if (cleanPath === '/gallery') {
    title = 'Project Photo Gallery | Real House Painting Work in Surat';
    description = 'View our photo gallery of completed interior painting, texture walls, Italian PU polish, and waterproofing projects in Vesu, Adajan, Pal, and Varachha.';
  }

  const schemaJson = JSON.stringify(schemaOrg);
  const metaHtml = `
    <!-- SSR Injected Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="Surat Painting Solution" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />

    <!-- SSR Injected Structured Data (JSON-LD) -->
    <script type="application/ld+json" id="ssr-jsonld">${schemaJson}</script>
  `.trim();

  return { title, description, canonicalUrl, ogImage, metaHtml };
}
