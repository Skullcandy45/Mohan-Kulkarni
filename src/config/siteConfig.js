export const siteConfig = {
  site: {
    name: 'Dr. Mohan Kulkarni',
    tagline: 'Advanced Dental Surgery & Implants',
    logo: '',
    description: 'Pioneering microscopically guided implants, 3D smile architecture, and painless laser dentistry in Bandra West & South Mumbai.',
    locale: 'en-IN',
    currency: 'INR',
    contact: {
      phone: '+91 98200 45890',
      email: 'care@drmohankulkarni.com',
      address: 'Turner Road, Near Waterfield Junction, Bandra West, Mumbai, Maharashtra 400050',
      whatsapp: '919820045890',
      whatsappMessage: "Hello, I'd like to book an appointment with Dr. Mohan Kulkarni.",
      hours: 'Mon to Sat · 9:30 AM to 8:30 PM IST',
    },
    social: {
      facebook: 'https://facebook.com/drmohankulkarni',
      twitter: 'https://twitter.com/drmohankulkarni',
      instagram: 'https://instagram.com/drmohankulkarni',
      linkedin: 'https://linkedin.com/company/drmohankulkarni',
      youtube: 'https://youtube.com/drmohankulkarni',
    },
  },
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Doctors', href: '/team' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
    { label: 'Book Appointment', href: '/appointment' },
  ],
  theme: {
    primary: '#4F7F7F',
    primaryLight: '#6B9999',
    primaryDark: '#3D6565',
    primaryDim: '#2F4F4F',
    primarySoft: '#E8F0F0',
    accent: '#4F7F7F',
    accentVisible: '#3D6565',
    accentSoft: '#E8F0F0',
    secondary: '#343A40',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    subtle: '#DEE2E6',
    backgroundLight: '#E9ECEF',
    surfaceAlt: '#F1F5F9',
    text: '#212529',
    textLight: '#6C757D',
    border: '#CED4DA',
    ink: '#212529',
    highlight: '#17A2B8',
    highlightSoft: '#D1ECF1',
    warm: '#FFC107',
    warmSoft: '#FFF3CD',
    warmWash: '#F8FAFC',
    accentWash: '#EAF7ED',
    cream: '#FFFFFF',
    fontSans: "'Poppins', system-ui, sans-serif",
    fontHeading: "'Montserrat', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', ui-monospace, monospace",
    intent: 'medical_clinic_general',
  },
  content: {
    common: {
      ctaButton: 'Book Appointment',
      callUs: 'Call Us',
      viewAll: 'View All',
      learnMore: 'Learn More',
      whatsappCta: 'Chat on WhatsApp',
      requestQuote: 'Request Consultation',
      teamMember: 'Doctor',
      specialist: 'Specialist',
    },
    nav: {
      topBarMessage: 'Online consultations available. Book now or message us on WhatsApp.',
    },
    teamPage: {
      joinBadge: 'Careers',
      joinTitle: 'Join Our Team',
      joinSubtitle: 'We are always looking for passionate and skilled healthcare professionals to join Dr. Mohan Kulkarni Dental Clinic. If you are dedicated to patient care, we invite you to connect with us.',
      joinCtaPortfolio: 'Send Your CV',
      searchPlaceholder: 'Search by name or specialty…',
      filterLabel: 'Filter by specialty',
      emptyTitle: 'No doctors found',
      emptyMessage: 'Try a different specialty or clear filters to see everyone.',
    },
    home: {
      premium: {
        heroTitle: 'Modern dentistry with care for you.',
        heroSubtitle:
          'Precision treatments, calm surroundings, and a team that listens so every visit feels considered, not rushed.',
        heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=85',
        heroVideo: '/Videos/dentist clinic video.mp4',
        servicePills: ['Examination', 'Cleaning', 'Implants', 'Whitening', 'Treatment', 'Orthodontics'],
        servicesHeading: 'Discover our dental services',
        servicesAside:
          'We combine advanced equipment with a gentle chairside manner: clear explanations, minimal discomfort, and results you can trust.',
        checkupBenefits: {
          title: 'Benefits of regular dental checkups',
          subtitle:
            'Twice-yearly visits protect more than your teeth. They support whole-mouth health, comfort, and long-term savings.',
          items: [
            {
              title: 'Prevent cavities & gum disease',
              description:
                'Routine exams catch plaque buildup early and keep gums healthy before pain or bleeding starts.',
              icon: 'shield',
            },
            {
              title: 'Detect problems early',
              description:
                'X-rays and clinical checks reveal decay, cracks, or infection when treatment is simpler and gentler.',
              icon: 'sparkles',
            },
            {
              title: 'Professional deep cleaning',
              description:
                'Scaling and polishing remove stains and tartar that daily brushing cannot reach on its own.',
              icon: 'gauge',
            },
            {
              title: 'Save time & money',
              description:
                'Small fixes at checkups cost far less than emergency visits, root canals, or tooth replacement later.',
              icon: 'rocket',
            },
            {
              title: 'Confidence in your smile',
              description:
                'Fresh breath, brighter teeth, and personalized home-care tips help you feel good every day.',
              icon: 'smile',
            },
          ],
        },
        reviewCountLabel: '750+ reviews',
        aboutDoctorEyebrow: 'About doctor',
        aboutDoctor: {
          name: 'Dr. Mohan Kulkarni',
          image: '/images/dr-mohan-kulkarni-hero.jpg',
          designation: 'BDS, MDS, FICOI (USA) — Chief Dental Surgeon & Implantologist',
          expertise:
            'Guided Dental Implants, Porcelain Veneers, Full-Mouth Reconstruction, Zeiss Micro-RCT',
          experience: '22+ years in clinical dentistry',
          bio: 'Dr. Mohan Kulkarni combines two decades of surgical implant mastery with cutting-edge digital dentistry, ensuring every procedure is microscopically planned, predictable, and virtually pain-free.',
        },
        testimonialsHeading: 'What people are saying?',
        testimonialsSubtitle:
          "Don't just take our word for it. See what our customers have to say about their experience!",
        discountPlan: {
          title: "Your Family's Dental Health Matters: Discover Our Budget-Friendly Discount Plan.",
          subtitle:
            'Unlock optimal dental wellness for your loved ones: embrace our budget-friendly discount plan for comprehensive care and radiant smiles.',
          highlight: '80%',
          cardText:
            'Exclusive member savings: save 30% to 80% on dental procedures, including oral exams, cleanings, and X-rays.',
        },
        bookingTitle: 'Book an appointment today',
        bookingSubtitle: 'Choose a time online or call the clinic. We will confirm your visit within one business day.',
        clinicImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
      },
      heroImage: 'https://images.unsplash.com/photo-1584516150909-f3357799c77a?auto=format&fit=crop&w=800&q=80',
      heroCarouselImages: [
        'https://images.unsplash.com/photo-1584516150909-f3357799c77a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1530026421047-91113677077e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d03?auto=format&fit=crop&w=800&q=80',
      ],
      heroBadge: 'Est. 2010 · Mumbai',
      heroTitle: 'Compassionate care,\nadvanced treatments.',
      heroSubtitle: 'Dr. Mohan Kulkarni Dental Clinic offers personalized healthcare solutions, combining expertise with a patient-first approach for your well-being.',
      heroCtaText: 'Book Appointment',
      heroLiveChip: 'Accepting new patients · online booking',
      heroImageBadge: 'Since 2010',
      heroWhatsAppHint: 'Typical reply within 30 minutes',
      heroFloatingBadge: '98% patient satisfaction',
      trustBadge: 'Patient Trust',
      trustTitle: 'Trusted by',
      trustHighlight: 'families and individuals.',
      trustSubtitle: '',
      trustPoints: [
        'Personalized treatment plans',
        'Experienced medical professionals',
        'State-of-the-art facilities',
        'Transparent communication',
      ],
      processBadge: 'Our Process',
      processTitle: 'Your journey to health,',
      processHighlight: 'simplified.',
      processSubtitle: 'From initial consultation to recovery, we guide you every step of the way with clear communication and expert care.',
      faqBadge: 'FAQ',
      faqTitle: 'Common questions,',
      faqHighlight: 'clear answers.',
      faqSubtitle: '',
      statsTitle: 'Our Impact.',
      servicesBadge: 'Our Services',
      servicesTitle: 'Comprehensive care,',
      servicesHighlight: 'tailored to you.',
      servicesSubtitle: 'We offer a wide range of medical services designed to meet your health needs, from general check-ups to specialized treatments.',
      whyBadge: 'Why Choose Us',
      whyTitle: 'Dedicated to your',
      whyHighlight: 'well-being.',
      whySubtitle: 'At Dr. Mohan Kulkarni Dental Clinic, we prioritize your health with a holistic approach, advanced medical practices, and a compassionate team.',
      teamBadge: 'Our Doctors',
      teamTitle: 'Expert physicians,',
      teamHighlight: 'caring hands.',
      teamDescription: 'Meet our team of highly qualified and experienced doctors committed to providing you with the best possible care.',
      testimonialsBadge: 'Patient Stories',
      testimonialsTitle: 'What our patients',
      testimonialsHighlight: 'say about us.',
      galleryBadge: 'Our Clinic',
      galleryTitle: 'A glimpse into our',
      galleryHighlight: 'caring environment.',
      gallerySubtitle: 'Modern facilities designed for your comfort and healing.',
      testimonialsDescription: '',
      ctaBadge: 'Ready to connect?',
      ctaTitle: 'Let us help you',
      ctaHighlight: 'feel better.',
      ctaSubtitle: 'Schedule an appointment or reach out to us with your health concerns. We are here to listen and provide expert guidance.',
      ctaMiniMetrics: [
        { label: 'Avg. wait time', value: '< 15 min' },
        { label: 'Online booking', value: '24/7' },
        { label: 'Emergency care', value: 'Available' },
        { label: 'First consultation', value: 'Complimentary' },
      ],
      ctaMiniNote: 'Every patient receives personalized attention.',
      ctaChecklist: [
        'Complimentary initial consultation',
        'Personalized treatment plans',
        'Single point of contact for care',
        'Easy rescheduling policy',
      ],
      statsSubtitle: '',
      heroTrustRating: '4.9/5',
      heroTrustSubtext: '500+ verified reviews',
      marqueeItems: [
        'General Medicine',
        'Pediatrics',
        'Dermatology',
        'Cardiology',
        'Orthopedics',
        'Physiotherapy',
        'Diagnostics',
        'Preventive Care',
      ],
      homeFaq: [
        {
          q: 'How do I book an appointment?',
          a: 'You can book online through our website, call us directly, or message us on WhatsApp. We confirm appointments promptly.',
        },
        {
          q: 'Do you offer online consultations?',
          a: 'Yes, we provide secure and convenient online consultations for various medical conditions. Please check our services page for details.',
        },
        {
          q: 'What are your clinic hours?',
          a: 'Our clinic is open Monday to Saturday, from 9 AM to 8 PM. We are closed on Sundays.',
        },
      ],
    },
    footer: {
      tagline: 'Dr. Mohan Kulkarni Dental Clinic',
      description: 'Dedicated to your health and well-being since 2010.',
      navLabel: 'Quick Links',
      servicesLabel: 'Our Specialties',
      contactLabel: 'Reach Us',
      addressFallback: 'Not listed',
      phoneFallback: 'Not listed',
      emailFallback: 'Not listed',
    },
    appointment: {
      heroBadge: 'Book Your Appointment',
      heroSubtitle:
        'Select your desired service, choose a convenient time slot, and provide your details. We will confirm your appointment within a few hours on business days.',
      sidebarTitle: 'What to expect',
      sidebarItems: [
        'Confirmation within a few hours',
        'Automated reminders before your visit',
        'Clear discussion of consultation fees',
        'Flexible rescheduling options',
        'Follow-up support after your appointment',
      ],
      urgentTitle: 'Need urgent medical attention?',
      urgentSubtitle: 'For immediate concerns, please call us directly or visit the nearest emergency room.',
      formTitle: 'Appointment Details',
      submitButton: 'Request Appointment',
      successTitle: 'Appointment request received.',
      successMessage:
        'Thank you for your request. Our team will review your details and confirm your appointment shortly.',
      successButton: 'Book another',
      preferredStaffLabel: 'Preferred Doctor',
      anyStaffLabel: 'Any available Doctor',
      serviceLabel: 'Service Required',
    },
    contact: {
      title: 'Get in Touch',
      subtitle:
        'Call, email, or WhatsApp us. Choose the most convenient way to connect. We respond promptly during business hours.',
      infoTitle: 'Contact Information',
      formTitle: 'Send Us a Message',
      hours: [
        { day: 'Monday to Friday', time: '9:00 to 20:00' },
        { day: 'Saturday', time: '9:00 to 18:00' },
        { day: 'Sunday', time: 'Closed' },
      ],
      topics: [
        { id: 'appointment', label: 'Book an Appointment' },
        { id: 'query', label: 'General Query' },
        { id: 'feedback', label: 'Feedback' },
        { id: 'urgent', label: 'Urgent Medical Concern' },
        { id: 'careers', label: 'Careers' },
        { id: 'other', label: 'Other' },
      ],
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.5000000000005!2d77.03880000000001!3d28.481200000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1937a0000001%3A0x123456789abcdef0!2sDr.%20Raunak%20Clinic!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin',
    },
    about: {
      title: 'About Dr. Mohan Kulkarni Dental Clinic',
      subtitle:
        'A Mumbai-based clinic founded on principles of compassionate care, medical excellence, and patient trust, active since 2010.',
      missionTitle: 'Our Mission',
      missionText:
        'To provide accessible, high-quality healthcare services with a patient-centric approach, fostering a healthier community through advanced medical practices and genuine care.',
      values: [
        {
          icon: 'heart',
          title: 'Compassion',
          desc: 'Treating every patient with empathy, respect, and understanding, ensuring a comfortable and supportive environment.',
        },
        {
          icon: 'stethoscope',
          title: 'Excellence',
          desc: 'Upholding the highest standards in medical practice, continuously updating our knowledge and technology for optimal outcomes.',
        },
        {
          icon: 'handshake',
          title: 'Integrity',
          desc: 'Maintaining honesty and transparency in all interactions, building trust with our patients and their families.',
        },
        {
          icon: 'users',
          title: 'Community Focus',
          desc: 'Committed to the health and well-being of our local community, offering preventive care and health education.',
        },
      ],
      timeline: [
        {
          year: '2010',
          title: 'Clinic Established',
          desc: 'Dr. Mohan Kulkarni Dental Clinic opened its doors with a vision to provide holistic and accessible healthcare to the community.',
        },
        {
          year: '2015',
          title: 'Expanded Specialties',
          desc: 'Introduced new medical specialties and welcomed additional expert doctors to cater to diverse patient needs.',
        },
        {
          year: '2018',
          title: 'Digital Integration',
          desc: 'Launched online appointment booking and digital patient records for enhanced convenience and efficiency.',
        },
        {
          year: '2023',
          title: '10,000+ Patients Served',
          desc: 'Celebrated a milestone of serving over ten thousand patients, with a strong focus on patient satisfaction and positive health outcomes.',
        },
      ],
      heroTitle: 'Rooted in care,',
      heroHighlight: 'focused on health.',
      teamPreviewTitle: 'Meet our doctors',
      teamPreviewHighlight: 'before your visit.',
      teamPreviewDescription: 'Our dedicated team of medical professionals is here to provide you with expert care and support.',
      ctaTitle: 'Your health journey starts here.',
      ctaSubtitle: 'Book online, call, or WhatsApp. We are here to assist you with your healthcare needs.',
    },
    servicesPage: {
      heroBadge: 'Our Services',
      heroTitle: 'Your health,',
      heroHighlight: 'our expertise.',
      heroSubtitle:
        'From routine check-ups to specialized treatments, we offer a comprehensive range of medical services with transparent pricing and personalized care.',
      processDescription: 'A structured approach to your health, from diagnosis to recovery, ensuring clear communication at every stage.',
      faqSidebar: 'Have questions? Message us on WhatsApp. We aim to reply within an hour during business hours.',
      faq: [
        {
          q: 'Do you offer free initial consultations?',
          a: 'Some of our services include an initial assessment. Please check individual service descriptions or contact us for details.',
        },
        {
          q: 'What payment options are available?',
          a: 'We accept UPI, credit/debit cards, net banking, and cash. Detailed invoices are provided for all services.',
        },
        {
          q: 'Can I request a home visit for medical care?',
          a: 'Yes, for certain eligible services, we offer home visits. Please discuss your requirements when booking your appointment.',
        },
        {
          q: 'Do you provide corporate health check-up packages?',
          a: 'We offer customized health packages for corporate clients and bulk bookings. Please contact us for more information.',
        },
      ],
      heroKpis: [
        { label: 'Avg. wait', value: '< 15 min', variant: 'ink' },
        { label: 'Satisfaction', value: '4.9/5', variant: 'card' },
        {
          label: 'Consultation',
          value: 'From ₹399',
          subtitle: 'Transparent pricing with a detailed quote before treatment.',
          variant: 'accent',
          colSpan: 2,
        },
      ],
    },
  },
  clientLogos: [
    { name: 'HealthPlus', initials: 'HP' },
    { name: 'MediCare', initials: 'MC' },
    { name: 'Wellness Co.', initials: 'WC' },
    { name: 'LifePath', initials: 'LP' },
  ],
  stats: [
    { value: '98%', label: 'Happy patients', icon: 'heart' },
    { value: '50K+', label: 'Healthy smiles', icon: 'rocket' },
    { value: '4.9', label: 'Average clinic rating', icon: 'zap' },
    { value: '15+', label: 'Years of patient care', icon: 'briefcase' },
  ],
  services: [
    {
      id: 1,
      title: 'Dental Examination',
      description: 'Full oral assessment, digital X-rays when needed, and a clear treatment plan tailored to you.',
      icon: 'target',
      duration: '30 min',
      price: 'from ₹499',
      image: '/images/services/service-01-examination.png',
    },
    {
      id: 2,
      title: 'Teeth Cleaning & Polishing',
      description: 'Professional scaling and polishing to remove plaque, freshen breath, and protect gums.',
      icon: 'sparkles',
      duration: '45 min',
      price: 'from ₹899',
      image: '/images/services/service-01-examination.png',
    },
    {
      id: 3,
      title: 'Dental Implants',
      description: 'Durable, natural-looking tooth replacement with precise planning and gentle surgery.',
      icon: 'award',
      duration: '60 to 90 min',
      price: 'from ₹25,999',
      image: '/images/services/service-05-implants.png',
    },
    {
      id: 4,
      title: 'Teeth Whitening',
      description: 'Safe in-clinic whitening for a brighter smile with even, natural-looking results.',
      icon: 'sun',
      duration: '60 min',
      price: 'from ₹6,999',
      image: '/images/services/service-02-whitening.png',
    },
    {
      id: 5,
      title: 'Root Canal Treatment',
      description: 'Comfort-focused endodontic care to relieve pain and save your natural tooth.',
      icon: 'shield',
      duration: '60 to 90 min',
      price: 'from ₹4,999',
      image: '/images/services/service-06-root-canal.png',
    },
    {
      id: 6,
      title: 'Orthodontics & Aligners',
      description: 'Braces and clear aligners to straighten teeth and improve bite with ongoing monitoring.',
      icon: 'layers',
      duration: 'Consult 45 min',
      price: 'from ₹49,999',
      image: '/images/services/service-03-aligners.png',
    },
    {
      id: 7,
      title: 'Cosmetic Bonding & Veneers',
      description: 'Repair chips, close gaps, and refine shape with minimally invasive smile design.',
      icon: 'gem',
      duration: '45 to 60 min',
      price: 'from ₹3,499',
      image: '/images/services/service-04-veneers-bonding.png',
    },
    {
      id: 8,
      title: 'Pediatric Dentistry',
      description: 'Gentle check-ups and treatments for children in a calm, friendly environment.',
      icon: 'heart',
      duration: '30 to 45 min',
      price: 'from ₹599',
      image: '/images/services/service-01-examination.png',
    },
    {
      id: 9,
      title: 'Emergency Dental Care',
      description: 'Same-day relief for toothache, broken teeth, swelling, and urgent oral injuries.',
      icon: 'zap',
      duration: 'Varies',
      price: 'from ₹999',
      image: '/images/services/service-06-root-canal.png',
    },
  ],
  team: [
    {
      id: 1,
      name: 'Dr. Mohan Kulkarni',
      role: 'Chief Implantologist & Dental Surgeon',
      expertise: 'Immediate-Load Implants, Full Mouth Reconstruction, Bone Augmentation',
      experience: '22+ years',
      image: '/images/dr-mohan-kulkarni-hero.jpg',
      bio: 'BDS, MDS, FICOI (USA). Two decades of pioneering guided implant surgery and complex cosmetic rehabilitation in Mumbai.',
    },
    {
      id: 2,
      name: 'Dr. Sneha Kulkarni',
      role: 'Senior Cosmetic & Aesthetic Dentist',
      expertise: 'Porcelain Veneers, Digital Smile Design, Teeth Whitening',
      experience: '14+ years',
      image: '/images/clinic/dr_sneha.webp',
      bio: 'MDS in Conservative Dentistry & Endodontics. Specializing in handcrafted E.max laminates and minimally invasive facial aesthetics.',
    },
    {
      id: 3,
      name: 'Dr. Ananya Deshmukh',
      role: 'Microscopic Endodontist',
      expertise: 'Zeiss Single-Visit RCT, Laser Irrigation, Tooth Preservation',
      experience: '9+ years',
      image: 'https://images.unsplash.com/photo-1594824813637-43c299285041?auto=format&fit=crop&w=800&q=80',
      bio: 'MDS in Endodontics. Renowned for painless root canal treatments utilizing surgical operating microscopes.',
    },
    {
      id: 4,
      name: 'Dr. Rohan Mehta',
      role: 'Orthodontist & Clear Aligner Specialist',
      expertise: 'Invisalign Diamond Provider, Lingual Braces, Interceptive Orthodontics',
      experience: '11+ years',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      bio: 'MDS Orthodontics. Certified Invisalign specialist creating straight, harmonious smiles for adolescents and adults.',
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Anjali Gupta',
      role: 'Homemaker',
      location: 'Mumbai, IN',
      rating: 5,
      review: 'The doctors at Dr. Mohan Kulkarni Dental Clinic are incredibly caring and thorough. I always feel heard and well-treated.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&w=800&q=80',
      project: 'General Consultation',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      location: 'Delhi, IN',
      rating: 5,
      review: 'Booking an appointment online was so easy, and the clinic staff were very efficient. Highly recommend!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      project: 'Preventive Health Check',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Teacher',
      location: 'Noida, IN',
      rating: 5,
      review: 'Dr. Priya Singh is wonderful with children. My kids actually look forward to their check-ups now!',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      project: 'Pediatric Consultation',
    },
    {
      id: 4,
      name: 'Sanjay Verma',
      role: 'Business Owner',
      location: 'Faridabad, IN',
      rating: 5,
      review: 'The online consultation service is a lifesaver for my busy schedule. Professional and convenient.',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
      project: 'Online Consultation',
    },
    {
      id: 5,
      name: 'Meera Nair',
      role: 'Architect',
      location: 'Bengaluru, IN',
      rating: 5,
      review:
        'My implant procedure was explained clearly at every step. The clinic is spotless and the team made me feel calm throughout.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
      project: 'Dental Implants',
    },
    {
      id: 6,
      name: 'Arjun Patel',
      role: 'College Student',
      location: 'Ahmedabad, IN',
      rating: 5,
      review:
        'Teeth whitening results looked natural, not too bright. Staff were friendly and respected my budget.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      project: 'Teeth Whitening',
    },
    {
      id: 7,
      name: 'Kavita Reddy',
      role: 'Marketing Manager',
      location: 'Hyderabad, IN',
      rating: 5,
      review:
        'Root canal was far more comfortable than I expected. Dr. Kulkarni checked on me after the visit. Rare level of care.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      project: 'Root Canal',
    },
    {
      id: 8,
      name: 'Rohit Malhotra',
      role: 'Fitness Coach',
      location: 'Chandigarh, IN',
      rating: 5,
      review:
        'Regular cleanings here keep my smile camera-ready. Appointments run on time and the front desk is always helpful.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
      project: 'Dental Cleaning',
    },
    {
      id: 9,
      name: 'Sneha Iyer',
      role: 'Graphic Designer',
      location: 'Pune, IN',
      rating: 5,
      review:
        'They fixed my chipped tooth same week with cosmetic bonding. You cannot tell which tooth was damaged. Delighted!',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      project: 'Cosmetic Dentistry',
    },
    {
      id: 10,
      name: 'Imran Khan',
      role: 'Shop Owner',
      location: 'Jaipur, IN',
      rating: 5,
      review:
        'Our whole family comes here now. Transparent pricing, gentle with kids, and emergency slots when we needed one urgently.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      project: 'Family Dentistry',
    },
  ],
  whyChooseUs: [
    {
      icon: 'shield-check',
      title: 'Experienced Doctors',
      description: 'Our team comprises highly qualified and experienced medical professionals dedicated to your health.',
    },
    {
      icon: 'clock',
      title: 'Timely Appointments',
      description: 'We value your time with minimal waiting periods and efficient scheduling.',
    },
    {
      icon: 'cpu',
      title: 'Modern Facilities',
      description: 'Equipped with state-of-the-art technology for accurate diagnosis and effective treatment.',
    },
    {
      icon: 'heart-handshake',
      title: 'Patient-Centric Care',
      description: 'Your well-being is our priority, with personalized treatment plans and compassionate support.',
    },
  ],
  heroSections: [
    {
      id: 1,
      title: 'Compassionate care,\nadvanced treatments.',
      subtitle: 'Dr. Mohan Kulkarni Dental Clinic offers personalized healthcare solutions, combining expertise with a patient-first approach for your well-being.',
      cta_text: 'Book Appointment',
      cta_link: '/appointment',
      background_image_url: 'https://images.unsplash.com/photo-1584516150909-f3357799c77a?auto=format&fit=crop&w=800&q=80',
      published: true,
    },
  ],
  process: [
    {
      step: '01',
      title: 'Book',
      desc: 'Schedule your appointment online or via phone/WhatsApp.',
    },
    {
      step: '02',
      title: 'Consult',
      desc: 'Meet our doctors for a thorough examination and discussion.',
    },
    {
      step: '03',
      title: 'Treat',
      desc: 'Receive a personalized treatment plan and expert care.',
    },
    {
      step: '04',
      title: 'Recover',
      desc: 'Follow-up and support for a complete and healthy recovery.',
    },
  ],
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Doctors', href: '/team' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Book Now', href: '/appointment' },
    { label: 'Contact', href: '/contact' },
  ],
  galleryItems: [
    {
      id: 1,
      title: 'Reception Area',
      image_url: 'https://images.unsplash.com/photo-1584982751601-ed8978768a8c?auto=format&fit=crop&w=800&q=80',
      category: 'Clinic Interior',
      display_order: 1,
      published: true,
    },
    {
      id: 2,
      title: 'Consultation Room',
      image_url: 'https://images.unsplash.com/photo-1584516150909-f3357799c77a?auto=format&fit=crop&w=800&q=80',
      category: 'Clinic Interior',
      display_order: 2,
      published: true,
    },
    {
      id: 3,
      title: 'Diagnostic Lab',
      image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d03?auto=format&fit=crop&w=800&q=80',
      category: 'Facilities',
      display_order: 3,
      published: true,
    },
    {
      id: 4,
      title: 'Waiting Area',
      image_url: 'https://images.unsplash.com/photo-1530026421047-91113677077e?auto=format&fit=crop&w=800&q=80',
      category: 'Clinic Interior',
      display_order: 4,
      published: true,
    },
  ],
  contactSubmissions: [],
  appointmentRequests: [],
  settings: [],
};

