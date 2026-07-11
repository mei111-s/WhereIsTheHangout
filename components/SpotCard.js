"use client";

import { useState } from "react";

export default function SpotCard({ spot }) {
  const [showCommute, setShowCommute] = useState(false);

  return (
    <div className="card-hover rounded-signboard overflow-hidden bg-ube-light border border-white/10 shadow-card flex flex-col">
      {spot.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-44 bg-ube flex items-center justify-center text-cream/30 font-mono text-xs">
          no photo yet
        </div>
      )}

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-lg text-cream leading-tight">
              {spot.name}
            </h3>
            {spot.priceRange && (
              <span className="font-mono text-xs text-mango whitespace-nowrap mt-1">
                {spot.priceRange}
              </span>
            )}
          </div>
          {spot.description && (
            <p className="text-cream/60 text-sm mt-1">{spot.description}</p>
          )}
        </div>

        {spot.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {spot.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-white/5 text-cream/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2 flex flex-wrap gap-2 text-sm">
          {spot.mapsLink && (
            <a
              href={spot.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-signboard bg-guava text-ink font-semibold hover:brightness-105 transition"
            >
              Maps
            </a>
          )}
          {spot.commute && (
            <button
              onClick={() => setShowCommute((v) => !v)}
              className="px-3 py-1.5 rounded-signboard bg-white/10 text-cream font-semibold hover:bg-white/20 transition"
            >
              Commute
            </button>
          )}
          {spot.menuLink && (
            <a
              href={spot.menuLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-signboard bg-white/10 text-cream font-semibold hover:bg-white/20 transition"
            >
              Menu
            </a>
          )}
        </div>

        {showCommute && spot.commute && (
          <p className="text-cream/60 text-xs bg-black/20 rounded-signboard p-3 leading-relaxed">
            {spot.commute}
          </p>
        )}
      </div>
    </div>
  );
}
