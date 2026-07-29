#!/usr/bin/env node
/**
 * generate-pages.js
 * -----------------------------------------------------------------------
 * Builds the static detail pages for Movies, Anime and Series from the
 * three data files. Run this every time you add a new entry to
 * anime-data.js / movies-data.js / series-data.js, or update an existing
 * one — it regenerates ALL pages so edits to existing entries are picked
 * up too.
 *
 *    node generate-pages.js
 *
 * Output:
 *    movies/{id}.html          (from MOVIES_DATA in movies-data.js)
 *    anime-pages/{id}.html     (from ANIME_DATA in anime-data.js)
 *    series-pages/{id}.html    (from SERIES_DATA in series-data.js)
 *
 * Any quality (480p/720p/1080p) that has no link in `downloads` gets a
 * button pointing at /quality-not-available.html instead of being hidden.
 *
 * Requires only Node.js (no npm packages).
 * -----------------------------------------------------------------------
 */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const TIERS = ["480p", "720p", "1080p"];

// ---- load a "const NAME = [...]" data file without needing module.exports ----
function loadDataArray(filename, globalName) {
  const filePath = path.join(ROOT, filename);
  let src = fs.readFileSync(filePath, "utf8");
  src = src.replace(`const ${globalName}`, `global.${globalName}`);
  // eslint-disable-next-line no-eval
  eval(src);
  return global[globalName];
}

