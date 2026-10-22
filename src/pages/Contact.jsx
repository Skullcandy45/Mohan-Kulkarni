import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  EnvelopeSimple, 
  Clock, 
  CalendarCheck, 
  ShieldCheck, 
  CheckCircle,
  ArrowRight,
  NavigationArrow,
  Compass,
  Buildings,
  WhatsappLogo
} from '@phosphor-icons/react';
import { siteConfig } from '../content/site';

export default function Contact() {
  const { contact } = siteConfig;
  const [activePin, setActivePin] = useState('chambers');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Dental Implants & Bone Grafting',
    date: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const locations = [
    {
      id: 'chambers',
      name: 'Primary Private Chambers',
      address: `${contact.address.line1}, ${contact.address.line2}, ${contact.address.city} ${contact.address.pincode}`,
      landmark: contact.address.landmark,
      hours: contact.hours.regular,
      phone: `${contact.phone} / ${contact.landline}`,
      tag: 'Primary Dental Consultation Chambers',
      mapQuery: 'Saraswat+Colony+Santacruz+West+Mumbai+400054',
    },
    {
      id: 'emergency',
      name: 'Priority Emergency Dental Desk',
      address: `${contact.address.line1}, Santacruz West, Mumbai 400054`,
      landmark: 'Direct Ground Floor Access, Wheelchair Friendly',
      hours: 'Daily Rapid Tooth Pain Triage & Same-Day Relief',
      phone: contact.phone,
      tag: 'Urgent Pain Relief Desk',
      mapQuery: 'Saraswat+Colony+Santacruz+West+Mumbai+400054',
    },
    {
      id: 'advanced',
      name: 'Affiliated Surgical Operatory Suite',
      address: 'SV Road, Santacruz / Khar West, Mumbai 400054',
      landmark: 'Near Santacruz Station & SV Road Arterial Hub',
      hours: 'Complex Implantology & Oral Surgery Sessions',
      phone: contact.phone,
      tag: 'Surgical Operatory Facility',
      mapQuery: 'Santacruz+West+Mumbai',
    },
  ];

  const currentLocation = locations.find((l) => l.id === activePin) || locations[0];

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
          <span>DENTAL CHAMBERS & APPOINTMENTS</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-cypress-950 tracking-tight leading-tight mb-4">
          Direct Contact & <span className="italic font-normal text-bronze-600">Location.</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Centrally located in Saraswat Colony, Santacruz West, Mumbai (near Podar International School & SV Road). Conveniently positioned for local Mumbai families, outstation patients, and international NRI visitors seeking premier dental implantology, microscopic root canal therapy, and smile design.
        </p>
      </div>

      {/* INTERACTIVE MAP & SURGICAL CAMPUS SHOWCASE */}
      <div className="bg-cypress-950 rounded-3xl overflow-hidden border border-cypress-800 text-alabaster-50 shadow-2xl mb-16">
        {/* Top Control Bar with Location Selector Tabs */}
        <div className="p-6 sm:p-8 border-b border-cypress-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-400 block mb-1">
              CHAMBERS & OPERATORY LOCATIONS
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-alabaster-50">
              Chambers & Operating Facility
            </h2>
          </div>

          {/* Location Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {locations.map((loc) => {
              const isSelected = activePin === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setActivePin(loc.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-bronze-600 text-alabaster-50 shadow-sm'
                      : 'bg-cypress-900/80 text-alabaster-200/80 hover:text-alabaster-50 hover:bg-cypress-800 border border-cypress-800'
                  }`}
                >
                  {loc.name.split(' ')[0]} {loc.name.split(' ')[1] || ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Map & Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Left Column: Interactive Map Iframe (7 cols on lg) */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[350px] bg-cypress-900 overflow-hidden">
            <iframe
              title="Santacruz West Mumbai Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.079237070114!2d72.833500!3d19.082500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c975a50742f1%3A0x6b7bc19a3b631d8!2sSaraswat%20Colony%2C%20Santacruz%20West%2C%20Mumbai%2C%20Maharashtra%20400054!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              className="w-full h-full border-0 filter contrast-[1.05] grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Subtle Gradient Overlays for integration */}
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cypress-950 to-transparent pointer-events-none hidden lg:block" />

            {/* Floating Live Telemetry Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-cypress-950/90 backdrop-blur-md border border-cypress-800 text-xs text-alabaster-100 shadow-lg pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">19.0825° N, 72.8397° E • Santacruz West</span>
            </div>
          </div>

          {/* Right Column: Selected Location Detail Card (5 cols on lg) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-cypress-950">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cypress-900 border border-cypress-800 text-bronze-400 inline-block mb-4">
                {currentLocation.tag}
              </span>
              <h3 className="font-display text-2xl font-bold text-alabaster-50 mb-3">
                {currentLocation.name}
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-alabaster-100/80 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-bronze-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-alabaster-50 block">Address</span>
                    <span>{currentLocation.address}</span>
                    <span className="text-xs text-alabaster-200/60 block mt-0.5">Landmark: {currentLocation.landmark}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-bronze-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-alabaster-50 block">Operating Hours</span>
                    <span>{currentLocation.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-bronze-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-alabaster-50 block">Direct Appointments & Triage</span>
                    <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-bronze-300 font-bold hover:underline">
                      {currentLocation.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-cypress-800 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://maps.google.com/?q=${currentLocation.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 pill-button bg-bronze-600 hover:bg-[#864c31] text-alabaster-50 text-xs font-semibold py-3 px-5 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <NavigationArrow size={15} weight="bold" />
                <span>Get Directions in Google Maps</span>
              </a>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="w-full sm:w-auto pill-button bg-cypress-900 hover:bg-cypress-800 border border-cypress-700 text-alabaster-50 text-xs font-semibold py-3 px-5 rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                <Phone size={15} weight="bold" />
                <span>Call Practice</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CHAMBERS PHOTOGRAPHY & INTERACTIVE BOOKING FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-start">
        
        {/* Left Column: Chambers Visual & Logistics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Chambers Interior Photo Card */}
          <div className="rounded-3xl overflow-hidden border border-alabaster-200 bg-cypress-950 shadow-card relative group">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src="/assets/images/chambers_appointment_interior.jpg"
                alt="Private consultation chambers interior of Dr. Mohan Kulkarni in Santacruz West, Mumbai"
                className="w-full h-full object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700 ease-emil"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-cypress-950/90 via-cypress-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-alabaster-50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-bronze-400 block mb-0.5">
                PRIVATE CONSULTATION SUITE
              </span>
              <h3 className="font-sans text-base font-bold text-alabaster-50">
                Suite 2, Saraswat Colony • Santacruz West
              </h3>
              <p className="text-xs text-alabaster-100/80 mt-1">
                Unhurried 45-minute private evaluations with intraoral 3D camera and digital radiovisiography.
              </p>
            </div>
          </div>

          {/* Direct WhatsApp Triage Card */}
          <div className="bg-gradient-to-br from-emerald-950 via-cypress-950 to-cypress-950 border border-emerald-800/60 text-alabaster-50 rounded-3xl p-6 sm:p-7 shadow-card relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-900/60 border border-emerald-700/60 px-3 py-1 rounded-full">
                Instant Chat & Triage
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Desk
              </span>
            </div>

            <h3 className="font-sans text-xl font-bold text-alabaster-50 mb-1.5">
              WhatsApp Practice Concierge
            </h3>
            <p className="text-xs text-alabaster-100/80 leading-relaxed mb-4">
              Have questions about dental implants, smile makeovers, or immediate tooth pain relief? Message our clinic team directly on WhatsApp for fast-track appointments.
            </p>

            <a
              href={`https://wa.me/${contact.phoneRaw}?text=Hello%20Dr.%20Mohan%20Kulkarni%27s%20chambers%2C%20I%20would%20like%20to%20inquire%20about%20a%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-cypress-950 text-xs font-bold py-3 px-4 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.35)] active:scale-95 transition-all"
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>Chat with Clinic on WhatsApp</span>
            </a>
          </div>

          {/* Quick Contact & Emergency Triage Box */}
          <div className="bg-white border border-alabaster-200 rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
            <h3 className="font-sans text-lg font-bold text-cypress-950">
              Chambers Telephone & Records Desk
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-alabaster-100 flex items-center justify-center text-bronze-600 shrink-0">
                  <Phone size={16} weight="bold" />
                </div>
                <div>
                  <span className="font-bold text-cypress-950 block">Direct Appointments</span>
                  <a href={`tel:${contact.phoneRaw}`} className="text-bronze-600 font-bold hover:underline">
                    {contact.phone}
                  </a>
                  <span className="text-xs text-slate-500 block">Landline: {contact.landline}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-alabaster-100 flex items-center justify-center text-bronze-600 shrink-0">
                  <EnvelopeSimple size={16} weight="bold" />
                </div>
                <div>
                  <span className="font-bold text-cypress-950 block">Electronic Scan Correspondence</span>
                  <a href={`mailto:${contact.email}`} className="text-bronze-600 hover:underline">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-alabaster-200 text-xs text-slate-600 flex items-center gap-2">
              <ShieldCheck size={16} className="text-bronze-600" />
              <span>Strict clinical confidentiality and ethical dental practice</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Consultation Request Form (7 cols) */}
        <div id="book-appointment" className="lg:col-span-7 bg-white border border-alabaster-200 rounded-3xl p-8 sm:p-10 shadow-card">
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-600 block mb-1">
              DIRECT CHAMBERS REQUEST
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cypress-950 tracking-tight mb-2">
              Request an In-Chambers Appointment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our clinical coordinator personally confirms appointments and coordinates digital records transfers within 4 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="bg-alabaster-100 border border-alabaster-200 rounded-2xl p-8 text-center animate-in fade-in-50 duration-200">
              <div className="w-14 h-14 rounded-full bg-bronze-600 text-alabaster-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} weight="fill" />
              </div>
              <h3 className="font-display text-2xl font-bold text-cypress-950 mb-2">
                Consultation Request Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                Thank you, <span className="font-semibold text-cypress-950">{formData.name || 'Patient'}</span>. Our
                patient care coordinator will reach out at{' '}
                <span className="font-semibold text-bronze-600">{formData.phone || 'your phone number'}</span> to
                confirm your dedicated consultation slot at our Santacruz West chambers.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="pill-button bg-cypress-950 hover:bg-cypress-900 text-alabaster-50 text-xs font-semibold px-6 py-2.5 rounded-full"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-cypress-950 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full bg-alabaster-50 border border-alabaster-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-cypress-950 placeholder:text-slate-600/40 focus:outline-none focus:border-bronze-600 focus:ring-1 focus:ring-bronze-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-cypress-950 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-alabaster-50 border border-alabaster-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-cypress-950 placeholder:text-slate-600/40 focus:outline-none focus:border-bronze-600 focus:ring-1 focus:ring-bronze-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-cypress-950 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patient@email.com"
                    className="w-full bg-alabaster-50 border border-alabaster-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-cypress-950 placeholder:text-slate-600/40 focus:outline-none focus:border-bronze-600 focus:ring-1 focus:ring-bronze-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-service" className="block text-xs font-bold uppercase tracking-wider text-cypress-950 mb-1.5">
                    Consultation Type
                  </label>
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-alabaster-50 border border-alabaster-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-cypress-950 focus:outline-none focus:border-bronze-600 focus:ring-1 focus:ring-bronze-600 transition-colors"
                  >
                    <option value="Dental Implants & Bone Grafting">Dental Implants & Bone Grafting</option>
                    <option value="Full Mouth Rehabilitation">Full Mouth Rehabilitation</option>
                    <option value="Single-Visit Microscopic RCT">Single-Visit Microscopic RCT</option>
                    <option value="Invisalign & Clear Aligners">Invisalign & Clear Aligners</option>
                    <option value="Cosmetic Veneers & Smile Makeover">Cosmetic Veneers & Smile Makeover</option>
                    <option value="Emergency Dental Pain Relief">Emergency Dental Pain Relief</option>
                    <option value="Routine Preventive Checkup & Prophylaxis">Routine Preventive Checkup & Prophylaxis</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-date" className="block text-xs font-bold uppercase tracking-wider text-cypress-950 mb-1.5">
                  Preferred Consultation Date
                </label>
                <input
                  id="contact-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-alabaster-50 border border-alabaster-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-cypress-950 focus:outline-none focus:border-bronze-600 focus:ring-1 focus:ring-bronze-600 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-notes" className="block text-xs font-bold uppercase tracking-wider text-cypress-950 mb-1.5">
                  Clinical Concern or Reason for Visit
                </label>
                <textarea
                  id="contact-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention current tooth pain, missing teeth, previous dental work, or aesthetic goals..."
                  className="w-full bg-alabaster-50 border border-alabaster-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-cypress-950 placeholder:text-slate-600/40 focus:outline-none focus:border-bronze-600 focus:ring-1 focus:ring-bronze-600 transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full pill-button bg-bronze-600 hover:bg-[#864c31] text-alabaster-50 text-xs font-bold py-3.5 px-8 rounded-full shadow-md flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <CalendarCheck size={16} weight="bold" />
                  <span>Submit Appointment Request</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-500">
                  Prefer direct phone scheduling? Call{' '}
                  <a href={`tel:${contact.phoneRaw}`} className="text-bronze-600 font-bold hover:underline">
                    {contact.phone}
                  </a>{' '}
                  or{' '}
                  <a href={`tel:${contact.landlineRaw}`} className="text-bronze-600 font-bold hover:underline">
                    {contact.landline}
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Direct WhatsApp Concierge Bottom Banner */}
      <div className="bg-alabaster-100 rounded-3xl p-8 sm:p-12 border border-alabaster-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-bronze-600 block mb-1">
            RAPID TRIAGE & SECOND OPINIONS
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-cypress-950 mb-2">
            Urgent Tooth Pain or Immediate Implant Query?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            We prioritize sudden dental emergencies and trauma every morning. Send photos or X-rays via WhatsApp for instant clinician review.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${contact.phoneRaw}?text=Hello%20Dr.%20Mohan%20Kulkarni%27s%20chambers%2C%20I%20have%20an%20urgent%20dental%20query.`}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button bg-[#25D366] hover:bg-[#20ba59] text-cypress-950 text-xs font-bold px-7 py-3.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>WhatsApp Emergency Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
