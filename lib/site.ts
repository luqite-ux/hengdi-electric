// ---------------------------------------------------------------------------
// Hengdi Electric — site-wide content data
// All values must be scoped to information confirmed by company materials.
// ---------------------------------------------------------------------------

export const company = {
  name: 'Hengdi Electric',
  fullName: 'Zhenjiang Hengdi Intelligent Electric Co., Ltd.',
  tagline: 'Independent Innovation · Quality Service · Pursuit of Excellence',
  address: 'No. 3-1, No. 1 Sanfeng Road, Sanmao Street, Yangzhong, Zhenjiang, Jiangsu, China',
  phone: '+86 182 0528 3908',
  email: '641320694@qq.com',
  zip: '212200',
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export type ProductFamily = {
  name: string
  description: string
  models?: string
}

export type Product = {
  slug: string
  name: string
  short: string
  description: string
  image: string
  highlights: string[]
  specs: { label: string; value: string }[]
  families?: ProductFamily[]
  /** Per-family or per-series spec table rows */
  specTable?: {
    caption?: string
    headers: string[]
    rows: string[][]
  }
}

export const products: Product[] = [
  // ── Cable Tray ─────────────────────────────────────────────────────────────
  {
    slug: 'cable-tray',
    name: 'Cable Tray Systems',
    short: 'Ladder, perforated, trough, long-span, cable shaft and fittings',
    description:
      'A complete range of cable support systems manufactured to national and international standards. Ladder-type trays suit large-diameter and power cables; trough/channel trays provide fully enclosed protection for computer, communication and sensitive-system cables; perforated trays offer versatility for general wiring; long-span trays span wide column pitches without intermediate supports; cable shafts provide vertical routing infrastructure. Fittings include horizontal bends, tees, reducers, crosses and covers to complete any layout.',
    image: '/products/cable-tray.png',
    highlights: [
      'Ladder type (XQJ-T): small weight, low cost, excellent ventilation and heat dissipation',
      'Trough/channel type (XQJ-C): fully enclosed, ideal for sensitive and control cables',
      'Perforated tray, long-span and cable shaft types available',
      'Full fittings range: bends, tees, reducers, crosses, covers',
      'Hot-dip galvanized, electro-galvanized, powder-coated and stainless-steel surface options',
      'Representative widths 50 – 800 mm, heights 60 – 200 mm; widths up to 1,200 mm available — exact range confirmed per project',
    ],
    specs: [
      { label: 'Material', value: 'Steel (galvanized) / Stainless steel' },
      { label: 'Width range', value: '50 – 1,200 mm (series/project-dependent)' },
      { label: 'Height range', value: '60 – 200 mm' },
      { label: 'Monthly output', value: '300 tons' },
    ],
    families: [
      {
        name: 'XQJ-T  Ladder-Type Cable Tray',
        description:
          'Manufactured to relevant domestic and international technical standards. Features small weight, low cost, unique shaping, fine permeability and quick heat dissipation. Applicable for laying big-diameter cables — especially high-voltage, low-voltage and power cables.',
        models: 'XQJ-T-01 (straight) · XQJ-T-02 (horizontal bend) · XQJ-T-03 (horizontal tee) and further fittings',
      },
      {
        name: 'XQJ-C  Trough/Channel-Type Cable Tray',
        description:
          'A fully enclosed cable support system for computer cables, communication cables, thermocouple cables and control cables of highly-sensitive systems. Works well in resisting interference of control cable shield and protecting cables in seriously corrosive environments.',
        models: 'XQJ-C-01A (straight) · XQJ-C-02A (horizontal curved) · XQJ-C-03A (horizontal 3-way) and further fittings',
      },
      {
        name: 'Perforated Tray, Long-Span & Cable Shaft',
        description:
          'Perforated trays suit general-purpose cable routing with additional ventilation. Long-span trays bridge wide column pitches. Cable shafts support vertical cable routing in buildings.',
        models: 'Sizes and models confirmed per project requirements',
      },
    ],
    specTable: {
      caption: 'Ladder-Type (XQJ-T-01) Representative Sizes — b × h (mm) / Weight (kg)',
      headers: ['No.', 'Model', 'b (mm)', 'h (mm)', 'Weight (kg)'],
      rows: [
        ['1', 'T-01-6-2', '200', '60', '12.54'],
        ['2', 'T-01-10-2', '200', '100', '19.15'],
        ['3', 'T-01-15-2', '200', '150', '28.50'],
        ['4', 'T-01-6-3', '300', '60', '13.81'],
        ['5', 'T-01-10-3', '300', '100', '20.43'],
        ['6', 'T-01-15-3', '300', '150', '29.78'],
        ['7', 'T-01-6-4', '400', '60', '20.57'],
        ['8', 'T-01-10-4', '400', '100', '24.99'],
        ['9', 'T-01-15-4', '400', '150', '31.04'],
        ['10', 'T-01-20-4', '400', '200', '37.63'],
        ['11', 'T-01-6-6', '600', '60', '24.24'],
        ['12', 'T-01-10-6', '600', '100', '27.53'],
        ['13', 'T-01-15-6', '600', '150', '33.58'],
        ['14', 'T-01-20-6', '600', '200', '40.71'],
        ['15', 'T-01-6-8', '800', '60', '27.88'],
        ['16', 'T-01-10-8', '800', '100', '30.08'],
        ['17', 'T-01-15-8', '800', '150', '36.12'],
        ['18', 'T-01-20-8', '800', '200', '43.79'],
      ],
    },
  },

  // ── Busbar ─────────────────────────────────────────────────────────────────
  {
    slug: 'busbar',
    name: 'Busbar Trunking Systems',
    short: 'HDCMC, HDKFW, HDNHMC, HDFMC and HDZMC busway series',
    description:
      'Hengdi busbar trunking systems use high-quality flame-retardant insulation materials and select high-conductivity, low-resistivity copper or aluminum conductors per GB/T 5585.2. The CMC series uses aluminum alloy enclosures with IP66 protection. Rated current ranges from 100 A up to 6,300 A (copper dense series). Products are manufactured to IEC 60439 and GB/T 7251.6-2015, with China Compulsory Certification (CCC) and type-test reports available.',
    image: '/products/busbar.png',
    highlights: [
      'HDCMC copper dense busway: 100 A – 6,300 A, IP54 / IP66',
      'HDCMC aluminum dense busway: 400 A – 4,000 A',
      'HDKFW high-strength & air-insulated enclosed busway: 250 A – 6,300 A',
      'HDNHMC fire-resistant busway: operates ≥ 90 min at 960 °C ambient',
      'HDFMC waterproof busway: 400 A – 7,500 A',
      'HDZMC lighting busway: 16 A – 200 A, IP40 / IP54',
      'All insulation from high-quality flame-retardant materials',
    ],
    specs: [
      { label: 'Conductor', value: 'Copper / Aluminum' },
      { label: 'Rated current', value: '16 A – 6,300 A (series-dependent)' },
      { label: 'Protection', value: 'IP40 / IP54 / IP66' },
      { label: 'Monthly output', value: '2,000 m' },
    ],
    families: [
      {
        name: 'HDCMC  Dense Copper Busway',
        description:
          'Fully enclosed aluminum alloy fin enclosure. IP66 protection, low temperature rise, high current-carrying capacity, long-span installation. Enclosure doubles as PE grounding conductor. CCC certified.',
        models: 'HDCMC-2A-3P · HDCMC-2A-4P · HDCMC-2A-5P · HDCMC-3A-3P · HDCMC-3A-4P · HDCMC-3A-5P',
      },
      {
        name: 'HDCMC  Dense Aluminum Busway',
        description:
          'Same enclosure technology as the copper series; aluminum conductors for cost-effective high-current distribution.',
        models: 'HDCMC-2A-3P · HDCMC-2A-4P · HDCMC-2A-5P (aluminum)',
      },
      {
        name: 'HDKFW  High-Strength Enclosed Busway',
        description:
          'Produced to IEC standards. Combines advantages of air-insulated and dense busways. Corrugated cold-rolled enclosure for greater mechanical strength. PTFE + silicone (high-polymer) insulation — flame-retardant, moisture-resistant, sealed, anti-corrosion. Tap-off boxes can be positioned anywhere. Suits automotive plants, large malls, exhibition halls, airports and high-rise buildings.',
        models: 'HDKFW-2A-4P · HDKFW-2A-5P',
      },
      {
        name: 'HDNHMC  Fire-Resistant Busway',
        description:
          'In addition to full electrical performance, provides unique fire-resistant properties. Conductors: high-quality electrolytic copper; insulation: mica and high-strength ceramic materials; enclosure: double-layer thermal-isolation structure with fire-retardant treatment. Operates continuously ≥ 90 min at 960 °C ambient temperature. Non-toxic, non-polluting; prevents water ingress when extinguishing fires.',
        models: 'HDNHMC-4P · HDNHMC-5P',
      },
      {
        name: 'HDFMC  Waterproof Busway',
        description:
          'Waterproof busbar trunking for environments requiring enhanced moisture protection.',
        models: 'HDFMC-2A  (400 – 7,500 A)',
      },
      {
        name: 'HDZMC  Lighting Busway',
        description:
          'Low-current lighting distribution busway for commercial and industrial buildings.',
        models: 'HDZMC-3P · HDZMC-4P · HDZMC-5P  (16 – 200 A)',
      },
    ],
    specTable: {
      caption: 'Busbar Selection Table (representative series)',
      headers: ['Series', 'Structure', 'Model', 'Rated Current (A)', 'Icw (kA)', 'Protection'],
      rows: [
        ['HDZMC Lighting', '3-phase 3-wire', 'HDZMC-3/4/5P', '16 25 40', '6', 'IP40 / IP54'],
        ['HDZMC Lighting', '3-phase 3-wire', 'HDZMC-3/4/5P', '40 63 80 100 125 160 200', '6 – 15', 'IP54'],
        ['HDCMC Copper Dense', '3-phase 3-wire', 'HDCMC-2A-3P', '100 160 250 315 400 500 630', '15', 'IP54 / IP66'],
        ['HDCMC Copper Dense', '3-phase 4-wire', 'HDCMC-2A-4P', '400 500 630 800 1000 1250 1600 2000 2500', '30 / 80', 'IP54 / IP66'],
        ['HDCMC Copper Dense', '3-phase 4-wire +PE', 'HDCMC-2A-5P', '3150 3200 4000 5000 5500 6000 6300', '100', 'IP54 / IP66'],
        ['HDCMC Aluminum Dense', '3-phase 4-wire +PE', 'HDCMC-2A-4/5P', '400 500 630 800 1000 – 3600 4000', '30 / 80', 'IP54 / IP66'],
        ['HDKFW High-Strength', '3-phase 4/5-wire', 'HDKFW-2A-4P / 5P', '250 400 500 630 800 1000 1250 1600', '30', 'IP54'],
        ['HDKFW Air-Insulated', '3-phase 4/5-wire', 'HDKFW-2A-4P / 5P', '1600 2000 3200 4000 – 6300', '80 / 100', 'IP40'],
        ['HDNHMC Fire-Resistant', '3-phase 4-wire', 'HDNHMC-4P', '160 200 250 315 400 500 630 800 1000 1250 1600 2000 2500 3150', '20 – 80', 'IP66'],
        ['HDFMC Waterproof', '3-phase', 'HDFMC-2A', '400 630 800 1000 1250 1600 – 4000 – 6300 – 7500', '30 – 120', '—'],
      ],
    },
  },

  // ── Switchgear ─────────────────────────────────────────────────────────────
  {
    slug: 'switchgear',
    name: 'Switchgear & Distribution Boxes',
    short: 'XL, JXF, SDY and PZ30 low-voltage assemblies',
    description:
      'Low-voltage complete switchgear and distribution assemblies designed and manufactured to IEC and national GB standards. The XL series power distribution cabinets use imported and domestically-advanced electrical components and are suited to industrial, commercial, service and civil-building AC 50 Hz systems at up to 600 V (three-phase three-wire / four-wire). JXF assembled switchgear cabinets, SDY dual-power distribution boxes and PZ30 distribution boards complete the range for all project types.',
    image: '/products/switchgear.png',
    highlights: [
      'XL series: power distribution cabinet for mining, industrial, commercial and civil use',
      'JXF series: assembled switchgear cabinet for general power distribution',
      'SDY series: dual-power (change-over) distribution boxes',
      'PZ30 series: modular distribution boards for civil and light-commercial use',
      'Standards: IEC 60439 / GB / national compulsory standards',
      'OEM / ODM: custom configurations, dimensions and component brands supported',
    ],
    specs: [
      { label: 'Series', value: 'XL / JXF / SDY / PZ30' },
      { label: 'Rated voltage', value: '≤ 600 V AC (XL series)' },
      { label: 'Frequency', value: '50 Hz' },
      { label: 'Application', value: 'Industrial / Commercial / Civil' },
    ],
    families: [
      {
        name: 'XL Series  Low-Voltage Complete Switchgear',
        description:
          'New-type power distribution cabinet designed to IEC and national standards. Uses imported or domestic best-in-class electrical components. Applicable for mining enterprises, commerce, service industries and civil buildings — AC 50 Hz, ≤ 600 V three-phase three-wire or four-wire distribution for power or lighting.',
        models: 'XL-21 (standard welded) · XL-21T (general structure) · XL-21X (new C-section) · XL-21K (control)',
      },
      {
        name: 'JXF Series  Assembled Switchgear Cabinet',
        description:
          'Versatile assembled switchgear for general low-voltage power distribution.',
        models: 'Confirmed per project specification',
      },
      {
        name: 'SDY Series  Dual-Power Distribution Box',
        description:
          'Dual-source automatic change-over distribution boxes for critical load continuity.',
        models: 'Confirmed per project specification',
      },
      {
        name: 'PZ30 Series  Distribution Board',
        description:
          'Compact modular distribution boards for civil, residential and light-commercial applications.',
        models: 'PZ30 series — confirmed per project specification',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faqCategories = [
  {
    category: 'Products & Specifications',
    items: [
      {
        q: 'What product lines does Hengdi Electric offer?',
        a: 'We manufacture three main product lines: Cable Tray Systems (ladder, trough/channel, perforated, long-span, cable shaft and fittings), Busbar Trunking Systems (HDCMC copper/aluminum dense, HDKFW high-strength and air-insulated, HDNHMC fire-resistant, HDFMC waterproof and HDZMC lighting), and Switchgear & Distribution Boxes (XL, JXF, SDY and PZ30 series).',
      },
      {
        q: 'What specifications are available for cable trays?',
        a: 'Ladder-type and trough-type trays are commonly available in widths from 50 mm up to 800 mm and heights of 60 mm, 100 mm, 150 mm and 200 mm. Widths up to 1,200 mm are available for relevant series; exact availability is confirmed per project. Long-span and cable shaft types are also offered. Fittings — horizontal bends, tees, reducers and crosses — are available to match each tray family. Not every model is available in every size; please confirm the specific combination when inquiring.',
      },
      {
        q: 'What is the rated current range for busbar trunking?',
        a: 'Current ratings depend on the series. The HDZMC lighting busway covers 16 A – 200 A. The HDCMC copper dense series extends up to 6,300 A. The HDKFW series covers 250 A – 6,300 A. The HDNHMC fire-resistant series covers 160 A – 3,150 A (per catalog table). The HDFMC waterproof series covers 400 A – 7,500 A. Please contact us with your specific current requirement so we can recommend the correct series and model.',
      },
      {
        q: 'Do you support customized sizes, materials or configurations?',
        a: 'Yes. We fully support customization of dimensions, materials, surface treatment, color and configuration for both cable trays and busbar systems. OEM and ODM services are available. Please provide your specifications when inquiring.',
      },
      {
        q: 'Can you provide samples before placing a full order?',
        a: 'Cable tray samples can generally be provided. Busbar trunking samples are subject to negotiation given manufacturing complexity. In both cases, sample freight is borne by the customer.',
      },
      {
        q: 'What technical documentation is available?',
        a: 'Busbar systems carry China Compulsory Certification (CCC) and we can provide type-test reports (GB/T 7251.6-2015 / IEC 60439). Cable trays can be supplied with inspection reports from the Market Supervision Administration on request.',
      },
      {
        q: 'Do you support OEM / ODM services?',
        a: 'Yes. Both OEM and ODM are supported for all product lines.',
      },
      {
        q: 'What is the expected service life of your products?',
        a: 'Products carry a one-year quality warranty. Under normal operating conditions, service life typically exceeds five years; actual life depends on the installation environment and usage conditions.',
      },
    ],
  },
  {
    category: 'Pricing',
    items: [
      {
        q: 'Do quotations include packaging, shipping and taxes?',
        a: 'Packaging, shipping and applicable taxes are confirmed for each order. Please contact us with your destination and order details so we can provide a complete, accurate quotation.',
      },
      {
        q: 'Are prices stable, or can they fluctuate?',
        a: 'Prices may vary in line with raw material costs (copper, aluminum, steel) and exchange rate movements. We will notify you of any price adjustments before order confirmation.',
      },
      {
        q: 'Do you offer preferential pricing for long-term cooperation or bulk orders?',
        a: 'Yes. We offer preferential pricing for long-term partners and for bulk orders. Please reach out to discuss terms.',
      },
    ],
  },
  {
    category: 'Samples & Prototyping',
    items: [
      {
        q: 'What is the sample lead time?',
        a: 'Samples are normally dispatched within approximately 15 days, subject to product type and order conditions; the exact lead time is confirmed case by case. Busbar trunking samples are subject to negotiation given manufacturing complexity. In all cases, sample freight is borne by the customer.',
      },
      {
        q: 'Do you support prototype confirmation before mass production?',
        a: 'Yes. For customized products, we support prototype or pre-production sample confirmation before proceeding to full production.',
      },
      {
        q: 'Are samples consistent with mass-production goods?',
        a: 'Yes. Samples are manufactured to the same materials, processes and quality standards as mass-production goods.',
      },
    ],
  },
  {
    category: 'Production & Delivery',
    items: [
      {
        q: 'What is the standard production lead time?',
        a: 'Our standard lead time is approximately 15 days, subject to order conditions such as product type, customization requirements and current production schedule. The confirmed lead time will be stated in the order.',
      },
      {
        q: 'Is delivery time stable for larger orders?',
        a: 'We maintain stable production scheduling and strive to honor agreed delivery dates regardless of season. Lead times for particularly large or complex orders are confirmed individually.',
      },
      {
        q: 'Do you support expedited production?',
        a: 'Yes. Expedited production is supported where capacity allows. We can also provide production progress updates on request.',
      },
      {
        q: 'What are your monthly production capacities?',
        a: 'Current capacity is approximately 300 tons of cable tray per month and 2,000 meters of busbar trunking per month.',
      },
    ],
  },
  {
    category: 'Quality & After-Sales',
    items: [
      {
        q: 'What quality control processes are in place?',
        a: 'We operate a full production quality control process under ISO 9001 certification. Busbar systems are CCC certified and have passed independent type testing to GB/T 7251.6-2015 and IEC 60439.',
      },
      {
        q: 'Do you support third-party inspection?',
        a: 'Yes. Third-party inspection by a customer-appointed inspection agency is supported. Factory visits for inspection can also be arranged.',
      },
      {
        q: 'What happens if a quality issue arises?',
        a: 'Goods are only dispatched after passing our factory inspection. If a quality issue is identified, it is resolved before shipment. After delivery, quality issues within the warranty period are handled promptly.',
      },
      {
        q: 'What is the warranty period?',
        a: 'All products carry a one-year quality warranty from the date of delivery.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Stats (homepage / about)
// ---------------------------------------------------------------------------

export const stats = [
  { value: '300 t', label: 'Cable tray output / month' },
  { value: '2,000 m', label: 'Busbar output / month' },
  { value: '~15 days', label: 'Standard lead time' },
  { value: '6,300 A', label: 'Max busbar rated current' },
]

// ---------------------------------------------------------------------------
// Certifications
// ---------------------------------------------------------------------------

export const certifications = [
  'CCC (3C) China Compulsory Certification — busbar systems',
  'ISO 9001 Quality Management System',
  'GB/T 7251.6-2015 Type Test (IEC 60439)',
  'GB/T 5585.2 Conductor Standard',
]