function esc(str) {
  return String(str === undefined || str === null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---- "N/A" fallback for any field that might be missing/blank ----
function orNA(val) {
  if (Array.isArray(val)) val = val.join(" | ");
  val = (val === undefined || val === null) ? "" : String(val).trim();
  return val === "" ? "N/A" : val;
}

// ---- audio tracks: accepts item.audioTracks (array) or falls back to item.language ----
function audioTracksText(item) {
  if (Array.isArray(item.audioTracks) && item.audioTracks.length) {
    return item.audioTracks.join(" | ");
  }
  return orNA(item.language);
}

// ---- shared page shell (same visual style as series-details.html) ----
function pageShell({ title, backHref, backLabel, body, shareScript }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} — HindiAnimestuff</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --void:#0d0e12;--card:#17191f;--card-hover:#20232b;--line: rgba(255,255,255,0.08);
    --bone:#f4f4f5;--bone-dim:#9a9ba3;
    --gold:#f2b544;--accent:#0ea5e9;--accent-hi:#38bdf8;--surface:#17191f;--surface-hi:#20232b;
    --ok:#22c55e;--ok-dim: rgba(34,197,94,0.15);
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:var(--void);color:var(--bone);font-family:'Inter',sans-serif;min-height:100vh;}
  body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 80% 50% at 50% -10%, rgba(14,165,233,0.10), transparent 60%);pointer-events:none;z-index:0;}
  .topbar{position:relative;z-index:1;padding:20px 24px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;background:rgba(13,14,18,0.72);backdrop-filter:blur(14px);position:sticky;top:0;}
  .back{color:var(--bone-dim);text-decoration:none;font-size:0.85rem;letter-spacing:0.03em;font-weight:500;transition:color 0.2s ease;}
  .back:hover{color:var(--accent-hi);}
  .share-btn{background:var(--surface);border:1px solid var(--line);color:var(--bone);padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s ease;}
  .share-btn:hover{background:var(--surface-hi);border-color:var(--accent-hi);}
  main{position:relative;z-index:1;max-width:920px;margin:0 auto;padding:40px 24px 90px;}
  .hero{display:flex;gap:36px;flex-wrap:wrap;}
  .poster{flex:0 0 260px;width:260px;aspect-ratio:2/3;border-radius:12px;overflow:hidden;border:1px solid var(--line);background:linear-gradient(160deg,var(--surface-hi),var(--surface));position:relative;box-shadow:0 20px 50px -10px rgba(0,0,0,0.6);}
  .poster img{width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;}
  .poster-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:var(--accent-hi);opacity:0.4;}
  .info{flex:1;min-width:280px;}
  .season-tag{font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);font-weight:700;}
  h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.1rem,5vw,3.2rem);letter-spacing:0.01em;line-height:1.05;margin:8px 0 16px;}
  .rating-row{display:flex;align-items:center;gap:14px;margin-bottom:14px;flex-wrap:wrap;}
  .rating-badge{display:inline-flex;align-items:baseline;gap:4px;font-family:'Bebas Neue',sans-serif;font-size:1.7rem;color:var(--gold);}
  .rating-badge sub{font-family:'Inter',sans-serif;font-size:0.7rem;color:var(--bone-dim);}
  .genre-tags{display:flex;gap:6px;flex-wrap:wrap;}
  .genre-tag{font-size:0.68rem;letter-spacing:0.04em;text-transform:uppercase;color:var(--bone-dim);border:1px solid var(--line);padding:3px 10px;border-radius:100px;}
  .badge-type{font-size:0.68rem;letter-spacing:0.04em;text-transform:uppercase;color:var(--void);background:var(--gold);padding:3px 10px;border-radius:100px;font-weight:700;}
  /* AnimeVilla-style pill row: type / status / language / duration, matching the reference screenshot */
  .pill-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:20px;}
  .info-pill{font-size:0.72rem;font-weight:700;letter-spacing:0.02em;padding:5px 12px;border-radius:6px;color:var(--bone);background:var(--surface-hi);border:1px solid var(--line);}
  .info-pill.status-ok{background:var(--ok-dim);color:var(--ok);border-color:rgba(34,197,94,0.3);}
  .info-pill.lang{background:var(--accent-dim,rgba(14,165,233,0.15));color:var(--accent-hi);border-color:rgba(14,165,233,0.3);}
  .starcast{color:var(--bone-dim);font-size:0.9rem;margin-bottom:12px;}
  .starcast strong{color:var(--bone);}
  .synopsis{color:var(--bone-dim);line-height:1.65;font-size:0.96rem;margin-bottom:26px;max-width:560px;}
  .spec-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 28px;margin-bottom:30px;}
  .spec{border-left:2px solid var(--accent);padding-left:12px;}
  .spec-label{font-size:0.66rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--bone-dim);}
  .spec-value{font-size:0.92rem;margin-top:3px;font-weight:500;}
  .download-section{margin-top:6px;}
  .download-title{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:0.03em;text-transform:uppercase;color:var(--bone-dim);margin-bottom:14px;}
  .part-block{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:16px 18px;margin-bottom:14px;}
  .part-label{font-weight:700;font-size:0.95rem;margin-bottom:10px;color:var(--gold);}
  /* Full-width stacked pill buttons, matching AnimeVilla's "S1 Episode 1-6 720p" download rows */
  .quality-row{display:flex;flex-direction:column;gap:10px;}
  .quality-btn{display:flex;align-items:center;justify-content:center;gap:8px;background:var(--accent);color:#fff;font-weight:700;text-decoration:none;padding:13px 20px;border-radius:8px;font-size:0.92rem;letter-spacing:0.01em;text-align:center;transition:background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;box-shadow:0 8px 20px -8px rgba(14,165,233,0.5);}
  .quality-btn:hover{background:var(--accent-hi);transform:translateY(-2px);box-shadow:0 12px 24px -8px rgba(14,165,233,0.65);}
  .quality-btn::after{content:'↓';font-weight:700;}
  .quality-btn small{font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.03em;text-transform:uppercase;opacity:0.85;}
  .quality-btn.unavailable{background:var(--surface);color:var(--bone-dim);border:1px solid var(--line);box-shadow:none;}
  .quality-btn.unavailable::after{content:'';}
  .quality-btn.unavailable:hover{background:var(--surface-hi);color:var(--bone);transform:none;}
  @media (max-width:560px){
    .poster{flex:0 0 100%;width:100%;max-width:240px;margin:0 auto;}
    .spec-grid{grid-template-columns:1fr;}
    .info{text-align:left;}
  }
</style>
</head>
<body>

<div class="topbar">
  <a href="${backHref}" class="back">← Back to ${esc(backLabel)}</a>
  <button class="share-btn" id="shareBtn">⌯⌲ Share</button>
</div>

<main id="detail">
${body}
</main>

<script>
${shareScript}
</script>

</body>
</html>
`;
}

// ---- one row of 480p/720p/1080p buttons, unavailable ones link out ----
function qualityRowHTML(downloads) {
  downloads = downloads || {};
  return TIERS.map(q => {
    const url = downloads[q];
    if (url && String(url).trim() !== "") {
      return `<a class="quality-btn" href="${esc(url)}" target="_blank" rel="noopener">${q}<small>Download</small></a>`;
    }
    return `<a class="quality-btn unavailable" href="/quality-not-available.html">${q}<small>Not Available</small></a>`;
  }).join("");
}

function partBlockHTML(label, downloads) {
  return `
    <div class="part-block">
      ${label ? `<div class="part-label">${esc(label)}</div>` : ""}
      <div class="quality-row">${qualityRowHTML(downloads)}</div>
    </div>`;
}

function shareScriptFor(getShareTextExpr) {
  return `document.getElementById('shareBtn').addEventListener('click', function() {
  const shareText = ${getShareTextExpr};
  if (navigator.share) {
    navigator.share({ title: document.title, text: shareText, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('⎙ Details copied to clipboard! Share it anywhere.');
    }).catch(() => {
      prompt('Copy this text and share it:', shareText);
    });
  }
});`;
}

// ---------------------------------------------------------------------
// MOVIES
// ---------------------------------------------------------------------
function buildMoviePage(item) {
  const body = `
      <div class="hero">
        <div class="poster">
          <div class="poster-fallback">${esc(item.year)}</div>
          <img src="${esc(item.thumb)}" alt="${esc(item.title)}" onerror="this.style.display='none'">
        </div>
        <div class="info">
          <span class="season-tag">${esc(item.industry || "Movie")} · ${esc(item.year)}</span>
          <h1>${esc(item.title)}</h1>
          <div class="rating-row">
            <div class="rating-badge">★ ${esc(item.rating)}<sub>/10</sub></div>
            <div class="genre-tags">${(item.genres || []).map(g => `<span class="genre-tag">${esc(g)}</span>`).join("")}</div>
          </div>
          <div class="pill-row">
            <span class="badge-type">${esc(item.quality || "HD")}</span>
            <span class="info-pill lang">${esc(item.language)}</span>
            <span class="info-pill">${esc(item.runtime)}</span>
          </div>
          <p class="synopsis">${esc(item.synopsis)}</p>
          <div class="spec-grid">
            <div class="spec"><div class="spec-label">Runtime</div><div class="spec-value">${esc(item.runtime)}</div></div>
            <div class="spec"><div class="spec-label">Language</div><div class="spec-value">${esc(item.language)}</div></div>
            <div class="spec"><div class="spec-label">Subtitle</div><div class="spec-value">${esc(item.subtitle)}</div></div>
            <div class="spec"><div class="spec-label">Quality</div><div class="spec-value">${esc(item.quality)}</div></div>
          </div>
          <div class="download-section">
            <div class="download-title">Download Links</div>
            ${partBlockHTML(null, item.downloads)}
          </div>
        </div>
      </div>`;

  const shareScript = shareScriptFor(
    `\`• ${esc(item.title)} (${esc(item.year)})\\n` +
    `— Rating: ${esc(orNA(item.rating))}/10\\n` +
    `— Genres: ${esc(orNA((item.genres || []).join(" | ")))}\\n` +
    `— Quality: ${esc(orNA(item.quality))}\\n` +
    `— Audio Tracks: ${esc(audioTracksText(item))}\\n` +
    `— Subtitle: ${esc(orNA(item.subtitle))}\\n\\n` +
    `➥  Download Now: \${window.location.href}\``
  );

  return pageShell({
    title: `${item.title} (${item.year})`,
    backHref: "../movies.html",
    backLabel: "movies",
    body,
    shareScript
  });
}

