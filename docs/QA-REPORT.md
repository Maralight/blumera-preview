# Blumera Website V2 QA Report

Test date: 15 November 2026

## Render Checks

- Desktop browser render checked at 1363 × 936 CSS pixels
- Mobile browser renders checked at 320, 360, 375, 390 and 430 pixels
- Horizontal page overflow: 0 pixels at every tested width
- Hero, approved SVG logo and essential imagery rendered without broken assets
- Sora headings remain legible and consistently weighted on desktop and mobile
- Floating WhatsApp control stays within the safe bottom-right area and does not widen the page

## Interaction Checks

- All seven coverflow category cards are direct links to dedicated category pages
- Previous/next carousel controls change the active card and visible counter
- Mobile drawer opens with a separate close state and locks body scrolling
- Escape closes the drawer
- Selecting a menu link closes the drawer, restores scrolling and lands on the requested section
- No hidden backdrop remains after the drawer closes
- WhatsApp link resolves to the configured Nigerian number with a pre-filled enquiry message
- Category RFQ links pass the selected category into the enquiry page

## Content Checks

- Company email: `info@blumeraltd.com`
- Company phone and WhatsApp: `0803 415 0171`
- Sourcing regions: Asia, United States and Europe
- Existing Lagos and Port Harcourt office content retained
- “Powered by Maralight” credit links to `https://maralightltd.com`
- Every category page includes equipment, typical industries, sourcing reach and specification coordination
- Industries Served remains a homepage section and does not create unnecessary standalone pages

## Route And Source Checks

- All 11 HTML routes returned HTTP 200 through a local server
- `site.webmanifest`, `robots.txt` and `sitemap.xml` returned HTTP 200
- All seven category routes are included in `sitemap.xml`
- All local HTML file references resolve to real files
- All JavaScript files pass syntax checks
- Browser console and image checks showed no broken essential assets

## Before Deployment

1. Replace the placeholder domain in `robots.txt` and `sitemap.xml`.
2. Connect an approved secure form endpoint in `assets/js/site-config.js`.
3. Review the privacy notice against the selected form provider and applicable Nigerian data-protection requirements.
4. Replace generated equipment imagery with licensed company, project or supplier photography when available.
