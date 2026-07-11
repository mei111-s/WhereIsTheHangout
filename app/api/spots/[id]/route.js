import { NextResponse } from "next/server";
import { updateSpot, deleteSpot } from "@/lib/store";
import { isAuthed } from "@/lib/auth";

export async function PUT(request, { params }) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();
  const updated = await updateSpot(params.id, body);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ spot: updated });
}

export async function DELETE(request, { params }) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  await deleteSpot(params.id);
  return NextResponse.json({ ok: true });
}
