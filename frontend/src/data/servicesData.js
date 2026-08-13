export const servicesData = [
  {
    slug: 'epoxy-paint',
    name: 'Epoxy Paint',
    title: 'Epoxy Paint',
    heroImage: '/images/inner/epoxy-paint.webp',
    description: 'Durable epoxy coating for floors, garages, workshops, and high-traffic industrial spaces.',
    intro: 'HousePaintersSurat provides strong epoxy coatings that improve the look, durability, and safety of concrete floors in homes, shops, and workspaces.',
    bullets: ['Slip-resistant and durable finish', 'Suitable for garages, warehouses, and commercial floors', 'Fast turnaround with low-maintenance results'],
    faq: [
      { question: 'How long does epoxy coating last?', answer: 'With proper surface preparation, epoxy flooring can last for several years and remains easy to maintain.' },
      { question: 'Is epoxy suitable for home garages?', answer: 'Yes, it is ideal for residential garages, utility rooms, and other areas that need a tough finish.' }
    ]
  },
  {
    slug: 'home-painting',
    name: 'Home Painting',
    title: 'Home Painting',
    heroImage: '/images/inner/home-painting.webp',
    description: 'Refresh your interiors and exteriors with neat, durable painting for living rooms, bedrooms, kitchens, and more.',
    intro: 'We transform homes with clean finishes, color guidance, and careful preparation that suits modern interiors and family spaces.',
    bullets: ['Interior and exterior house painting', 'Wall, ceiling, and trim finishes', 'Quality paint selection for long-lasting results'],
    faq: [
      { question: 'How many days does a home painting project take?', answer: 'Most standard homes are completed within a few days depending on size, room count, and surface prep.' },
      { question: 'Do you help with color selection?', answer: 'Yes, our team can guide you through shades that suit lighting, furniture, and the mood you want.' }
    ]
  },
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    title: 'Exterior Painting',
    heroImage: '/images/inner/exterior-painting.webp',
    description: 'Protect your property from weather damage while improving its look with a professional exterior finish.',
    intro: 'Our exterior painting services cover walls, facades, and exterior surfaces so your property stays protected and visually sharp.',
    bullets: ['Weather-resistant coatings', 'Protects walls from heat and moisture', 'Ideal for homes, villas, and commercial buildings'],
    faq: [
      { question: 'Can exterior painting be done in peak summer?', answer: 'Yes, we choose suitable timings and coatings for warm conditions to ensure a durable finish.' },
      { question: 'How often should exteriors be repainted?', answer: 'Most properties benefit from repainting every few years depending on surface condition and climate.' }
    ]
  },
  {
    slug: 'industrial-painting',
    name: 'Industrial Painting',
    title: 'Industrial Painting',
    heroImage: '/images/inner/industrial-painting.webp',
    description: 'Professional coatings for factories, warehouses, plants, and heavy-duty facilities.',
    intro: 'We offer durable industrial paint solutions designed for structural protection, corrosion resistance, and safe maintenance.',
    bullets: ['Corrosion-resistant coatings', 'Suitable for factories and warehouses', 'Project planning for minimal disruption'],
    faq: [
      { question: 'Do you handle large commercial sites?', answer: 'Yes, we plan and execute projects for large facilities with clear timelines and safety standards.' },
      { question: 'What types of surfaces are covered?', answer: 'We work on metal, concrete, masonry, and other common industrial surfaces.' }
    ]
  },
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    title: 'Interior Painting',
    heroImage: '/images/inner/interior-painting.webp',
    description: 'Give rooms a fresh, elegant finish with expertly prepared interiors and premium paints.',
    intro: 'Our interior painting team focuses on smooth finishes, clean edges, and practical color choices for daily living.',
    bullets: ['Living rooms, bedrooms, kitchens, and offices', 'Clean prep and dust-control methods', 'Premium paints for a polished finish'],
    faq: [
      { question: 'Can you paint one room or the full house?', answer: 'We can handle single rooms, full homes, and large interior upgrades.' },
      { question: 'How long does interior painting take?', answer: 'Timelines depend on the rooms involved, but we maintain clear schedules and fast completion.' }
    ]
  },
  {
    slug: 'commercial-painting',
    name: 'Commercial Painting',
    title: 'Commercial Painting',
    heroImage: '/images/inner/commercial-painting.webp',
    description: 'Reliable painting for offices, retail shops, showrooms, and other business spaces.',
    intro: 'We deliver commercial painting work that balances schedule, appearance, and low disruption for business owners.',
    bullets: ['Office and retail repainting', 'Fast turnaround for active business spaces', 'Professional finish with minimal downtime'],
    faq: [
      { question: 'Do you work after business hours?', answer: 'Yes, we can coordinate flexible schedules for commercial projects to reduce disruption.' },
      { question: 'Can you paint shopfronts and interiors?', answer: 'Yes, we can refresh both interiors and storefronts to support a polished brand image.' }
    ]
  },
  {
    slug: 'villa-painting',
    name: 'Villa Painting',
    title: 'Villa Painting',
    heroImage: '/images/inner/villa-painting.webp',
    description: 'Elegant villa painting services that improve curb appeal and preserve premium finishes.',
    intro: 'Villa painting projects require careful planning, premium materials, and attention to detail at every stage.',
    bullets: ['Exterior and interior villa work', 'Premium finish options for upscale homes', 'Careful handling of detailing and trims'],
    faq: [
      { question: 'Do you work on large villas?', answer: 'Yes, we regularly handle large villas and provide coordinated project delivery.' },
      { question: 'Can you match existing color tones?', answer: 'Yes, we can help match and refresh color schemes to suit the architecture and surroundings.' }
    ]
  },
  {
    slug: 'wall-painting',
    name: 'Wall Painting',
    title: 'Wall Painting',
    heroImage: '/images/inner/wall-painting.webp',
    description: 'Perfect for freshening walls, feature areas, and creating a new visual statement indoors or outdoors.',
    intro: 'Our wall painting services focus on smooth surfaces, bold color accents, and finishing details that make spaces feel renewed.',
    bullets: ['Feature walls and full-room coverage', 'Interior and exterior wall painting', 'Durable finishes for everyday use'],
    faq: [
      { question: 'Is wall painting suitable for rental properties?', answer: 'Yes, it is a practical way to refresh a space quickly and cost-effectively.' },
      { question: 'Can you handle textured walls?', answer: 'Yes, we assess the surface and apply the right preparation for a clean final finish.' }
    ]
  }
];

export const getServiceBySlug = (slug) => servicesData.find((service) => service.slug === slug);
