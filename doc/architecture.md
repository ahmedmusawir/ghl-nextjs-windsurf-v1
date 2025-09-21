# Architecture

## Repository Structure

```
src/
  app/
    (admin)/
      admin/
        [slug]/page.tsx         # Dynamic Admin page for a given page slug
        layout.tsx              # Admin area layout passthrough
        page.tsx                # Redirects /admin -> first page (e.g., /admin/home)
        _components/            # Client components for Admin UI
        _lib/contentStore.ts    # Read/write helpers for JSON content
        api/                    # Admin API routes (if present)
    (public)/                   # Public-facing routes
  components/
    BlockRegistry.ts            # Map block type -> React component
    BlockRenderer.tsx           # Loads a page JSON, resolves block JSONs and renders
    blocks/
      BestOffer/index.tsx
      WhyUs/index.tsx
      Testimonials/index.tsx
      Faq/index.tsx
  content/
    pages/
      home.json
      our-story.json
    blocks/
      best-offer/
        best-offer-001.json
        best-offer-002.json
      why-us/
        why-us-001.json
        why-us-002.json
      testimonials/
        testimonials-001.json
        testimonials-002.json
      faq/
        faq-001.json
        faq-002.json
```

## How Blocks Work

- **Component**: Each block is a React component under `src/components/blocks/<Type>/index.tsx`.
- **Registry**: `src/components/BlockRegistry.ts` maps a string `type` (e.g., `BestOffer`) to its component.
- **Instance JSON**: Each block instance lives at `src/content/blocks/<type-slug>/<blockId>.json` and includes:
  - `blockId`: unique identifier
  - `type`: must match a key in `BlockRegistry`
  - `props`: arbitrary JSON props passed into the React component
  - `meta`: optional metadata used by Admin lists
- **Style Props**: Common style props supported by blocks:
  - `bg` (background utility), `fg` (foreground/text color), `variant` (e.g., `solid|outline|minimal`), `align` (`left|center`)
  - Applied to the outer container of each block. Missing values fall back to defaults.

## How Pages Work

- **Composition JSON**: Each page is defined by `src/content/pages/<slug>.json` with:
  - `slug`, `title`
  - `blocks`: an array of `{ blockId }` referencing block instances
- **Rendering**: `src/components/BlockRenderer.tsx` reads the page JSON, loads each block instance JSON by `blockId`, looks up the component via `BlockRegistry`, and renders `<Component {...instance.props} />`.

## Admin Portal Flow

- **Read**: `listPages()` and `readPage(slug)` read JSON files under `src/content/pages/`.
- **List Blocks**: For a page, Admin loads block instance metadata by `readBlock(blockId)` from `src/content/blocks/...`.
- **Edit**: Admin UI presents fields for `props` and writes back using `writeBlockProps(blockId, newProps)`.
- **Result**: After saving, a browser refresh re-renders with the updated JSON.

## Key Modules

- `src/components/BlockRegistry.ts`: central mapping of block `type` to component.
- `src/components/BlockRenderer.tsx`: composition loader + renderer.
- `src/app/(admin)/admin/_lib/contentStore.ts`: filesystem JSON read/write utilities used by Admin.
