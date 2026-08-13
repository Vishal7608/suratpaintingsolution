import { Link } from 'react-router-dom';

function ServiceCard({ service }) {
  return (
    <article className="card">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <Link to={`/service/${service.slug}`}>Explore service</Link>
    </article>
  );
}

export default ServiceCard;
