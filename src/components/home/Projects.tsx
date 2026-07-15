"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import featuredData from "@/content/featured.json";
import type { FeaturedWorkItem, ProjectCategory, ProjectStatus } from "@/types";

const projects = featuredData as FeaturedWorkItem[];

const categories: { value: string; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web Apps" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "ai", label: "AI & ML" },
  { value: "government", label: "Government" },
];

const statuses: { value: string; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "production", label: "Production" },
  { value: "in-progress", label: "In Progress" },
  { value: "personal", label: "Personal" },
];

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Get all unique technologies across all projects for the tech filter dropdown
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => techSet.add(t)));
    return ["all", ...Array.from(techSet)];
  }, []);

  const [selectedTech, setSelectedTech] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Search filter (title, description, tech stack)
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.techStack.some((t) => t.toLowerCase().includes(query));

        // Category filter
        const matchesCategory =
          selectedCategory === "all" ||
          (project as any).category?.includes(selectedCategory);

        // Status filter
        const matchesStatus =
          selectedStatus === "all" || project.status === selectedStatus;

        // Technology filter
        const matchesTech =
          selectedTech === "all" || project.techStack.includes(selectedTech);

        return matchesSearch && matchesCategory && matchesStatus && matchesTech;
      })
      .sort((a, b) => {
        // Sort by year/order
        const yearA = (a as any).year || 2024;
        const yearB = (b as any).year || 2024;
        return sortBy === "newest" ? yearB - yearA : yearA - yearB;
      });
  }, [searchQuery, selectedCategory, selectedStatus, selectedTech, sortBy]);

  return (
    <section id="projects" className="section bg-background/50" aria-label="All Projects">
      <div className="container-xl flex flex-col gap-12">
        <SectionHeader
          eyebrow="Portfolio"
          heading="All Projects I Have"
          highlight="Developed"
          description="Explore my complete catalog of applications. Filter by category, status, technology, or search directly for specific libraries."
        />

        {/* Filters Controls Panel */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-1 p-5 shadow-lg">
          {/* Row 1: Search & Category Tabs */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat.value
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Secondary Dropdowns Filters */}
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs">
            {/* Status Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-border bg-surface-2 px-2 py-1.5 font-medium text-foreground outline-none cursor-pointer focus:border-ring"
              >
                {statuses.map((stat) => (
                  <option key={stat.value} value={stat.value}>
                    {stat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tech Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Technology:</span>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="rounded-lg border border-border bg-surface-2 px-2 py-1.5 font-medium text-foreground outline-none cursor-pointer focus:border-ring max-w-[150px]"
              >
                <option value="all">All Tech</option>
                {allTechnologies
                  .filter((t) => t !== "all")
                  .map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
              </select>
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-2 ml-auto">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                className="rounded-lg border border-border bg-surface-2 px-2 py-1.5 font-medium text-foreground outline-none cursor-pointer focus:border-ring"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid Display */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface-1 p-12 text-center flex flex-col items-center justify-center gap-3">
            <p className="text-sm font-semibold text-foreground">No projects match your criteria.</p>
            <p className="text-xs text-muted-foreground">Try clearing your filters or resetting search input.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedStatus("all");
                setSelectedTech("all");
              }}
              className="mt-2 text-xs font-semibold text-brand-blue hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
