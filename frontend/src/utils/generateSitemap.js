import { areasData } from '../data/areasData.js';
import { servicesData } from '../data/servicesData.js';

const baseUrl = 'https://housepainterssurat.onrender.com';

const tierMetadata = {
  A: { priority: '0.90', changefreq: 'weekly' },
  B: { priority: '0.75', changefreq: 'weekly' },
  C: { priority: '0.50', changefreq: 'monthly' },
  D: { priority: '0.40', changefreq: 'monthly' }
};

function buildUrlEntry(url, priority, changefreq) {
  return `\n  <url><loc>${baseUrl}${url}</loc><priority>${priority}</priority><changefreq>${changefreq}</changefreq></url>`;
}

export function generateSitemap() {
  const staticUrls = [
    { url: '/', priority: '1.00', changefreq: 'daily' },
    { url: '/contact-us', priority: '0.80', changefreq: 'weekly' },
    { url: '/privacy-policy', priority: '0.70', changefreq: 'monthly' },
    { url: '/service-areas', priority: '0.85', changefreq: 'weekly' }
  ];

  const serviceUrls = servicesData.map((service) => ({
    url: `/${service.slug}`,
    priority: '0.75',
    changefreq: 'weekly'
  }));

  const areaUrls = areasData.filter((area) => area.isActive).flatMap((area) => {
    const metadata = tierMetadata[area.tier] || { priority: '0.50', changefreq: 'monthly' };
    return [
      { url: `/${area.slug}`, priority: metadata.priority, changefreq: metadata.changefreq },
      ...servicesData.map((service) => ({
        url: `/${area.slug}/${service.slug}-${area.slug}-uae`,
        priority: (parseFloat(metadata.priority) - 0.15).toFixed(2),
        changefreq: metadata.changefreq
      }))
    ];
  });

  const urls = [...staticUrls, ...serviceUrls, ...areaUrls];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((entry) => buildUrlEntry(entry.url, entry.priority, entry.changefreq)).join('')}\n</urlset>\n`;
  return xml;
}