// Single settings row — mirrored for upgrade seeding (settings[0])
const SETTINGS_ROW = {
  id: '1',
  site_name: siteConfig.site.name,
  site_tagline: siteConfig.site.tagline,
  site_logo: siteConfig.site.logo,
  contact_phone: (siteConfig.site.contact?.phone ?? ""),
  contact_email: (siteConfig.site.contact?.email ?? ""),
  address: (siteConfig.site.contact?.address ?? ""),
  whatsapp_number: (siteConfig.site.contact?.whatsapp ?? ""),
  whatsapp_message: (siteConfig.site.contact?.whatsappMessage ?? ""),
  social_facebook: (siteConfig.site.social?.facebook ?? ""),
  social_instagram: (siteConfig.site.social?.instagram ?? ""),
  social_x: (siteConfig.site.social?.twitter ?? ""),
  social_linkedin: (siteConfig.site.social?.linkedin ?? ""),
  social_youtube: (siteConfig.site.social?.youtube ?? ""),
  nav_top_bar_message: 'Weekday consultations available. Reserve online or message us on WhatsApp.',
  wa_preview_message:
    "Hello, I'd like to book an appointment at Dr. Mohan Kulkarni Dental Clinic.",
  home_marquee_text: '',
  about_values_json: '',
  about_timeline_json: '',
  services_faq_json: '',
  services_hero_kpis_json: '',
  home_cta_metrics_json: '',
  contact_hours_json: '',
  contact_topics_json: '',
  home_cta_mini_note: '',
  contact_map_embed_url: '',
};

