export const siteConfig = {
  name: "Eric Alenton",
  shortName: "EA",
  title: "Full Stack Developer",
  description:
    "Building production-ready web applications with Laravel, React & AI. Specializing in government systems, dashboards, mobile apps, and AI-powered tools.",
  url: "https://ericalenton.dev",
  email: "ericalenton35@gmail.com",
  github: "https://github.com/Doc3ric",
  linkedin: "https://linkedin.com/in/alenton-eric",
  location: "Malaybalay City, Bukidnon, Philippines",
  availability: true,
  availabilityLabel: "Available for Freelance & Remote Opportunities",
  resume: "/resume.pdf",

  rotatingTitles: [
    "Laravel Developer",
    "React Developer",
    "AI Integration Specialist",
    "Mobile Developer",
    "Full Stack Engineer",
  ],

  stats: {
    projects: "12+",
    productionSystems: "3",
    years: "3+",
    technologies: "20+",
    passion: "100%",
  },

  analytics: {
    enabled: false, // Set to true when ready to track
    provider: "vercel" as const, // "vercel" | "plausible" | "gtag" | "umami"
    trackingId: "",
  },

  themes: {
    default: "dark" as const,
    options: ["dark", "midnight", "graphite", "system"] as const,
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Technologies", href: "/#technologies" },
    { label: "Activity", href: "/#activity" },
    { label: "Contact", href: "/#contact" },
  ],

  socials: {
    github: "https://github.com/Doc3ric",
    linkedin: "https://linkedin.com/in/alenton-eric",
    email: "mailto:ericalenton35@gmail.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eric Alenton — Full Stack Developer",
  },

  contact: {
    responseTime: "Within 24 hours",
    workingHours: "9AM – 6PM PHT (UTC+8)",
    timezone: "Asia/Manila",
  },
} as const;

export type SiteConfig = typeof siteConfig;
