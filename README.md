# Blumera Global Services Ltd Website — Version 2.1

A lightweight, GitHub Pages-ready corporate website built with plain HTML, CSS and JavaScript. Version 2.1 includes seven dedicated supply-category pages, a 3D coverflow category selector, a compact industry belt, the Manrope/Cormorant Garamond type system, a persistent legal-name header, a responsive category dropdown, configurable WhatsApp and Maralight attribution.

## Quick Preview

Open `index.html` in a browser. For the most accurate preview, run a local static server such as `python3 -m http.server 8080` and open `http://localhost:8080`.

## The Three Most Common Edits

1. **Replace a picture:** open `assets/images`, replace the relevant file and keep exactly the same filename and extension.
2. **Change contact details:** edit `assets/js/site-config.js`.
3. **Change page text:** open `index.html` and search for the large `SECTION` comment above the relevant content.

Supply-category content is kept in one clearly labelled file: `assets/js/category-data.js`.

The approved tagline is `Clear Solutions, Dependable Delivery`. Its two-colour presentation is controlled in `assets/css/v2.css` by `.tagline-green` and `.tagline-amber`.

To change the WhatsApp number, edit `whatsappLink` in `assets/js/site-config.js`. To remove the floating button, change `whatsappEnabled: true` to `whatsappEnabled: false`.

Read `docs/EDITING-GUIDE.md` before editing or uploading.

## Form Status

The RFQ interface is complete but deliberately does not submit until an approved form endpoint is added in `assets/js/site-config.js`. This prevents enquiries being lost to a fake backend.

## GitHub Pages

Upload the contents of this folder to the repository root. In GitHub: **Settings → Pages → Deploy from a branch → main → /(root)**.

Do not rename `index.html` or the `assets` folder.

## Optional Browser QA

The website itself has no build step. The optional automated checks use Playwright:

```bash
npm install
npx playwright install chromium
npm test
```

Preview captures and the JSON test report are written to `tests/artifacts/`.
