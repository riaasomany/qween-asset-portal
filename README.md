# Qween AI Asset Generation Portal

Internal tool for assembling AI image generation prompts for Qween jewellery campaigns. Built for use with [Figma Weavy](https://weave.figma.com/).

## Pages

- **`index.html`** — Prompt generator. Pick persona → collection → shoot type → view → jewellery piece. Prompt assembles live.
- **`briefs.html`** — Brief library (Phase 2 stub). Will hold the locked creative foundations per persona.

## Files

```
index.html      Generator UI
briefs.html     Brief library (Phase 2 placeholder)
style.css       All styles
data.js         Persona foundations, collections, shoot types, views
generator.js    Selection logic and prompt assembly
```

## Deploying to GitHub Pages

1. Push this branch to GitHub
2. Go to **Settings → Pages**
3. Set source to this branch, folder `/` (root)
4. GitHub Pages will serve `index.html` at your Pages URL

## Phase 2

`briefs.html` becomes a full brief editor where marketing can edit persona foundations (model, lighting, setting, mood, styling, HMU, colour). Changes persist via `localStorage` and the generator reads the updated foundations from `data.js`.