// ---------------------------------------------------------------------
// ANIME
// ---------------------------------------------------------------------
function buildAnimePage(item) {
  const body = `
      <div class="hero">
        <div class="poster">
          <div class="poster-fallback">${esc((item.season || "").replace("Season ", "S"))}</div>
          <img src="${esc(item.thumb)}" alt="${esc(item.title)}" onerror="this.style.display='none'">
        </div>
        <div class="info">
          <span class="season-tag">${esc(item.season)}</span>
          <h1>${esc(item.title)}</h1>
          <div class="rating-row">
            <div class="rating-badge">★ ${esc(item.rating)}<sub>/10</sub></div>
            <div class="genre-tags">${(item.genres || []).map(g => `<span class="genre-tag">${esc(g)}</span>`).join("")}</div>
          </div>
          <div class="pill-row">
            <span class="badge-type">${esc(item.quality || "HD")}</span>
            ${item.episodes != null ? `<span class="info-pill status-ok">E ${esc(item.episodes)}</span>` : ""}
            <span class="info-pill lang">${esc(item.language)}</span>
            <span class="info-pill">${esc(item.runtime)}</span>
          </div>
          <p class="synopsis">${esc(item.synopsis)}</p>
          <div class="spec-grid">
            <div class="spec"><div class="spec-label">Runtime</div><div class="spec-value">${esc(item.runtime)}</div></div>
            <div class="spec"><div class="spec-label">Language</div><div class="spec-value">${esc(item.language)}</div></div>
            <div class="spec"><div class="spec-label">Subtitle</div><div class="spec-value">${esc(item.subtitle)}</div></div>
            <div class="spec"><div class="spec-label">Quality</div><div class="spec-value">${esc(item.quality)}</div></div>
            <div class="spec"><div class="spec-label">Episodes</div><div class="spec-value">${item.episodes != null ? esc(item.episodes) : "—"}</div></div>
            <div class="spec"><div class="spec-label">Type</div><div class="spec-value">${esc(item.run)}</div></div>
          </div>
          <div class="download-section">
            <div class="download-title">Download Links</div>
            ${partBlockHTML(null, item.downloads)}
          </div>
        </div>
      </div>`;

  const shareScript = shareScriptFor(
    `\`• ${esc(item.title)} ${esc(item.season)}\\n` +
    `— Rating: ${esc(orNA(item.rating))}/10\\n` +
    `— Genres: ${esc(orNA((item.genres || []).join(" | ")))}\\n` +
    `— Quality: ${esc(orNA(item.quality))}\\n` +
    `— Audio Tracks: ${esc(audioTracksText(item))}\\n` +
    `— Subtitle: ${esc(orNA(item.subtitle))}\\n` +
    `— Total Episode: ${esc(orNA(item.episodes))}\\n\\n` +
    `➥  Download Now: \${window.location.href}\``
  );

  return pageShell({
    title: `${item.title} ${item.season}`,
    backHref: "../index.html",
    backLabel: "anime",
    body,
    shareScript
  });
}

