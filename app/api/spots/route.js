import { NextResponse } from "next/server";
import { getAllSpots, getSpotsByArea, addSpot } from "@/lib/store";
import { isAuthed } from "@/lib/auth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const area = searchParams.get("area");
  const spots = area ? await getSpotsByArea(area) : await getAllSpots();
  return NextResponse.json({ spots });
}

export async function POST(request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();

  if (!body.name || !body.area || !body.category) {
    return NextResponse.json(
      { error: "name, area, and category are required" },
      { status: 400 }
    );
  }

  const spot = await addSpot({
    area: body.area,
    category: body.category,
    tags: Array.isArray(body.tags) ? body.tags : [],
    name: body.name,
    description: body.description || "",
    image: body.image || "",
    mapsLink: body.mapsLink || "",
    commute: body.commute || "",
    menuLink: body.menuLink || "",
    priceRange: body.priceRange || "",
  });

  return NextResponse.json({ spot }, { status: 201 });
}
