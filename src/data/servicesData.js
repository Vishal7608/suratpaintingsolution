import imgHomePainting from '../assets/images/service_home_painting_1786507135336.jpg';
import imgInteriorPainting from '../assets/images/service_interior_painting_1786507151881.jpg';
import imgExteriorPainting from '../assets/images/service_exterior_painting_1786507168747.jpg';
import imgVillaPainting from '../assets/images/service_villa_painting_1786507187980.jpg';
import imgCommercialPainting from '../assets/images/service_commercial_painting_1786507208036.jpg';
import imgIndustrialPainting from '../assets/images/service_industrial_painting_1786507225024.jpg';
import imgWallPainting from '../assets/images/service_wall_painting_1786507242061.jpg';
import imgEpoxyFlooring from '../assets/images/service_epoxy_flooring_1786507258506.jpg';
import imgWoodCoating from '../assets/images/service_wood_coating_1786507276576.jpg';
import imgFloorPolishing from '../assets/images/service_floor_polishing_1786507293705.jpg';
import imgWaterproofing from '../assets/images/service_waterproofing_1786507309870.jpg';
import imgTextureWall from '../assets/images/service_texture_wall_1786507323935.jpg';
import imgFrenchPolish from '../assets/images/service_french_polish_1786507342100.jpg';
import imgMetalGate from '../assets/images/service_metal_gate_1786507443900.jpg';
import imgPopPutty from '../assets/images/service_pop_putty_1786507404570.jpg';
import imgSocietyPainting from '../assets/images/service_society_painting_1786507420435.jpg';

