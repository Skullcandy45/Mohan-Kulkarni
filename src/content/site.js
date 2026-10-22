/**
 * Single Source of Truth for Dr. Mohan Kulkarni's Dental Practice
 * Est. 1977 · Santacruz West, Mumbai · 47+ Years Clinical Mastery
 */

export const siteConfig = {
  doctor: {
    name: 'Dr. Mohan Kulkarni',
    credentials: 'BDS (1975, Govt Dental Mumbai), Past President IDA Mumbai, Fellow ICOI',
    title: 'Chief Dental Surgeon & Implantologist',
    subtitle: 'ADVANCED DENTISTRY · IMPLANTS · SANTACRUZ (W) · EST. 1977',
    monogram: 'MK',
    image: '/assets/images/dr_mohan_kulkarni.jpg',
    bio: 'Pioneering dental surgeon with over 47 years of surgical mastery in immediate dental implants, digital smile design, and tooth-preserving microscopic dentistry in Santacruz West, Mumbai.',
    placeholder: true,
  },
  
  contact: {
    phone: '+91 98200 45890',
    phoneRaw: '+919820045890',
    landline: '022 2649 0333',
    landlineRaw: '02226490333',
    email: 'consult@drmohankulkarni.com',
    chambersName: "Chambers of Dr. Mohan Kulkarni · Dental Solutions",
    address: {
      line1: 'Suite 2, Ground Floor, Saraswat Co-op Housing Society',
      line2: 'Near Podar School, Saraswat Colony, Santacruz West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400054',
      landmark: 'Near Podar International School & SV Road',
      mapUrl: 'https://maps.google.com/?q=Santacruz+West+Mumbai',
    },
    triageNotice: 'Priority Emergency Dental Care & Rapid Tooth Pain Triage Available Daily',
    hours: {
      regular: 'Mon – Sat: 10:00 – 13:00 & 18:00 – 21:00',
      sunday: 'Sunday: Closed (On-call dental trauma emergencies only)',
      urgentCare: 'Immediate pain relief and same-day dental emergency slots reserved daily.',
    },
    placeholder: true,
  },

  // Operational Dock 4-card data
  operationalDock: [
    {
      id: 'hours',
      title: 'Working Hours',
      badge: 'Clock',
      type: 'light',
      primaryText: 'Mon – Sat: 10:00 – 13:00 & 18:00 – 21:00',
      secondaryText: 'Emergency triage slots reserved daily. Post-procedure clinical support available.',
      ctaText: 'Clinic: 022 2649 0333',
      ctaHref: 'tel:02226490333',
      placeholder: true,
    },
    {
      id: 'contact',
      title: 'Contact Us',
      badge: 'PhoneCall',
      type: 'bronze',
      primaryText: 'Direct assistance for appointments & second opinions',
      secondaryText: 'Our clinical coordinator confirms your visit and answers treatment questions promptly.',
      ctaText: '+91 98200 45890',
      ctaHref: 'tel:+919820045890',
      placeholder: true,
    },
    {
      id: 'directions',
      title: 'Directions',
      badge: 'MapPin',
      type: 'light',
      primaryText: 'Santacruz West Chambers',
      secondaryText: 'Saraswat Colony, Near Podar International School, Santacruz West, Mumbai 400054',
      ctaText: 'Show on map ?',
      ctaHref: 'https://maps.google.com/?q=Santacruz+West+Mumbai',
      placeholder: true,
    },
    {
      id: 'quickbook',
      title: 'Lead Dental Surgeon',
      subtitle: 'Dr. Mohan Kulkarni',
      specialty: 'Dental Implants & Aesthetics',
      type: 'portrait',
      image: '/assets/images/dr_mohan_kulkarni.jpg',
      ctaText: 'Book appointment',
      ctaHref: '#book-appointment',
      placeholder: true,
    },
  ],

  // Section 3: Subspecialty Ticker Strip
  subspecialtiesTicker: [
    'Immediate Load Dental Implants',
    '3D Digital Smile Design (DSD)',
    'Single-Visit Microscopic RCT',
    'Clear Aligners & Invisible Orthodontics',
    'Full Mouth Rehabilitation',
    'Porcelain E.max Aesthetic Veneers',
    'Computerized Pain-Free Wand Anesthesia',
    'Laser Periodontics & Gum Architecture',
  ],

  // Section 4: Practice Manifesto & Metrics
  manifesto: {
    eyebrow: 'MEET YOUR DOCTOR',
    statement: 'Gentle, evidence-led dental care with an unyielding commitment to preserving your natural teeth.',
    leadParagraph:
      'As a trusted dental practice in Santacruz West for over 47 years, we specialize in immediate dental implants, microscopically guided root canals, and facially harmonic smile makeovers. Every treatment plan is crafted around biological tooth conservation and lasting functional stability.',
    highlightSentence:
      'We never cut down healthy tooth structure or rush into extractions when natural biological tooth preservation is possible.',
    badgeLabel: 'IDA PAST PRESIDENT / BDS 1975',
    image: '/assets/images/dr_mohan_kulkarni.jpg',
    metrics: [
      {
        value: '47+ Years',
        label: 'Clinical Mastery',
        caption: 'Serving families across Mumbai since 1977',
        placeholder: true,
      },
      {
        value: '1,800+',
        label: 'Implants & Makeovers',
        caption: 'Predictable osseointegration & lifelike aesthetics',
        placeholder: true,
      },
      {
        value: '99.4%',
        label: 'Patient Satisfaction',
        caption: 'Gentle, pain-free protocols with zero anxiety',
        placeholder: true,
      },
    ],
    placeholder: true,
  },

  // Section 5: Clinical Methodology & Video / Technology
  clinicalMethodology: {
    eyebrow: 'PRECISION DIAGNOSTICS & CLINICAL PROTOCOLS',
    title: 'Pain-Free Microscopic Precision,',
    titleAccent: 'Predictable Longevity.',
    summary:
      'We bridge 47+ years of surgical tactile intuition with high-magnification dental microscopy, 3D intraoral optical scanning, and computerized painless anesthesia.',
    paragraph2:
      'From single-visit root canals to immediate-load implant placement, every procedure is carried out with hospital-grade multi-stage autoclave sterilization and gentle chairside demeanor.',
    checklist: [
      {
        id: 'microscope',
        title: 'High-Magnification Dental Microscopy',
        desc: 'Up to 20× optical magnification locates micro-canals, hidden fractures, and sub-gingival margins invisible to the unaided eye.',
      },
      {
        id: 'intraoral',
        title: '3D Optical Intraoral Scanning',
        desc: 'Zero uncomfortable impression pastes. Instant digital scans create micron-accurate models for computer-designed crowns and aligners.',
      },
      {
        id: 'wand',
        title: 'Computerized Wand Painless Anesthesia',
        desc: 'Flow-rate controlled single-tooth anesthesia eliminates syringe sting, tissue trauma, and collateral numbness in lips or tongue.',
      },
      {
        id: 'preservation',
        title: 'Biological Tooth Preservation Protocol',
        desc: 'Minimally invasive preparation techniques conserve maximum natural tooth enamel and dentinal architecture.',
      },
      {
        id: 'sterilization',
        title: 'Class-B Autoclave Multi-Stage Sterilization',
        desc: 'Rigid international hospital-grade infection control protocols with vacuum autoclave and individually pouch-sealed instruments.',
      },
    ],
    video: {
      mp4: '/Videos/clinic-tour.mp4',
      webm: '/Videos/clinic-tour.mp4',
      poster: '/assets/images/dental_institute.jpg',
    },
    placeholder: true,
  },

  // Section 6 & 7: Streamlined Interactive Services & Treatments Showcase
  categories: [
    { id: 'all', label: 'All Treatments' },
    { id: 'implants', label: 'Dental Implants' },
    { id: 'smile', label: 'Smile Design & Veneers' },
    { id: 'endodontics', label: 'Microscopic RCT' },
    { id: 'orthodontics', label: 'Clear Aligners' },
    { id: 'rehab', label: 'Full Mouth Rehab' },
  ],

  procedures: [
    {
      id: 'immediate-implants',
      category: 'implants',
      title: 'Immediate Load Dental Implants',
      subhead: 'Permanent Titanium & Zirconia Tooth Replacement',
      badge: 'Surgical Mastery',
      icon: 'ShieldCheck',
      description:
        'Biomimetic dental implants anchored into the jawbone to replace missing or failing teeth with permanent, natural-feeling crowns. Guided 3D placement ensures optimal osseointegration and gingival emergence profile.',
      highlights: [
        'Immediate same-day functional provisionalization where indicated',
        'Grade-5 Swiss titanium and biocompatible zirconia fixtures',
        'Preserves alveolar bone density and prevents facial sinking',
        'Over 47 years of surgical implant clinical experience',
      ],
      indication: 'Single or multiple missing teeth, failing bridge-work, or loose dentures',
      recovery: 'Same-day return to light routine · Complete osseointegration in 8–12 weeks',
      placeholder: true,
    },
    {
      id: 'digital-smile-design',
      category: 'smile',
      title: '3D Digital Smile Design (DSD)',
      subhead: 'Facially Driven Aesthetic Harmony & Mockups',
      badge: 'Aesthetic Dentistry',
      icon: 'Sparkle',
      description:
        'A comprehensive aesthetic protocol analyzing facial proportions, lip dynamics, and tooth display. Patients preview their final smile in 3D and try in physical aesthetic mockups before any procedure commences.',
      highlights: [
        'Facially harmonic proportions calibrated to unique facial features',
        'Physical try-in mockup lets you see your smile before final bonding',
        'Ultra-conservative micro-thin ceramic preparation',
        'Handcrafted multi-layered porcelain mimicking natural enamel opalescence',
      ],
      indication: 'Chipped, discolored, uneven, worn, or gapped anterior teeth',
      recovery: 'Non-invasive preview · Final veneers seated in 2 comfortable appointments',
      placeholder: true,
    },
    {
      id: 'single-visit-rct',
      category: 'endodontics',
      title: 'Single-Visit Microscopic Root Canal',
      subhead: 'Optical Magnification & Ultrasonic Cleansing',
      badge: 'Pain-Free Protocol',
      icon: 'FirstAid',
      description:
        'Gentle eradication of pulpal infection performed under high-power dental magnification. Advanced rotary nickel-titanium instrumentation and warm biocompatible obturation save severely infected teeth painlessly.',
      highlights: [
        'Zeiss high-power optical magnification for complex canal navigation',
        'Apex-locator guided length determination avoids over-instrumentation',
        'Ultrasonic irrigant activation eradicates deep bacterial biofilms',
        'Frequently completed in a single comfortable 60-minute visit',
      ],
      indication: 'Acute toothache, deep decay reaching the pulp, abscess, or thermal sensitivity',
      recovery: 'Immediate pain relief · Normal chewing restored once crown is placed',
      placeholder: true,
    },
    {
      id: 'clear-aligners',
      category: 'orthodontics',
      title: 'Clear Aligners & Invisible Orthodontics',
      subhead: 'Discreet Tooth Straightening for Adults & Teens',
      badge: 'Digital Orthodontics',
      icon: 'Smiley',
      description:
        'Custom-engineered transparent medical-grade aligners that gently reposition crooked, rotated, or spaced teeth without metallic brackets or wires. Coordinated with orthodontic specialists for optimal functional occlusion.',
      highlights: [
        'Near-invisible aesthetic appearance for professional adults and teens',
        'Removable for meals, social events, and effortless brushing and flossing',
        'Digital progression staging mapped out from day one',
        'No painful wire tightenings or bracket emergencies',
      ],
      indication: 'Crowded teeth, spacing, midline deviation, overbite, or relapse from prior braces',
      recovery: 'No downtime · New aligner trays changed comfortably every 10–14 days',
      placeholder: true,
    },
    {
      id: 'full-mouth-rehab',
      category: 'rehab',
      title: 'Full Mouth Neuromuscular Rehabilitation',
      subhead: 'Comprehensive Restoration of Chewing & Aesthetics',
      badge: 'Comprehensive Care',
      icon: 'Cpu',
      description:
        'Systematic restoration of severely worn, broken-down, or missing dentition. Re-establishes the ideal vertical dimension of occlusion, relieves jaw joint (TMJ) strain, and creates a breathtaking natural smile.',
      highlights: [
        'Restores collapsed bite height and relieves facial muscle fatigue',
        'Combines implants, ceramic crowns, onlays, and aesthetic veneers',
        'Digital articulated bite registration ensures joint comfort',
        'Decades of clinical experience managing severe attrition and erosion',
      ],
      indication: 'Severely worn teeth from grinding (bruxism), multiple missing teeth, collapsed bite',
      recovery: 'Phased, comfortable execution with interim aesthetic temporaries',
      placeholder: true,
    },
    {
      id: 'porcelain-veneers',
      category: 'smile',
      title: 'Ultra-Thin E.max Porcelain Veneers',
      subhead: 'Lithium Disilicate Ceramic Radiance',
      badge: 'Ceramic Artistry',
      icon: 'Sparkle',
      description:
        'Individually sculpted porcelain shells bonded to the front surfaces of teeth. Replicates the micro-texture, natural optical translucency, and light reflection of youthful biological enamel.',
      highlights: [
        'High-strength lithium disilicate (E.max) ceramic material',
        'Stain-resistant glassy glaze retains brilliance for decades',
        'Preserves maximum natural tooth structure with micro-preparation',
        'Custom shade matching to your natural skin and lip tones',
      ],
      indication: 'Stubborn tetracycline stains, enamel fluorosis, irregular tooth shape or spacing',
      recovery: '2 comfortable visits · Long-lasting brilliant natural smile',
      placeholder: true,
    },
  ],

  // Section 8: Specialist-Led Care Team (3 Specialists with AI Portraits)
  careTeam: [
    {
      id: 'dr-mohan-kulkarni',
      name: 'Dr. Mohan Kulkarni',
      role: 'Chief Dental Surgeon & Implantologist',
      credentials: 'BDS (1975, Govt Dental Mumbai), Past President IDA Mumbai, Fellow ICOI',
      focus: 'Dental Implants, Full Mouth Rehabilitation & Micro-Dentistry',
      bio: 'Over 47 years of distinguished clinical experience in Santacruz West. Renowned for painless surgical precision, biological tooth conservation, and warm, patient-centered chairside care.',
      hospitalAffiliations: 'Consultant Dental Surgeon, Santacruz West Chambers · Past President IDA Mumbai',
      image: '/assets/images/dr_mohan_kulkarni.jpg',
      placeholder: true,
    },
    {
      id: 'dr-raunak-kulkarni',
      name: 'Dr. Raunak Kulkarni',
      role: 'Consultant Orthodontist & Dentofacial Orthopedics',
      credentials: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics)',
      focus: 'Clear Aligners, Invisible Orthodontics & Adult Occlusion',
      bio: 'Specialist in digital aligner therapy, complex adult malocclusions, and dentofacial aesthetics. Dedicated to gentle, discreet smile alignments using cutting-edge 3D staging software.',
      hospitalAffiliations: 'Consultant Orthodontist, Leading Mumbai Clinics & Academic Institutions',
      image: '/assets/images/dr_medical_oncology.jpg',
      placeholder: true,
    },
    {
      id: 'dr-sneha',
      name: 'Dr. Sneha',
      role: 'Micro-Endodontic & Restorative Specialist',
      credentials: 'BDS, MDS (Conservative Dentistry & Endodontics)',
      focus: 'Single-Visit Microscopic RCT, Aesthetic Restorations & Bioceramics',
      bio: 'Expert in dental operating microscopy and minimally invasive tooth preservation. Specializes in comfortable single-visit root canals and bonded aesthetic restorations.',
      hospitalAffiliations: 'Consultant Endodontist, Chambers of Dr. Mohan Kulkarni, Mumbai',
      image: '/assets/images/dr_sneha.jpg',
      placeholder: true,
    },
  ],

  // Section 9: 4-Step Patient Journey Row
  patientJourney: [
    {
      step: '01',
      title: 'Consultation',
      subtitle: 'Unhurried Clinical Evaluation',
      desc: 'An unhurried 45-minute clinical assessment at our Santacruz West chambers. We thoroughly examine your oral health, digital 3D scans, periodontal foundation, and aesthetic goals.',
      badge: '45-Min Dedicated Review',
      placeholder: true,
    },
    {
      step: '02',
      title: 'Digital Simulation',
      subtitle: '3D Diagnostics & Transparent Plan',
      desc: 'High-resolution intraoral scanning, digital smile preview, and clear diagnostic imaging. Every finding is explained visually before agreeing on treatment options and transparent fees.',
      badge: 'Zero Guesswork Planning',
      placeholder: true,
    },
    {
      step: '03',
      title: 'Gentle Treatment',
      subtitle: 'Microscopic & Painless Care',
      desc: 'Execution of your agreed treatment plan using computerized painless anesthesia, operating microscopes, and sterile surgical precision for a completely relaxing experience.',
      badge: 'Pain-Free Protocol',
      placeholder: true,
    },
    {
      step: '04',
      title: 'Lasting Radiance',
      subtitle: 'Preventative Smile Maintenance',
      desc: 'Structured follow-ups, customized home care instructions, and proactive preventive checkups to ensure your restored smile functions beautifully for decades to come.',
      badge: 'Lifetime Smile Care',
      placeholder: true,
    },
  ],

  // Section 10: Appointment Form & Footer
  appointmentForm: {
    eyebrow: 'BOOK APPOINTMENT',
    title: 'Schedule Your Visit, Today.',
    subtitle:
      'We welcome new patients, routine check-ups, implant consultations, and urgent pain relief. Please provide your details and our clinical coordinator will reach out promptly.',
    checkpoints: [
      'Private Chambers — Saraswat Colony, Santacruz West, Mumbai',
      'Gentle, pain-free clinical care with computerized anesthesia',
      'Confirmation call or secure message within 2 business hours',
      'All treatment plans and fees clearly explained before intervention',
    ],
    placeholder: true,
  },

  // Footer Navigation & Details
  footer: {
    legalNotice:
      'Disclaimer: The dental and medical information provided on this website is for educational and informational purposes only. It does not constitute medical advice or substitute for in-person clinical diagnosis. Please consult a qualified dental surgeon for individual oral healthcare guidance.',
    copyright: '© 2026 Chambers of Dr. Mohan Kulkarni. All rights reserved. Registered with Maharashtra Dental Council.',
    links: {
      practice: [
        { label: 'About Dr. Kulkarni', href: '/about' },
        { label: 'Care Team', href: '/doctors' },
        { label: 'Patient Journey', href: '/patient-journey' },
        { label: 'Contact Chambers', href: '/contact' },
      ],
      procedures: [
        { label: 'Dental Implants', href: '/services#immediate-implants' },
        { label: 'Digital Smile Design', href: '/services#digital-smile-design' },
        { label: 'Single-Visit RCT', href: '/services#single-visit-rct' },
        { label: 'Clear Aligners', href: '/services#clear-aligners' },
        { label: 'Full Mouth Rehab', href: '/services#full-mouth-rehab' },
      ],
    },
    placeholder: true,
  },
};
