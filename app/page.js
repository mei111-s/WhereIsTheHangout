import Link from "next/link";
import { AREAS } from "@/lib/data";
import { getAllSpots } from "@/lib/store";

export default async function HomePage() {
  const spots = await getAllSpots();

  return (
    <div>
      <section className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-mango mb-2">
          our spots, mapped by area
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-cream leading-tight mb-3">
          Cute spots around Manila,
          <br />
          picked by us.
        </h1>
        <p className="text-cream/60 max-w-lg">
          Pick a city to browse — food, cafes, activities, and more. Every spot
          comes with a map link, how to commute there, and the menu.
        </p>
      </section>

      <div className="grid sm:grid-cols-2 gap-4">
        {AREAS.map((area) => {
          const count = spots.filter((s) => s.area === area.slug).length;
          return (
            <Link
              key={area.slug}
              href={`/${area.slug}`}
              className="card-hover group block rounded-signboard bg-ube-light border border-white/10 p-6 shadow-card"
            >
              <div className="flex items-start justify-between">
                <h2 className="font-display text-2xl font-bold text-cream group-hover:text-mango transition-colors">
                  {area.name}
                </h2>
                <span className="font-mono text-xs text-cream/40 mt-1">
                  {count} spot{count === 1 ? "" : "s"}
                </span>
              </div>
              <p className="text-cream/60 text-sm mt-2">{area.blurb}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
