import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { siteData } from '../data/siteData';

export default function AppointmentPage() {
  const [searchParams] = useSearchParams();
  const prefillService = searchParams.get('service') || searchParams.get('concern') || 'dental-implants';

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    type: 'in-clinic', // 'in-clinic' | 'virtual' | 'emergency'
    location: 'bandra-flagship',
    service: prefillService,
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [bookingRef, setBookingRef] = useState('');

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0F766E', '#14B8A6', '#C59A5A', '#EBDDC5'],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `DMK-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(generatedRef);
      setIsSubmitting(false);
      setIsConfirmed(true);
      triggerConfetti();
    }, 800);
  };

  const getWhatsAppBookingUrl = () => {
    const text = `Hello Dr. Mohan Kulkarni Practice, I have booked consultation reference ${bookingRef}.\nName: ${formData.name}\nService: ${formData.service}\nLocation: ${formData.location === 'bandra-flagship' ? 'Bandra West' : 'South Mumbai'}\nTime: ${formData.preferredDate} (${formData.preferredTime})`;
    return `https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen subtle-mesh-bg pt-28 sm:pt-36 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-dent-100 text-dent-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar size={13} className="text-gold-600" />
            <span>Priority Consultation Scheduler</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dent-950 tracking-tight mb-3">
            Reserve Your Time with <br /><span className="teal-gradient-text">Dr. Mohan Kulkarni</span>
          </h1>
          <p className="text-sm text-dent-950/70">
            Dedicated 45-minute clinical evaluation with 3D intraoral optical scanning and personalized surgical treatment blueprint.
          </p>
        </div>

        {/* Confirmation Screen */}
        {isConfirmed ? (
          <div className="rounded-3xl bg-white border border-dent-500/20 p-8 sm:p-12 shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={36} />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-2">
              Appointment Successfully Reserved
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dent-950 mb-2">
              We Look Forward to Welcoming You, {formData.name}!
            </h2>
            <div className="inline-block bg-dent-50 border border-dent-200 px-4 py-2 rounded-xl text-xs font-mono font-bold text-dent-900 mb-6">
              Booking Ref: <span className="text-dent-600">{bookingRef}</span>
            </div>

            <p className="text-sm text-dent-950/75 max-w-lg mx-auto mb-8 leading-relaxed">
              Our patient concierge will call you at <strong className="text-dent-950">{formData.phone}</strong> to confirm your slot on <strong>{formData.preferredDate || 'your preferred date'}</strong> at our <strong>{formData.location === 'bandra-flagship' ? 'Bandra West Flagship' : 'South Mumbai Center'}</strong>.
            </p>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg transition-all"
              >
                <MessageCircle size={16} />
                <span>Confirm on WhatsApp Now</span>
              </a>

              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-dent-50 hover:bg-dent-100 text-dent-900 font-bold text-xs px-6 py-3.5 rounded-xl border border-dent-200 transition-colors"
              >
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Booking Form */
          <div className="rounded-3xl bg-white border border-dent-500/15 p-6 sm:p-10 shadow-glass">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Mode & Location */}
              <div className="mb-8">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-dent-600 block mb-3">
                  Step 1: Choose Consultation Type & Location
                </label>
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  {[
                    { id: 'in-clinic', title: 'In-Clinic VIP Visit', desc: 'Comprehensive 3D scan & face-to-face diagnosis' },
                    { id: 'virtual', title: 'Virtual Video Consult', desc: 'Initial consultation from the comfort of home' },
                    { id: 'emergency', title: 'Emergency Triage', desc: 'Acute toothache or broken crown priority' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setFormData({ ...formData, type: t.id })}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        formData.type === t.id
                          ? 'border-dent-600 bg-dent-50/80 ring-1 ring-dent-600'
                          : 'border-dent-200 bg-white hover:bg-slateBg'
                      }`}
                    >
                      <h4 className="text-xs font-bold text-dent-950 mb-1">{t.title}</h4>
                      <p className="text-[11px] text-dent-600 leading-snug">{t.desc}</p>
                    </button>
                  ))}
                </div>

                {formData.type === 'in-clinic' && (
                  <div className="grid sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-dent-50/60 border border-dent-200">
                    {siteData.contact.locations.map((loc) => (
                      <button
                        type="button"
                        key={loc.id}
                        onClick={() => setFormData({ ...formData, location: loc.id })}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          formData.location === loc.id
                            ? 'border-dent-600 bg-white shadow-xs font-bold text-dent-900'
                            : 'border-transparent text-dent-700 hover:bg-white/60'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                          <MapPin size={13} className="text-dent-600" />
                          <span>{loc.name}</span>
                        </div>
                        <p className="text-[11px] text-dent-600/80">{loc.address}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 2: Treatment Interest */}
              <div className="mb-8">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-dent-600 block mb-3">
                  Step 2: Primary Dental Specialty Required
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full p-3.5 rounded-xl border border-dent-200 bg-white text-xs sm:text-sm font-semibold text-dent-900 focus:outline-none focus:ring-2 focus:ring-dent-600"
                >
                  {siteData.services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.badge})
                    </option>
                  ))}
                  <option value="routine-checkup">Comprehensive Oral Checkup & Ultrasonic Scaling</option>
                  <option value="other">Other Dental Inquiry / Second Opinion</option>
                </select>
              </div>

              {/* Step 3: Preferred Date & Time Slot */}
              <div className="mb-8">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-dent-600 block mb-3">
                  Step 3: Preferred Schedule
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-dent-700 font-semibold block mb-1.5">Select Date:</span>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 rounded-xl border border-dent-200 bg-white text-xs sm:text-sm text-dent-900 focus:outline-none focus:ring-2 focus:ring-dent-600"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-dent-700 font-semibold block mb-1.5">Select Time Window:</span>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full p-3 rounded-xl border border-dent-200 bg-white text-xs sm:text-sm text-dent-900 focus:outline-none focus:ring-2 focus:ring-dent-600"
                    >
                      <option>Morning (10:00 AM - 1:00 PM)</option>
                      <option>Afternoon (2:00 PM - 5:00 PM)</option>
                      <option>Evening (5:30 PM - 8:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 4: Patient Details */}
              <div className="mb-8 pt-6 border-t border-dent-100">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-dent-600 block mb-4">
                  Step 4: Patient Contact Information
                </label>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-dent-800 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-dent-200 text-xs sm:text-sm text-dent-900 focus:outline-none focus:ring-2 focus:ring-dent-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dent-800 block mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-dent-200 text-xs sm:text-sm text-dent-900 focus:outline-none focus:ring-2 focus:ring-dent-600"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-dent-800 block mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-dent-200 text-xs sm:text-sm text-dent-900 focus:outline-none focus:ring-2 focus:ring-dent-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-dent-800 block mb-1">Symptoms or Special Requests</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your tooth issue, anxiety level, or if you require wheelchair assistance..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 rounded-xl border border-dent-200 text-xs sm:text-sm text-dent-900 focus:outline-none focus:ring-2 focus:ring-dent-600 resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-dent-600">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Zero cancellation fee • Instant appointment hold</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-dent-600 via-dent-700 to-dent-800 hover:from-dent-500 hover:to-dent-700 text-white font-bold text-xs uppercase tracking-wider px-9 py-4 rounded-xl shadow-xl shadow-dent-700/25 transition-all hover:scale-105"
                >
                  {isSubmitting ? (
                    <span>Reserving Slot...</span>
                  ) : (
                    <>
                      <Calendar size={15} />
                      <span>Confirm Consultation Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
