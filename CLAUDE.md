# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static public website for **FUNINTEC** (Fundación para la Investigación y Desarrollo de las Ciencias Exactas, Ingeniería y Tecnología — linked to Universidad Nacional de San Martín). Deployed to GitHub Pages from this repo. Domain managed via `CNAME`.

No build step, no package manager runtime, no framework. Plain HTML + CSS + a tiny vanilla JS file. Bootstrap 5 loaded from CDN.

## Repo layout

```
index.html                          Home
nosotros.html                       About
investigadores.html                 Audience pages (Vinculamos section)
estudiantes.html
empresas.html
emprendedores.html
centro-tecnologico.html             Centros
centro-biodegrabilidad.html
contacto.html                       Contact form page
solarmate.html                      Standalone product/project page

futuros.html                        Programa Futuros hub (landing)
futuros-urbanos.html                Sub-pages of Programa Futuros
futuros-agua.html
futuros-energia.html
futuros-huellas-ambientales.html
futuros-publicaciones.html
futuros-presente-alterado.html      Videos "Un presente alterado"
futuros-ambiente-desarrollo.html    Videos "Ambiente y desarrollo"
expositores-2019.html               Legacy event page

components.js                       Injects shared footer into <div id="site-footer">
styles/main.css                     Global styles (header, overlay menu, footer, shared layout)
assets/                             Images, PDFs, gifs, logos
  home_gallery/                     Homepage carousel/animation assets
  huellas-slider/                   Per-section sliders
  presente-alterado/

funintec old/                       Archived mirror of the previous wordpress/divi site
                                    (HTTrack + web.archive.org snapshots). Source of
                                    truth when porting legacy content verbatim. Slated
                                    for deletion once content migration is finished.

CNAME                               Custom domain for GitHub Pages
.nojekyll                           Disable Jekyll on GitHub Pages (on main only)
```

## How things fit together

- Every page is self-contained: its own `<head>`, inlined page-specific `<style>`, full navbar + overlay menu markup duplicated in-line, and the JS for the hamburger + accordion at the bottom.
- Shared footer is the **only** thing componentized — injected by `components.js` into `<div id="site-footer"></div>`. Add that div + the script tag on any new page that needs the footer.
- `styles/main.css` holds global header, overlay menu, footer, hero image, and carousel styles. Page-specific styles (sidebar, accordions, grids) live inline in each page's `<style>` block.
- No router, no SPA behavior. Every link is a plain `.html` hop.

## Programa Futuros — the sidebar pattern

`futuros.html` + all `futuros-*.html` subpages share a Divi-inspired left sidebar (`.futuros-sidebar`) that lists all Programa Futuros sections. The sidebar markup + CSS is **duplicated inline** on each page. The `.active` class must match the page you're on.

Canonical sidebar order (from `futuros.html`):

1. QUÉ ES FUTUROS → `futuros.html`
2. FUTUROS URBANOS → `futuros-urbanos.html`
3. FUTUROS HUELLAS AMBIENTALES → `futuros-huellas-ambientales.html`
4. FUTUROS ENERGÍA → `futuros-energia.html`
5. FUTUROS AGUA → `futuros-agua.html`
6. PUBLICACIONES SERIE FUTUROS → `futuros-publicaciones.html`
7. VIDEOS UN PRESENTE ALTERADO → `futuros-presente-alterado.html`
8. VIDEOS AMBIENTE Y DESARROLLO → `futuros-ambiente-desarrollo.html`

All eight pages carry the sidebar.

## The `funintec old/` archive

Directory `funintec old/` is a local mirror of the previous WordPress/Divi site, composed of:

- Top-level `web.archive.org/` tree → a Wayback snapshot of `www.funintec.org.ar`.
- Numbered sibling dirs `f/`, `f2/`, `f3/`, `f4/`, `f5/`, `f6/`, `f8/` → additional HTTrack captures, each containing a separate Wayback snapshot of one `futuros-*` subsection.
- `hts-cache/`, `hts-log.txt`, `cookies.txt`, `backblue.gif`, `fade.gif` → HTTrack scaffolding, ignore.

Useful entry points when porting content verbatim:

