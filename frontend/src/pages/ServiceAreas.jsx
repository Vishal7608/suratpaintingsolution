import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getActiveAreas } from '../data/areasData';

function ServiceAreas() {
  const suratAreas = getActiveAreas().filter((area) => area.areaServed.includes('Surat'));

  return (
    <>
      <Helmet>
        <title>Service Areas - HousePaintersSurat</title>
        <meta
          name="description"
          content="Explore HousePaintersSurat service areas in Surat, including the main localities covered by the SEO priority report." 
        />
        <link rel="canonical" href="https://housepainterssurat.onrender.com/service-areas" />
      </Helmet>
      <Header />
      <section className="banner_inner" style={{ background: 'url(/userfiles/images/banner/home-painting.webp)' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="hero-content-1">
                <h1>Service Areas</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="padding-50px-tb bg-white ul-manage clients-section2 xs-padding-top-60px border-none" id="clients-section2">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h2>Areas We Serve for Painting Services</h2>
              <h3>Surat</h3>
              <ul className="ul3">
                {suratAreas.map((area) => (
                  <li key={area.slug}>
                    <Link to={`/${area.slug}/painting-services-${area.slug}-uae`}>{area.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ServiceAreas;
