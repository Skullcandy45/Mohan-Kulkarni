import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck, Award, Heart, ArrowUp } from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dent-950 text-white border-t border-dent-800/80 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-dent-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-dent-500 to-dent-800 flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6 text-gold-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 6 3 9 1 1.5 2 1.5 2.5 0 .5-1.5 1-3 1.5-3s1 1.5 1.5 3c.5 1.5 1.5 1.5 2.5 0 1.5-3 3-6.5 3-9 0-3.5-2.5-6-6-6Z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight block">
                  Dr. Mohan Kulkarni
                </span>
                <span className="text-xs text-gold-400 font-semibold tracking-wider uppercase block">
                  Implantology & 3D Smile Studio
                </span>
              </div>
            </Link>

            <p className="text-dent-200/70 text-sm leading-relaxed max-w-sm">
              World-class painless dentistry, guided 3D digital implantology, and bespoke ceramic smile architecture tailored to your unique facial aesthetics.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>NABH Sterilization Grade</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold text-gold-300">
                <Award size={14} className="text-gold-400" />
                <span>FICOI (USA) Fellow</span>
              </div>
            </div>
          </div>

          {/* Treatments Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-gold-400 mb-4">
              Advanced Treatments
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-dent-100/80">
              {siteData.services.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services#${s.slug}`}
                    className="hover:text-gold-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-dent-500">›</span>
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Pages (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-gold-400 mb-4">
              Explore Practice
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-dent-100/80">
              <li><Link to="/" className="hover:text-gold-300 transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-gold-300 transition-colors">Dr. Mohan’s Profile</Link></li>
              <li><Link to="/services" className="hover:text-gold-300 transition-colors">Clinical Procedures</Link></li>
              <li><Link to="/smile-studio" className="hover:text-gold-300 transition-colors text-emerald-400 font-semibold flex items-center gap-1">3D Smile Studio ★</Link></li>
              <li><Link to="/gallery" className="hover:text-gold-300 transition-colors">Before & After Cases</Link></li>
              <li><Link to="/appointment" className="hover:text-gold-300 transition-colors">Book Consultation</Link></li>
              <li><Link to="/contact" className="hover:text-gold-300 transition-colors">Clinic Locations</Link></li>
            </ul>
          </div>

          {/* Locations & Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-gold-400 mb-4">
              Clinic Centers
            </h4>
            <div className="flex flex-col gap-4 text-xs text-dent-100/80">
              <div>
                <strong className="text-white block font-semibold text-sm mb-0.5">Bandra West Flagship:</strong>
                <p className="text-dent-300/80">Suite 302, Sagar Fortune Tower, Waterfield Rd, Bandra W, Mumbai 400050</p>
              </div>

              <div>
                <strong className="text-white block font-semibold text-sm mb-0.5">Marine Lines Center:</strong>
                <p className="text-dent-300/80">Imperial Medical Chambers, Opp. Marine Lines Stn, Mumbai 400020</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5">
                <span className="flex items-center gap-2 text-white">
                  <Phone size={13} className="text-gold-400" />
                  <a href={`tel:${siteData.contact.phone}`} className="hover:underline">{siteData.contact.phoneFormatted}</a>
                </span>
                <span className="flex items-center gap-2 text-white">
                  <Mail size={13} className="text-gold-400" />
                  <a href={`mailto:${siteData.contact.email}`} className="hover:underline">{siteData.contact.email}</a>
                </span>
                <span className="flex items-center gap-2 text-dent-300">
                  <Clock size={13} className="text-dent-400" />
                  <span>Mon - Sat: 9:00 AM - 8:30 PM</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dent-400/80">
          <div>
            © {new Date().getFullYear()} Dr. Mohan Kulkarni Dental Practice. All clinical rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>NABH Accredited Safety</span>
            <span>•</span>
            <span>ISO 9001:2015 Certified</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-semibold"
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
