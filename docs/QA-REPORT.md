# Blumera Website V2.1 QA Report

Test date: 15 November 2026

## V2.1 Source And Responsive Checks

- Manrope is the primary body and display family; Cormorant Garamond SemiBold Italic is limited to the approved tagline and short editorial accents
- Responsive rules explicitly cover the requested 320, 360, 375, 390 and 430-pixel phone widths through the mobile breakpoint
- The legal company name is present beside the logo on the homepage, all category pages, the RFQ page and the privacy page
- The tagline uses the exact sentence-case wording `Clear Solutions, Dependable Delivery`
- All referenced local images, scripts, stylesheets and internal HTML routes resolve to files in the package
- All JavaScript files pass Node syntax checks

## Interaction Checks

- All seven coverflow category cards are direct links to dedicated category pages
- Previous/next carousel controls change the active card and visible counter
- Mobile drawer opens with a separate close state and locks body scrolling
- Escape closes the drawer
- Supply Categories opens as a hover/focus dropdown on desktop and a tap accordion in the mobile drawer
- The desktop dropdown remains open while the pointer moves from its trigger into the category list
- The category list closes on selection, outside click or Escape
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
- The included Playwright suite now checks the legal-name lockup and category menu at 320, 360, 375, 390, 430, 768, 1024 and 1440 pixels

## Environment Note

The V2.1 browser suite is included and ready to run, but the packaging workspace blocked Chromium process startup and its shared visual browser could not connect to the local server. That environment limitation is not recorded as a browser pass. Run `CHROMIUM_PATH=/path/to/chromium npm test` locally, or install Playwright Chromium with `npx playwright install chromium`, before deployment approval.

## Before Deployment

1. Replace the placeholder domain in `robots.txt` and `sitemap.xml`.
2. Connect an approved secure form endpoint in `assets/js/site-config.js`.
3. Review the privacy notice against the selected form provider and applicable Nigerian data-protection requirements.
4. Replace generated equipment imagery with licensed company, project or supplier photography when available.