// ---------------------------------------------------------------------
// SERIES
// ---------------------------------------------------------------------
function buildSeriesPage(item) {
  const partsHTML = (item.parts || [])
    .map(part => partBlockHTML(part.label, part.downloads))
    .join("");

  const body = `
      <div class="hero">
        <div class="poster">
          <div class="poster-fallback">${esc((item.season || "").replace("Season ", "S"))}</div>
          <img src="${esc(item.thumb)}" alt="${esc(item.title)}" onerror="this.style.display='none'">
        </div>
        <div class="info">
          <span class="season-tag">${esc(item.season)} · ${esc(item.year)}</span>
          <h1>${esc(item.title)}</h1>
          <div class="rating-row">
            <div class="rating-badge">★ ${esc(item.rating)}<sub>/10</sub></div>
            <div class="genre-tags">${(item.genres || []).map(g => `<span class="genre-tag">${esc(g)}</span>`).join("")}</div>
          </div>
          <div class="pill-row">
            <span class="badge-type">${esc(item.quality || "HD")}</span>
            <span class="info-pill lang">${esc(item.language)}</span>
            <span class="info-pill">${esc(item.runtime)}</span>
          </div>
          ${item.starcast ? `<div class="starcast"><strong>Starcast:</strong> ${esc(item.starcast)}</div>` : ""}
          <p class="synopsis">${esc(item.synopsis)}</p>
          <div class="spec-grid">
            <div class="spec"><div class="spec-label">Runtime</div><div class="spec-value">${esc(item.runtime)}</div></div>
            <div class="spec"><div class="spec-label">Language</div><div class="spec-value">${esc(item.language)}</div></div>
            <div class="spec"><div class="spec-label">Subtitle</div><div class="spec-value">${esc(item.subtitle)}</div></div>
            <div class="spec"><div class="spec-label">Quality</div><div class="spec-value">${esc(item.quality)}</div></div>
          </div>
          ${partsHTML ? `
          <div class="download-section">
            <div class="download-title">Download Links</div>
            ${partsHTML}
          </div>` : ""}
        </div>
      </div>`;

  const shareScript = shareScriptFor(
    `\`• ${esc(item.title)} ${esc(item.season)}\\n` +
    `— MAL Rating: ${esc(orNA(item.rating))}/10\\n` +
    `— Genres: ${esc(orNA((item.genres || []).join(" | ")))}\\n` +
    `— Quality: ${esc(orNA(item.quality))}\\n` +
    `— Audio Tracks: ${esc(audioTracksText(item))}\\n` +
    `— Subtitle: ${esc(orNA(item.subtitle))}\\n` +
    `— Total Episode: ${esc(orNA(item.episodes))}\\n\\n` +
    `➥  Download Now: \${window.location.href}\``
  );

  return pageShell({
    title: `${item.title} ${item.season}`,
    backHref: "../series.html",
    backLabel: "series",
    body,
    shareScript
  });
}

// ---------------------------------------------------------------------
// RUN
// ---------------------------------------------------------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function run() {
  let ok = 0, fail = 0;

  const jobs = [
    { file: "movies-data.js", global: "MOVIES_DATA", outDir: "movies", build: buildMoviePage },
    { file: "anime-data.js", global: "ANIME_DATA", outDir: "anime-pages", build: buildAnimePage },
    { file: "series-data.js", global: "SERIES_DATA", outDir: "series-pages", build: buildSeriesPage }
  ];

  jobs.forEach(job => {
    let data;
    try {
      data = loadDataArray(job.file, job.global);
    } catch (e) {
      console.error(`Could not load ${job.file}:`, e.message);
      return;
    }
    const outDir = path.join(ROOT, job.outDir);
    ensureDir(outDir);
    data.forEach(item => {
      try {
        const html = job.build(item);
        fs.writeFileSync(path.join(outDir, `${item.id}.html`), html);
        ok++;
      } catch (e) {
        console.error(`Failed to build ${job.outDir}/${item.id}.html:`, e.message);
        fail++;
      }
    });
    console.log(`${job.outDir}/  <-  ${data.length} entries from ${job.file}`);
  });

  console.log(`\nDone. ${ok} page(s) written${fail ? `, ${fail} failed` : ""}.`);
}

run();
