import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ExternalLink, Calendar, User, Users, Clock, Tag } from "lucide-react";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx";
import { getProjectSchema } from "@/lib/structured-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveBackground } from "@/components/shared/InteractiveBackground";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shared/BrandIcons";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: `${project.frontmatter.title} | Case Study`,
      description: project.frontmatter.description,
      type: "article",
    },
  };
}

// Custom MDX Components styling
const mdxComponents = {
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
    <h2
      className={cn(
        "mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground border-b border-border pb-2 scroll-mt-20",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn("mt-6 mb-3 text-lg font-bold text-foreground scroll-mt-20", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn("text-muted-foreground leading-relaxed text-sm my-4", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("list-disc pl-5 my-4 text-sm text-muted-foreground flex flex-col gap-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("list-decimal pl-5 my-4 text-sm text-muted-foreground flex flex-col gap-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className={cn("w-full text-sm text-left text-muted-foreground", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th className={cn("bg-surface-2 p-3 font-semibold text-foreground border-b border-border", className)} {...props} />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td className={cn("p-3 border-b border-border/50", className)} {...props} />
  ),
  strong: ({ className, ...props }: React.ComponentProps<"strong">) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
};

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;
  const projectSchema = getProjectSchema({
    name: frontmatter.title,
    description: frontmatter.description,
    url: frontmatter.liveUrl,
  });

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <CommandPalette />
      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="container-xl">
          {/* Back Home */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Case Study Core Info Sidebar / Top Metadata */}
            <div className="lg:col-span-1 flex flex-col gap-6 order-last lg:order-first">
              {/* Metadata Details Card */}
              <div className="rounded-2xl border border-border bg-surface-1 p-5 flex flex-col gap-4">
                <h3 className="font-bold text-foreground text-sm border-b border-border pb-2">
                  Project Details
                </h3>

                <div className="flex flex-col gap-3 text-xs">
                  {/* Role */}
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Role</span>
                    <span className="font-medium text-foreground">{frontmatter.role}</span>
                  </div>

                  {/* Duration */}
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-foreground">{frontmatter.duration}</span>
                  </div>

                  {/* Team Size */}
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Team Size</span>
                    <span className="font-medium text-foreground">
                      {frontmatter.teamSize === 1 ? "Solo Developer" : `${frontmatter.teamSize} members`}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Year</span>
                    <span className="font-medium text-foreground">{frontmatter.year}</span>
                  </div>

                  {/* Status */}
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium text-foreground capitalize">
                      {frontmatter.status}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-2 pt-2">
                  {frontmatter.liveUrl && (
                    <a
                      href={frontmatter.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "w-full gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:opacity-90"
                      )}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </a>
                  )}

                  {frontmatter.githubUrl && (
                    <a
                      href={frontmatter.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full gap-2")}
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>

              {/* Technologies Used Card */}
              <div className="rounded-2xl border border-border bg-surface-1 p-5 flex flex-col gap-3">
                <h3 className="font-bold text-foreground text-sm border-b border-border pb-2">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {frontmatter.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-surface-2 border border-border/50 px-2 py-1 text-[10px] font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Study Content Area */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2.5 py-0.5 text-xs font-semibold text-brand-blue capitalize">
                    {frontmatter.status}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                  {frontmatter.title}
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {frontmatter.description}
                </p>
              </div>

              {/* Metrics Highlights Row (if present) */}
              {frontmatter.metrics && frontmatter.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-border py-6 my-4 bg-surface-1/30 px-4 rounded-xl">
                  {frontmatter.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1">
                      <span className="text-2xl font-extrabold gradient-text leading-none">
                        {m.value}
                      </span>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Cover Image Placeholder */}
              <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-surface-2 border border-border flex items-center justify-center">
                {frontmatter.coverImage ? (
                  <Image
                    src={frontmatter.coverImage}
                    alt={`${frontmatter.title} cover`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <>
                    {/* Visual accent background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-surface-2 to-brand-purple/20" />
                    <div className="relative z-10 flex flex-col items-center gap-2 opacity-50">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-lg font-bold text-white shadow-lg">
                        {frontmatter.title.charAt(0)}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        Project Cover Mockup
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Rendered MDX Content */}
              <article className="prose prose-invert max-w-none pt-4">
                <MDXRemote source={content} components={mdxComponents} />
              </article>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
