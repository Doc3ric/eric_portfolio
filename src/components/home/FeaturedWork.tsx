import featuredData from "@/content/featured.json";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeaturedWorkCard } from "@/components/projects/FeaturedWorkCard";
import type { FeaturedWorkItem } from "@/types";

// Cast JSON data to the typed interface
const featuredItems = featuredData as FeaturedWorkItem[];

export function FeaturedWork() {
  return (
    <section id="featured" className="section" aria-label="Featured Work">
      <div className="container-xl flex flex-col gap-12">
        <SectionHeader
          eyebrow="Featured Work"
          heading="Projects That"
          highlight="Shipped to Production"
          description="Real systems built for real organizations — government agencies, schools, and businesses. Every project here is either live in production or actively in development."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredItems
            .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
            .map((item, index) => (
              <FeaturedWorkCard key={item.id} item={item} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}
