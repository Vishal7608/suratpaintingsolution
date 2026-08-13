export const SEEDED_VERIFIED_BUSINESS_FACTS = [
  {
    fact_id: 'fact-1',
    category: 'COMPANY',
    fact: 'SuratPaintingSolution is a professional painting contractor service based in Surat, Gujarat, India.',
    source: 'Official Business Registration',
    verified_at: new Date().toISOString(),
    verified_by: 'Owner Admin',
    status: 'VERIFIED'
  },
  {
    fact_id: 'fact-2',
    category: 'COMPANY',
    fact: 'Official contact phone number is +91 94081 97990 and official email is suratpenters01@gmail.com.',
    source: 'Official Telecom & Domain Records',
    verified_at: new Date().toISOString(),
    verified_by: 'Owner Admin',
    status: 'VERIFIED'
  },
  {
    fact_id: 'fact-3',
    category: 'LOCATION',
    fact: 'Service coverage areas in Surat include Adajan, Vesu, Piplod, City Light, Athwa, Ghod Dod Road, Varachha, Katargam, Pal, Althan, Dumas Road, and Rander.',
    source: 'Operations Territory Map',
    verified_at: new Date().toISOString(),
    verified_by: 'Operations Manager',
    status: 'VERIFIED'
  },
  {
    fact_id: 'fact-4',
    category: 'SERVICE',
    fact: 'Core services provided: Interior House Painting, Exterior Weatherproof Painting, Terrace & Wall Waterproofing, Texture Wall Design (Royale Play), Wood Polishing & Varnishing, Metal Grill & Gate Painting, POP & Wall Putty Work, and Commercial/Society Painting.',
    source: 'Service Catalog 2026',
    verified_at: new Date().toISOString(),
    verified_by: 'Technical Supervisor',
    status: 'VERIFIED'
  },
  {
    fact_id: 'fact-5',
    category: 'MATERIAL',
    fact: 'Uses authentic Asian Paints (Royale, Apex, SmartCare) and Berger Paints products with manufacturer shade cards.',
    source: 'Material Vendor Procurement Invoices',
    verified_at: new Date().toISOString(),
    verified_by: 'Purchase Manager',
    status: 'VERIFIED'
  },
  {
    fact_id: 'fact-6',
    category: 'PROCESS',
    fact: 'Provides dust-free mechanized sanding using HEPA vacuum sanders to trap micro-chalk dust during wall preparation.',
    source: 'Equipment Specifications',
    verified_at: new Date().toISOString(),
    verified_by: 'Site Supervisor',
    status: 'VERIFIED'
  },
  {
    fact_id: 'fact-7',
    category: 'WARRANTY',
    fact: 'Offers 1-Year Workmanship Guarantee on interior emulsion jobs and 3 to 5 Year Manufacturer Waterproofing Warranties on SmartCare Damp Proof treatments.',
    source: 'Official Customer Service Agreement',
    verified_at: new Date().toISOString(),
    verified_by: 'Legal / QA Lead',
    status: 'VERIFIED'
  }
];

class BusinessFactsService {
  constructor() {
    this.facts = [...SEEDED_VERIFIED_BUSINESS_FACTS];
  }

  getAllFacts() {
    return this.facts;
  }

  getVerifiedFacts() {
    return this.facts.filter(f => f.status === 'VERIFIED');
  }

  addFact(fact) {
    const newFact = {
      ...fact,
      fact_id: `fact-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      verified_at: new Date().toISOString(),
      status: 'VERIFIED'
    };
    this.facts.unshift(newFact);
    return newFact;
  }

  verifyTextAgainstBusinessFacts(text) {
    const verifiedFactsUsed = [];
    const unverifiedMatches = [];

    const lowerText = text.toLowerCase();

    this.getVerifiedFacts().forEach(fact => {
      if (fact.category === 'LOCATION' && (lowerText.includes('vesu') || lowerText.includes('adajan') || lowerText.includes('surat'))) {
        verifiedFactsUsed.push(fact.fact);
      }
      if (fact.category === 'SERVICE' && (lowerText.includes('painting') || lowerText.includes('waterproofing'))) {
        verifiedFactsUsed.push(fact.fact);
      }
    });

    if (lowerText.includes('lifetime free') || lowerText.includes('guaranteed 100 years') || lowerText.includes('best painter in the universe')) {
      unverifiedMatches.push('Contains exaggerated or unverified promotional claims.');
    }

    return {
      hasUnverifiedClaims: unverifiedMatches.length > 0,
      unverifiedMatches,
      verifiedFactsUsed: Array.from(new Set(verifiedFactsUsed))
    };
  }
}

export const businessFactsService = new BusinessFactsService();
