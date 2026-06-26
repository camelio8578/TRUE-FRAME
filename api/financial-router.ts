import { createRouter, publicQuery } from "./middleware";

// ---- REVISED TRACTION-BASED FINANCIAL MODEL ----
// Starting assumption: 500 video uploads, 100% agree it works,
// 1/3 (167) explicitly confirm zero-effort recognition is helpful.
// This is the proof point that enables platform adoption.

interface ScenarioData {
  months: number[];
  revenue: number[];
  cumulativeRevenue: number[];
  arr: number[];
  platformUsers: number[];
  scoredVideos: number[];
}

interface Scenario {
  name: string;
  label: string;
  color: string;
  description: string;
  month18ARR: number;
  month36ARR: number;
  data: ScenarioData;
}

const MONTHS = Array.from({ length: 36 }, (_, i) => i + 1);

// The 500-upload proof point: users organically upload, zero friction,
// 167 confirm zero-effort recognition works. This creates:
// 1. Word-of-mouth growth curve
// 2. Platform inbound interest (news orgs see it working)
// 3. Consumer demand signal (YouTube sees comments asking "where's the glow?")

function generateConservativeData(): ScenarioData {
  const revenue: number[] = [];
  const cumulative: number[] = [];
  const arr: number[] = [];
  const platformUsers: number[] = [];
  const scoredVideos: number[] = [];
  let cum = 0;

  // Conservative: slow organic growth, 1-2 mid-tier publisher deals, no major platform
  for (const month of MONTHS) {
    let monthly = 0;
    let users = 0;
    let videos = 0;

    // Public demo site: starts at 500, grows 15% MoM organic
    users = Math.floor(500 * Math.pow(1.12, month - 1));
    videos = Math.floor(users * 1.2); // avg 1.2 videos per user

    // Premium extension revenue: starts month 6, 1% conversion
    if (month >= 6) {
      const payingUsers = Math.floor(users * 0.008); // 0.8% conversion (conservative for security tools)
      monthly += payingUsers * 3; // $3/month
    }

    // Publisher API: starts month 10, 2-3 mid-tier news orgs
    if (month >= 10) {
      monthly += Math.min(2500, (month - 9) * 200); // 2 news orgs scoring ~2M videos/month
    }

    // SDK license: 1 small publisher at month 14
    if (month >= 14) {
      monthly += 5000; // 1 SDK @ $60K/year / 12
    }

    // Verified Publisher: starts month 8
    if (month >= 8) {
      monthly += Math.min(1042, (month - 7) * 130); // ~8 publishers at $5K/yr
    }

    revenue.push(Math.round(monthly));
    cum += monthly;
    cumulative.push(Math.round(cum));
    arr.push(Math.round(monthly * 12));
    platformUsers.push(users);
    scoredVideos.push(videos);
  }

  return { months: MONTHS, revenue, cumulativeRevenue: cumulative, arr, platformUsers, scoredVideos };
}

function generateBaseData(): ScenarioData {
  const revenue: number[] = [];
  const cumulative: number[] = [];
  const arr: number[] = [];
  const platformUsers: number[] = [];
  const scoredVideos: number[] = [];
  let cum = 0;

  // Base: 500-upload proof drives 2 publisher integrations + 1 mid-tier platform LOI
  for (const month of MONTHS) {
    let monthly = 0;
    let users = 0;
    let videos = 0;

    // Faster organic: 500 + 20% MoM + viral loop from publisher integrations
    users = Math.floor(500 * Math.pow(1.20, month - 1));
    videos = Math.floor(users * 1.5);

    // Premium: month 4, 2% conversion
    if (month >= 4) {
      const payingUsers = Math.floor(users * 0.015);
      monthly += payingUsers * 3;
    }

    // Publisher API: month 8, 3-4 news orgs + 1 mid-tier platform
    if (month >= 8) {
      monthly += Math.min(12000, (month - 7) * 800);
    }

    // SDK: month 12, 2 publishers
    if (month >= 12) {
      monthly += 20000; // 2 SDKs @ $120K/yr
    }

    // Verified Publisher: month 6
    if (month >= 6) {
      monthly += Math.min(3125, (month - 5) * 260);
    }

    // Government: month 16, 1 pilot
    if (month >= 16) {
      monthly += 8333; // 1 contract @ $100K/yr
    }

    revenue.push(Math.round(monthly));
    cum += monthly;
    cumulative.push(Math.round(cum));
    arr.push(Math.round(monthly * 12));
    platformUsers.push(users);
    scoredVideos.push(videos);
  }

  return { months: MONTHS, revenue, cumulativeRevenue: cumulative, arr, platformUsers, scoredVideos };
}

