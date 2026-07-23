"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Mail, MapPin, Calendar, Clock, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/BrandIcons";
import type { ContactFormData } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────────────────────
function ContactHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4"
    >
      <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "oklch(0.72 0.18 210)" }}>
        — CONTACT —
      </p>
      <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
        Get In <span style={{ color: "oklch(0.72 0.18 210)" }}>Touch</span>
      </h2>
      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
        Have an opportunity, project in mind, or just want to chat? Reach out using the form below or contact me directly.
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stacked Detail Item
// ─────────────────────────────────────────────────────────────────────────────
interface DetailItemProps {
  label: string;
  value: string;
  href?: string;
  icon: React.ElementType;
  delay?: number;
}

function DetailItem({ label, value, href, icon: Icon, delay = 0 }: DetailItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-[oklch(0.45_0_0)]" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
          {label}
        </span>
      </div>
      <span className="font-sans text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-[oklch(0.72_0.18_210)]">
        {value}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="group block w-fit">
        {content}
      </a>
    );
  }

  return <div className="group block w-fit">{content}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Section
// ─────────────────────────────────────────────────────────────────────────────
export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "0px 0px -60px 0px" });
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Failed to send message.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again or email directly.");
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28" aria-label="Contact Section">
      {/* Top rule */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-[oklch(1_0_0/10%)]" />

      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          
          {/* ── Left Column: Contact Details ── */}
          <div className="lg:w-[38%] lg:pt-1 flex flex-col gap-12">
            <ContactHeader />
            
            {/* Availability Status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-production opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-production" />
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                Available for Freelance & Remote Opportunities
              </span>
            </div>

            {/* Primary Details */}
            <div className="flex flex-col gap-8">
              <DetailItem label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} icon={Mail} delay={0.1} />
              <DetailItem label="Location" value={siteConfig.location} icon={MapPin} delay={0.15} />
              <DetailItem label="GitHub" value="github.com/Doc3ric" href={siteConfig.github} icon={GitHubIcon} delay={0.2} />
              <DetailItem label="LinkedIn" value="linkedin.com/in/alenton-eric" href={siteConfig.linkedin} icon={LinkedInIcon} delay={0.25} />
            </div>
            
            {/* Short divider */}
            <div className="h-px w-12 bg-[oklch(1_0_0/10%)]" aria-hidden="true" />
            
            {/* Response Info */}
            <div className="flex flex-col gap-8">
              <DetailItem label="Response Time" value={siteConfig.contact.responseTime} icon={Clock} delay={0.3} />
              <DetailItem label="Timezone" value={siteConfig.contact.timezone} icon={Calendar} delay={0.35} />
            </div>
          </div>

          {/* ── Right Column: Form ── */}
          <div className="flex-1 lg:pt-1">
            <motion.form
              ref={formRef}
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 lg:pl-10 lg:border-l lg:border-[oklch(1_0_0/10%)] lg:min-h-full"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[oklch(1_0_0/10%)] sm:hidden">
                 <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">Prefer email? Just click above</span>
              </div>
              <div className="hidden sm:flex justify-end pb-2">
                 <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">Prefer email? Just click the link on the left</span>
              </div>

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
                    Your Name <span className="text-muted-foreground/50">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "submitting" || status === "success"}
                    required
                    className="w-full border-0 border-b border-[oklch(1_0_0/10%)] bg-transparent px-0 py-2.5 text-base text-foreground placeholder:text-[oklch(1_0_0/25%)] focus:border-[oklch(0.72_0.18_210)] focus:outline-none focus:ring-0 transition-colors disabled:opacity-50"
                  />
                </div>
                
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
                    Email Address <span className="text-muted-foreground/50">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "submitting" || status === "success"}
                    required
                    className="w-full border-0 border-b border-[oklch(1_0_0/10%)] bg-transparent px-0 py-2.5 text-base text-foreground placeholder:text-[oklch(1_0_0/25%)] focus:border-[oklch(0.72_0.18_210)] focus:outline-none focus:ring-0 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === "submitting" || status === "success"}
                  className="w-full border-0 border-b border-[oklch(1_0_0/10%)] bg-transparent px-0 py-2.5 text-base text-foreground placeholder:text-[oklch(1_0_0/25%)] focus:border-[oklch(0.72_0.18_210)] focus:outline-none focus:ring-0 transition-colors disabled:opacity-50"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
                  Message <span className="text-muted-foreground/50">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Hi Eric, I'd like to discuss..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "submitting" || status === "success"}
                  required
                  className="w-full resize-none border-0 border-b border-[oklch(1_0_0/10%)] bg-transparent px-0 py-2.5 text-base text-foreground placeholder:text-[oklch(1_0_0/25%)] focus:border-[oklch(0.72_0.18_210)] focus:outline-none focus:ring-0 transition-colors disabled:opacity-50"
                />
              </div>

              {/* Status / Submit Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
                
                {/* Alerts Area */}
                <div className="flex-1 min-h-[3rem] flex items-center">
                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2.5 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="h-4.5 w-4.5 shrink-0" style={{ color: "oklch(0.72 0.18 210)" }} />
                        <span>Message sent — I'll get back to you within 24 hours</span>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2.5 text-sm text-destructive"
                      >
                        <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="group/btn inline-flex items-center justify-center sm:justify-start gap-2 font-mono text-[10px] tracking-widest uppercase font-semibold text-foreground transition-colors hover:text-[oklch(0.72_0.18_210)] disabled:opacity-50 disabled:hover:text-foreground shrink-0"
                >
                  {status === "submitting" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="h-3.5 w-3.5 border border-current border-t-transparent rounded-full"
                      />
                      Sending
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
