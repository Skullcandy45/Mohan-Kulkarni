import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  User,
  Briefcase,
} from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "../config/siteConfig";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { api } from "../lib/api";
import { useSettings } from "../contexts/SettingsContext";
import { getPublicContactInfo, getPublicSiteName } from "../lib/contactInfo";
import { parseJsonArray, normalizeContactHourRow } from "../lib/contentFromSettings";
import { resolveMapEmbedUrl } from "../lib/resolveMapEmbedUrl";
import { formatApiError } from "../lib/formatApiError";
import { validateContactForm } from "../lib/publicFormValidation";

export default function ContactPage() {
  const { settings } = useSettings();
  const { site, content } = siteConfig;
  const contact = getPublicContactInfo(settings);
  const siteName = getPublicSiteName(settings);
  const contactContent = content?.contact || {};
  const hoursRaw = settings?.contact_hours_json ?? '';
  const topicsRaw = settings?.contact_topics_json ?? '';
  const hours = useMemo(() => {
    const rows = parseJsonArray(hoursRaw, contactContent.hours || []);
    return rows.map(normalizeContactHourRow).filter(Boolean);
  }, [hoursRaw, contactContent.hours]);

  const topics = useMemo(() => {
    const list = parseJsonArray(topicsRaw, contactContent.topics || []).filter(
      (t) => t && typeof t.id === 'string' && t.label,
    );
    return list.length ? list : contactContent.topics || [{ id: 'general', label: 'General' }];
  }, [topicsRaw, contactContent.topics]);

  const mapEmbedSrc = resolveMapEmbedUrl(
    settings?.contact_map_embed_url || contactContent.mapEmbedUrl || '',
  );

  const defaultSubject = topics[0]?.id || "project";
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: defaultSubject,
    message: "",
  });

  useEffect(() => {
    if (!topics.length) return;
    setForm((f) => {
      if (topics.some((t) => t.id === f.subject)) return f;
      return { ...f, subject: topics[0].id };
    });
  }, [topics]);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const validation = validateContactForm(form);
    if (!validation.valid) {
      setErrorMsg(validation.message);
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await api.contact.send({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      });
      if (!res?.success) throw new Error(formatApiError(res));
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({
          name: "",
          phone: "",
          email: "",
          subject: defaultSubject,
          message: "",
        });
      }, 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg(formatApiError(err));
      setStatus("error");
    }
  };

  const sendOnWhatsApp = () => {
    const lines = [
      `Hi ${siteName} —`,
      form.name && `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.subject &&
        `About: ${topics.find((t) => t.id === form.subject)?.label || form.subject}`,
      form.message && `Notes: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppLink(lines, settings), "_blank", "noopener,noreferrer");
  };

  const waLink = buildWhatsAppLink('', settings);

  return (
    <div className="premium-page-content overflow-x-clip">
      {/* HERO */}
      <section className="relative pt-4 lg:pt-8 pb-12">
        <div className="absolute inset-0 bg-grid-soft opacity-[0.4] pointer-events-none mask-fade-b" />
        <div className="shell relative max-w-3xl">
          <span className="chip">
            <Sparkles size={11} className="text-primary" />{" "}
            {contactContent.title}
          </span>
          <h1 className="mt-6 display-h1 text-balance">
            {contactContent.title}
          </h1>
          <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">
            {contactContent.subtitle}
          </p>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="pb-20 sm:pb-28">
        <div className="shell grid lg:grid-cols-12 gap-8">
          {/* LEFT — WhatsApp hero card + info */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative card overflow-hidden p-8 sm:p-10 bg-whatsapp text-white border-whatsapp"
            >
              <div className="absolute inset-0 opacity-[0.08] bg-grid-pattern" />
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 grid place-items-center">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/80">
                      Fastest reply
                    </div>
                    <div className="font-display font-medium text-2xl tracking-tight">
                      Chat on WhatsApp
                    </div>
                  </div>
                </div>
                <p className="text-white/85 text-base leading-relaxed mb-7">
                  A real reply from our team — usually within a few hours during business days.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-white text-whatsapp-dark w-full justify-center py-3.5 text-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" /> Start a chat
                </a>
              </div>
            </motion.div>

            {/* contact details */}
            <div className="card p-7 sm:p-8">
              <span className="eyebrow">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />{" "}
                {contactContent.infoTitle}
              </span>
              <ul className="mt-5 space-y-5">
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-bg-subtle border border-line grid place-items-center shrink-0">
                    <Phone size={15} className="text-primary" />
                  </span>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted">
                      Phone
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-ink font-medium hover:text-primary transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-bg-subtle border border-line grid place-items-center shrink-0">
                    <Mail size={15} className="text-primary" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-mono uppercase tracking-widest text-muted">
                      Email
                    </div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-ink font-medium hover:text-primary transition-colors break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-bg-subtle border border-line grid place-items-center shrink-0">
                    <MapPin size={15} className="text-primary" />
                  </span>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted">
                      Address
                    </div>
                    <div className="text-ink font-medium leading-relaxed">
                      {contact.address}
                    </div>
                    {contact.address ? (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                      >
                        Get directions <ArrowUpRight size={14} />
                      </a>
                    ) : null}
                  </div>
                </li>
              </ul>

              <div className="mt-7 pt-6 border-t border-line">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-primary" />
                  <span className="text-xs font-mono uppercase tracking-widest text-muted">
                    Hours
                  </span>
                </div>
                <div className="space-y-2">
                  {hours.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-ink/85">{h.day}</span>
                      <span className="font-mono text-muted">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="card p-8 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait">
                {status === "success" ?
                  <motion.div
                    key="success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary-soft border border-primary/25 grid place-items-center mx-auto mb-7">
                      <CheckCircle2 size={36} className="text-primary" />
                    </div>
                    <h3 className="font-display font-medium text-3xl text-ink mb-3 tracking-mega">
                      Message sent.
                    </h3>
                    <p className="text-muted text-base max-w-sm mx-auto leading-relaxed">
                      Thanks — we'll reply within a business day.
                    </p>
                  </motion.div>
                : <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-end justify-between flex-wrap gap-3 mb-2">
                      <div>
                        <span className="eyebrow">
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />{" "}
                          {contactContent.formTitle}
                        </span>
                        <h2 className="mt-3 font-display font-medium text-3xl sm:text-4xl text-ink tracking-mega">
                          Get in touch with us.
                        </h2>
                      </div>
                    </div>

                    {status === "error" && errorMsg ? (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="rounded-[var(--radius-md)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      >
                        {errorMsg}
                      </motion.p>
                    ) : null}

                    {/* topic chips */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted mb-3">
                        <Briefcase size={12} className="text-primary" /> About
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setForm({ ...form, subject: t.id })}
                            className={`chip transition-all ${
                              form.subject === t.id ?
                                "bg-ink text-cream border-ink"
                              : "bg-surface text-ink/70 border-line hover:border-ink/30"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted mb-2">
                          <User size={12} className="text-primary" /> Name *
                        </label>
                        <input
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="field"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted mb-2">
                          <Phone size={12} className="text-primary" /> Phone
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Optional"
                          className="field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted mb-2">
                        <Mail size={12} className="text-primary" /> Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="field"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted mb-2">
                        <MessageSquare size={12} className="text-primary" />{" "}
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us briefly what you need — a checkup, a specific concern, or just a question about our services…"
                        className="field resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-primary flex-1 py-4 disabled:opacity-70"
                      >
                        {status === "loading" ?
                          <span className="flex items-center gap-3">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-5 h-5 border-2 border-cream/40 border-t-cream rounded-full block"
                            />
                            Sending…
                          </span>
                        : <>
                            <Send size={16} /> Send Message{" "}
                            <ArrowUpRight size={14} />
                          </>
                        }
                      </button>
                      <button
                        type="button"
                        onClick={sendOnWhatsApp}
                        className="btn-whatsapp flex-1 sm:flex-initial sm:px-7 py-4"
                      >
                        <WhatsAppIcon className="w-4 h-4" /> Send on WhatsApp
                      </button>
                    </div>
                  </motion.form>
                }
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {mapEmbedSrc ? (
        <section className="pb-20">
          <div className="shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden border border-line bg-surface aspect-[16/10] sm:aspect-[21/9] min-h-[240px]"
            >
              <iframe
                title="Location map"
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="block w-full h-full min-h-[240px] grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
