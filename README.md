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
logic runs in the visitor's browser, and their in-progress answers are saved
to their own browser's `localStorage` so a refresh doesn't lose their place.
Nothing is ever sent to a server.

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

## Deploying to Cloudflare Pages

### Option A — connect the repo in the Cloudflare dashboard (recommended, no CLI)

1. Push the repo to GitHub (above).
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages →
   Connect to Git**, and select this repository.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. Click **Save and Deploy**. Cloudflare will give you a
   `*.pages.dev` URL immediately, and will redeploy automatically on every
   push to `main`.
5. Optional: add a custom domain under the Pages project's **Custom domains**
   tab.

### Option B — deploy from the command line with Wrangler

```
npx wrangler login
npx wrangler pages deploy .
```

`wrangler.toml` in this folder already names the project
`biblical-eq-assessment` and points at the current directory as the output —
Wrangler will pick both up automatically. You'll be prompted to create the
Pages project the first time.

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
