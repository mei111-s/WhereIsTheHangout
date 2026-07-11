# Liyag — Manila Date & Friend Spots

A little site for browsing your barkada's favorite spots around Manila:
Area → Category → Tag filters → spot cards (photo, description, Maps link,
commute directions, menu link). Add/edit/delete spots from a password-gated
`/admin` page.

## 1. Run it locally

```bash
npm install
cp .env.example .env.local
```

Open `.env.local` and set:

```
ADMIN_PASSWORD=pick-something-only-you-and-friends-know
```

Leave `KV_REST_API_URL` / `KV_REST_API_TOKEN` blank for now — without them,
the app stores spots in `data/spots.json` on your machine, which is perfect
for trying things out locally.

```bash
npm run dev
```

Visit `http://localhost:3000`, and `http://localhost:3000/admin` to log in
and add spots.

## 2. Deploy to Vercel

1. Push this folder to a GitHub repo (or drag-and-drop deploy via the Vercel
   dashboard).
2. Import the repo on [vercel.com](https://vercel.com/new).
3. In the project's **Settings → Environment Variables**, add:
   - `ADMIN_PASSWORD` = your chosen password
4. **Important — persistent storage:** Vercel's servers don't keep files
   between requests, so the local JSON-file fallback won't save your edits
   on the live site. Set up free storage instead:
   - In your Vercel project, go to **Storage → Create Database → KV**
     (this is Upstash Redis under the hood, free tier is generous).
   - Once created, click **Connect** to link it to this project — Vercel
     will automatically add `KV_REST_API_URL` and `KV_REST_API_TOKEN` for
     you. No code changes needed, the app already checks for these.
   - Redeploy (or it'll redeploy automatically after connecting storage).
5. Visit your `.vercel.app` URL, go to `/admin`, log in, and start adding
   real spots. They'll now persist properly.

## 3. Customize

- **Areas & categories:** edit `lib/data.js` — add/remove/rename freely,
  no database changes needed.
- **Colors/fonts:** `tailwind.config.js` (palette) and `app/layout.js`
  (Google Fonts: Baloo 2 for headers, Plus Jakarta Sans for body).
- **Tags** (fine dining, budget, cat cafe, japanese, etc.) aren't a fixed
  list — you just type them comma-separated when adding a spot in
  `/admin`, and the filter chips on each category page are generated
  automatically from whatever tags exist.
- **Images:** for now, spots use an image URL (paste a link from Google
  Photos, Imgur, Unsplash, etc. — must be a direct image link ending in
  something like `.jpg`/`.png`, or a shareable direct-view link). If you
  want to upload photos directly from your phone instead, the natural
  next step is adding [Vercel Blob storage](https://vercel.com/docs/storage/vercel-blob) —
  happy to wire that up when you're ready.

## Notes on the admin password

This uses one shared password for simplicity (good for you + friends, not
meant for public/enterprise use). Anyone with the password can add, edit,
or delete spots.
