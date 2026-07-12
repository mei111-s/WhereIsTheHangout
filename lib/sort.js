// Sorts a list of spots by name or price.
// Spots without a priceMin always sink to the bottom, regardless of
// direction, since there's nothing meaningful to compare them by.
export function sortSpots(spots, sortBy) {
  const arr = [...spots];

  if (sortBy === "name-desc") {
    arr.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "price-asc") {
    arr.sort((a, b) => {
      const pa = typeof a.priceMin === "number" ? a.priceMin : Infinity;
      const pb = typeof b.priceMin === "number" ? b.priceMin : Infinity;
      return pa - pb;
    });
  } else if (sortBy === "price-desc") {
    arr.sort((a, b) => {
      const pa = typeof a.priceMin === "number" ? a.priceMin : -Infinity;
      const pb = typeof b.priceMin === "number" ? b.priceMin : -Infinity;
      return pb - pa;
    });
  } else {
    // name-asc (default)
    arr.sort((a, b) => a.name.localeCompare(b.name));
  }

  return arr;
}

export const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "price-asc", label: "Price (low to high)" },
  { value: "price-desc", label: "Price (high to low)" },
];