export const servicesData = [
  {
    id: 'home-painting',
    title: 'Residential Home Painting',
    shortDesc: 'Complete home painting services for apartments, flats, and houses in Surat. Dust-free interior and weatherproof exterior painting.',
    iconName: 'Home',
    heroImage: imgHomePainting,
    tagline: 'Full House Interior & Exterior Painting Solutions for Surat Families',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Complete home inspection & moisture testing',
      '100% furniture, AC & floor plastic sheet masking',
      'Vacuum-assisted dust-free wall sanding',
      'Applied by master skilled painters (26+ years exp)',
      'Punctual start-to-finish written deadline guarantee'
    ],
    suratClimateNote: 'Surat homes require specialized vapor-permeable wall primers to protect against humidity from the Tapi River and avoid wall peeling.',
    processSteps: [
      { step: '1', title: 'On-Site Digital Moisture Test', desc: 'Checking wall dampness levels before choosing paint systems.' },
      { step: '2', title: 'Complete Furniture Masking', desc: 'Protecting sofas, electronics, and floor tiles with heavy-duty plastic sheets.' },
      { step: '3', title: 'Putty Levelling & Vacuum Sanding', desc: 'Applying 2 coats acrylic putty and vacuum sanding for a mirror-smooth base.' },
      { step: '4', title: 'Primer & Double Topcoat', desc: 'Applying primer and 2 coats of premium washable emulsion paint.' }
    ],
    popularColors: ['Morning Dew Beige', 'Royale Silk White', 'Peach Blush', 'Soft Grey', 'Mint Mist'],
    faqs: [
      { q: 'How many days does complete home painting take in Surat?', a: 'A standard 3BHK takes 5 to 7 days depending on wall putty requirements.' },
      { q: 'Do you move furniture before painting?', a: 'Yes, our team handles all heavy furniture shifting and plastic wrapping.' }
    ]
  },
  {
    id: 'interior-painting',
    title: 'Interior House Painting',
    shortDesc: 'Dust-free, premium interior wall painting with customized color consultation and furniture protection for Surat homes.',
    iconName: 'Paintbrush',
    heroImage: imgInteriorPainting,
    tagline: 'Transform Your Living Spaces with Flawless Colors & Zero Dust',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Dust-free mechanized sanding for smooth finish',
      'Full furniture, flooring, and electronics masking',
      'Room-by-room Asian Paints color shade consultation',
      'Zero VOC, odorless paint options safe for kids & pets',
      'Punctual completion guarantee with zero mess left behind'
    ],
    suratClimateNote: 'Surat humidity and humidity fluctuations in apartments near the Tapi River require vapor-permeable primer coats that prevent paint bubbling.',
    processSteps: [
      { step: '1', title: 'Surface Inspection & Moisture Check', desc: 'We inspect walls using digital moisture meters to detect dampness before applying any paint.' },
      { step: '2', title: 'Complete Masking & Protection', desc: 'All furniture, flooring, doors, windows, and light fittings are covered with protective film.' },
      { step: '3', title: 'Crack Filling & Putty Finishing', desc: 'Hairline cracks are filled with acrylic sealant and 2 coats of premium wall putty are applied.' },
      { step: '4', title: 'Sanding & Primer Application', desc: 'Mechanized vacuum sanding provides a velvet-smooth base followed by alkali-resistant primer.' },
      { step: '5', title: 'Topcoat Painting & Unmasking', desc: '2 coats of high-grade emulsion (Royale/Velvet) applied, followed by deep cleaning.' }
    ],
    popularColors: ['Morning Dew Beige', 'Royale Royale Silk', 'Pearl White', 'Soft Sage Green', 'Elegance Grey'],
    faqs: [
      { q: 'How long does interior painting take for a 3BHK flat in Adajan or Vesu?', a: 'Typically 4 to 6 days depending on putty work and drying weather. We assign a dedicated 4-member crew.' },
      { q: 'Do we need to vacate our home during painting?', a: 'No! We work room-by-room and use eco-friendly zero-VOC paints so you can comfortably stay at home.' }
    ]
  },
  {
    id: 'exterior-painting',
    title: 'Exterior House Painting',
    shortDesc: 'High-durability, weatherproof exterior coatings engineered to withstand Surat’s intense summer heat and monsoon rain.',
    iconName: 'Building',
    heroImage: imgExteriorPainting,
    tagline: 'Shield Your Home Exterior Against Surat Monsoons & Heatwaves',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Monsoon-proof rain barrier elastomer coatings',
      'Anti-fungal and anti-algae protection formula',
      'UV-resistant pigments that do not fade under harsh Surat sun',
      'Scaffolding and safety harness safety compliance',
      'Up to 7 years warranty on Apex Ultima / Weathercoat paints'
    ],
    suratClimateNote: 'Surat receives heavy rainfall during July-September and high salt air near coastal Dumas/Magdalla. External walls need heavy-duty weather guard coatings.',
    processSteps: [
      { step: '1', title: 'High-Pressure Water Washing', desc: 'Power washing removes dirt, algae, moss, and loose paint flakes from exterior walls.' },
      { step: '2', title: 'Crack Repair & Damp Treatment', desc: 'Exterior cracks are sealed with elastomeric crack filler to stop water seepage.' },
      { step: '3', title: 'Weather Damp Primer', desc: 'One coat of exterior damp-proof penetrating primer seals porous concrete.' },
      { step: '4', title: '2 Coats Weatherproof Emulsion', desc: 'Application of high-performance Apex Ultima or equivalent weather-guard paint.' }
    ],
    faqs: [
      { q: 'When is the best time for exterior painting in Surat?', a: 'October to May is ideal. However, we also perform pre-monsoon waterproofing coats.' },
      { q: 'What warranty is provided for exterior painting?', a: 'We offer 5 to 7 years performance warranty on Asian Paints Apex Ultima or Berger WeatherCoat installations.' }
    ]
  },
  {
    id: 'villa-painting',
    title: 'Luxury Villa & Bungalow Painting',
    shortDesc: 'Bespoke painting and luxury finishes for grand bungalows and villas in Vesu, Piplod, City Light, and Dumas Road.',
    iconName: 'Home',
    heroImage: imgVillaPainting,
    tagline: 'Exquisite Exterior & Interior Finishes for Luxury Surat Residences',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Custom luxury color schemes & Italian texture accents',
      'High-sheen weather-resistant villa exterior coatings',
      'Wood PU polishing for teak doors, pergolas & wooden facades',
      'Dedicated senior project supervisor on-site daily',
      'Complete post-painting deep site cleaning'
    ],
    suratClimateNote: 'Bungalows in Vesu and Dumas Road face direct sun exposure and humidity. High-grade elastomeric weatherguard paint prevents micro-cracking.',
    processSteps: [
      { step: '1', title: 'Architectural Site Survey', desc: 'Detailed elevation inspection and digital shade visualizer preview.' },
      { step: '2', title: 'High-Pressure Cleaning & Crack Sealing', desc: 'Washing exterior walls and filling structural joints.' },
      { step: '3', title: 'Multi-layer Premium Paint Application', desc: 'Specialized primer and 2-3 coats of luxury emulsion.' }
    ],
    popularColors: ['Royal Venetian Beige', 'Classic Cream & Teak Accent', 'Terracotta Red', 'Slate Grey Modern'],
    faqs: [
      { q: 'Do you offer customized color schemes for multi-story villas?', a: 'Yes! We provide 3D digital shade visualizer mockups before starting work.' }
    ]
  },
  {
    id: 'commercial-painting',
    title: 'Commercial & Office Painting',
    shortDesc: 'Professional interior and exterior painting for offices, retail showrooms, banks, and commercial complexes in Surat.',
    iconName: 'Building2',
    heroImage: imgCommercialPainting,
    tagline: 'Fast, Non-Disruptive Painting Solutions for Surat Businesses & Retail',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Night-shift & weekend painting schedules available',
      'Low-odor, quick-drying commercial paints',
      'High-traffic durable washable wall coatings',
      'Formal GST invoicing & commercial contract terms',
      'Fast execution with large crew deployment'
    ],
    suratClimateNote: 'Commercial spaces in Ring Road textile markets and Majura Gate require scuff-resistant, washable wall coatings that resist heavy foot traffic.',
    processSteps: [
      { step: '1', title: 'Schedule Planning', desc: 'Arranging work during off-hours or weekends to avoid business downtime.' },
      { step: '2', title: 'Surface Prep & Quick Priming', desc: 'Repairing wall damages and applying fast-drying primer.' },
      { step: '3', title: 'Commercial Emulsion Spray/Roll', desc: 'Application of durable commercial grade paint.' }
    ],
    faqs: [
      { q: 'Can you paint our office over the weekend?', a: 'Yes! We deploy extra painters to complete office repainting between Friday evening and Sunday night.' }
    ]
  },
  {
    id: 'industrial-painting',
    title: 'Industrial & GIDC Factory Painting',
    shortDesc: 'Heavy-duty protective coatings, epoxy floors, and anti-corrosion painting for industrial sheds and factories in Pandesara, Sachin, and Hazira.',
    iconName: 'Factory',
    heroImage: imgIndustrialPainting,
    tagline: 'Heavy-Duty Chemical & Rust Protective Coatings for Surat GIDC Units',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Epoxy & Polyurethane industrial floor coatings',
      'Metal roof shed anti-rust chemical coating',
      'Safety harness & industrial scaffolding setup',
      'High temperature & chemical resistant paint formulas',
      'Fully compliant with GIDC safety regulations'
    ],
    suratClimateNote: 'Industrial plants in Sachin, Pandesara, and Bhatpore GIDC encounter chemical fumes and monsoon humidity requiring heavy anti-corrosive epoxy primers.',
    processSteps: [
      { step: '1', title: 'Surface Sandblasting & Degreasing', desc: 'Stripping rust, oil, and loose chemical deposits.' },
      { step: '2', title: 'Zinc-Rich Epoxy Primer', desc: 'Applying heavy-duty rust-inhibiting primer.' },
      { step: '3', title: 'Industrial PU / Epoxy Topcoat', desc: 'Applying chemical and abrasion-resistant top layer.' }
    ],
    faqs: [
      { q: 'Do you provide safety insurance for workers in industrial sites?', a: 'Yes, all our workers are insured and equipped with certified safety gear.' }
    ]
  },
  {
    id: 'wall-painting',
    title: 'Decorative Wall Painting',
    shortDesc: 'Precision interior wall painting, contrast feature walls, brushwork accents, and smooth washable emulsion finishes.',
    iconName: 'Palette',
    heroImage: imgWallPainting,
    tagline: 'Vibrant Accent Walls & Seamless Washable Wall Finishes',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Custom color accent walls for living rooms & bedrooms',
      'Washable silk & satin emulsion finishes',
      'Precision edge tape line trimming',
      'Non-toxic kid-friendly paint formulations'
    ],
    suratClimateNote: 'Accurate surface prep ensures interior feature walls remain vibrant without damp discoloration.',
    processSteps: [
      { step: '1', title: 'Wall Surface Smoothing', desc: 'Sanding and filling minor holes.' },
      { step: '2', title: 'Precision Edge Masking', desc: 'Applying painter tape for sharp color boundaries.' },
      { step: '3', title: 'Double Emulsion Coat', desc: 'Applying 2 coats of premium washable paint.' }
    ],
    faqs: [
      { q: 'Can we paint just a single accent wall in a room?', a: 'Yes! We handle single wall accent painting as well as full room projects.' }
    ]
  },
  {
    id: 'epoxy-flooring',
    title: 'Glossy Epoxy Flooring Services',
    shortDesc: 'Seamless, chemical-resistant, high-gloss epoxy flooring for garages, industrial units, commercial showrooms, and hospitals in Surat.',
    iconName: 'Layers',
    heroImage: imgEpoxyFlooring,
    tagline: 'Heavy-Duty, Jointless & High-Gloss Epoxy Floor Coatings',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Seamless, joint-free smooth reflective surface',
      'Heavy load bearing & impact resistant',
      'Oil, chemical & water repellent coating',
      'Custom anti-slip textures & solid shade choices',
      'Easy to clean and stain resistant'
    ],
    suratClimateNote: 'Epoxy resin coatings stop ground moisture ingress into concrete floors in ground-floor shops and GIDC industrial units.',
    processSteps: [
      { step: '1', title: 'Floor Grinding & Laitance Removal', desc: 'Diamond grinding the concrete floor for open pores.' },
      { step: '2', title: 'Deep Penetrating Epoxy Primer', desc: 'Applying liquid epoxy primer to seal concrete.' },
      { step: '3', title: 'Epoxy Body Coat & Screed', desc: 'Filling floor cracks and leveling pinholes.' },
      { step: '4', title: 'High-Gloss Topcoat Application', desc: 'Squeegee and roller application of colored self-leveling epoxy.' }
    ],
    faqs: [
      { q: 'Is epoxy flooring suitable for residential garages and basements?', a: 'Yes! It creates an oil-proof, dust-free, high-shine floor that is extremely easy to wash.' }
    ]
  },
  {
    id: 'wood-painting',
    title: 'Wood Painting & Furniture Coating',
    shortDesc: 'PU clear coating, enamel painting, melamine polishing, and wood stain finishing for wooden doors, windows, cabinets, and furniture.',
    iconName: 'Sparkle',
    heroImage: imgWoodCoating,
    tagline: 'Protect & Enhance Natural Wood Grain with High-Sheen PU & Enamel',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Polyurethane (PU) clear gloss and matte varnish',
      'Melamine door and wardrobe polishing',
      'Custom wood stain color matching (Teak, Walnut, Rosewood)',
      'Scratch-resistant & water-repellent protection',
      'Enamel paint finish for wooden window frames & shutters'
    ],
    suratClimateNote: 'Surat monsoons expand wooden doors. UV-resistant exterior PU clear coat prevents wood rot and swelling.',
    processSteps: [
      { step: '1', title: 'Wood Sanding & Stripping', desc: 'Removing old varnish and smoothing wood fibers.' },
      { step: '2', title: 'Pore Filling & Wood Staining', desc: 'Applying wood filler and rich grain enhancer.' },
      { step: '3', title: 'Sealer & Topcoat Varnish', desc: 'Spraying 2 coats of durable clear PU coating.' }
    ],
    faqs: [
      { q: 'Which is better for main entrance doors: PU polish or paint?', a: 'Exterior PU Polish preserves the wood grain beauty while providing 100% weather resistance.' }
    ]
  },
  {
    id: 'polishing-services',
    title: 'Floor & Surface Polishing Services',
    shortDesc: 'Marble floor diamond polishing, Kota stone restoration, wood polishing, and mirror-shine buffing across Surat homes.',
    iconName: 'Sparkles',
    heroImage: imgFloorPolishing,
    tagline: 'Restore Mirror-Like Sheen to Marble, Stone & Wooden Floors',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Italian marble & Indian green marble diamond polishing',
      'Kota stone and terrazzo floor grinding & crystallizing',
      'Wooden floor buffing and clear protective sealers',
      'Stain removal & scratch fill treatment',
      'High-shine mirror reflection finish'
    ],
    suratClimateNote: 'Hard water and humidity in Surat dull marble floors over time. Diamond pad polishing restores factory shine without changing stone tiles.',
    processSteps: [
      { step: '1', title: 'Grinding with Diamond Pads', desc: 'Removing scratches and uneven tile lips.' },
      { step: '2', title: 'Grouting & Crack Filling', desc: 'Filling stone joints with matching epoxy slurry.' },
      { step: '3', title: 'Crystallization & Buffing', desc: 'Buffing with specialized polishing powder for maximum gloss.' }
    ],
    faqs: [
      { q: 'How long does marble floor polishing last in a Surat apartment?', a: 'Typically 3 to 5 years with regular dry mopping.' }
    ]
  },
  {
    id: 'waterproofing',
    title: 'Terrace & Wall Waterproofing',
    shortDesc: 'Comprehensive waterproofing for terraces, parapet walls, bathrooms, and exterior walls to prevent dampness and water seepage.',
    iconName: 'ShieldAlert',
    heroImage: imgWaterproofing,
    tagline: 'Permanent Relief from Ceiling Drips, Wall Dampness & Seepage',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Terrace elastomeric liquid membrane waterproofing',
      'Bathroom and sunken slab polymer waterproofing',
      'Injection grouting for wall cracks and RCC beams',
      'Efflorescence (Sora) treatment for damp indoor walls',
      '100% leak-proof guarantee backed by written warranty'
    ],
    suratClimateNote: 'Flat RCC slab roofs in Surat society apartments frequently trap rainwater during monsoons, causing ceiling patches and rusted steel reinforcement if unsealed.',
    processSteps: [
      { step: '1', title: 'Substrate Cleaning & Chipping', desc: 'Removal of weak plaster, loose concrete, and dust from terrace/walls.' },
      { step: '2', title: 'Crack Sealing & Angle Filleting', desc: 'Cracks sealed with polyurethane sealant; coving created at wall-floor junctions.' },
      { step: '3', title: 'Polymer Modified Cementitious Coat', desc: 'Application of heavy-duty SmartCare / Dr. Fixit chemical membrane.' },
      { step: '4', title: 'Elastomeric Topcoat & Pond Test', desc: 'Final UV-reflective topcoat applied, followed by 48-hour water ponding test.' }
    ],
    faqs: [
      { q: 'How do I know if my wall needs dampness treatment before painting?', a: 'If you see peeling paint, white powder (efflorescence), or black mold, waterproofing is mandatory before painting.' }
    ]
  },
  {
    id: 'texture-wall-painting',
    title: 'Designer Texture Wall Painting',
    shortDesc: 'Luxury feature wall textures, Royale Play designs, stencils, metallic accents, and marble finishes for living rooms and bedrooms.',
    iconName: 'Sparkles',
    heroImage: imgTextureWall,
    tagline: 'Elevate Your Home Interiors with Custom Designer Wall Art & Textures',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Asian Paints Royale Play & Stucco marble finishes',
      'Metallic, Safari, Velvet, and Dune texture effects',
      'Geometric & traditional stencil wall patterns',
      'Custom color combinations tailored to interior lighting',
      'Washable and long-lasting luxury finish'
    ],
    suratClimateNote: 'Popular in Surat bungalows and luxury apartments in Vesu, Piplod, and City Light for accent TV walls and master bed backdrops.',
    processSteps: [
      { step: '1', title: 'Smooth Base Preparation', desc: 'Wall putty and sanding to achieve 100% mirror-smooth level surface.' },
      { step: '2', title: 'Basecoat Emulsion Application', desc: 'Application of contrast basecoat color chosen from Royale Play catalogue.' },
      { step: '3', title: 'Texture Application with Special Tools', desc: 'Expert application using combs, spatulas, sponges, or roller patterners.' },
      { step: '4', title: 'Protective Glaze Coat', desc: 'Clear protective lacquer applied to ensure washability and sheen.' }
    ],
    faqs: [
      { q: 'Are texture walls easy to clean?', a: 'Yes! Our Royale Play textures receive a protective acrylic glaze coat that makes them wipeable with a damp cloth.' }
    ]
  },
  {
    id: 'wood-polishing-varnishing',
    title: 'Wood Polishing & French Polish',
    shortDesc: 'Premium PU coating, melamine polishing, and traditional French hand polish for doors, windows, staircases, and wooden furniture.',
    iconName: 'Sparkle',
    heroImage: imgFrenchPolish,
    tagline: 'Restore Natural Wood Grain with Gloss, Semi-Gloss or Matte PU Finish',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Polyurethane (PU) clear gloss and matte coatings',
      'Melamine door and wardrobe polishing',
      'Traditional French hand polish for antique teak wood',
      'Wood stain color matching (Walnut, Teak, Mahogany, Rosewood)',
      'Scratch-resistant & water-repellent protective layer'
    ],
    suratClimateNote: 'Teak wood main doors common in Surat homes require UV-resistant external PU clear coat to prevent sun-bleaching and swelling in monsoon.',
    processSteps: [
      { step: '1', title: 'Deep Sanding', desc: 'Removing old lacquer and smoothing wood grains using progressive sandpapers.' },
      { step: '2', title: 'Wood Filler & Stain Application', desc: 'Filling wood pores and enhancing natural grains with rich wood stain.' },
      { step: '3', title: 'Sealer Coat', desc: 'Applying sanding sealer to lock wood fibers.' },
      { step: '4', title: 'PU / Melamine Spray or Hand Coat', desc: 'Applying 2-3 coats of high-grade clear varnish finish.' }
    ],
    faqs: [
      { q: 'Should I choose PU coating or Melamine polish for my main entrance door?', a: 'For main doors exposed to sunlight and rain, Exterior PU Polish is superior as it offers high UV and moisture resistance.' }
    ]
  },
  {
    id: 'metal-grill-gate-painting',
    title: 'Metal Grill & Gate Painting',
    shortDesc: 'Anti-rust primer coating and premium enamel finish for window grills, main gates, balcony railings, and iron structures.',
    iconName: 'Shield',
    heroImage: imgMetalGate,
    tagline: 'Stop Rusting & Restore Shine to Iron Grills, Gates & Railings',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Red oxide / Zinc chromate anti-rust primer',
      'High-gloss synthetic enamel & epoxy paints',
      'Black, Gold touch, Antique Copper, and Silver shade options',
      'Rust scraping and wire brush treatment',
      'Prevents structural corrosion on outdoor iron fittings'
    ],
    suratClimateNote: 'Surat humidity accelerates metal oxidation. Unprimed iron grills rust quickly during monsoons, leading to weak balcony railings.',
    processSteps: [
      { step: '1', title: 'Rust Removal', desc: 'Thorough scraping with wire brushes and emery paper to strip existing rust.' },
      { step: '2', title: 'Anti-Rust Primer', desc: 'Applying 1-2 coats of heavy-duty anti-corrosive primer.' },
      { step: '3', title: 'Double Enamel Topcoat', desc: 'Spray or brush application of high-gloss enamel paint.' }
    ],
    faqs: [
      { q: 'How often should metal grills be repainted in Surat?', a: 'Every 3 to 4 years to prevent deep rust penetration.' }
    ]
  },
  {
    id: 'pop-and-putty-work',
    title: 'POP False Ceiling & Wall Putty Work',
    shortDesc: 'Gypsum POP false ceiling design, plaster repair, and 2-coat acrylic wall putty for pristine, flat walls.',
    iconName: 'Layers',
    heroImage: imgPopPutty,
    tagline: 'Flawless Wall Levelling & Modern POP Ceiling Designs',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Water-resistant white cement wall putty application',
      'POP false ceiling and cove lighting box installation',
      'Crack filling and damaged plaster repair',
      'Laser-levelled flat wall preparation'
    ],
    suratClimateNote: 'Surat brickwork walls require acrylic-modified putty to prevent surface flaking during season changes.',
    processSteps: [
      { step: '1', title: 'Surface Debonding & Scraping', desc: 'Removing loose plaster and existing paint layer.' },
      { step: '2', title: 'Base Putty Application', desc: 'First coarse coat to level major surface unevenness.' },
      { step: '3', title: 'Fine Putty Coat & Vacuum Sanding', desc: 'Second smooth coat followed by fine mesh sanding.' }
    ],
    faqs: [
      { q: 'Is wall putty necessary before applying paint?', a: 'Yes! Wall putty provides a smooth base, reduces paint absorption, and enhances color brightness.' }
    ]
  },
  {
    id: 'commercial-society-painting',
    title: 'Commercial & Society Painting',
    shortDesc: 'Large-scale painting contracts for apartment societies, offices, retail showrooms, schools, and industrial premises in Surat.',
    iconName: 'Building2',
    heroImage: imgSocietyPainting,
    tagline: 'Timely, Cost-Effective Painting Solutions for Surat Apartment Societies & Commercial Spaces',
    priceStarting: 'Free On-Site Estimate',
    highlights: [
      'Dedicated project manager and large experienced crew',
      'Safety netting, swing stage scaffolding & safety insurance',
      'Flexible working hours for minimal operational disruption',
      'GST tax invoices and society committee contract documentation'
    ],
    suratClimateNote: 'Apartment societies in Adajan, Vesu, and Varachha require structured multi-year maintenance painting schedules.',
    processSteps: [
      { step: '1', title: 'Site Survey & Estimation', desc: 'Complete measurement, drone site inspection, and committee proposal.' },
      { step: '2', title: 'Safety Rigging & Surface Prep', desc: 'Scaffolding setup, high pressure wash, and crack repair.' },
      { step: '3', title: 'Phased Painting Execution', desc: 'Building-by-building execution minimizing resident inconvenience.' }
    ],
    faqs: [
      { q: 'Do you offer GST billing and society committee agreements?', a: 'Yes, we are a fully registered contracting entity with GST billing and formal society contracts.' }
    ]
  }
];

