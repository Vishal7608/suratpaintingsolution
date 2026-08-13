import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAreaBySlug } from '../data/areasData';
import { servicesData } from '../data/servicesData';
import { originalAreaHubPages, normalizeOriginalHtml, getOriginalAreaHubPage } from '../data/originalPages';

function AreaHubPage() {
  const { areaSlug, areaSlug2 } = useParams();
  const area = getAreaBySlug(areaSlug);

  if (!area || (areaSlug2 && areaSlug !== areaSlug2)) {
    return <div className="container section">Area not found.</div>;
  }

  const original = getOriginalAreaHubPage(area.slug);
  const originalHtml = original ? normalizeOriginalHtml(original.html, { replaceCountry: area.areaServed.includes('Surat') }) : null;

  return (
    <>
      <Helmet>
        <title>{original?.title ?? `${area.title} - HousePaintersSurat`}</title>
        <meta name="description" content={original?.description ?? `Professional painting services for ${area.name}, Surat. Trusted for homes, villas, interiors, exteriors, epoxy, and commercial work.`} />
        <link rel="canonical" href={`https://housepainterssurat.onrender.com/${area.slug}/painting-services-${area.slug}-uae`} />
      </Helmet>
      <Header />
      <main className="container section">
        {originalHtml ? (
          <div dangerouslySetInnerHTML={{ __html: originalHtml }} />
        ) : (
          <>
            <section className="hero-area-1">
              <div className="container-auto">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-12">
                    <div className="hero-content-1">
                      <h1 className="wow fadeInLeft" data-wow-delay=".5s">Painting Services in <span>{area.name}, Surat</span></h1>
                      <p className="wow fadeInLeft" data-wow-delay="1s">Get top-quality residential and commercial painting services in {area.name}, Surat.</p>
                      <div className="banner_phone"><a className="nav-link last-child" href="tel:+919408197990">+91 9408197990</a></div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 order-first order-lg-last mb-3">
                    <div className="banner-right d-flex justify-content-center"><img alt="HousePaintersSurat banner" src="/userfiles/images/banner/home-painting.webp" />
                      <div className="bottom flyer"><span>351</span>
                        <p>User Rating</p>
                        <p><img alt="rating" src="/userfiles/images/2rating.png" /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overlay-wave" data-negative="false">
                <svg preserveAspectRatio="none" viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
                  <path className="overlay-wave-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
                </svg>
              </div>
            </section>

            <section className="us-about">
              <div className="container-auto">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="about-us-img"><img alt={`top rated painting experts near me ${area.name}`} src="/userfiles/images/about-us-img.webp" /></div>
                  </div>
                  <div className="col-lg-6">
                    <div className="about-us-content">
                      <h2>{area.name} HousePaintersSurat, Surat</h2>
                      <p>If you want to turn your plain-looking living area into a colorful and dynamic living environment with a fresh ambiance, you've come to the perfect place. We have versatile painters in {area.name}, Surat with unique and creative painting skills who can transform your boring-looking living space into colorful areas while keeping your home as clean as possible.</p>
                      <p>{area.name} HousePaintersSurat offers a wide variety of versatile painting services for houses as well as businesses. Our painting services include home painting, villa painting, interior painting, exterior painting, wall painting, epoxy painting, commercial painting, and industrial painting. Our painters are skilled and competent, with a thorough safety and background review.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="project-ask">
              <div className="container-auto">
                <div className="pro-ask-content">
                  <h3 data-aos="slide-in-left">Our Painting Services in {area.name}, Surat are Customer Focused and Quality Driven</h3>
                  <p>HousePaintersSurat provides excellent interior and exterior painting services in {area.name}, Surat. We are proud of our quality painting services and positive customer feedback. We are available 24/7, so call us immediately to locate certified and licensed HousePaintersSurat Painting contractors in your area across Surat.</p>
                  <div className="banner_phone last_btn"><a className="nav-link last-child" href="tel:+919408197990">+91 9408197990</a></div>
                </div>
              </div>
            </section>

            <section className="choose-us">
              <div className="container-auto">
                <div className="row align-items-center">
                  <div className="col-lg-7">
                    <div className="choose-us-content">
                      <h2>Residential and Commercial Painters in {area.name}, Surat</h2>
                      <p>Looking to freshen up your home in {area.name}, Surat with a fresh coat of paint? Our painting services are available 24/7 for both residential and commercial painting needs. Our licensed painters are skilled professionals who are committed to providing excellent final results.</p>
                      <p>Our expert painters provide a variety of painting services tailored to your specific needs. We have the expertise to complete any painting project, whether it is villa painting, epoxy painting, or industrial painting.</p>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="choose-right-img"><img alt={`top rated painting experts in ${area.name}`} src="/userfiles/images/choose-img.webp" /></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="our-services">
              <div className="container-auto">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="our-services-content">
                      <h2>Some of Our Previous Work</h2>
                      <p>When it comes to commercial and residential painting services, choose HousePaintersSurat which specializes in all types of painting services. We make a big difference in painting services in terms of quality, reliability, and cost-effectiveness.</p>
                    </div>
                  </div>

                  {['exterior-painting', 'epoxy-paint', 'industrial-painting', 'villa-painting', 'wall-painting', 'home-painting'].map((imageKey, idx) => (
                    <div className="col-lg-4" key={imageKey}>
                      <div className="card">
                        <div className="card-image"><a data-caption="Painting Work" data-fancybox="gallery" href={`/userfiles/images/gallery/big-${imageKey.replace('-painting','')}.webp`}><img alt="painting work" src={`/userfiles/images/gallery/small-${imageKey.replace('-painting','')}.webp`} /></a></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="main-content-wrap">
              <div className="container-auto">
                <div className="row">
                  <div className="col-md-8">
                    <div className="main-content">
                      <h2>HousePaintersSurat Offers a Variety of Painting Services Near You in {area.name}, Surat</h2>
                      <p>Paint gives a fresher look and improves the overall appearance of your property. In {area.name}, Surat, HousePaintersSurat delivers professional painting services by the most skilled and professional hands.</p>
                      <p>With HousePaintersSurat painting services, you will have peace of mind that your project is in professional hands.</p>
                      <p><img src="/imggen/home-painting-suraj-uae.webp" alt="HousePaintersSurat {area.name} - Surat" /></p>
                      <h3>House Painting in {area.name}, Surat</h3>
                      <p>Expert house painting transforms your house and gives it a fresh new look. HousePaintersSurat house painting is the name of quick house painting and detailed house painting by professional and experienced painters. We deliver high quality house painting services in {area.name}, Surat that exceed our clients' expectations.</p>
                      <h2>Interior and Exterior Painting Services in {area.name}, Surat</h2>
                      <p>Experience a complete home transformation with HousePaintersSurat Interior And Exterior Painting Services. With dual painting expertise, we ensure that both interior and exterior surfaces receive professional care and a lasting finish.</p>
                    </div>
                  </div>
                  <div className="col-md-4"><div className="sidebar-block widget-categories mb-5">
                    <div className="sidebar-heading"><h3>Painting Services</h3></div>
                    <div className="sidebar-content"><div className="widget-content"><ul className="list-unstyled" id="active-menu">
                      {servicesData.map((service) => (
                        <li key={service.slug}><Link to={`/${area.slug}/${service.slug}-${area.slug}-uae`}>{service.name}</Link></li>
                      ))}
                    </ul></div></div>
                  </div></div>
                </div>
              </div>
            </section>

            <section className="our-services-sec">
              <div className="container-auto">
                <div className="services-heading">
                  <h2>Wide Range of Painting Services in {area.name}, Surat</h2>
                  <p>We provide a complete painting service package covering residential, commercial, villa, industrial, exterior, and interior painting projects in {area.name}.</p>
                </div>

                <div className="row">
                  <div className="col-lg-4">
                    <div className="our_content_box">
                      <div className="our-services-cont"><img alt={`Interior Painting in ${area.name}`} src="/userfiles/images/icons/industrial-painting.png" /></div>
                      <div className="our-services-txt">
                        <h3>Interior Painting {area.name}</h3>
                        <p>Professional interior painting for living rooms, bedrooms, kitchens, offices, and apartments.</p>
                      </div>
                    </div>

                    <div className="our_content_box">
                      <div className="our-services-cont"><img alt={`Villa Painting in ${area.name}`} src="/userfiles/images/icons/villa-painters.png" /></div>
                      <div className="our-services-txt">
                        <h3>Villa Painting {area.name}</h3>
                        <p>Premium villa painting services with careful preparation and high-quality finishes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="img-services"><img alt={`Painting services in ${area.name}`} src="/userfiles/images/wide-range-of-painting-services.webp" /></div>
                  </div>

                  <div className="col-lg-4">
                    <div className="our_content_box">
                      <div className="our-services-cont"><img alt={`Exterior Painting in ${area.name}`} src="/userfiles/images/icons/office-painting.png" /></div>
                      <div className="our-services-txt">
                        <h3>Exterior Painting {area.name}</h3>
                        <p>Exterior painting to protect your property and give it a refreshed, long-lasting facade.</p>
                      </div>
                    </div>

                    <div className="our_content_box">
                      <div className="our-services-cont"><img alt={`Industrial Painting in ${area.name}`} src="/userfiles/images/icons/industrial-painting.png" /></div>
                      <div className="our-services-txt">
                        <h3>Industrial Painting {area.name}</h3>
                        <p>Durable industrial coatings for warehouses, factories, and commercial spaces.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="map-info">
              <div className="container-auto">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="map"><iframe frameBorder="0" height="450" marginHeight="0" marginWidth="0" scrolling="no" src={`https://maps.google.com/maps?width=100%&height=600&hl=en&q=${encodeURIComponent(`${area.name} Surat`)}&ie=UTF8&t=&z=11&iwloc=B&output=embed`} width="100%">km radius map</iframe></div>
                  </div>

                  <div className="col-sm-6 info-txt">
                    <div className="info">
                      <h4>Find Your Local Painting Experts in {area.name}, Surat</h4>
                      <p>HousePaintersSurat provides fast and reliable painting services across {area.name}, Surat. Our local team is ready to assist with home painting, villa painting, interior painting, exterior painting, wall painting, commercial painting, and epoxy flooring.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="testimonial-section-two">
              <div className="container">
                <div className="title-column">
                  <div className="sec-title mb-0">
                    <h3>Praise From Our Happy Clients About Painting Services</h3>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4">
                    <div className="testimonial-block-two">
                      <div className="inner-box">
                        <div className="content-box">
                          <div className="rating"><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></div>
                          <div className="text">The team transformed our home quickly and left everything tidy. Highly recommended for painting services in {area.name}.</div>
                          <div className="info-box"><h6 className="name">Amit Patel</h6></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="testimonial-block-two">
                      <div className="inner-box">
                        <div className="content-box">
                          <div className="rating"><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></div>
                          <div className="text">Very professional and attentive to detail. Our villa looks brand new after their paint job.</div>
                          <div className="info-box"><h6 className="name">Shwetha</h6></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="testimonial-block-two">
                      <div className="inner-box">
                        <div className="content-box">
                          <div className="rating"><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></div>
                          <div className="text">Excellent service, clear communication, and a flawless finish. Perfect choice for local painting projects.</div>
                          <div className="info-box"><h6 className="name">Rahul Desai</h6></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Link to="/service-areas">Back to service areas</Link>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default AreaHubPage;
