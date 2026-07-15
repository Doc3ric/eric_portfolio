import { siteConfig } from "@/config/site.config";

/** JSON-LD Person schema for the root layout */
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    email: siteConfig.email,
    url: siteConfig.url,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
    },
  };
}

/** JSON-LD WebSite schema for the root layout */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} — ${siteConfig.title}`,
    url: siteConfig.url,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}

/** JSON-LD SoftwareApplication schema for project case studies */
export function getProjectSchema(params: {
  name: string;
  description: string;
  url?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: params.name,
    description: params.description,
    url: params.url ?? siteConfig.url,
    author: {
      "@type": "Person",
      name: params.author ?? siteConfig.name,
    },
  };
}
