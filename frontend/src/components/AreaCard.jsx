import { Link } from 'react-router-dom';

function AreaCard({ area }) {
  return (
    <article className="card">
      <h3>{area.name}</h3>
      <p>{area.profile}</p>
      <p><strong>Tier:</strong> {area.tier} · <strong>Priority:</strong> {area.seoPriority}</p>
      <Link to={`/${area.slug}`}>View {area.name} hub</Link>
    </article>
  );
}

export default AreaCard;
