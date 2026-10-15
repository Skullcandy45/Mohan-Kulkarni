import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertTriangle,
  Car,
  Navigation,
} from 'lucide-react';
import { siteData } from '../data/siteData';

export default function ContactPage() {
  const [selectedLocation, setSelectedLocation] = useState(siteData.contact.locations[0]);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSendMessage = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen subtle-mesh-bg pt-28 sm:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-dent-600 block mb-3">
            Two Premier Practice Locations
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dent-950 tracking-tight mb-4">
            Visit Our Studios in <span className="teal-gradient-text">Bandra & South Mumbai</span>
          </h1>
          <p className="text-base text-dent-950/70 leading-relaxed">
            Equipped with 3D CBCT imaging, in-house robotic CAD/CAM labs, and private VIP treatment suites. Valet parking provided.
          </p>
        </div>

        {/* Emergency Callout Banner */}
        <div className="mb-14 p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-dent-950">Experiencing Acute Dental Pain or a Broken Tooth?</h4>
              <p className="text-xs text-dent-700">Same-day emergency treatment preserved daily for acute toothache, trauma, or dislodged crowns.</p>
            </div>
          </div>
          <a
            href={`tel:${siteData.contact.emergencyPhone}`}
            className="whitespace-nowrap inline-flex items-center gap-2 bg-dent-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all shrink-0"
          >
            <Phone size={14} className="text-amber-400" />
            <span>Emergency Line: {siteData.contact.emergencyPhone}</span>
          </a>
        </div>

        {/* Studio Locations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {siteData.contact.locations.map((loc) => (
            <div
              key={loc.id}
              className="rounded-3xl bg-white border border-dent-500/15 p-6 sm:p-8 shadow-glass flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-52 rounded-2xl overflow-hidden mb-6 relative">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dent-950/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-gold-300 font-bold block mb-0.5">
                      Practice Location
                    </span>
                    <h3 className="text-xl font-bold">{loc.name}</h3>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-xs text-dent-900">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-dent-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-dent-950">{loc.address}</p>
                      <p className="text-dent-600 mt-0.5 font-medium">{loc.landmark}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-dent-600 shrink-0" />
                    <a href={`tel:${loc.phone}`} className="font-semibold text-dent-950 hover:text-dent-600">{loc.phone}</a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock size={15} className="text-dent-600 shrink-0" />
                    <span>Mon – Sat: 9:00 AM – 8:30 PM (Sunday by Emergency Appointment)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-dent-100 mb-6">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-dent-600 block mb-2">
                    Suite Amenities & Technology:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {loc.features.map((feat, i) => (
                      <span key={i} className="text-xs text-dent-800 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-dent-100 flex items-center gap-3">
                <a
                  href={`https://wa.me/${siteData.contact.whatsapp}?text=Hello+Dr+Mohan+Kulkarni+Clinic%2C+I+would+like+directions+to+your+${encodeURIComponent(loc.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Location</span>
                </a>
                <a
                  href={`tel:${loc.phone}`}
                  className="px-4 py-3.5 rounded-xl border border-dent-300 text-dent-900 font-bold text-xs hover:bg-dent-50"
                  title="Call Studio"
                >
                  <Phone size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Message Concierge Form */}
        <div className="rounded-3xl bg-dent-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold block mb-2">
                Direct Clinic Concierge
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Have a Question Before Visiting?
              </h3>
              <p className="text-dent-200/80 text-sm leading-relaxed mb-6">
                Send our clinical desk a message. Dr. Mohan Kulkarni or our lead treatment coordinator will respond within 2 hours with transparent medical guidance.
              </p>

              <div className="space-y-3 text-xs text-dent-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Strict patient confidentiality & HIPAA compliant privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car size={16} className="text-gold-400" />
                  <span>Complimentary valet parking available at both studios</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Message Received!</h4>
                  <p className="text-xs text-dent-200">Our clinic coordinator will get in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-dent-200 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sanya Mehra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-dent-300/50 focus:outline-none focus:ring-2 focus:ring-dent-400"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-dent-200 block mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-dent-300/50 focus:outline-none focus:ring-2 focus:ring-dent-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-dent-200 block mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-dent-300/50 focus:outline-none focus:ring-2 focus:ring-dent-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-dent-200 block mb-1">Your Message / Query</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Ask about implants, veneers, fees, or request a callback..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-dent-300/50 focus:outline-none focus:ring-2 focus:ring-dent-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-dent-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all"
                  >
                    <Send size={14} />
                    <span>Send Inquiry to Dr. Mohan</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
