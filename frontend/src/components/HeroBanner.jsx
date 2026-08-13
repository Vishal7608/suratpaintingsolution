function HeroBanner({ title, subtitle }) {
  return (
    <section className="hero-banner">
      <div className="container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

export default HeroBanner;
