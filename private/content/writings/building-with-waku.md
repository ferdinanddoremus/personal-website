---
title: "Building a Blog with Waku"
date: "2024-01-20"
excerpt: "How I built this simple blog using Waku and markdown files."
---

# Building a Blog with Waku

Setting up a blog with Waku is surprisingly straightforward. Here's what I learned:

## Why Waku?

1. **Simple** - Minimal setup required
2. **Fast** - Great performance out of the box
3. **Flexible** - Works great with markdown

## The Setup

The basic structure is:

```
/content/writings/
  - hello-world.md
  - another-post.md
/src/pages/
  - writings/[slug].tsx
  - writings.tsx
```

Each markdown file has frontmatter for metadata and the content below.

## Deployment

I'm using **Kamal** to deploy this to my VPS. The static files are generated during build and served efficiently.

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci