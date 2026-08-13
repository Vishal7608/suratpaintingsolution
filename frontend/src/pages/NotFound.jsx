import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | HousePaintersSurat</title>
        <meta name="description" content="The page you are looking for is not available. Return to HousePaintersSurat for Surat painting services." />
      </Helmet>
      <Header />
      <main className="container section">
        <h1>Page not found</h1>
        <p>The requested page could not be found.</p>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
