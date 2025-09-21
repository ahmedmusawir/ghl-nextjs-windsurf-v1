# NextPress CMS — Overview

## Purpose

NextPress CMS is a block-based content system built on Next.js App Router. It enables teams to compose pages from reusable React components ("blocks") whose props are stored as JSON files in the repository. Pages render by reading a page composition JSON, loading each block instance JSON, and mounting the mapped React components.

## Goals

- Deliver a fast, file-first CMS that plays nicely with Git workflows.
- Use simple JSON for content storage so changes are code-reviewable and deployable.
- Provide an Admin Portal to edit JSON safely without altering core code.
- Promote reuse through block instances and page composition.

## Why Block-Based Architecture

- Reuse: One block component, many JSON instances for different pages/variations.
- Consistency: Shared design and interactions across the site.
- Composability: Page JSON lists block instance ids to form a page.
- Reviewability: Content is structured JSON, easy to diff in PRs.
- Incremental evolution: Add new blocks without touching existing pages.

## Current Status

- Core rendering flow working in App Router.
- Admin Portal (read/write JSON) implemented for basic editing.
- Style props (bg, fg, variant, align) supported by blocks and editable via JSON.
- Demo pages: `home` and `our-story` using the same components with different props.
