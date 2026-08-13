import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeNav = () => setNavOpen(false);

  return (
    <header className="header-area" id="my-header">
      <div className="container-auto">
        <div className="row">
          <div className="col-lg-4">
            <div className="img-logo">
              <NavLink to="/"><img alt="HousePaintersSurat" src="/userfiles/images/logo.png" /></NavLink>
            </div>
          </div>

          <div className="col-lg-8 ms-auto">
            <div className="paint-nav m">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="img-logo">
                  <NavLink to="/"><img alt="HousePaintersSurat Surat" src="/userfiles/images/logo.png" /></NavLink>
                </div>
                <button
                  className={`navbar-toggler ${navOpen ? 'collapsed' : ''}`}
                  type="button"
                  aria-controls="navbarNav"
                  aria-expanded={navOpen}
                  aria-label="Toggle navigation"
                  onClick={() => setNavOpen((open) => !open)}
                >
                  <span className="ham-burger top" />
                  <span className="ham-burger middle" />
                  <span className="ham-burger bottom" />
                </button>

                <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="navbarNav">
                  <ul className="navbar-nav hp-1-nav mt-2">
                    <li className="nav-item"><NavLink className="nav-link mest" to="/" onClick={closeNav}>Home</NavLink></li>
                    <li
                      className={`nav-item dropdown ${servicesOpen ? 'show' : ''}`}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <NavLink
                        className="nav-link mest"
                        to="/home-painting"
                        onClick={() => setServicesOpen((open) => !open)}
                      >
                        Painting Services <i className="fa-solid fa-chevron-down" />
                      </NavLink>
                      <ul className={`dropdown-menu ${servicesOpen ? 'show' : ''}`}>
                        <li className="dropdown-item"><NavLink to="/home-painting" onClick={closeNav}>Home Painting</NavLink></li>
                        <li className="dropdown-item"><NavLink to="/exterior-painting" onClick={closeNav}>Exterior Painting</NavLink></li>
                        <li className="dropdown-item"><NavLink to="/epoxy-paint" onClick={closeNav}>Epoxy Paint</NavLink></li>
                        <li className="dropdown-item"><NavLink to="/industrial-painting" onClick={closeNav}>Industrial Painting</NavLink></li>
                        <li className="dropdown-item"><NavLink to="/interior-painting" onClick={closeNav}>Interior Painting</NavLink></li>
                        <li className="dropdown-item"><NavLink to="/commercial-painting" onClick={closeNav}>Commercial Painting</NavLink></li>
                        <li className="dropdown-item"><NavLink to="/villa-painting" onClick={closeNav}>Villa Painting</NavLink></li>
                        <li className="dropdown-item"><NavLink to="/wall-painting" onClick={closeNav}>Wall Painting</NavLink></li>
                      </ul>
                    </li>
                    <li className="nav-item"><NavLink className="nav-link mest" to="/contact-us" onClick={closeNav}>Contact Us</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link mest" to="/service-areas" onClick={closeNav}>Service Area</NavLink></li>
                  </ul>
                </div>
              </nav>

              <div className="phone-div"><a className="nav-link last-child" href="tel:+919408197990">+91 9408197990</a></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
