# Blumera Website QA Report

Test date: 11 November 2026

## Render Checks

- Desktop browser render: 1348 × 926 CSS pixels
- Mobile browser render: 390 × 844 capture, 375 px content viewport (browser scrollbar excluded)
- Desktop horizontal overflow: 0 px
- Mobile horizontal overflow: 0 px
- Hero, approved SVG logo and essential imagery rendered successfully
- Mobile navigation opened and reported the correct expanded state
- Layout breakpoints reviewed at 360 px, 760 px and 1050 px in the responsive stylesheet

## Interaction Checks

- Primary navigation anchors resolve to real sections
- Mobile menu toggle opens correctly
- RFQ form flags all nine required fields when submitted empty
- A completed RFQ displays the intentional “submission endpoint not connected” notice
- No fake form submission or unconfigured external transmission occurs

## Route And Source Checks

- `index.html`: HTTP 200
- `request-quote.html`: HTTP 200
- `privacy.html`: HTTP 200
- `404.html`: HTTP 200
- `site.webmanifest`: HTTP 200
- `robots.txt`: HTTP 200
- `sitemap.xml`: HTTP 200
- All local HTML file references resolve
- All JavaScript files pass syntax checks

## Before Deployment

1. Replace the placeholder domain in `robots.txt` and `sitemap.xml`.
2. Connect an approved secure form endpoint in `assets/js/site-config.js`.
3. Review the privacy notice against the selected form provider.
4. Replace generated equipment imagery with licensed project or supplier photography when available.
