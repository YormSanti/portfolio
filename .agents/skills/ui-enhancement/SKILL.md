---
name: ui-enhancement
description: >-
  Guidelines and steps to improve the web portfolio UI with premium interactive features, animations, glassmorphism, and unified visual layouts.
---

# UI Enhancement Skill

This workspace skill provides instructions and specifications to upgrade the web portfolio UI, ensuring high visual quality, interactive state tracking, and premium transitions.

## Specifications

### 1. Hero Staggered Animation Fix
- Locate the `.fade-in-up` class in `src/app/page.tsx`.
- Map and add unique IDs to the main elements in the JSX structure:
  - Status Badge: `id="hero-status"`
  - Main Heading: `id="hero-title-header"`
  - Description: `id="hero-desc-p"`
  - Button Container: `id="hero-buttons"`
  - Avatar Showcase: `id="hero-avatar-showcase"`
- This enables the pre-configured staggering delays in `globals.css` to function correctly.

### 2. Interactive "Skill Inspector" Integration
- Replace the static skill cards with a dynamic **Skill Inspector** dashboard.
- Users can click on individual skills to "Inspect" them, which opens a detailed container displaying:
  - Skill name and associated FontAwesome icon.
  - Sleek visual proficiency metrics (animated linear/radial indicator).
  - High-fidelity description text.
  - Sub-skills rendered as colorful glassmorphic pills.
  - Project references.
- Add an interactive button: "Filter projects using this skill" which automatically updates the active filter in the projects section and smooth-scrolls the page to it.

### 3. Dynamic Project Stack Filtering
- Enhance the project filtering mechanism to support filtering by specific technologies (e.g. "React", "Flutter", "TypeScript").
- Highlight the active filter button clearly using the primary/accent color schemes.

### 4. Style Upgrades (Glassmorphism & Interactive Spotlights)
- Add subtle cursor spotlight indicators or glow tracking to interactive cards.
- Modernize the skills card styling to use variable HSL theme border colors instead of generic static styles.
