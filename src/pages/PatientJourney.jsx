import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CalendarCheck, 
  ShieldCheck, 
  Check, 
  CaretDown, 
  ChatsCircle, 
  MagnifyingGlass, 
  Stethoscope, 
  Heartbeat, 
  Clock,
  ArrowRight,
  SpeakerSimpleSlash,
  Video,
  Hospital,
  PhoneCall,
  CheckCircle,
  WhatsappLogo,
  Sparkle
} from '@phosphor-icons/react';
import { siteConfig } from '../content/site';

export default function PatientJourney() {
  const [openFaq, setOpenFaq] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef(null);
  const { contact } = siteConfig;

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const journeyPhases = [
    {
      phase: '01',
      eyebrow: 'PHASE 01 — INITIAL CONSULTATION',
      title: 'Unhurried Evaluation & Digital Scan Audit',
      subhead: '45-Minute Dedicated In-Chambers Review in Santacruz West',
      image: '/assets/images/chambers_consultation.jpg',
      imageAlt: 'Private consultation chambers of Dr. Mohan Kulkarni in Santacruz West, Mumbai',
      imageTag: 'In-Person Consultation Chambers',
      icon: ChatsCircle,
      summary:
        'Your journey begins with an unhurried, private clinical discussion in our Santacruz West chambers. Dr. Mohan Kulkarni personally evaluates your dentition, periodontal foundation, facial profile, and smile goals with complete transparency.',
      checkpoints: [
        'Detailed review of previous dental records, X-rays, and full medical history',
        'High-resolution intraoral photographic series and digital bite assessment',
        'Periodontal tissue mapping and bone volume evaluation',
        'Clear anatomical explanation using physical and 3D digital dental models',
      ],
      whatToBring: [
        'Prior dental X-rays, OPG films, or CBCT scans (if available)',
        'List of current medications, systemic health history, or allergies',
        'Photographs of your natural smile prior to tooth wear or loss',
        'Any existing nightguards, aligners, or orthodontic retainers',
      ],
    },
    {
      phase: '02',
      eyebrow: 'PHASE 02 — PRECISION DIAGNOSTICS',
      title: '3D CBCT & Digital Smile Architecture',
      subhead: 'Evidence-Based Simulation Before Any Procedure Begins',
      image: '/assets/images/dental_institute.jpg',
      imageAlt: 'Advanced 3D digital dental planning and imaging analysis',
      imageTag: 'Digital Smile Diagnostics',
      icon: MagnifyingGlass,
      summary:
        'Before any procedure is scheduled, your diagnostic imaging and digital scans are evaluated by our multispecialty panel. You visualize the computer-simulated outcome, understand implant trajectories, and receive transparent estimates with zero guesswork.',
      checkpoints: [
        'Cross-sectional CBCT bone density mapping for computer-guided implants',
        'Digital smile preview matching your facial symmetry and natural tooth shade',
        'Microscopic evaluation of root canals and deep decay margins',
        'Transparent written treatment plan with itemized timeline and fixed fees',
      ],
      whatToBring: [
        'Preferred cosmetic smile references or restorative aesthetic goals',
        'Physician clearance if undergoing surgical implant placement on blood thinners',
        'Specific schedule preferences for convenient sequential visits',
      ],
    },
    {
      phase: '03',
      eyebrow: 'PHASE 03 — THE TREATMENT DAY',
      title: 'Microscopic Precision & Painless Execution',
      subhead: 'Computerized Local Anesthesia & Sterilized Operatory Protocol',
      image: '/assets/images/dental_surgery_theater.jpg',
      imageAlt: 'Sterile dental surgical operatory of Dr. Mohan Kulkarni',
      imageTag: 'Microscopic Surgical Suite',
      icon: Stethoscope,
      summary:
        'Conducted in our tranquil Santacruz West surgical operatory. Dr. Mohan Kulkarni utilizes precision optical magnification, piezosurgery, and computer-regulated painless anesthesia so you remain entirely relaxed throughout your visit.',
      checkpoints: [
        'Computer-controlled painless local anesthesia delivery for zero needle sting',
        'Sub-millimeter optical magnification ensuring extreme tissue preservation',
        'Class-B hospital-grade autoclaved instrument sets opened chairside in your presence',
        'Immediate aesthetic temporization so you leave with functional comfort',
      ],
      whatToBring: [
        'Comfortable loose clothing for a restful appointment',
        'Headphones for personal music or relaxation if preferred',
        'An accompanying attendant if undergoing sedation or extensive oral surgery',
      ],
    },
    {
      phase: '04',
      eyebrow: 'PHASE 04 — RESTORATION & LIFETIME CARE',
      title: 'Functional Radiance & Preventive Stewardship',
      subhead: 'CAD/CAM Monolithic Zirconia & Structured Recall Protocol',
      image: '/assets/images/chambers_appointment_interior.jpg',
      imageAlt: 'Private consultation suite and long-term smile care management',
      imageTag: 'Lifetime Smile Care Protocol',
      icon: Heartbeat,
      summary:
        'Our clinical partnership continues for decades. After permanent CAD/CAM crowns, implant restorations, or clear aligners are bonded, we implement a structured preventive maintenance protocol to protect your investment for life.',
      checkpoints: [
        'Bite equilibration and micro-occlusal adjustment for effortless chewing balance',
        'Customized home hygiene coaching (interdental brushing and water flossing)',
        'Direct 24/7 emergency telephone triage helpline for unexpected dental concerns',
        'Structured 6-month preventive recall exams and gentle ultrasonic prophylaxis',
      ],
      whatToBring: [
        'Scheduled follow-up appointment log at Santacruz West chambers',
        'Custom nightguard or retention appliance for periodic fit checks',
        'Direct access to our clinic desk via phone and WhatsApp',
      ],
    },
  ];

  const recoveryMilestones = [
    {
      benchmark: 'Diagnostic Accuracy',
      modern: '3D CBCT & Intraoral Scan (0.05 mm precision)',
      conventional: '2D Film Distortion (Superimposed shadows)',
      advantage: 'Zero guesswork anatomy mapping',
    },
    {
      benchmark: 'Patient Comfort',
      modern: 'Computerized Painless Anesthesia (Buffered pH)',
      conventional: 'Manual pressure syringe discomfort',
      advantage: 'Completely anxiety-free chairside visits',
    },
    {
      benchmark: 'Tissue Preservation',
      modern: 'Optical Loupes & Microscopy (Up to 20x zoom)',
      conventional: 'Unaided visual field (1x)',
      advantage: 'Saves natural tooth enamel & bone',
    },
    {
      benchmark: 'Implant Placement',
      modern: 'Computer-Guided Stent (Flapless keyhole access)',
      conventional: 'Freehand manual incision & elevation',
      advantage: '3x faster healing with zero swelling',
    },
    {
      benchmark: 'Crown Longevity',
      modern: 'CAD/CAM Monolithic Zirconia & Bioceramics',
      conventional: 'PFM metal crowns with dark gum margins',
      advantage: 'Decades of lifelike, chip-resistant radiance',
    },
  ];

  const faqs = [
    {
      q: 'Is dental implant surgery painful, and how long does recovery take?',
      a: 'With modern computer-guided surgical stents and computerized local anesthesia, implant placement is virtually painless — most patients report less discomfort than a routine extraction. Keyhole flapless techniques allow immediate resumption of daily routines the next morning with minimal to zero swelling.',
    },
    {
      q: 'What is the difference between single-visit microscopic RCT and traditional root canal therapy?',
      a: 'Microscopic endodontics utilizes high-power optical magnification and rotary titanium files to locate all accessory canals and remove infection completely in one 60-minute visit. Traditional unaided root canals often take 3 to 4 visits and carry higher risks of missed microscopic canals.',
    },
    {
      q: 'Can I bring prior dental X-rays or get an independent second opinion?',
      a: 'Absolutely. Over 35% of patients visiting our Santacruz West chambers come for an independent second opinion on proposed extractions or complex full-mouth rehabilitation. Dr. Mohan Kulkarni thoroughly audits your prior radiographs and explores tooth-saving conservative alternatives before recommending surgery.',
    },
    {
      q: 'How long do modern dental implants and ceramic zirconia crowns last?',
      a: 'With proper oral hygiene and regular 6-month checkups, high-grade titanium implants have clinical success rates exceeding 98% and can last a lifetime. Monolithic CAD/CAM zirconia crowns are biocompatible and engineered to withstand normal masticatory forces for decades without chipping.',
    },
    {
      q: 'Does dental health insurance or cashless corporate reimbursement apply?',
      a: 'Many modern health insurance policies and corporate outpatient dental riders cover surgical extractions, dental trauma, and inpatient oral maxillofacial interventions. Our administrative coordinator assists with detailed medical reports and itemized billing documentation for reimbursement claims.',
    },
    {
      q: 'What should I do if I experience sudden severe tooth pain or a dental trauma emergency?',
      a: 'We reserve emergency relief slots daily at our Santacruz West chambers. If you suffer sudden acute dental pain, tooth trauma, or a broken restoration, contact our emergency line immediately at 022 2649 0333 or WhatsApp our clinical desk for prompt same-day triage.',
    },
  ];

  return (
    <div className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-bronze-600 transition-colors"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl mb-14">
        <div className="eyebrow text-slate-600 mb-3">
          <span>COMPREHENSIVE DENTAL CARE PATHWAY</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-cypress-950 tracking-tight leading-tight mb-4">
          The Patient Journey.
        </h1>
        <p className="text-base text-slate-600 leading-relaxed mb-6">
          Facing dental pain or planning a smile transformation should never be daunting. We believe transparency and clinical precision are essential to peace of mind. Here is a step-by-step overview of how our practice guides you from initial 3D consultation through gentle microscopic treatment and lifetime smile maintenance.
        </p>

        {/* 4 Telemetry Quick Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-alabaster-200">
          <div className="bg-alabaster-100 p-3 rounded-xl border border-alabaster-200">
            <span className="font-sans text-lg font-bold text-cypress-950 block">45 Mins</span>
            <span className="text-[11px] text-slate-600">Dedicated Consult</span>
          </div>
          <div className="bg-alabaster-100 p-3 rounded-xl border border-alabaster-200">
            <span className="font-sans text-lg font-bold text-cypress-950 block">100%</span>
            <span className="text-[11px] text-slate-600">Digital 3D Diagnostics</span>
          </div>
          <div className="bg-alabaster-100 p-3 rounded-xl border border-alabaster-200">
            <span className="font-sans text-lg font-bold text-cypress-950 block">47+ Years</span>
            <span className="text-[11px] text-slate-600">Clinical Mastery</span>
          </div>
          <div className="bg-alabaster-100 p-3 rounded-xl border border-alabaster-200">
            <span className="font-sans text-lg font-bold text-cypress-950 block">Lifetime</span>
            <span className="text-[11px] text-slate-600">Preventative Care</span>
          </div>
        </div>
      </div>

      {/* IN-THEATER SURGICAL OPERATORY VIDEO SHOWCASE */}
      <div className="rounded-3xl overflow-hidden border border-cypress-800 bg-cypress-950 text-alabaster-50 p-6 sm:p-8 lg:p-12 mb-20 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Video Player (7 cols) */}
        <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-cypress-900 border border-cypress-800 shadow-inner group">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/dental_surgery_theater.jpg"
            className="w-full h-full object-cover"
            aria-label="Looping video showcase of advanced dental operatory and microscopic precision"
          >
            <source src="/Videos/clinic-tour.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cypress-950/80 to-transparent pointer-events-none" />

          {/* Controls Overlay */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cypress-950/85 text-[10px] text-alabaster-100/80 backdrop-blur-sm border border-cypress-800">
              <SpeakerSimpleSlash size={12} weight="bold" />
              <span>MUTED AUTOPLAY</span>
            </span>
            <button
              onClick={toggleVideo}
              className="p-1.5 rounded-md bg-cypress-950/85 hover:bg-cypress-900 text-alabaster-50 backdrop-blur-sm border border-cypress-800 transition-colors"
              aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
            >
              <Video size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* Right Explainer Copy (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="eyebrow text-bronze-400 mb-2">
              <span>STERILE OPERATORY TELEMETRY</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-alabaster-50 mb-3 tracking-tight">
              Microscopic Dental Precision & Patient Safety
            </h2>
            <p className="text-xs sm:text-sm text-alabaster-100/80 leading-relaxed mb-6">
              During clinical procedures, Dr. Mohan Kulkarni utilizes precision optical magnification, computerized painless anesthesia delivery, and digital intraoral mapping. Every micro-millimeter margin is treated under hospital-grade sterile protocols.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-cypress-800 text-xs text-alabaster-100">
            <div className="flex items-center justify-between">
              <span className="text-bronze-400 font-semibold">Magnification:</span>
              <span>Carl Zeiss High-Power Optical Loupes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-bronze-400 font-semibold">Instrumentation:</span>
              <span>Ultrasonic Piezosurgery & Rotary Micro-Motors</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-bronze-400 font-semibold">Biological Safety:</span>
              <span>Class-B Autoclaved Sterilization & Hepa Air Filtration</span>
            </div>
          </div>
        </div>

      </div>

      {/* DETAILED 4-STAGE CLINICAL PATHWAY WITH IMAGES */}
      <div className="mb-20">
        <div className="max-w-2xl mb-12">
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-600 block mb-2">
            STEP-BY-STEP REASSURANCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cypress-950 tracking-tight">
            The 4 Stages of Your Care Pathway
          </h2>
        </div>

        <div className="space-y-12">
          {journeyPhases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.phase}
                className="bg-white border border-alabaster-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-bronze-600/40 transition-colors"
              >
                {/* Left Column: Stage Narrative & Checkpoints (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-cypress-950 text-alabaster-50 flex items-center justify-center font-display text-base font-bold shrink-0">
                        {phase.phase}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-bronze-600">
                        {phase.eyebrow}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-cypress-950 tracking-tight mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-bronze-600 mb-4">
                      {phase.subhead}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {phase.summary}
                    </p>

                    {/* Clinical Checkpoints */}
                    <div className="mb-6 pt-5 border-t border-alabaster-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-cypress-950 block mb-3">
                        Clinical Milestones in This Phase:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {phase.checkpoints.map((cp, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 bg-alabaster-50 p-2.5 rounded-xl border border-alabaster-200 text-xs text-cypress-950 font-medium"
                          >
                            <Check size={14} weight="bold" className="text-bronze-600 shrink-0 mt-0.5" />
                            <span>{cp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Patient Checklist Footnote */}
                    <div className="bg-alabaster-100 rounded-2xl p-4 border border-alabaster-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cypress-950 block mb-2">
                        What to Bring / Prepare:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                        {phase.whatToBring.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-bronze-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Column: Photograph (5 cols) */}
                <div className="lg:col-span-5 h-full flex flex-col justify-center">
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative shadow-md bg-cypress-950 border border-alabaster-200 group">
                    <img
                      src={phase.image}
                      alt={phase.imageAlt}
                      className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700 ease-emil"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cypress-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Stage Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cypress-950/90 backdrop-blur-md text-bronze-300 border border-cypress-800">
                        {phase.imageTag}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-cypress-950/90 backdrop-blur-md text-alabaster-50 flex items-center justify-center border border-cypress-800">
                        <Icon size={16} weight="bold" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* CLINICAL COMPARISON MATRIX */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-alabaster-200 shadow-card mb-20">
        <div className="max-w-2xl mb-8">
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-600 block mb-2">
            OBJECTIVE CLINICAL BENCHMARKS
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-cypress-950 mb-2">
            Guided Micro-Dentistry vs. Conventional Treatment
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tangible clinical metrics showing how computer-guided surgical protocols and magnification elevate longevity, comfort, and aesthetics.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-alabaster-200 text-slate-600 text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Clinical Benchmark</th>
                <th className="py-3 px-4 font-bold text-bronze-600">Guided Micro-Dentistry</th>
                <th className="py-3 px-4 font-bold">Conventional Practice</th>
                <th className="py-3 px-4 font-bold text-cypress-950">Patient Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-alabaster-200">
              {recoveryMilestones.map((row, idx) => (
                <tr key={idx} className="hover:bg-alabaster-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-cypress-950">{row.benchmark}</td>
                  <td className="py-3.5 px-4 font-semibold text-bronze-600 bg-bronze-50/30 rounded-lg">{row.modern}</td>
                  <td className="py-3.5 px-4 text-slate-600">{row.conventional}</td>
                  <td className="py-3.5 px-4 font-medium text-cypress-900">{row.advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow text-slate-600 mb-2 justify-center">
            <span>PATIENT QUESTIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cypress-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-alabaster-200 rounded-2xl overflow-hidden shadow-subtle transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-base sm:text-lg font-semibold text-cypress-950">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-alabaster-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-cypress-950 text-alabaster-50' : 'text-slate-600'
                    }`}
                  >
                    <CaretDown size={14} weight="bold" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-alabaster-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CONSULTATION CTA */}
      <div className="bg-cypress-950 text-alabaster-50 rounded-3xl p-8 sm:p-12 border border-cypress-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-400 block mb-2">
            PERSONALIZED CARE COORDINATION
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-alabaster-50 mb-2">
            Ready to Plan Your Smile Consultation?
          </h3>
          <p className="text-xs sm:text-sm text-alabaster-100/80 leading-relaxed max-w-xl">
            Schedule an unhurried 45-minute clinical consultation at our Santacruz West chambers. Our team will review your diagnostic scans and design a comfortable, tailored plan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href="/contact#book-appointment"
            className="pill-button bg-bronze-600 hover:bg-[#9E731C] text-alabaster-50 text-xs font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <CalendarCheck size={16} weight="bold" />
            <span>Book Initial Consultation</span>
          </a>

          <a
            href={`https://wa.me/${contact.phoneRaw}?text=Hello%20Dr.%20Mohan%20Kulkarni%27s%20chambers%2C%20I%20would%20like%20to%20inquire%20about%20a%20consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button bg-[#25D366] hover:bg-[#20ba59] text-cypress-950 text-xs font-bold px-6 py-3.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <WhatsappLogo size={16} weight="fill" />
            <span>WhatsApp Coordinator</span>
          </a>
        </div>
      </div>
    </div>
  );
}
