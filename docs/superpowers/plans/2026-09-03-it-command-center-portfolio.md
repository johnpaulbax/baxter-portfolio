# IT Command Center Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality, responsive, accessible single-page IT portfolio for John Paul R. Baxter using the supplied portraits, internship photographs, and AVOID demonstration video.

**Architecture:** A static Vite React application with section-focused components, typed content modules, centralized media paths, reusable motion primitives, and CSS-variable design tokens exposed through Tailwind. Interaction logic stays in small hooks/components, while the page sections consume data without duplicating content or asset paths.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Motion for React, Lucide React, Vitest, Testing Library, jsdom, ESLint.

**Spec:** `.superdesign/design-system.md` plus the user-approved project brief in this session.

## Global Constraints

- Preserve all eight original media files in the workspace root; copy them to `public/media/` without overwriting or deleting the originals.
- The default portrait is `self portrait1.jpg`; the graduation alternate is `self portrait 2.jpg`.
- All five internship images must be represented through centralized configuration and open in the reusable lightbox.
- `AVOID_VIDEO.mp4` must use an embedded responsive HTML5 player and remain fully visible.
- The site must remain static-hostable and must not add server-only runtime dependencies.
- All motion and functionality must remain usable with `prefers-reduced-motion: reduce`.
- Content must not invent employers, credentials, metrics, dates, or experience beyond the supplied brief.

---

## Proposed file structure

```text
PORTFOLIO/
├── public/
│   ├── media/{portrait-professional.jpg,portrait-graduate.jpg,internship-01.jpg...avoid-demo.mp4}
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/{NavigationProgress,MobileNavigation,SectionShell}.tsx
│   │   ├── media/{PortraitScanner,ScanReveal,MediaLightbox,MediaPlayer}.tsx
│   │   └── ui/{SectionHeader,SystemPanel,StatusBadge,TechButton}.tsx
│   ├── sections/{Hero,About,Experience,Homelab,Incidents,Projects,Skills,Training,Contact}.tsx
│   ├── data/{navigation,media,experience,incidents,projects,skills,credentials}.ts
│   ├── hooks/{useActiveSection,useReducedMotion,useFocusTrap}.ts
│   ├── test/{setup,render}.ts(x)
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── tests/interactions/*.test.tsx
├── index.html
├── package.json
├── vite.config.ts
└── eslint.config.js
```

