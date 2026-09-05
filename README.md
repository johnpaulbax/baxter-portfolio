# John Paul R. Baxter — IT Support & Systems Portfolio

An interactive command-center portfolio focused on IT support, systems administration, networking, cybersecurity fundamentals, and software projects.

## Technology

- React and TypeScript
- Vite
- Framer Motion
- Vitest and Testing Library
- ESLint

## Local development

Requires Node.js 22 or a compatible modern Node.js release.

```bash
npm ci
npm run dev
```

## Quality checks

```bash
npm test -- --run
npm run lint
npm run build
```

## Project layout

- `src/` — application code and styles.
- `public/media/` — website images and optimized video; certificates are in `credentials/`.
- `source-media/` — local originals grouped into `portraits/`, `internship/`, `credentials/`, and `videos/`. This folder is excluded from Git and deployment.
- `tests/` — additional automated tests.
- `docs/` — project documentation and historical implementation plans.
- `.github/workflows/` — deployment automation.

Keep new website assets in `public/media/` and reference them from the application. Store full-resolution originals in `source-media/` rather than the project root.

## Deployment

Pushes to `main` are verified and deployed through GitHub Actions. In the repository, select **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The expected project-site URL is:

`https://johnpaulbax.github.io/baxter-portfolio/`

The repository includes a web-optimized version of the AVOID demonstration video. Full-resolution source media remains local and is intentionally excluded from Git.