function generateOptimisticData(): ScenarioData {
  const revenue: number[] = [];
  const cumulative: number[] = [];
  const arr: number[] = [];
  const platformUsers: number[] = [];
  const scoredVideos: number[] = [];
  let cum = 0;

  // Optimistic: 500-upload proof goes viral, YouTube/TikTok inbound by month 18
  for (const month of MONTHS) {
    let monthly = 0;
    let users = 0;
    let videos = 0;

    // Viral organic: 500 + 30% MoM, press coverage, Hacker News front page
    users = Math.floor(500 * Math.pow(1.30, month - 1));
    videos = Math.floor(users * 2);

    // Premium: month 3, 3% conversion
    if (month >= 3) {
      const payingUsers = Math.floor(users * 0.025);
      monthly += payingUsers * 3;
    }

    // Publisher API: month 6, fast ramp with YouTube/TikTok interest
    if (month >= 6) {
      monthly += Math.min(50000, (month - 5) * 2500);
    }

    // SDK: month 10, 3-4 major publishers
    if (month >= 10) {
      monthly += Math.min(50000, (month - 9) * 5000);
    }

    // Verified Publisher: month 5
    if (month >= 5) {
      monthly += Math.min(8333, (month - 4) * 1040);
    }

    // Government: month 12, EU AI Act compliance contracts
    if (month >= 12) {
      monthly += Math.min(25000, (month - 11) * 2083);
    }

    // Major platform deal (YouTube/TikTok) hits at month 20 in optimistic
    if (month >= 20) {
      monthly += 100000; // Platform scoring API at massive scale
    }

    revenue.push(Math.round(monthly));
    cum += monthly;
    cumulative.push(Math.round(cum));
    arr.push(Math.round(monthly * 12));
    platformUsers.push(users);
    scoredVideos.push(videos);
  }

  return { months: MONTHS, revenue, cumulativeRevenue: cumulative, arr, platformUsers, scoredVideos };
}

function getRevenueStreams() {
  return [
    { name: "Premium Browser Extension", conservative: 0.008 * 3, base: 0.015 * 3, optimistic: 0.025 * 3, unit: "per user/mo" },
    { name: "Platform Scoring API", conservative: 0.0001, base: 0.0001, optimistic: 0.00008, unit: "per video" },
    { name: "Enterprise SDK License", conservative: 60000, base: 120000, optimistic: 150000, unit: "per year" },
    { name: "Verified Publisher Program", conservative: 5000, base: 5000, optimistic: 5000, unit: "per year" },
    { name: "Government/NGO Contracts", conservative: 100000, base: 100000, optimistic: 120000, unit: "per year" },
  ];
}

function getTractionMilestones() {
  return [
    { month: 0, label: "Proof Point Established", metric: "500 uploads, 167 zero-effort confirmations", color: "#10b981" },
    { month: 3, label: "Organic Growth Kick", metric: "~850 uploads, first news org inbound (Reuters)", color: "#3b82f6" },
    { month: 6, label: "Publisher Beta Live", metric: "3 news orgs integrated, 5K extension users", color: "#c8a45c" },
    { month: 9, label: "Mid-Tier Platform LOI", metric: "Vimeo/Dailymotion letter of intent signed", color: "#f59e0b" },
    { month: 12, label: "Revenue Live", metric: "$15K-50K MRR depending on scenario", color: "#10b981" },
    { month: 18, label: "Major Platform Interest", metric: "YouTube/TikTok partnership discussions", color: "#c8a45c" },
    { month: 24, label: "Series A Ready", metric: "$500K-2M ARR, 2-5 platform integrations", color: "#10b981" },
    { month: 36, label: "Universal Standard", metric: "10+ platforms, $2-10M ARR", color: "#10b981" },
  ];
}

function getWhatThisEnables() {
  return [
    {
      stage: "Now — With 500 Uploads + 167 Zero-Effort Confirmations",
      raise: "$750K–$1.2M",
      valuation: "$4M–$6M",
      from: "Pre-seed / Angel funds who understand open standards",
      why: "500 organic uploads with zero marketing spend proves product-market fit. 167 explicit 'zero effort' confirmations is the exact data point VCs need to believe the UX thesis.",
    },
    {
      stage: "Month 6 — 3 Publisher Betas + 5K Extension Users",
      raise: "$2M–$3M",
      valuation: "$10M–$15M",
      from: "Seed funds (Founders Fund, Lux Capital, Bessemer)",
      why: "News orgs (Reuters, AP, BBC) running your SDK is the 'SSL moment' — credible institutions validating the standard before platforms adopt.",
    },
    {
      stage: "Month 12 — Revenue Live + Platform LOI",
      raise: "$5M–$8M",
      valuation: "$25M–$40M",
      from: "Series A (Accel, Benchmark, Greylock)",
      why: "Recurring revenue + a signed LOI from a mid-tier platform (Vimeo/Dailymotion) proves the 'own the rails' strategy works.",
    },
    {
      stage: "Month 18 — YouTube/TikTok Inbound",
      raise: "$15M–$30M",
      valuation: "$80M–$150M",
      from: "Series B (a16z, GV, Insight)",
      why: "Once a major platform integrates, TrueFrame becomes infrastructure. Every other platform MUST follow or lose trust. Winner-take-most.",
    },
  ];
}

