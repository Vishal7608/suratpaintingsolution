import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAreaBySlug } from '../data/areasData';
import { getServiceBySlug } from '../data/servicesData';
import { generateAreaServiceSchema } from '../utils/generateSchema';
import { originalAreaServicePages, normalizeOriginalHtml } from '../data/originalPages';

function AreaServicePage() {
  const { areaSlug, servicePath } = useParams();
  const area = getAreaBySlug(areaSlug);
  const serviceSlug = servicePath?.endsWith(`-${areaSlug}-uae`)
    ? servicePath.slice(0, -(`-${areaSlug}-uae`.length))
    : null;
  const service = getServiceBySlug(serviceSlug);

  if (!area || !service || !serviceSlug) {
    return <div className="container section">Page not found.</div>;
  }

  const pageKey = `${service.slug}-${area.slug}-uae`;
  const original = originalAreaServicePages[area.slug]?.[pageKey];
  const originalHtml = original ? normalizeOriginalHtml(original.html, { replaceCountry: area.areaServed.includes('Surat') }) : null;

  const areaRegion = area.areaServed.includes('Surat') ? 'Surat' : 'UAE';

  return (
    <>
      <Helmet>
        <title>{original?.title ?? `${service.name} in ${area.name}, ${areaRegion} | HousePaintersSurat`}</title>
        <meta name="description" content={original?.description ?? `${service.name} in ${area.name}, ${areaRegion} with dependable workmanship, local knowledge, and fast booking support.`} />
        <link rel="canonical" href={`https://housepainterssurat.onrender.com/${area.slug}/${service.slug}-${area.slug}-uae`} />
        <script type="application/ld+json">{generateAreaServiceSchema(area, service)}</script>
      </Helmet>
      <Header />
      <main className="container section">
        {originalHtml ? (
          <div dangerouslySetInnerHTML={{ __html: originalHtml }} />
        ) : (
          <>
            <h1>{service.name} in {area.name}, {areaRegion}</h1>
            <p>{service.intro}</p>
            <h2>Why {area.name} residents choose us</h2>
            <ul>
              <li>Fast response for urgent paint and repair work.</li>
              <li>Familiarity with the building styles and maintenance needs of {area.name}.</li>
              <li>Clear pricing guidance with budgets from {area.avgBudgetRange}.</li>
            </ul>
            <h2>Service details</h2>
            <p>{service.description}</p>
            <h2>Trust signals</h2>
            <p>Google rating 4.9/5 with strong reviews for responsive and neat workmanship.</p>
            <h2>FAQ</h2>
            <p><strong>How long does a {service.name.toLowerCase()} project take?</strong><br />Most projects are completed within a few days depending on scope and surface condition.</p>
            <p><strong>Is pricing available for {area.name}?</strong><br />Yes, we provide a transparent estimate based on area size, materials, and finish requirements.</p>
            <Link to={`/${area.slug}/painting-services-${area.slug}-uae`}>View {area.name} hub</Link>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default AreaServicePage;
