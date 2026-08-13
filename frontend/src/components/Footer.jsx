import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-nav">
      <div className="container-auto">
        <div className="footer-content">
          <div className="row">
            <div className="col-md-5">
              <div className="footer-logo">
                <Link to="/"><img alt="HousePaintersSurat" src="/userfiles/images/logo.png" /></Link>
              </div>
              <div className="about-company">
                <p>HousePaintersSurat specializes in a wide range of services, including commercial painting, epoxy paint, interior & outdoor painting, and decorative finishes.</p>
                <p className="footer-tagline">HousePaintersSurat — slowgun is with all my Surat Homies families.</p>
              </div>
            </div>

            <div className="col-md-2">
              <div className="about-company">
                <h4>Quick Links</h4>
                <ul className="single-footer-widget">
                  <li><Link to="/epoxy-paint">Epoxy Paint</Link></li>
                  <li><Link to="/commercial-painting">Commercial Painting</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <div className="about-company">
                <h4>Quick Links</h4>
                <ul className="single-footer-widget">
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/contact-us">Contact Us</Link></li>
                  <li><Link to="/service-areas">Service Areas</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-3">
              <div className="about-company">
                <h4>Contact Us:</h4>
                <div className="social-icon">
                  <ul className="sicon-frist">
                    <li><i className="fa fa-phone mr-3 fa-flip-horizontal"></i><a href="tel:+919408197990">+91 9408197990</a></li>
                    <li><i className="fa fa-envelope mr-3"></i><a href="mailto:suratpenters01@gmail.com">suratpenters01@gmail.com</a></li>
                    <li><i className="fa fa-globe mr-3"></i><address><a href="/">Surat</a></address></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p className="txt-footer">Copyright © {new Date().getFullYear()} All Rights Reserved By <Link to="/">HousePaintersSurat</Link></p>
      </footer>
    </footer>
  );
}

export default Footer;