| New page                                | Legacy snapshot (path under `funintec old/`)                                                              |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `futuros.html`                          | `web.archive.org/web/20240723040931/https_/www.funintec.org.ar/programa-futuros/index.html`               |
| `futuros-urbanos.html`                  | `f/web.archive.org/web/20230202120752/https_/www.funintec.org.ar/futuros-urbanos/index.html`              |
| `futuros-agua.html`                     | `f4/web.archive.org/web/20221209233956/https_/www.funintec.org.ar/futuros-agua/index.html`                |
| `futuros-energia.html`                  | `f3/web.archive.org/web/20230202102809/https_/www.funintec.org.ar/futuros-energia/index.html`             |
| `futuros-huellas-ambientales.html`      | `f2/web.archive.org/web/20230202105314/https_/www.funintec.org.ar/huellas-ambientales/index.html`         |
| `futuros-ambiente-desarrollo.html`      | `f8/web.archive.org/web/20221126112509/https_/www.funintec.org.ar/videos-ambiente-y-desarrollo/index.html`|
| `futuros-presente-alterado.html`        | `f6/web.archive.org/web/20221126122619/https_/www.funintec.org.ar/el-futuro-en-un-presente-alterado/index.html` |

**Porting rule:** copy legacy body copy verbatim (text, headings, list items, speaker names, video IDs, publication titles). Do not paraphrase or "improve" Spanish wording — the original editorial voice is the source of truth until the content owner says otherwise. Only strip Divi/Wordpress chrome (shortcodes, tracking, wrapper divs) and re-theme into this repo's inline `<style>` pattern.

If an archived page is missing a resource, check the other `f*/` siblings and the top-level `web.archive.org/` tree before going to the live Wayback Machine.

The `funintec old/` directory is scheduled for removal once content migration is complete — do **not** depend on it from committed HTML/CSS/JS paths. It is reference-only.

## Working conventions

- **Language:** content is Spanish (`<html lang="es">`). Preserve tildes and ñ. Editor must be UTF-8.
- **Tone / voice:** third-person institutional Spanish, past/present mix matching legacy copy. Keep section titles in ALL CAPS where legacy used them (navigation, sidebars).
- **Images:** drop into `assets/` (or an appropriate subfolder). Reference with a relative path — no leading slash. Keep filenames kebab-case and ASCII.
- **PDFs / downloadables:** live in `assets/` alongside images, linked directly with `<a href="assets/...pdf" target="_blank">`.
- **Navbar + overlay menu:** duplicated per page. When adding a new page to the site's navigation, update the `<ul>` inside `#fullscreen-menu` on **every** page — there is no shared include.
- **Footer:** use `<div id="site-footer"></div>` + `<script src="components.js"></script>`. Do not hand-roll footer markup on new pages.
- **Accordions / sidebars / page-specific layout:** inline `<style>` at the top of the page, matching the existing Divi-inspired look in `futuros.html`.
- **Bootstrap:** 5.3 via CDN (`cdn.jsdelivr.net`). OK to use grid (`row`, `col-lg-*`) and utilities. Do not add jQuery.
- **JS:** vanilla only. Keep page-specific scripts at the bottom of the page, before `</body>`.

## Common tasks

- **Local preview:** `python3 -m http.server 8000` from repo root, then `http://localhost:8000/`. Don't use `file://` — relative asset URLs and the footer fetch work best over HTTP.
- **Deploy:** push to `main`. GitHub Pages serves from the repo root.
- **Branches:** feature work on short-lived branches (e.g., `fix/futuros-sidebar`), PR into `main`.
- **Adding a Programa Futuros subpage:** duplicate `futuros-urbanos.html`, rename, update `<title>`, update the sidebar's `.active` item, and add the new link to every other page's navbar overlay + every other futuros page's sidebar `<ul>`.

## Things to avoid

- Don't introduce a build step, bundler, or framework without discussing first — the deploy model is "push HTML to `main`".
- Don't move content out of `funintec old/` back into committed paths — migrate by rewriting into this repo's page structure, not by re-parenting the archive.
- Don't add trackers, analytics, or third-party scripts without confirmation.
- Don't rename the top-level `.html` files — they are the public URLs.
- Don't commit anything under `funintec old/hts-cache/`, `cookies.txt`, or `hts-log.txt` as project artifacts; they are HTTrack's own state.