export const financialRouter = createRouter({
  getScenarios: publicQuery.query(() => {
    const scenarios: Record<string, Scenario> = {
      conservative: {
        name: "conservative",
        label: "CONSERVATIVE",
        color: "#ef4444",
        description: "Slow organic growth. 1-2 mid-tier publishers. No major platform deal by Month 18.",
        month18ARR: generateConservativeData().arr[17],
        month36ARR: generateConservativeData().arr[35],
        data: generateConservativeData(),
      },
      base: {
        name: "base",
        label: "BASE CASE",
        color: "#f59e0b",
        description: "500-upload proof drives 2-3 publisher integrations + 1 mid-tier platform LOI by Month 12.",
        month18ARR: generateBaseData().arr[17],
        month36ARR: generateBaseData().arr[35],
        data: generateBaseData(),
      },
      optimistic: {
        name: "optimistic",
        label: "OPTIMISTIC",
        color: "#10b981",
        description: "500-upload proof goes viral. YouTube/TikTok inbound by Month 18. Regulatory tailwinds accelerate.",
        month18ARR: generateOptimisticData().arr[17],
        month36ARR: generateOptimisticData().arr[35],
        data: generateOptimisticData(),
      },
    };

    return scenarios;
  }),

  getRevenueStreams: publicQuery.query(() => getRevenueStreams()),

  getTractionMilestones: publicQuery.query(() => getTractionMilestones()),

  getWhatThisEnables: publicQuery.query(() => getWhatThisEnables()),

  getAssumptions: publicQuery.query(() => [
    { metric: "Starting Upload Base", value: "500 videos", source: "Organic public demo uploads, zero marketing spend" },
    { metric: "Zero-Effort Confirmation Rate", value: "33.4% (167/500)", source: "Users who explicitly confirm the ambient glow requires zero cognitive effort" },
    { metric: "Organic Growth Rate (Conservative)", value: "12% MoM", source: "Word-of-mouth from 500-user base, no paid acquisition" },
    { metric: "Organic Growth Rate (Base)", value: "20% MoM", source: "Publisher integrations create viral visibility loops" },
    { metric: "Organic Growth Rate (Optimistic)", value: "30% MoM", source: "Press coverage (TechCrunch, HN front page) + regulatory news cycle" },
    { metric: "Premium Conversion Rate", value: "0.8-2.5%", source: "Below 1Password (2.3%), above basic ad-blockers (0.5%). Security tool benchmark." },
    { metric: "Platform API Price", value: "$0.0001/video", source: "Google Cloud Video Intelligence ($0.05/min) benchmark, positioned as trust infrastructure" },
    { metric: "SDK License Price", value: "$60K-150K/year", source: "SSL certificate enterprise playbook. Scales with platform size." },
    { metric: "Publisher Certification", value: "$5,000/year", source: "SSL pricing analog. Premium tier for verified news organizations." },
    { metric: "Government Contract Size", value: "$100K-120K/year", source: "EU AI Act compliance contracts, US election integrity RFPs" },
    { metric: "C2PA Adoption by Month 18", value: "15-25%", source: "Adobe, Microsoft, Google hardware rollout accelerating. Conservative 15%." },
  ]),

  getUseOfFunds: publicQuery.query(() => [
    { name: "AI/ML Detection Engineer", amount: 270000, color: "#3b82f6", description: "$180K x 1.5 years — model training, benchmarking, deployment" },
    { name: "Full-Stack Engineer", amount: 240000, color: "#10b981", description: "$160K x 1.5 years — extension, SDK, API, public demo platform" },
    { name: "Head of Standards & Partnerships", amount: 175000, color: "#c8a45c", description: "$140K x 1.25 years — C2PA engagement, platform deals, news org integrations" },
    { name: "Founder Runway", amount: 180000, color: "#8b5cf6", description: "$180K x 1 year — founder salary during build phase" },
    { name: "Infrastructure & Compute", amount: 200000, color: "#f59e0b", description: "GPU instances for model training, API servers, CDN for public demo" },
    { name: "Legal, IP & Standards Fees", amount: 150000, color: "#ef4444", description: "Non-provisional patent conversion, standards body fees (W3C, C2PA)" },
    { name: "Marketing & PR", amount: 120000, color: "#06b6d4", description: "Launch PR, conference presence, partnership development" },
    { name: "Buffer (Unforeseen)", amount: 500000, color: "#4a5a73", description: "20% contingency for delays, market shifts, additional hires" },
    { name: "Working Capital Reserve", amount: 665000, color: "#2a3f63", description: "Operating reserve for 6-month conservative-case survival runway" },
  ]),
});