siteConfig.settingsRecord = SETTINGS_ROW;
siteConfig.settings = [SETTINGS_ROW];

// ─────────────────────────────────────────────────────────
// Re-exports for backwards compatibility with existing files
// ─────────────────────────────────────────────────────────
const BUSINESS_CONFIG = siteConfig;
const CLINIC_NAME = siteConfig.site.name;
const CLINIC_TAGLINE = siteConfig.site.tagline;
const CLINIC_DESCRIPTION = (siteConfig.content?.home?.heroSubtitle ?? "");
const CLINIC_PHONE = (siteConfig.site.contact?.phone ?? "");
const CLINIC_EMAIL = (siteConfig.site.contact?.email ?? "");
const CLINIC_ADDRESS = (siteConfig.site.contact?.address ?? "");
const WORKING_HOURS_SHORT = (siteConfig.site.contact?.hours ?? "");
const CLINIC_HOURS = [
  { day: 'Monday to Friday', hours: '10:00 AM to 7:00 PM IST' },
  { day: 'Saturday', hours: '10:00 AM to 5:00 PM IST' },
  { day: 'Sunday', hours: 'Closed' },
];
const CLINIC_MAP_EMBED = '';
const SOCIAL = siteConfig.site.social;
const NAV_LINKS = siteConfig.navLinks;
const STATS = siteConfig.stats;
const SERVICES = siteConfig.services;
const DOCTORS = siteConfig.team;
const TESTIMONIALS = siteConfig.testimonials;
const WHY_CHOOSE_US = siteConfig.whyChooseUs;
const APPOINTMENT_TIMES = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
];
const THEME = siteConfig.theme;
const CURRENCY = '₹';
const SITE_SETTINGS = { ...siteConfig.settingsRecord };
export const HERO_SECTIONS = siteConfig.heroSections;
export const DEFAULT_SITE_SETTINGS = siteConfig.settingsRecord;
const PRODUCTS = [];
const CATEGORIES = [];
const ORDERS = [];
const PAYMENT_SETTINGS = [];
const CONTACT_SUBMISSIONS = siteConfig.contactSubmissions || [];
const APPOINTMENT_REQUESTS = siteConfig.appointmentRequests || [];
const GALLERY_ITEMS = siteConfig.galleryItems || [];

