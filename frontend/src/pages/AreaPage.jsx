import { useParams } from 'react-router-dom';
import AreaHubPage from './AreaHubPage';
import AreaServicePage from './AreaServicePage';

function AreaPage() {
  const { servicePath } = useParams();

  if (!servicePath) {
    return <div className="container section">Page not found.</div>;
  }

  if (servicePath.startsWith('painting-services-') && servicePath.endsWith('-uae')) {
    return <AreaHubPage />;
  }

  return <AreaServicePage />;
}

export default AreaPage;
