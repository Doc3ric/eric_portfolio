"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Calendar, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/BrandIcons";
import type { ContactFormData } from "@/types";

export function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
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
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
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
    <section id="contact" className="section bg-background" aria-label="Contact Section">
      <div className="container-xl flex flex-col gap-12">
        <SectionHeader
          eyebrow="Contact"
          heading="Get In"
          highlight="Touch"
          description="Have an opportunity, project in mind, or just want to chat? Reach out using the form below or contact me directly through my social channels."
        />

        <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Direct Details Side (2 columns) */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-border bg-surface-1 p-6 flex flex-col gap-6"
            >
              <h3 className="font-bold text-foreground">Contact Details</h3>

              <div className="flex flex-col gap-4">
                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3.5 rounded-lg border border-transparent p-2 hover:border-border hover:bg-surface-2 transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 group-hover:bg-background">
                    <Mail className="h-4.5 w-4.5 text-brand-blue" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Email Directly</span>
                    <span className="text-sm font-medium text-foreground">{siteConfig.email}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2">
                    <MapPin className="h-4.5 w-4.5 text-brand-blue" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Location</span>
                    <span className="text-sm font-medium text-foreground">{siteConfig.location}</span>
                  </div>
                </div>

                {/* GitHub */}
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-lg border border-transparent p-2 hover:border-border hover:bg-surface-2 transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 group-hover:bg-background">
                    <GitHubIcon className="h-4.5 w-4.5 text-brand-blue" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">GitHub Profile</span>
                    <span className="text-sm font-medium text-foreground">github.com/Doc3ric</span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-lg border border-transparent p-2 hover:border-border hover:bg-surface-2 transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 group-hover:bg-background">
                    <LinkedInIcon className="h-4.5 w-4.5 text-brand-blue" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">LinkedIn Profile</span>
                    <span className="text-sm font-medium text-foreground">linkedin.com/in/alenton-eric</span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Availability Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-border bg-surface-1 p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2">
                  <Clock className="h-4 w-4 text-brand-blue" />
                </div>
                <h3 className="font-bold text-foreground">Response Info</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1 border-r border-border pr-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Response Time</span>
                  <span className="text-sm font-medium text-foreground">{siteConfig.contact.responseTime}</span>
                </div>
                <div className="flex flex-col gap-1 pl-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Timezone</span>
                  <span className="text-sm font-medium text-foreground">{siteConfig.contact.timezone}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Side (3 columns) */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-border bg-surface-1 p-6 flex flex-col gap-6"
            >
              <h3 className="font-bold text-foreground">Send Message</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Form fields */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                      Your Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "submitting" || status === "success"}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "submitting" || status === "success"}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-medium text-muted-foreground">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === "submitting" || status === "success"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Hi Eric, I'd like to discuss a project..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "submitting" || status === "success"}
                    required
                  />
                </div>

                {/* Submitting Status / Alerts */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 rounded-lg border border-status-production/30 bg-status-production/10 p-3 text-sm text-status-production"
                    >
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                      <span>Thank you! Your message was sent successfully.</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                    >
                      <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto gap-2 bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90 text-white"
                    disabled={status === "submitting" || status === "success"}
                  >
                    {status === "submitting" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="h-4 w-4 border-2 border-background border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
