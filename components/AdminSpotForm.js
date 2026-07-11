"use client";

import { useState, useEffect } from "react";
import { AREAS, CATEGORIES } from "@/lib/data";

const EMPTY = {
  area: AREAS[0]?.slug || "",
  category: CATEGORIES[0]?.slug || "",
  name: "",
  description: "",
  image: "",
  mapsLink: "",
  commute: "",
  menuLink: "",
  priceRange: "",
  tags: "",
};

export default function AdminSpotForm({ initial, onSubmit, onCancel, submitLabel }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        ...EMPTY,
        ...initial,
        tags: (initial.tags || []).join(", "),
      });
    } else {
      setForm(EMPTY);
    }
  }, [initial]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    await onSubmit(payload);
    setSaving(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid sm:grid-cols-2 gap-4 bg-ube-light border border-white/10 rounded-signboard p-5"
    >
      <div>
        <label className="block font-mono text-xs text-cream/50 mb-1">Area</label>
        <select
          value={form.area}
          onChange={(e) => update("area", e.target.value)}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
        >
          {AREAS.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-mono text-xs text-cream/50 mb-1">Category</label>
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
        >
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="block font-mono text-xs text-cream/50 mb-1">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
          placeholder="e.g. Neko Cafe"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block font-mono text-xs text-cream/50 mb-1">
          Short description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={2}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
          placeholder="What makes it worth going?"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block font-mono text-xs text-cream/50 mb-1">
          Image URL
        </label>
        <input
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block font-mono text-xs text-cream/50 mb-1">
          Google Maps link
        </label>
        <input
          value={form.mapsLink}
          onChange={(e) => update("mapsLink", e.target.value)}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
          placeholder="https://maps.google.com/..."
        />
      </div>

      <div>
        <label className="block font-mono text-xs text-cream/50 mb-1">
          Menu link (optional)
        </label>
        <input
          value={form.menuLink}
          onChange={(e) => update("menuLink", e.target.value)}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
          placeholder="https://..."
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block font-mono text-xs text-cream/50 mb-1">
          How to get there by commute
        </label>
        <textarea
          value={form.commute}
          onChange={(e) => update("commute", e.target.value)}
          rows={2}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
          placeholder="e.g. Ride any Ayala-bound jeep, get off at..."
        />
      </div>

      <div>
        <label className="block font-mono text-xs text-cream/50 mb-1">
          Price range (optional)
        </label>
        <input
          value={form.priceRange}
          onChange={(e) => update("priceRange", e.target.value)}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
          placeholder="₱ / ₱₱ / ₱₱₱"
        />
      </div>

      <div>
        <label className="block font-mono text-xs text-cream/50 mb-1">
          Tags (comma separated)
        </label>
        <input
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
          className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
          placeholder="budget, japanese, cat cafe"
        />
      </div>

      <div className="sm:col-span-2 flex gap-2 mt-1">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-signboard bg-mango text-ink font-display font-bold hover:brightness-105 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-signboard bg-white/10 text-cream font-semibold hover:bg-white/20 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
