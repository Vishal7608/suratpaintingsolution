import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const ServiceAreas = lazy(() => import('../pages/ServiceAreas'));
const AreaHubPage = lazy(() => import('../pages/AreaHubPage'));
const AreaPage = lazy(() => import('../pages/AreaPage'));
const ServicePage = lazy(() => import('../pages/ServicePage'));
const NotFound = lazy(() => import('../pages/NotFound'));

function AppRoutes() {
  return (
    <Suspense fallback={<div className="container section">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/:areaSlug" element={<AreaHubPage />} />
        <Route path="/:areaSlug/:servicePath" element={<AreaPage />} />
        <Route path="/home-painting" element={<ServicePage serviceSlug="home-painting" />} />
        <Route path="/exterior-painting" element={<ServicePage serviceSlug="exterior-painting" />} />
        <Route path="/epoxy-paint" element={<ServicePage serviceSlug="epoxy-paint" />} />
        <Route path="/industrial-painting" element={<ServicePage serviceSlug="industrial-painting" />} />
        <Route path="/interior-painting" element={<ServicePage serviceSlug="interior-painting" />} />
        <Route path="/commercial-painting" element={<ServicePage serviceSlug="commercial-painting" />} />
        <Route path="/villa-painting" element={<ServicePage serviceSlug="villa-painting" />} />
        <Route path="/wall-painting" element={<ServicePage serviceSlug="wall-painting" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
