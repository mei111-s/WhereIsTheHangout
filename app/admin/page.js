"use client";

import { useEffect, useState } from "react";
import { AREAS, CATEGORIES, areaBySlug, categoryBySlug } from "@/lib/data";
import AdminSpotForm from "@/components/AdminSpotForm";

export default function AdminPage() {
  const [authed, setAuthed] = useState(null); // null = loading
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSpot, setEditingSpot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterArea, setFilterArea] = useState("all");

  useEffect(() => {
    fetch("/api/auth/check")
      .then((r) => r.json())
      .then((d) => setAuthed(d.authed));
  }, []);

  useEffect(() => {
    if (authed) refreshSpots();
  }, [authed]);

  async function refreshSpots() {
    setLoading(true);
    const res = await fetch("/api/spots");
    const data = await res.json();
    setSpots(data.spots || []);
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
    } else {
      const d = await res.json();
      setLoginError(d.error || "Login failed");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthed(false);
  }

  async function handleAdd(payload) {
    const res = await fetch("/api/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setShowForm(false);
      refreshSpots();
    }
  }

  async function handleUpdate(payload) {
    const res = await fetch(`/api/spots/${editingSpot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setEditingSpot(null);
      refreshSpots();
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this spot?")) return;
    await fetch(`/api/spots/${id}`, { method: "DELETE" });
    refreshSpots();
  }

  if (authed === null) {
    return <p className="text-cream/50">Loading...</p>;
  }

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto mt-10">
        <h1 className="font-display text-3xl font-bold text-cream mb-4">Admin login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded bg-black/20 border border-white/10 px-3 py-2 text-cream"
            autoFocus
          />
          {loginError && <p className="text-guava text-sm">{loginError}</p>}
          <button
            type="submit"
            className="px-4 py-2 rounded-signboard bg-mango text-ink font-display font-bold hover:brightness-105 transition"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }

  const visibleSpots =
    filterArea === "all" ? spots : spots.filter((s) => s.area === filterArea);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold text-cream">Manage spots</h1>
        <button
          onClick={handleLogout}
          className="font-mono text-xs text-cream/40 hover:text-mango"
        >
          log out
        </button>
      </div>

      {!showForm && !editingSpot && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 px-4 py-2 rounded-signboard bg-guava text-ink font-display font-bold hover:brightness-105 transition"
        >
          + Add a spot
        </button>
      )}

      {showForm && (
        <div className="mb-8">
          <AdminSpotForm
            onSubmit={handleAdd}
            onCancel={() => setShowForm(false)}
            submitLabel="Add spot"
          />
        </div>
      )}

      {editingSpot && (
        <div className="mb-8">
          <AdminSpotForm
            initial={editingSpot}
            onSubmit={handleUpdate}
            onCancel={() => setEditingSpot(null)}
            submitLabel="Save changes"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          data-active={filterArea === "all"}
          onClick={() => setFilterArea("all")}
          className="signboard-chip rounded px-3 py-1.5 font-mono text-xs text-cream/70 bg-white/5"
        >
          all areas
        </button>
        {AREAS.map((a) => (
          <button
            key={a.slug}
            data-active={filterArea === a.slug}
            onClick={() => setFilterArea(a.slug)}
            className="signboard-chip rounded px-3 py-1.5 font-mono text-xs text-cream/70 bg-white/5"
          >
            {a.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-cream/50">Loading spots...</p>
      ) : visibleSpots.length === 0 ? (
        <p className="text-cream/50">No spots yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {visibleSpots.map((spot) => (
            <div
              key={spot.id}
              className="flex items-center justify-between gap-3 bg-ube-light border border-white/10 rounded-signboard px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-display font-bold text-cream truncate">
                  {spot.name}
                </p>
                <p className="font-mono text-xs text-cream/40">
                  {areaBySlug(spot.area)?.name} · {categoryBySlug(spot.category)?.name}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingSpot(spot);
                    setShowForm(false);
                  }}
                  className="px-3 py-1.5 rounded-signboard bg-white/10 text-cream text-sm font-semibold hover:bg-white/20 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(spot.id)}
                  className="px-3 py-1.5 rounded-signboard bg-guava/20 text-guava text-sm font-semibold hover:bg-guava/30 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
