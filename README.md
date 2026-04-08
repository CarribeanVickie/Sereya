# SEREYA Waitlist

A responsive React + Vite landing page for the SEREYA waitlist, based on your Figma design.

## Tech Stack
- React 19
- Vite 8
- Plain CSS
- ESLint

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

## Available Scripts
- `npm run dev`: Start local dev server.
- `npm run build`: Create production build in `dist/`.
- `npm run preview`: Serve production build locally.
- `npm run lint`: Run ESLint checks.

## Project Structure
```text
sereya-waitlist/
  src/
    assets/
      hero.png
      logo-nobg.png
    App.jsx
    App.css
    index.css
    main.jsx
```

## Current Page Sections
- Top navigation bar (brand + links)
- Hero section (`Analyze, Predict, Create`)
- Call-to-action buttons
- Preview panel image
- Three feature cards (`Analyze`, `Prediction`, `Create`)

## Customize Content
Main edits are in:
- `src/App.jsx` for text, links, section content, and card data.
- `src/App.css` for layout, colors, spacing, typography, and responsive behavior.
- `src/assets/` for images and logos.

## Deploy
This project is a standard Vite app and can be deployed on:
- Vercel
- Netlify
- GitHub Pages (with Vite base config if needed)

## Notes
- If PowerShell blocks `npm`, use:
```bash
npm.cmd run dev
```
- The project is currently using placeholder links (`href="#"`) and non-functional CTA buttons; wire them to your waitlist form/API next.
