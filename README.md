# Interior Life Mapping

A domain-specific emotional intelligence self-assessment — five 10-minute,
evidence-based scales (Self-Awareness, Self-Regulation, Motivation, Empathy,
Social Skills), each anchored to a scripture passage, with live scoring and
an interior-life synthesis map at the end.

Companion resource to *Emotionally Whole: From the Mirror to the Door* by
Winston H.K. Chew.

## What this is

A plain, static website — `index.html`, `styles.css`, `script.js`. No build
step, no framework, no backend, no database, no tracking. All the scoring
logic runs in the visitor's browser, and their in-progress answers —
ratings and written reflection notes alike — are saved to their own
browser's `localStorage` so a refresh doesn't lose their place. Nothing is
ever sent to a server.

Each domain ends with its two Reflection Prompts and a free-text write
space; those notes are optional, saved locally like everything else, and
included in the PDF when written.

A "Download results (PDF)" button under the synthesis map lets a visitor
save a results summary — their name/date (if entered), each domain's score,
status, matched recommendation and any reflection notes, and the full
synthesis map — generated entirely in their browser via
[jsPDF](https://github.com/parallax/jsPDF), vendored locally in
`vendor/jspdf.umd.min.js` (MIT-licensed; see `vendor/jspdf-LICENSE.txt`) so
it works offline with no CDN dependency. It's enabled as soon as at least
one domain has an answer, and works on partial results too — it just notes
which domains aren't finished yet.

The page is also print-friendly on its own (`Ctrl+P` / `Cmd+P` — most
browsers offer "Save as PDF" right there too), if you'd rather print the
whole assessment with answers marked rather than the condensed PDF summary.

## Running it locally

Any static file server works. For example, from this folder:

```
python3 -m http.server 8000
```

then open `http://localhost:8000` in a browser. Or just double-click
`index.html` — it works opened directly from disk too, since there's no
server-side code.

## Putting it on GitHub

```
git init
git add -A
git commit -m "Initial commit: Interior Life Mapping assessment"
git branch -M main
git remote add origin https://github.com/<your-username>/biblical-eq-assessment.git
git push -u origin main
```

(Create the empty repository on GitHub first — github.com/new — without a
README, license or .gitignore, since this folder already has its own.)

## Deploying to Cloudflare

Cloudflare now serves plain static sites two ways — old-style **Pages**, and
newer **Workers with static assets** (no Worker script needed for a site
like this one). This repo is set up for the second, since that's what
Cloudflare's Git-connected "Workers Builds" runs by default (`wrangler
deploy`, not `wrangler pages deploy`).

### Option A — connect the repo in the Cloudflare dashboard (recommended, no CLI)

1. Push the repo to GitHub (above).
2. In the Cloudflare dashboard, go to **Compute (Workers) → Create → Import
   a repository** (or **Workers & Pages → Create → Connect to Git**,
   depending on which layout you're shown), and select this repository.
3. Leave the build command empty — `wrangler.toml`'s `[assets]` block
   already tells it to deploy the repo root as static files. Cloudflare
   will run `npx wrangler deploy`, which now works directly.
4. Click **Save and Deploy**. You'll get a `*.workers.dev` URL immediately,
   and it redeploys automatically on every push to `main`.
5. Optional: add a custom domain under the project's **Custom domains** tab.

### Option B — deploy from the command line with Wrangler

```
npx wrangler login
npx wrangler deploy
```

`wrangler.toml` already names the project `biblical-eq-assessment` and
points `[assets] directory` at the current folder — Wrangler picks both up
automatically. You'll be prompted to create the project the first time.

### If you still want classic Pages instead

Pages (via `wrangler pages deploy .` or the dashboard's **Pages → Connect to
Git** flow with build output directory `/`) also works fine with these same
files — Pages doesn't need `wrangler.toml` at all, since it ignores it. Only
use this path if your Cloudflare account's deploy pipeline is actually
invoking `wrangler pages deploy` rather than `wrangler deploy` — check
whichever error message (if any) your first attempt gave you.

## Editing the content

Everything specific to this assessment — the five domains, the 35
statements, their citations, the scoring bands, the scripture anchors — lives
in one place: the `DOMAINS` array near the top of `script.js`. To change a
statement, fix a citation, or adjust a scoring band, edit it there; the page
rebuilds itself from that data on load, so nothing else needs to change.

Colors, type and spacing are all defined as CSS custom properties at the top
of `styles.css` (`:root { --accent: ...; }` etc.) — change a value there to
re-theme the whole page.

## How scoring works

Each domain has 7 items rated 1–5 (*Rarely* to *Almost always*). Items marked
® are reverse-scored (stored as 6 − the visitor's response) before summing.
A domain's raw total (7–35) is divided by 7 to give a score out of 5.0. The
per-domain interpretive bands (7–17 / 18–28 / 29–35 raw) and the overall
1.0–2.4 / 2.5–3.4 / 3.5–4.2 / 4.3–5.0 scoring reference are both taken
directly from the source assessment document.

## License

No license file is included by default — add one (MIT, or whatever fits)
before you make the repository public, if you want to state usage terms
explicitly.