// ─────────────────────────────────────────────────────────
// WhatsApp helpers — visitor buttons (nav, FAB, contact, CTAs)
// ─────────────────────────────────────────────────────────
export function getWhatsAppDigitsFromSettings(settings) {
  const raw =
    settings?.whatsapp_number ||
    settings?.contact_whatsapp ||
    siteConfig.site.contact?.whatsapp ||
    '';
  return String(raw).replace(/\D/g, '');
}

export function buildWhatsAppLink(message = '', settings) {
  const number = getWhatsAppDigitsFromSettings(settings);
  const defaultMsg =
    settings?.whatsapp_message ||
    siteConfig.site.contact?.whatsappMessage ||
    'Hi!';
  const text = encodeURIComponent(message || defaultMsg);
  if (!number) return '#contact';
  return `https://wa.me/${number}?text=${text}`;
}

export {
  BUSINESS_CONFIG,
  CLINIC_NAME,
  CLINIC_TAGLINE,
  CLINIC_DESCRIPTION,
  CLINIC_PHONE,
  CLINIC_EMAIL,
  CLINIC_ADDRESS,
  WORKING_HOURS_SHORT,
  CLINIC_HOURS,
  CLINIC_MAP_EMBED,
  SOCIAL,
  NAV_LINKS,
  STATS,
  SERVICES,
  DOCTORS,
  TESTIMONIALS,
  WHY_CHOOSE_US,
  APPOINTMENT_TIMES,
  THEME,
  CURRENCY,
  SITE_SETTINGS,
  PRODUCTS,
  CATEGORIES,
  ORDERS,
  PAYMENT_SETTINGS,
  CONTACT_SUBMISSIONS,
  APPOINTMENT_REQUESTS,
  GALLERY_ITEMS,
};
