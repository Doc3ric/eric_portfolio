// ─── Project Types ────────────────────────────────────────────────────────────

export type ProjectStatus = "production" | "in-progress" | "personal" | "open-source";
export type ProjectCategory = "web" | "mobile" | "ai" | "government" | "personal";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectImage {
  coverImage?: string;
  thumbnail?: string;
  gallery?: string[];
  videoDemo?: string;
  architectureDiagram?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  status: ProjectStatus;
  statusLabel: string;
  category: ProjectCategory[];
  year: number;
  role?: string;
  teamSize?: number;
  duration?: string;
  techStack: string[];
  tags: string[];
  features: string[];
  metrics?: ProjectMetric[];
  checklist?: string[];
  images?: ProjectImage;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
  order?: number;
}

// ─── Featured Work Types ─────────────────────────────────────────────────────

export interface FeaturedWorkItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  checklist: string[];
  techStack: string[];
  metrics?: ProjectMetric[];
  coverImage?: string;
  accentColor?: string;
  order?: number;
}

// ─── Currently Building Types ────────────────────────────────────────────────

export interface CurrentlyBuildingItem {
  id: string;
  title: string;
  description: string;
  progress: number; // 0–100
  eta: string;
  techStack: string[];
  status: "active" | "paused";
}

// ─── Experience Types ─────────────────────────────────────────────────────────

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  type: "full-time" | "freelance" | "contract" | "education";
  startDate: string;
  endDate: string | "Present";
  description: string;
  highlights?: string[];
  techStack?: string[];
  location?: string;
}

// ─── Technology Types ─────────────────────────────────────────────────────────

export interface Technology {
  name: string;
  icon?: string;
  url?: string;
  highlight?: boolean;
}

export interface TechnologyCategory {
  id: string;
  label: string;
  icon?: string;
  technologies: Technology[];
}

// ─── Developer Activity Types ─────────────────────────────────────────────────

export interface ActivityStat {
  label: string;
  value: string | number;
  description?: string;
  icon?: string;
}

export interface DeveloperActivity {
  latestProject: string;
  currentFocus: string;
  productionSystems: number;
  recentTechnologies: string[];
  repositories: number;
  openSource: number;
  yearsActive: number;
  availability: boolean;
  lastUpdated: string;
}

// ─── Case Study Types ─────────────────────────────────────────────────────────

export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  status: ProjectStatus;
  year: number;
  role: string;
  teamSize: number;
  duration: string;
  coverImage?: string;
  thumbnail?: string;
  gallery?: string[];
  videoDemo?: string;
  architectureDiagram?: string;
  metrics?: ProjectMetric[];
  techStack: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  description: string;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// ─── Command Palette Types ────────────────────────────────────────────────────

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  href: string;
  icon?: string;
  category: "navigation" | "projects" | "social" | "actions";
  external?: boolean;
}

// ─── Theme Types ──────────────────────────────────────────────────────────────

export type Theme = "dark" | "midnight" | "graphite" | "system";

// ─── Contact Types ────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}
