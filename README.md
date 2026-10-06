# Portfolio — Pongpan Nerunchorn

Personal portfolio built with **Angular 22** (standalone components, signals, new control flow, Router, HttpClient + RxJS, Reactive Forms). EN / TH, light / dark.

## Run

```bash
npm install
npm start          # http://localhost:4200
npm test -- --watch=false
npm run build      # → dist/portfolio/browser
```

## Edit content

All text lives in JSON — no code changes needed:

| File | What |
|---|---|
| `public/data/en.json`, `public/data/th.json` | Profile, stats, experience, timeline, skills, projects, education |
| `public/i18n/en.json`, `public/i18n/th.json` | UI labels (nav, buttons, form messages) |

- Photo: put `profile.jpg` in `public/` and set `"photo": "profile.jpg"` in both data files.
- Resume download: put `resume.pdf` in `public/` and set `"resumeUrl": "resume.pdf"`.
- Project links: add `{ "label": "GitHub", "url": "https://..." }` to a project's `links`.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` tests, builds and publishes on every push to `main`.
Create a repo named `BBT0423.github.io`, then in **Settings → Pages** set *Source* to **GitHub Actions**.
