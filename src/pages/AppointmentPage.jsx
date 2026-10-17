import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "../config/siteConfig";
import { useSettings } from "../contexts/SettingsContext";
import { api } from "../lib/api";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { getPublicContactInfo } from "../lib/contactInfo";
import { formatApiError } from "../lib/formatApiError";
import { validateAppointmentForm } from "../lib/publicFormValidation";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  staff: "",
  service: "",
  message: "",
};

function Field({ icon: Icon, label, children, hint }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted mb-2">
        <Icon size={12} className="text-primary" /> {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-2">{hint}</p>}
    </div>
  );
}

export default function AppointmentPage() {
  const { settings } = useSettings();
  const contact = getPublicContactInfo(settings);
  const [searchParams] = useSearchParams();
  const { site, content } = siteConfig;
  const [team, setTeam] = useState(siteConfig.team || []);
  const [services, setServices] = useState(siteConfig.services || []);
  const commonContent = content?.common || {};
  const appointmentContent = content?.appointment || {};
  const prefillService = searchParams.get("service") || "";
  const [form, setForm] = useState(() => ({
    ...initialForm,
    service: prefillService,
  }));
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      api.doctors.getAll({ published: true }),
      api.services.getAll({ published: true }),
    ])
      .then(([teamRes, servicesRes]) => {
        if (!active) return;
        if (teamRes.success && Array.isArray(teamRes.data) && teamRes.data.length > 0) {
          setTeam(teamRes.data);
        }
        if (servicesRes.success && Array.isArray(servicesRes.data) && servicesRes.data.length > 0) {
          setServices(servicesRes.data);
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (prefillService) {
      setForm((prev) => ({ ...prev, service: prefillService }));
    }
  }, [prefillService]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const validation = validateAppointmentForm(form);
    if (!validation.valid) {
      setErrorMsg(validation.message);
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await api.appointment_requests.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferred_date: form.date,
        preferred_time: form.time || null,
        service_interest: form.service || null,
        staff_preference: form.staff || null,
        message: form.message || null,
      });
      if (!res?.success) throw new Error(formatApiError(res));
      setStatus("success");
    } catch (err) {
      setErrorMsg(formatApiError(err));
      setStatus("error");
      console.error("Submit failed:", err);
    }
  };

  const sendOnWhatsApp = () => {
    const lines = [
      `Hi ${site.name} — I'd like to book a call.`,
      form.name && `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.service && `Service: ${form.service}`,
      form.staff && `Lead: ${form.staff}`,
      form.date && `Preferred date: ${form.date}`,
      form.time && `Preferred time: ${form.time}`,
      form.message && `Notes: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppLink(lines, settings), "_blank", "noopener,noreferrer");
  };

  const resetForm = () => {
    setForm(initialForm);
    setStatus("idle");
  };

  return (
    <div className="premium-page-content overflow-x-clip">
      {/* HERO */}
      <section className="relative pt-4 lg:pt-8 pb-12">
        <div className="absolute inset-0 bg-grid-soft opacity-[0.4] pointer-events-none mask-fade-b" />
        <div className="shell relative max-w-3xl">
          <span className="chip">
            <Sparkles size={11} className="text-primary" />{" "}
            {appointmentContent.heroBadge || "Easy Booking"}
          </span>
          <h1 className="mt-6 display-h1 text-balance">
            Book a{" "}
            <em className="italic font-display text-primary">
              discovery call.
            </em>
          </h1>
          <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">
            {appointmentContent.heroSubtitle}
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="section pt-0">
        <div className="shell grid lg:grid-cols-12 gap-10">
          {/* LEFT — sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="card p-7 sm:p-8">
              <span className="eyebrow">
                <span className="w-1.5 h-1.5 rounded-full bg-current" /> What
                you'll get
              </span>
              <h3 className="mt-3 font-display text-2xl font-medium text-ink tracking-tight mb-6">
                {appointmentContent.sidebarTitle}
              </h3>
              <ul className="space-y-4">
                {appointmentContent.sidebarItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary-soft border border-primary/15 grid place-items-center shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-primary" />
                    </span>
                    <span className="text-base text-ink/85 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp callout */}
            <div className="card relative overflow-hidden p-7 sm:p-8 bg-whatsapp text-white border-whatsapp">
              <div className="absolute inset-0 opacity-[0.08] bg-grid-pattern" />
              <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/15 rounded-full blur-3xl" />
              <div className="relative">
                <span className="eyebrow text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />{" "}
                  Fastest reply
                </span>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight mb-2">
                  {appointmentContent.urgentTitle}
                </h3>
                <p className="text-white/85 text-sm leading-relaxed mb-6">
                  {appointmentContent.urgentSubtitle}
                </p>
                <a
                  href={buildWhatsAppLink(
                    "Hi — I want to book a call this week.",
                    settings,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white text-whatsapp-dark hover:bg-cream px-5 py-3 text-sm w-full justify-center"
                >
                  <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
                </a>
                {contact.phone ? (
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-3 flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium border-t border-white/20 pt-4"
                >
                  <Phone size={14} /> {contact.phone}
                </a>
                ) : null}
              </div>
            </div>
          </motion.aside>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="card p-8 sm:p-10 lg:p-12">
              {status === "success" ?
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 rounded-full bg-primary-soft border border-primary/25 grid place-items-center mx-auto mb-7">
                    <CheckCircle2 size={36} className="text-primary" />
                  </div>
                  <h3 className="font-display font-medium text-3xl sm:text-4xl text-ink mb-4 tracking-mega">
                    {appointmentContent.successTitle}
                  </h3>
                  <p className="text-muted text-lg max-w-md mx-auto leading-relaxed mb-10">
                    Thanks <strong className="text-ink">{form.name}</strong> —{" "}
                    {appointmentContent.successMessage}
                  </p>
                  <button
                    onClick={resetForm}
                    className="btn-primary px-8 py-3.5"
                  >
                    {appointmentContent.successButton}
                  </button>
                </motion.div>
              : <>
                  <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
                    <div>
                      <span className="eyebrow">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />{" "}
                        Project intake
                      </span>
                      <h2 className="mt-3 font-display font-medium text-3xl sm:text-4xl text-ink tracking-mega">
                        {appointmentContent.formTitle}
                      </h2>
                    </div>
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-2">
                      ~ 2 minutes
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field icon={User} label="Full name *">
                        <input
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="field"
                        />
                      </Field>
                      <Field icon={Phone} label="Phone *">
                        <input
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Your phone"
                          className="field"
                        />
                      </Field>
                    </div>

                    <Field icon={Mail} label="Email *">
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="field"
                      />
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field icon={Calendar} label="Preferred date *">
                        <input
                          name="date"
                          type="date"
                          required
                          value={form.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split("T")[0]}
                          className="field"
                        />
                      </Field>
                      <Field icon={Clock} label="Preferred time *">
                        <div className="relative">
                          <select
                            name="time"
                            required
                            value={form.time}
                            onChange={handleChange}
                            className="field appearance-none pr-10"
                          >
                            <option value="">Select time</option>
                            {[
                              "09:00 AM",
                              "10:00 AM",
                              "11:00 AM",
                              "12:00 PM",
                              "01:00 PM",
                              "02:00 PM",
                              "03:00 PM",
                              "04:00 PM",
                              "05:00 PM",
                            ].map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-2 pointer-events-none"
                          />
                        </div>
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        icon={User}
                        label={appointmentContent.preferredStaffLabel}
                      >
                        <div className="relative">
                          <select
                            name="staff"
                            value={form.staff}
                            onChange={handleChange}
                            className="field appearance-none pr-10"
                          >
                            <option value="">
                              {appointmentContent.anyStaffLabel}
                            </option>
                            {team.map((m) => (
                              <option key={m.id} value={m.name}>
                                {m.name} — {m.role}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-2 pointer-events-none"
                          />
                        </div>
                      </Field>
                      <Field
                        icon={Sparkles}
                        label={appointmentContent.serviceLabel}
                      >
                        <div className="relative">
                          <select
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className="field appearance-none pr-10"
                          >
                            <option value="">Pick a service</option>
                            {services.map((s) => (
                              <option key={s.id} value={s.title}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-2 pointer-events-none"
                          />
                        </div>
                      </Field>
                    </div>

                    <Field
                      icon={MessageSquare}
                      label="A few sentences about the project"
                    >
                      <textarea
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="What are you hoping to ship? Any constraints we should know?"
                        className="field resize-none"
                      />
                    </Field>

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
                            <Calendar size={16} />{" "}
                            {appointmentContent.submitButton ||
                              commonContent.ctaButton}
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

                    <p className="text-xs text-muted-2 font-mono uppercase tracking-widest text-center">
                      A senior on the team replies — usually within a business
                      day.
                    </p>
                  </form>
                </>
              }
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
