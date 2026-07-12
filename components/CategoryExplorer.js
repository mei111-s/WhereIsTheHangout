"use client";

import { useMemo, useState } from "react";
import { AREAS } from "@/lib/data";
import { sortSpots, SORT_OPTIONS } from "@/lib/sort";
import SpotCard from "@/components/SpotCard";

export default function CategoryExplorer({ spots }) {
  const areasWithSpots = useMemo(() => {
    const slugsPresent = new Set(spots.map((s) => s.area));
    return AREAS.filter((a) => slugsPresent.has(a.slug));
  }, [spots]);

  const [activeArea, setActiveArea] = useState(null); // null = all areas
  const [activeTag, setActiveTag] = useState(null);
  const [sortBy, setSortBy] = useState("name-asc");

  const spotsInArea = useMemo(
    () => (activeArea ? spots.filter((s) => s.area === activeArea) : spots),
    [spots, activeArea]
  );

  const availableTags = useMemo(() => {
    const set = new Set();
    spotsInArea.forEach((s) => (s.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [spotsInArea]);

  const visibleSpots = useMemo(() => {
    const filtered = activeTag
      ? spotsInArea.filter((s) => (s.tags || []).includes(activeTag))
      : spotsInArea;
    return sortSpots(filtered, sortBy);
  }, [spotsInArea, activeTag, sortBy]);

  if (spots.length === 0) {
    return <p className="text-inkmuted mt-6">No spots in this category yet.</p>;
  }

  return (
    <div>
      {/* Area tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          data-active={activeArea === null}
          onClick={() => {
            setActiveArea(null);
            setActiveTag(null);
          }}
          className="pill-chip rounded-pill px-4 py-2 font-display font-semibold text-sm bg-cream border border-maroon/10 text-maroon"
        >
          All cities
        </button>
        {areasWithSpots.map((area) => (
          <button
            key={area.slug}
            data-active={activeArea === area.slug}
            onClick={() => {
              setActiveArea(area.slug);
              setActiveTag(null);
            }}
            className="pill-chip rounded-pill px-4 py-2 font-display font-semibold text-sm bg-cream border border-maroon/10 text-maroon"
          >
            {area.name}
          </button>
        ))}
      </div>

      {/* Tag filters */}
      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button
            data-active={activeTag === null}
            onClick={() => setActiveTag(null)}
            className="pill-chip rounded-pill px-3 py-1 font-mono text-[11px] uppercase text-inkmuted bg-blushdeep"
          >
            all
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              data-active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
              className="pill-chip rounded-pill px-3 py-1 font-mono text-[11px] uppercase text-inkmuted bg-blushdeep"
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Sort control */}
      <div className="flex items-center gap-2 mb-4">
        <label className="font-mono text-[11px] uppercase text-inkmuted">
          Sort:
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-pill bg-cream border border-mauve/20 px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-cherry/40"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Spot grid */}
      {visibleSpots.length === 0 ? (
        <p className="text-inkmuted">No spots match that filter yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      )}
    </div>
  );
}