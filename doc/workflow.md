# Workflow

## Developer Workflow

- **Add a new block**
  - Create a React component at `src/components/blocks/<BlockName>/index.tsx`.
  - Register it in `src/components/BlockRegistry.ts` with a unique `type` string.
  - Create one or more block instance JSON files at `src/content/blocks/<type-slug>/<blockId>.json`.
  - Example `props` include both content fields and common style props (`bg`, `fg`, `variant`, `align`).

- **Create a new page**
  - Add a composition JSON at `src/content/pages/<slug>.json` with `slug`, `title`, and `blocks: [{ blockId }]`.
  - Render the page using `BlockRenderer` with the `page` prop set to the slug (or via a route that wires it in).

- **Edit props**
  - Update the `props` object in the block instance JSON.
  - Refresh the browser to see the changes. No rebuild needed for JSON edits in dev.

- **Use style props**
  - `bg`: Tailwind background class (e.g., `bg-white`, `bg-blue-50`).
  - `fg`: Tailwind text color class (e.g., `text-gray-900`).
  - `variant`: `solid | outline | minimal` (block-specific, applied at outer section).
  - `align`: `left | center` (applied at outer section).
  - Missing values fall back to defaults at the component level.

## Admin Demo Workflow

- **Edit → Save → Refresh**
  - Go to `/admin`.
  - Pick a page (e.g., `home`, `our-story`).
  - Click Edit on a block to modify its `props`.
  - Save to write JSON back to `src/content/blocks/...`.
  - Refresh the public page to see the updated rendering.

- **Per-page variation**
  - Use distinct block instance IDs per page (e.g., `best-offer-001` for Home and `best-offer-002` for Our Story).
  - This allows pages to diverge visually without changing other pages.

## Safely Duplicate or Swap Block Instances

- **Duplicate**
  - Copy an existing instance JSON to a new file with a unique `blockId`.
  - Update `blockId` inside the JSON to match the filename.
  - Reference the new `blockId` in the page composition JSON.

- **Swap**
  - In the page composition JSON, replace one `{ blockId }` with another of the same `type`.
  - Keep the original instance file if it’s still used elsewhere; otherwise, remove it in a cleanup PR.

- **Notes**
  - Keep JSON diffs small and focused for easy code review.
  - Prefer props-driven variation over creating new components.
