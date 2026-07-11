import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";

const LOCAL_FILE = path.join(process.cwd(), "data", "spots.json");
const KEY = "spots";

const hasKV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

function readLocal() {
  try {
    const raw = fs.readFileSync(LOCAL_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLocal(spots) {
  fs.mkdirSync(path.dirname(LOCAL_FILE), { recursive: true });
  fs.writeFileSync(LOCAL_FILE, JSON.stringify(spots, null, 2));
}

async function getKV() {
  const { kv } = await import("@vercel/kv");
  return kv;
}

export async function getAllSpots() {
  if (hasKV) {
    const kv = await getKV();
    const spots = await kv.get(KEY);
    return spots || [];
  }
  return readLocal();
}

export async function getSpotsByArea(areaSlug) {
  const all = await getAllSpots();
  return all.filter((s) => s.area === areaSlug);
}

export async function addSpot(spot) {
  const all = await getAllSpots();
  const newSpot = {
    id: uuid(),
    createdAt: Date.now(),
    ...spot,
  };
  const updated = [...all, newSpot];
  await saveAll(updated);
  return newSpot;
}

export async function updateSpot(id, patch) {
  const all = await getAllSpots();
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch, id };
  await saveAll(all);
  return all[idx];
}

export async function deleteSpot(id) {
  const all = await getAllSpots();
  const updated = all.filter((s) => s.id !== id);
  await saveAll(updated);
  return true;
}

async function saveAll(spots) {
  if (hasKV) {
    const kv = await getKV();
    await kv.set(KEY, spots);
  } else {
    writeLocal(spots);
  }
}

export const usingKV = hasKV;
