# Editing Guide

## Replace An Image

1. Open `assets/images/`.
2. Find the image to replace, such as `trucks.webp`.
3. Prepare the replacement as WebP using the same aspect ratio shown in `IMAGE-GUIDE.md`.
4. Delete the old image.
5. Upload the new image with exactly the same filename: `trucks.webp`.
6. Refresh the website. No code change is required.

## Change Contact Details

Open `assets/js/site-config.js`. Only edit text inside quotation marks. Keep commas and quotation marks intact.

## Change Website Text

Open `index.html`. Search for a heading such as `SECTION 04: SUPPLY CATEGORIES`. Edit only the visible text between HTML tags unless you understand HTML.

## Restore A Broken Edit

Use GitHub's file history to open the last working version, select **Raw**, copy the content and replace the broken file. For a major problem, restore the previous Git commit.

## Add A Delivery Case Study Later

Do not add claims without evidence. Record equipment, manufacturer/model, quantity, client sector, delivery destination, date, scope and approved photographs. Build and link a `deliveries.html` page only after the content is verified.

## Publish On GitHub Pages

1. Create or open the repository.
2. Upload everything inside the `blumera-website` folder to the repository root.
3. Commit the files.
4. Open **Settings → Pages**.
5. Select **Deploy from a branch**.
6. Select `main` and `/(root)`.
7. Save and wait for GitHub to provide the URL.
