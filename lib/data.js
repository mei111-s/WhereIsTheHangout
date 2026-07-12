// Add or edit areas here any time — no database migration needed.
export const AREAS = [
  { slug: "makati", name: "Makati", blurb: "CBD cafes, rooftop bars, old-money charm" },
  { slug: "bgc", name: "BGC", blurb: "Glossy streets, brunch spots, park dates" },
  { slug: "qc", name: "Quezon City", blurb: "Wide streets, hidden gems, student-budget eats" },
  { slug: "manila", name: "Manila", blurb: "Heritage streets, old-school eateries" },
  { slug: "pasig", name: "Pasig", blurb: "Riverside spots, quiet cafes" },
  { slug: "pasay", name: "Pasay", blurb: "Malls, big-box stores, airport-side spots" },
  { slug: "mandaluyong", name: "Mandaluyong", blurb: "Tucked-away cafes between the bigger cities" },
];

// Add or edit categories here — icons are just emoji, swap freely.
export const CATEGORIES = [
  { slug: "food", name: "Food", icon: "🍽️" },
  { slug: "cafes", name: "Cafes", icon: "☕" },
  { slug: "activities", name: "Activities", icon: "🎨" },
  { slug: "bars", name: "Bars & Nightlife", icon: "🍸" },
  { slug: "outdoors", name: "Parks & Outdoors", icon: "🌳" },
  { slug: "culture", name: "Museums & Culture", icon: "🖼️" },
];

export function areaBySlug(slug) {
  return AREAS.find((a) => a.slug === slug);
}

export function categoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}