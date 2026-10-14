# Novrasta Aslanzade — Portfolio

Personal portfolio built with Vue 3, TypeScript and Vite.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
npm run preview
```

## Editing content

All text, stats, projects and links live in `src/data/profile.ts`.
The CV download is `public/Novrasta_Aslanzade_CV.pdf` — replace it to update.

## Deploy to GitHub Pages

1. Create a repo (e.g. `aslanzaden/portfolio`, or `aslanzaden/aslanzaden.github.io` for a root URL) and push this folder to `main`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. Run the **Deploy to GitHub Pages** workflow from the **Actions** tab (it's manual-only for now).
