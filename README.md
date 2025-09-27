# Portfolio Website

A personal portfolio website showcasing **Resume, Web3 projects, Photography works, and AI Tarot readings**, deployed via GitHub Pages at:  
👉 [https://maxzhangg.github.io/portfolio/](https://maxzhangg.github.io/portfolio/)

---

## 📖 Introduction

This project serves as a unified platform for presenting **professional experience, creative projects, and interactive tools**.  

Main pages:
- **Resume** – Markdown-rendered CV with expandable/collapsible project details.  
- **Web3** – Blockchain/Web3 experiments and learning projects.  
- **Photography** – Dynamically loaded image gallery from JSON files (Models, Girls, Sapphic, etc.).  

---

## 🛠 Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [lucide-react](https://lucide.dev/)  
- **Charts**: [Recharts](https://recharts.org/)  
- **Animations**: [Framer Motion](https://www.framer.com/motion/)  
- **Data**: JSON-driven dynamic content (photography, tarot deck)  
- **Deployment**: GitHub Pages  

---

## 🚀 Local Development

1. Clone the repo:
   ```bash
   git clone https://github.com/maxzhangg/portfolio.git
   cd portfolio
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deployment

### 1. Build

```bash
npm run build
```

The output will be placed in `dist/`.

### 2. Deployment Options

#### ✅ Recommended: GitHub Actions

* Go to **Settings → Pages** → set **Source: GitHub Actions**.
* Use Vite’s official workflow template for auto-build and deploy.

#### Alternative: `gh-pages` package

```bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

---

## ⚠️ Important Notes (to avoid 404 / broken paths)

1. **Vite base config**
   In `vite.config.js`, add:

   ```js
   export default defineConfig({
     base: '/portfolio/',
   })
   ```

   > Required because the site is hosted at `/portfolio/`, not root.

2. **Routing (BrowserRouter vs HashRouter)**

   * Using **HashRouter** (recommended): URLs like `/portfolio/#/photography` avoid 404s entirely.
   * If keeping **BrowserRouter**, add a `404.html` in `public/` to redirect all unknown routes back to `/portfolio/`:

     ```html
     <!DOCTYPE html><html><head><meta charset="utf-8">
     <meta http-equiv="refresh" content="0; url=/portfolio/">
     <script>location.replace("/portfolio/");</script>
     <title>Redirecting…</title></head><body></body></html>
     ```

3. **Public repository required**
   GitHub Pages only works if the repo is **Public**.

---

## 📂 Project Structure

```
portfolio/
├── public/               # Static assets (photos, JSON, 404.html)
│   └── photo/
│       └── index.json
├── src/
│   ├── pages/            # Page components (Resume, Photography, Tarot, etc.)
│   ├── components/       # Shared components (CardDisplay, ChatWidget, etc.)
│   ├── App.jsx
│   └── main.jsx
├── uniqlo/               # Static HTML content
├── vite.config.js        # Vite config (with base path)
├── package.json
└── README.md
```

---

## ✨ Features

* 📄 **Resume Page** – Markdown-based CV with collapsible project sections.
* 🔮 **Tarot Page** – AI tarot reading with card sessions and interactive chat (desktop & mobile).
* 📸 **Photography Page** – JSON-driven galleries with waterfall-style layout.
* 🛍 **Uniqlo Page** – Static HTML page + integrated chat widget.
* 📱 **Mobile Optimization** – ChatGPT-style layout, history sidebar, import/export chat logs.

---

## 👩‍💻 Author

**Max Zhang**

* Master of Electrical & Computer Engineering, University of Ottawa
* Software Testing & QA | Web3 | AI Applications | Photographer
* [GitHub](https://github.com/maxzhangg) | [Portfolio](https://maxzhangg.github.io/portfolio/)

---