### Task 1: Application foundation and media pipeline

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`
- Create: `src/main.tsx`, `src/App.tsx`, `src/styles.css`, `src/test/setup.ts`
- Create: `public/favicon.svg`, `public/media/*`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: Vite commands `dev`, `build`, `test`, `lint`; root React application; canonical public media filenames.

- [ ] Copy each root media file to a stable filename under `public/media/` using `Copy-Item -LiteralPath`; retain root originals and verify source/destination byte sizes match.
- [ ] Scaffold the Vite/React/TypeScript build and install only the approved UI, motion, icon, lint, and test dependencies.
- [ ] Define HTML metadata: title, description, theme color, Open Graph fields, viewport, and favicon.
- [ ] Write a smoke test that expects John Paul R. Baxter’s name and the nine section landmarks; run it first to observe failure.
- [ ] Implement the semantic application shell with a skip link, `header`, `main`, nine section placeholders, and `footer`; rerun the smoke test to pass.
- [ ] Add global resets, font loading, CSS tokens, technical grid/grain layers, focus styles, reduced-motion overrides, and fluid container utilities from `.superdesign/design-system.md`.
- [ ] Run `npm.cmd test -- --run`, `npm.cmd run lint`, and `npm.cmd run build`.

### Task 2: Typed content and reusable console primitives

**Files:**
- Create: `src/data/navigation.ts`, `media.ts`, `experience.ts`, `incidents.ts`, `projects.ts`, `skills.ts`, `credentials.ts`
- Create: `src/components/ui/SectionHeader.tsx`, `SystemPanel.tsx`, `StatusBadge.tsx`, `TechButton.tsx`
- Create: `src/components/layout/SectionShell.tsx`
- Test: `tests/interactions/content.test.ts`

**Interfaces:**
- Produces: `NavItem`, `MediaItem`, `Incident`, `Project`, `SkillGroup`, and `Credential` types plus exported immutable arrays; reusable panel and section APIs.

- [ ] Write data integrity tests requiring nine unique section IDs, five internship media entries, eight incidents, three projects, five skill groups, and six credential entries.
- [ ] Run the integrity tests and verify they fail because the modules are absent.
- [ ] Implement typed content modules with only the supplied claims and centralized `/media/...` URLs.
- [ ] Implement panel, badge, header, button, and section-shell primitives with semantic element overrides and technical corner treatment.
- [ ] Rerun the integrity tests and TypeScript build.

### Task 3: Motion system and responsive navigation

**Files:**
- Create: `src/hooks/useReducedMotion.ts`, `useActiveSection.ts`
- Create: `src/components/motion/Reveal.tsx`, `DrawLine.tsx`
- Create: `src/components/layout/NavigationProgress.tsx`, `MobileNavigation.tsx`
- Test: `tests/interactions/navigation.test.tsx`, `reduced-motion.test.tsx`

**Interfaces:**
- Produces: `useActiveSection(ids): string`, shared reveal variants, desktop progress rail, and accessible mobile disclosure navigation.

- [ ] Test active-section observation, nav link targets, menu open/close semantics, Escape handling, and reduced-motion variant selection.
- [ ] Implement one shared IntersectionObserver for section activity, smooth anchor navigation, moving progress marker, and completed progress line.
- [ ] Implement a desktop rail at `>=900px` and compact sticky mobile navigation below it, including focus return when the menu closes.
- [ ] Implement grouped scroll reveals and line drawing through Motion with zero-transform reduced-motion variants.
- [ ] Run interaction tests at desktop and mobile viewport mocks.

### Task 4: Hero, About, and portrait scanner

**Files:**
- Create: `src/sections/Hero.tsx`, `About.tsx`
- Create: `src/components/media/PortraitScanner.tsx`
- Test: `tests/interactions/portrait.test.tsx`

**Interfaces:**
- Consumes: portrait URLs from `media.ts`, shared panels, motion primitives.
- Produces: pointer hover/focus and tap-toggle portrait interaction with `aria-pressed` state.

- [ ] Test professional portrait default, pointer enter graduation reveal, pointer leave reversal, keyboard/touch toggle, and reduced-motion crossfade.
- [ ] Implement the hero identity, recruiter-oriented positioning, three actions, restrained terminal excerpt, and status indicators.
- [ ] Implement the systems-profile About panel with supplied location, education, focus, status, and narrative.
- [ ] Implement the scanner-masked portrait transition with both images sharing the same aspect-ratio box and deliberate `object-position` values.
- [ ] Run portrait tests and inspect at 375px and 1440px.

### Task 5: Internship field log and accessible lightbox

**Files:**
- Create: `src/sections/Experience.tsx`
- Create: `src/components/media/ScanReveal.tsx`, `MediaLightbox.tsx`
- Create: `src/hooks/useFocusTrap.ts`
- Test: `tests/interactions/lightbox.test.tsx`, `experience.test.tsx`

**Interfaces:**
- Produces: `MediaLightbox({items, activeIndex, onClose, onIndexChange})`; desktop sticky narrative and mobile timeline consuming the same stages.

- [ ] Test all five stage/image mappings, open/close, Escape, backdrop close, focus trapping/restoration, arrow navigation, and full-image `object-contain` styling.
- [ ] Implement five field-log stages covering team leadership, build, deployment, user support, and stakeholder presentation without adding metrics.
- [ ] Implement desktop sticky storytelling with active-stage updates and a non-sticky vertical card timeline below 900px.
- [ ] Implement a portal-based `role="dialog"` lightbox with inert background behavior, scroll locking, previous/next controls, touch-sized buttons, complete images, captions, and scanner entry.
- [ ] Run lightbox and experience tests, then verify portrait and landscape source ratios do not cause fixed-height cropping.

### Task 6: Interactive homelab topology and incident simulator

**Files:**
- Create: `src/sections/Homelab.tsx`, `Incidents.tsx`
- Create: `src/components/lab/Topology.tsx`, `TopologyNode.tsx`
- Create: `src/components/incidents/IncidentViewer.tsx`
- Test: `tests/interactions/topology.test.tsx`, `incidents.test.tsx`

**Interfaces:**
- Produces: responsive SVG topology with focusable HTML node overlays; `IncidentViewer` using typed ticket selection.

- [ ] Test topology node labels/descriptions, focus behavior, eight selectable tickets, active tab semantics, and the Problem→Diagnosis→Resolution→Verification sequence.
- [ ] Implement progressive SVG path drawing and delayed online indicators, using static visible paths in reduced-motion mode.
- [ ] Recompose the graph from wide topology to readable stacked topology below 700px without shrinking labels.
- [ ] Implement a tasteful ticket index and detail panel with `aria-live="polite"`, status badges, keyboard selection, and concise homelab-based troubleshooting records.
- [ ] Run topology and incident tests.

### Task 7: Featured projects and AVOID video player

**Files:**
- Create: `src/sections/Projects.tsx`
- Create: `src/components/projects/ProjectCard.tsx`
- Create: `src/components/media/MediaPlayer.tsx`
- Test: `tests/interactions/video.test.tsx`, `projects.test.tsx`

**Interfaces:**
- Produces: expandable project case study cards and a native-video-backed player with accessible custom frame.

- [ ] Test three project records, expandable `aria-expanded` state, MP4 source, metadata preload, play/pause, mute, seek updates, time display, fullscreen request, keyboard shortcuts, and fallback text.
- [ ] Implement AVOID, Document Tracking System, and File Integrity Monitoring System cards with supplied roles, technologies, and contributions.
- [ ] Implement the AVOID “MVP / Capstone Demonstration” frame around a `video` element using `object-contain`, intrinsic 16:9 fallback sizing, loading/error states, and mobile-safe controls.
- [ ] Keep native controls available where capability or mobile accessibility is better than custom controls; never autoplay with sound.
- [ ] Run media and project tests and verify the 361,913,809-byte source copy resolves through the production build.

### Task 8: Skills, training, and contact completion state

**Files:**
- Create: `src/sections/Skills.tsx`, `Training.tsx`, `Contact.tsx`
- Create: `src/components/skills/SkillTabs.tsx`
- Test: `tests/interactions/skills.test.tsx`, `contact.test.tsx`

**Interfaces:**
- Produces: WAI-ARIA tab list with animated content panel and final READY state tied to viewport entry.

- [ ] Test five functional skill tabs, arrow-key movement, selected panel contents, credential wording, placeholder handling, and contact READY state.
- [ ] Implement categorized skills as text-first capability tiles rather than a logo cloud, with layout animation disabled under reduced motion.
- [ ] Implement course-completion and Fortinet credential cards using accurate verification-style language.
- [ ] Implement the “READY FOR DEPLOYMENT.” contact section with email/resume/GitHub/LinkedIn placeholders clearly marked when actual URLs/files are unavailable.
- [ ] Run interaction tests.

### Task 9: Integration, responsive polish, and performance

**Files:**
- Modify: `src/App.tsx`, `src/styles.css`, all section components as findings require
- Create: `tests/interactions/app-integration.test.tsx`

**Interfaces:**
- Consumes: all nine sections and shared navigation/lightbox state.
- Produces: complete single-page console experience.

- [ ] Integrate sections in numbered order and connect hero/contact links to actual section IDs or clearly disabled placeholders.
- [ ] Add lazy image loading, explicit dimensions/aspect ratios, video metadata preload, stable scrollbar behavior, and print-safe baseline styles.
- [ ] Verify layout compositions at 375×812, 768×1024, 1024×768, and 1440×900 using browser automation or screenshots.
- [ ] Confirm sticky behavior is disabled on mobile, topology and field log recompose, lightbox controls remain reachable, and no horizontal overflow exists.
- [ ] Audit heading hierarchy, landmarks, names/roles/states, contrast, focus order, and all keyboard paths.

### Task 10: Review and release verification

**Files:**
- Modify only files identified by review or verification failures.

**Interfaces:**
- Produces: evidence-backed release candidate with no known build, test, lint, asset, accessibility, or responsive blockers.

- [ ] Invoke `superpowers:requesting-code-review` and address high/medium findings using `superpowers:receiving-code-review` when feedback is supplied.
- [ ] Invoke `superpowers:verification-before-completion` and run clean `npm.cmd install`, tests, lint, and production build.
- [ ] Verify production asset URLs for both portraits, all five internship photographs, and AVOID video; compare copied byte sizes with originals.
- [ ] Exercise portrait hover/tap, navigation, section activity, lightbox keyboard controls, incident switching, skill tabs, mobile menu, and player controls.
- [ ] Verify reduced-motion behavior and confirm there are no obvious browser console errors.
- [ ] Because the starting workspace is not a Git repository, skip branch integration unless Git is initialized during implementation; document that `superpowers:finishing-a-development-branch` is not applicable otherwise.
