import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getServiceBySlug } from '../data/servicesData';
import { originalRootPages, normalizeOriginalHtml } from '../data/originalPages';

function ServicePage({ serviceSlug: propSlug }) {
  const { serviceSlug: paramSlug } = useParams();
  const serviceSlug = propSlug || paramSlug;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return <div className="container section">Service not found.</div>;
  }

  const original = originalRootPages[service.slug];
  const originalHtml = original ? normalizeOriginalHtml(original.html, { replaceCountry: true }) : null;
  const pageTitle = original
    ? original.title.replace(/\bUAE\b/g, 'Surat').replace(/United Arab Emirates/g, 'Surat')
    : `${service.name} in Surat - HousePaintersSurat`;
  const pageDescription = original
    ? original.description.replace(/\bUAE\b/g, 'Surat').replace(/United Arab Emirates/g, 'Surat')
    : service.description;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`https://housepainterssurat.onrender.com/${service.slug}`} />
      </Helmet>
      <Header />
      <main className="container section">
        {originalHtml ? (
          <div dangerouslySetInnerHTML={{ __html: originalHtml }} />
        ) : (
          <>
            <h1>{service.name} in Surat</h1>
            <p>{service.intro}</p>
            <ul>
              {service.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Link to="/service-areas">View all service areas</Link>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ServicePage;
