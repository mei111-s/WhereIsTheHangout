"use client";

import { useMemo, useState } from "react";
import { CATEGORIES } from "@/lib/data";
import { sortSpots, SORT_OPTIONS } from "@/lib/sort";
import SpotCard from "@/components/SpotCard";

export default function AreaExplorer({ spots }) {
  const categoriesWithSpots = useMemo(() => {
    const slugsPresent = new Set(spots.map((s) => s.category));
    return CATEGORIES.filter((c) => slugsPresent.has(c.slug));
  }, [spots]);

  const [activeCategory, setActiveCategory] = useState(
    categoriesWithSpots[0]?.slug || null
  );
  const [activeTag, setActiveTag] = useState(null);
  const [sortBy, setSortBy] = useState("name-asc");

  const spotsInCategory = useMemo(
    () => spots.filter((s) => s.category === activeCategory),
    [spots, activeCategory]
  );

  const availableTags = useMemo(() => {
    const set = new Set();
    spotsInCategory.forEach((s) => (s.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [spotsInCategory]);

  const visibleSpots = useMemo(() => {
    const filtered = activeTag
      ? spotsInCategory.filter((s) => (s.tags || []).includes(activeTag))
      : spotsInCategory;
    return sortSpots(filtered, sortBy);
  }, [spotsInCategory, activeTag, sortBy]);

  if (spots.length === 0) {
    return (
      <p className="text-inkmuted mt-6">
        No spots here yet — add some from{" "}
        <a href="/admin" className="text-cherry underline">
          /admin
        </a>
        .
      </p>
    );
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categoriesWithSpots.map((cat) => (
          <button
            key={cat.slug}
            data-active={activeCategory === cat.slug}
            onClick={() => {
              setActiveCategory(cat.slug);
              setActiveTag(null);
            }}
            className="pill-chip rounded-pill px-4 py-2 font-display font-semibold text-sm bg-cream border border-maroon/10 text-maroon"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Tag filters */}
      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
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