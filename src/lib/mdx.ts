import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CaseStudyFrontmatter } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "projects");

/** Get all project slugs for static generation */
export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Get a single project's frontmatter + raw MDX content */
export function getProjectBySlug(slug: string): {
  frontmatter: CaseStudyFrontmatter;
  content: string;
} | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as CaseStudyFrontmatter,
    content,
  };
}

/** Get all projects' frontmatter (for listing pages) */
export function getAllProjects(): CaseStudyFrontmatter[] {
  const slugs = getAllProjectSlugs();
  return slugs
    .map((slug) => getProjectBySlug(slug)?.frontmatter)
    .filter((p): p is CaseStudyFrontmatter => Boolean(p));
}
