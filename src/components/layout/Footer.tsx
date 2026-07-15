import Link from "next/link";
import { Mail, Heart } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/BrandIcons";
import { siteConfig } from "@/config/site.config";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  {
    href: siteConfig.socials.github,
    label: "GitHub",
    icon: GitHubIcon,
    external: true,
  },
  {
    href: siteConfig.socials.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
    external: true,
  },
  {
    href: siteConfig.socials.email,
    label: "Email",
    icon: Mail,
    external: false,
  },
];

const footerLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Technologies", href: "/#technologies" },
  { label: "Contact", href: "/#contact" },
  { label: "Now", href: "/now" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-xl py-12">
        {/* Top row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple text-xs font-bold text-white">
                EA
              </span>
              <span className="font-semibold">{siteConfig.name}</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.title} based in {siteConfig.location}.
              Building systems that matter.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ href, label, icon: Icon, external }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-8" />

        {/* Bottom row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Built with
            <Heart className="mx-1 h-3 w-3 fill-current text-rose-500" />
            using Next.js + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
