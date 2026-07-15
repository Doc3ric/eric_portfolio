import currentlyBuildingData from "@/content/currently-building.json";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CurrentlyBuildingCard } from "@/components/projects/CurrentlyBuildingCard";
import type { CurrentlyBuildingItem } from "@/types";

const items = currentlyBuildingData as CurrentlyBuildingItem[];

export function CurrentlyBuilding() {
  const activeItems = items.filter((item) => item.status === "active");

  if (activeItems.length === 0) return null;

  return (
    <section
      id="currently-building"
      className="section"
      aria-label="Currently Building"
    >
      <div className="container-xl flex flex-col gap-12">
        <SectionHeader
          eyebrow="Currently Building"
          heading="What I'm Working"
          highlight="On Right Now"
          description="These are the projects I'm actively developing. Updated regularly so you always know what's in progress."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activeItems.map((item, index) => (
            <CurrentlyBuildingCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
