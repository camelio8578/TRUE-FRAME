# TrueFrame

The Universal Open Standard for Video Authenticity.

Every public video gets an ambient colored glow around its edge. Blue-green means verified authentic — no AI, no modification, no Photoshop. Red means likely synthetic. Amber means uncertain. Zero cognitive effort required. Like a traffic light for video truth.

Live demo: [trueframe.io](https://trueframe.io)

---

## The Problem

In early 2025, AI video generation crossed the indistinguishability threshold. Sora. Kling. Runway. The models stopped producing content that looked synthetic. They started producing content that looks real — to your mother, to a jury, to a voter watching on their phone.

Detection exists. Nobody uses it. The friction is the fatal flaw.

A banner at the bottom of a video saying "WARNING: 98% AI-GENERATED" requires five conscious cognitive steps: move eyes, read text, process meaning, decide, refocus. That's 1,700 milliseconds of cognitive cost. Result: banner blindness within days.

## The Solution

TrueFrame replaces the five-step banner with a single ambient colored glow around the video edge. The human visual system processes color in peripheral vision without conscious attention. The viewer never stops watching. They never read a label. They simply *know* — the same way they know a traffic light is red without reading the word "STOP."

**Zero steps. Zero effort. Peripheral vision.**

## Three-Layer Trust Engine

Every video is analyzed across three independent signals:

1. **AI Detection Analysis (40%)** — Proprietary ensemble model detects GAN fingerprints, temporal inconsistencies, audio-visual sync anomalies, face reenactment signatures, and metadata irregularities.

2. **Cryptographic Provenance (45%)** — Content Credentials aligned with the C2PA open standard (Adobe, Microsoft, Google, BBC coalition). Verified provenance = strong signal. Missing = neutral. Stripped = negative.

3. **Verified Publisher Attestations (15%)** — Credentialed media organizations submit time-stamped attestations. Council-based governance: journalism 40%, academia 25%, civil society 20%, platform trust & safety 15%.

Combined into a single 0-100 TrueFrame Score. Rendered as a colored ambient border.

## The Color Legend

- **Blue-Green Glow (Score 70-100)** = Verified Authentic. No AI. No modification. No Photoshop. No synthetic alteration of any kind.
- **Amber Glow (Score 40-69)** = Uncertain. Mixed signals. C2PA may be missing. Exercise mild skepticism.
- **Red Glow (Score 0-39)** = Likely Synthetic. High probability of AI-generated or manipulated content.

## Security: The Always-On-Top Doctrine

Bad actors will try to embed fake green borders into synthetic videos. We solved this before they could exploit it:

1. **The Signal Never Lives in the Video** — The glow is NEVER part of the video file. It exists ONLY as an externally injected layer. Content creators have zero access and zero ability to manipulate it.

2. **Pre-Score Border Detection** — If ANY pre-existing colored border is detected before scoring, the video receives an automatic MAXIMUM-RISK red flag. Attempting to fake green becomes self-defeating.

3. **Absolute Outermost Layer Rendering** — TrueFrame renders at the maximum z-index with full opacity. Any fake border underneath is completely covered. No conflicting hues. No spoofing possible.

## Public Demo Platform

This repository includes a working public video platform where anyone can:

- **Upload videos** and get an instant TrueFrame authenticity score
- **Browse the gallery** — every video displays its ambient glow border
- **Comment and discuss** the scores and what they mean
- **Filter by score** — see only authentic, only synthetic, or everything

After 3 free video views, users submit feedback about the ambient glow experience to unlock unlimited access. This feedback shapes the open standard.

## Platform Adoption Roadmap

- **Phase 1 (Months 1-6):** Browser extension beta, public demo platform, 50K installs
- **Phase 2 (Months 6-12):** Publisher SDK — Reuters, BBC, AP integration. Verified Publisher Program.
- **Phase 3 (Months 12-18):** Mid-tier platforms — Vimeo, Dailymotion, Twitch, Substack
- **Phase 4 (Months 18-36):** Major platforms — YouTube, TikTok, Meta adoption (driven by EU AI Act compliance + consumer demand)
- **Phase 5 (Year 3+):** Universal standard — every public video on the internet has a TrueFrame glow

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, Chart.js, Framer Motion
- **Backend:** Hono, tRPC 11, Drizzle ORM, MySQL
- **Auth:** OAuth 2.0 (Kimi) + username/password with bcrypt
- **Scoring:** Simulated ensemble detection with deterministic seed-based analysis (prototype stage — real ML model in development)

## Running Locally

```bash
# Install dependencies
npm install

# Set up database (MySQL required)
# Update DATABASE_URL in .env

# Push schema
npm run db:push

# Start dev server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
├── api/                  # tRPC routers + Hono server
│   ├── router.ts         # Main router registry
│   ├── video-router.ts   # Video upload + analysis
│   ├── score-router.ts   # Score queries + stats
│   ├── comment-router.ts # Comments + glow feedback
│   ├── financial-router.ts # Scenario projections
│   └── ...
├── db/                   # Drizzle schema + migrations
│   ├── schema.ts         # Database tables
│   └── migrations/       # Migration files
├── src/
│   ├── pages/            # All pages (16 total)
│   ├── components/       # Shared components
│   ├── hooks/            # useAuth, useSession
│   └── providers/        # tRPC client
├── contracts/            # Shared types
└── dist/                 # Production build
```

## About

TrueFrame was founded by Michael Camelio. The project is currently a solo-founder effort with planned hires for an AI/ML Detection Engineer, Full-Stack Engineer, and Head of Standards & Partnerships funded by the seed round.

The founding charter, pitch deck, financial models, competitive analysis, IP positioning, and governance framework are all included in this platform at `/founding-document`, `/pitch-deck`, `/financials`, `/team`, `/ip-governance`, `/competitive`, `/use-of-funds`, `/technology`, `/platform-adoption`, and `/acquisition`.

## License

Copyright 2026 Michael Camelio. All rights reserved.

The TrueFrame codebase is proprietary. The TrueFrame Open Standard specification, API documentation, and protocol definitions are published under an Open Standard License — freely implementable by any platform, with governance by the TrueFrame Standards Council.

See [LICENSE](LICENSE) for full terms.

## Contact

For investor inquiries, partnership discussions, or press:
- Email: michael@trueframe.io
- Demo: [trueframe.io](https://trueframe.io)
