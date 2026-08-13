export function generateAreaServiceSchema(area, service) {
  const url = `https://housepainterssurat.onrender.com/${area.slug}/${service.slug}-${area.slug}-uae`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': `${service.name} in ${area.name}, ${area.areaServed.includes('Surat') ? 'Surat' : 'UAE'}`,
    'serviceType': service.name,
    'description': `${service.name} in ${area.name}, ${area.areaServed.includes('Surat') ? 'Surat' : 'UAE'} with dependable workmanship, local knowledge, and fast booking support.`,
    'url': url,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'HousePaintersSurat',
      'url': 'https://housepainterssurat.onrender.com',
      'telephone': '+919408197990'
    }
  };

  schema.areaServed = area.areaServed || [area.name, area.areaServed.includes('Surat') ? 'Surat' : 'UAE'];
  schema.priceRange = area.avgBudgetRange;
  schema.keywords = [
    service.name,
    `${area.name} painting services`,
    `${area.areaServed.includes('Surat') ? 'Surat' : 'UAE'} painting services`
  ];
  schema.availableChannel = {
    '@type': 'ServiceChannel',
    'serviceUrl': url
  };
  schema.category = 'Local painting service';

  return JSON.stringify(schema);
}
