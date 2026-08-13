import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

function ContactUs() {
  return (
    <>
      <Helmet>
        <title>Contact Us - HousePaintersSurat</title>
        <meta name="description" content="Contact HousePaintersSurat for painting services in Surat. Send your project details and get a fast response." />
        <link rel="canonical" href="https://housepainterssurat.onrender.com/contact-us" />
      </Helmet>
      <Header />
      <section className="banner_inner" style={{ background: 'url(/userfiles/images/banner/home-painting.webp)' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="hero-content-1">
                <h1>Contact Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="message">
                <h1>Drop Us A Message Now:</h1>
              </div>
              <div className="message-box">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="icons-contact">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="single-contact">
                <span className="flaticon-envelope bg-envelope" />
                <div className="sc-icon-inner"><span className="flaticon-envelope" /></div>
                <h5>Send Email Us:</h5>
                <p><a href="mailto:suratpenters01@gmail.com">suratpenters01@gmail.com</a></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="single-contact">
                <span className="flaticon-phone bg-phone" />
                <div className="sc-icon-inner"><span className="flaticon-phone" /></div>
                <h5>Call Us</h5>
                <p><a href="tel:+919408197990">+91 9408197990</a></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="single-contact">
                <span className="flaticon-placeholder bg-placeholder" />
                <div className="sc-icon-inner"><span className="flaticon-placeholder" /></div>
                <address>
                  <h5>Our Location</h5>
                  <p><a href="/service-areas">Surat</a></p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactUs;
