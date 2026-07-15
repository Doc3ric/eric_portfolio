"use client";

import { useRouter } from "next/navigation";
import {
  Briefcase,
  Code2,
  FileText,
  Home,
  Layers,
  Mail,
  Rocket,
  Zap,
} from "lucide-react";
import { GitHubIcon } from "@/components/shared/BrandIcons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { siteConfig } from "@/config/site.config";

interface CommandEntry {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPalette() {
  const { isOpen, close } = useCommandPalette();
  const router = useRouter();

  const navigate = (href: string, external = false) => {
    close();
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  const navigationItems: CommandEntry[] = [
    {
      id: "home",
      label: "Home",
      description: "Go to the homepage",
      icon: Home,
      action: () => navigate("/"),
    },
    {
      id: "projects",
      label: "Projects",
      description: "Browse all projects",
      icon: Rocket,
      action: () => navigate("/#projects"),
    },
    {
      id: "experience",
      label: "Experience",
      description: "Work history & timeline",
      icon: Briefcase,
      action: () => navigate("/#experience"),
    },
    {
      id: "technologies",
      label: "Technologies I Use",
      description: "Tech stack overview",
      icon: Layers,
      action: () => navigate("/#technologies"),
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      icon: Mail,
      action: () => navigate("/#contact"),
    },
    {
      id: "now",
      label: "Now Page",
      description: "What I'm doing right now",
      icon: Zap,
      action: () => navigate("/now"),
    },
  ];

  const projectItems: CommandEntry[] = [
    {
      id: "proj-hrms",
      label: "HRMS Case Study",
      description: "Government HR Management System",
      icon: Code2,
      action: () => navigate("/projects/hrms"),
    },
    {
      id: "proj-english-coach",
      label: "English Coach AI",
      description: "AI-powered language learning app",
      icon: Code2,
      action: () => navigate("/projects/english-coach"),
    },
    {
      id: "proj-school",
      label: "School Management System",
      description: "Live production school system",
      icon: Code2,
      action: () => navigate("/projects/school-system"),
    },
    {
      id: "proj-talentflow",
      label: "TalentFlow ATS",
      description: "AI applicant tracking system",
      icon: Code2,
      action: () => navigate("/projects/talentflow"),
    },
  ];

  const actionItems: CommandEntry[] = [
    {
      id: "resume",
      label: "Download Resume",
      description: "Get my latest resume PDF",
      icon: FileText,
      action: () => {
        close();
        window.open(siteConfig.resume, "_blank");
      },
    },
    {
      id: "github",
      label: "View GitHub",
      description: siteConfig.github,
      icon: GitHubIcon,
      action: () => navigate(siteConfig.github, true),
    },
  ];

  return (
    <CommandDialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <CommandInput placeholder="Search pages, projects, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigationItems.map(({ id, label, description, icon: Icon, action }) => (
            <CommandItem key={id} onSelect={action} className="gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{label}</span>
                {description && (
                  <span className="text-xs text-muted-foreground">{description}</span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projectItems.map(({ id, label, description, icon: Icon, action }) => (
            <CommandItem key={id} onSelect={action} className="gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{label}</span>
                {description && (
                  <span className="text-xs text-muted-foreground">{description}</span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {actionItems.map(({ id, label, description, icon: Icon, action }) => (
            <CommandItem key={id} onSelect={action} className="gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{label}</span>
                {description && (
                  <span className="text-xs text-muted-foreground">{description}</span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
