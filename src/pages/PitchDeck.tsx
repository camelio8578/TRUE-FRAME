import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import { Link } from "react-router";
import {
  ShieldCheck, Brain, Lock, BarChart3, Users, Globe,
  ChevronLeft, ChevronRight, Eye, Zap, Target, TrendingUp
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, Title, Tooltip, Legend, Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

const slides = [
  "title", "problem", "solution", "zero-effort", "colors", "security",
  "technology", "market", "business-model", "financials", "competition",
  "team", "roadmap", "ask",
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: scenarios } = trpc.financial.getScenarios.useQuery();
  const { data: funds } = trpc.financial.getUseOfFunds.useQuery();

  const next = () => setCurrentSlide((c) => Math.min(c + 1, slides.length - 1));
  const prev = () => setCurrentSlide((c) => Math.max(c - 1, 0));

  const chartData = {
    labels: Array.from({ length: 18 }, (_, i) => `M${i + 1}`),
    datasets: [
      { label: "Conservative", data: scenarios?.conservative.data.revenue || [], borderColor: "#ef4444", borderDash: [5, 5], tension: 0.4, pointRadius: 0 },
      { label: "Base Case", data: scenarios?.base.data.revenue || [], borderColor: "#f59e0b", tension: 0.4, pointRadius: 0 },
      { label: "Optimistic", data: scenarios?.optimistic.data.revenue || [], borderColor: "#10b981", tension: 0.4, pointRadius: 0 },
    ],
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "#7a8ba5", font: { family: "'JetBrains Mono', monospace", size: 10 } } } },
    scales: {
      x: { grid: { color: "#1e2d47" }, ticks: { color: "#7a8ba5", font: { size: 9 } } },
      y: { grid: { color: "#1e2d47" }, ticks: { color: "#7a8ba5", font: { size: 9 }, callback: (v: string | number) => `$${Number(v).toLocaleString()}` } },
    },
  };

  const doughnutData = funds ? {
    labels: funds.map((f) => f.name),
    datasets: [{ data: funds.map((f) => f.amount), backgroundColor: funds.map((f) => f.color), borderColor: "#060a12", borderWidth: 2 }],
  } : null;

  const renderSlide = () => {
    switch (slides[currentSlide]) {
      case "title":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShieldCheck className="w-16 h-16 mb-6" style={{ color: "#c8a45c" }} />
            <h1 className="font-display text-[clamp(36px,5vw,64px)] mb-4" style={{ color: "#e8edf5" }}>
              TrueFrame
            </h1>
            <p className="text-xl font-light mb-2" style={{ color: "#7a8ba5" }}>
              The Universal Open Standard for Video Authenticity
            </p>
            <p className="font-mono text-sm mb-8" style={{ color: "#c8a45c" }}>
              The FICO Score of Video Truth
            </p>
            <div className="flex gap-6 text-xs" style={{ color: "#4a5a73" }}>
              <span>$2.5M Seed Round</span>
              <span>|</span>
              <span>18-Month Runway</span>
              <span>|</span>
              <span>June 2026</span>
            </div>
          </div>
        );

      case "problem":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>THE PROBLEM</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              We Lost the Ability to Trust What We See
            </h2>
            <div className="grid grid-cols-3 gap-6 mb-6">
              {[
                { value: "5B+", label: "Video views/day across top platforms" },
                { value: "$78B", label: "Annual disinformation damage" },
                { value: "99%", label: "Of consumers cannot detect synthetic video" },
              ].map((s) => (
                <div key={s.label} className="p-4 text-center" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                  <p className="font-display text-4xl mb-1" style={{ color: "#e8edf5" }}>{s.value}</p>
                  <p className="text-[11px]" style={{ color: "#7a8ba5" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-[1.7]" style={{ color: "#7a8ba5" }}>
              In early 2025, AI video crossed the indistinguishability threshold. Sora, Kling, Runway —
              the models stopped producing content that looked synthetic. Detection exists. Nobody uses it.
              <strong style={{ color: "#e8edf5" }}> The friction is the fatal flaw.</strong>
            </p>
          </div>
        );

      case "solution":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>THE SOLUTION</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              An Ambient Signal in Peripheral Vision
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Brain, title: "AI Detection", weight: "40%", color: "#3b82f6", desc: "Ensemble model analyzes GAN fingerprints, temporal inconsistencies, audio-visual sync" },
                { icon: Lock, title: "C2PA Provenance", weight: "45%", color: "#10b981", desc: "Cryptographic content credentials from Adobe, Microsoft, Google, BBC coalition" },
                { icon: ShieldCheck, title: "Publisher Attestations", weight: "15%", color: "#c8a45c", desc: "Verified media orgs submit time-stamped attestations with transparent governance" },
              ].map((layer) => (
                <div key={layer.title} className="p-5" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                  <layer.icon className="w-6 h-6 mb-3" style={{ color: layer.color }} />
                  <h3 className="text-sm font-medium mb-1" style={{ color: "#e8edf5" }}>{layer.title}</h3>
                  <span className="font-mono text-[10px] px-2 py-0.5" style={{ backgroundColor: `${layer.color}15`, color: layer.color, borderRadius: "2px" }}>
                    {layer.weight}
                  </span>
                  <p className="text-xs mt-3 leading-[1.5]" style={{ color: "#7a8ba5" }}>{layer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "zero-effort":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>THE KILLER INSIGHT</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              Zero Cognitive Steps vs. Five
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-5" style={{ backgroundColor: "#0d1320", border: "1px solid #ef4444", borderRadius: "4px" }}>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: "#ef4444" }}>
                  <Eye className="w-4 h-4" /> Banner Warning (5 Steps)
                </h3>
                <ol className="space-y-2">
                  {["Move eyes to banner", "Read warning text", "Process the meaning", "Decide what to do", "Return focus to video"].map((s, i) => (
                    <li key={i} className="flex gap-2 text-xs" style={{ color: "#7a8ba5" }}>
                      <span className="font-mono text-[10px]" style={{ color: "#ef4444" }}>{i + 1}.</span>{s}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="p-5" style={{ backgroundColor: "#0d1320", border: "1px solid #10b981", borderRadius: "4px" }}>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: "#10b981" }}>
                  <Zap className="w-4 h-4" /> Ambient Glow (0 Steps)
                </h3>
                <p className="text-sm leading-[1.6] mb-4" style={{ color: "#7a8ba5" }}>
                  Peripheral vision processes color without conscious attention. The viewer <em>simply knows</em> —
                  the same way they know a traffic light is red without reading "STOP."
                </p>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }} />
                  <div className="w-12 h-12 rounded" style={{ backgroundColor: "#f59e0b" }} />
                  <div className="w-12 h-12 rounded" style={{ backgroundColor: "#ef4444" }} />
                </div>
              </div>
            </div>
          </div>
        );

      case "colors":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>THE COLOR LEGEND</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              Three Colors. Universal Meaning.
            </h2>
            <div className="space-y-4">
              {[
                { gradient: true, title: "Blue-Green Glow = Verified Authentic (70-100)", body: "No AI. No modification. No Photoshop. Cryptographically verified or high-confidence authentic through detection + publisher attestation.", color: "#10b981" },
                { title: "Amber Glow = Uncertain (40-69)", body: "Mixed signals. Possible modification detected. C2PA may be missing. Exercise mild skepticism.", color: "#f59e0b", bg: "#f59e0b" },
                { title: "Red Glow = Likely Synthetic (0-39)", body: "High probability of AI-generated content. GAN fingerprints, temporal inconsistencies, or audio-visual anomalies detected.", color: "#ef4444", bg: "#ef4444" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-4" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: `3px solid ${c.color}`, borderRadius: "4px" }}>
                  {c.gradient ? (
                    <div className="w-12 h-12 shrink-0 rounded" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }} />
                  ) : (
                    <div className="w-12 h-12 shrink-0 rounded" style={{ backgroundColor: c.bg }} />
                  )}
                  <div>
                    <h3 className="text-sm font-medium mb-1" style={{ color: c.color }}>{c.title}</h3>
                    <p className="text-xs leading-[1.5]" style={{ color: "#7a8ba5" }}>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "security":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>SECURITY ARCHITECTURE</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              The Always-On-Top Doctrine
            </h2>
            <div className="space-y-3">
              {[
                { title: "The Signal Never Lives in the Video", desc: "The glow is NEVER part of the video file. It exists ONLY as an externally injected layer rendered by TrueFrame's system. Content creators have zero access and zero ability to manipulate.", color: "#10b981" },
                { title: "Pre-Score Border Detection", desc: "If ANY pre-existing colored border is detected before scoring, the video receives an automatic MAXIMUM-RISK red flag. Attempting to fake green becomes self-defeating.", color: "#3b82f6" },
                { title: "Absolute Outermost Layer Rendering", desc: "TrueFrame renders at the maximum z-index with full opacity. Any fake border underneath is completely covered. No conflicting hues. No viewer confusion.", color: "#ef4444" },
              ].map((d) => (
                <div key={d.title} className="p-4" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: `3px solid ${d.color}`, borderRadius: "4px" }}>
                  <h3 className="text-sm font-medium mb-1" style={{ color: "#e8edf5" }}>{d.title}</h3>
                  <p className="text-xs leading-[1.5]" style={{ color: "#7a8ba5" }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "technology":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>TECHNOLOGY</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              Ensemble Detection + Open Standard
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { title: "CNN Frame Analysis", desc: "GAN fingerprints, compression anomalies" },
                { title: "Temporal Consistency", desc: "Optical flow for unnatural motion" },
                { title: "Audio-Visual Sync", desc: "Cross-modal attention verification" },
                { title: "Metadata Provenance", desc: "File history and editing signatures" },
              ].map((t) => (
                <div key={t.title} className="p-3" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                  <p className="text-sm font-medium" style={{ color: "#e8edf5" }}>{t.title}</p>
                  <p className="text-xs" style={{ color: "#7a8ba5" }}>{t.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-[10px] px-3 py-1" style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "#10b981", borderRadius: "2px" }}>Target: 80%+ Accuracy</span>
              <span className="font-mono text-[10px] px-3 py-1" style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3b82f6", borderRadius: "2px" }}>&lt;5% False Positive</span>
              <span className="font-mono text-[10px] px-3 py-1" style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b", borderRadius: "2px" }}>Status: Prototype</span>
            </div>
          </div>
        );

      case "market":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>MARKET</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              The Infrastructure Opportunity
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "$13.7B", label: "Content moderation market by 2027" },
                { value: "5B+", label: "Daily video views, top 5 platforms" },
                { value: "$78B", label: "Annual disinformation damage" },
                { value: "Winner-Take-Most", label: "First open standard advantage" },
              ].map((m) => (
                <div key={m.label} className="p-5 text-center" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                  <p className="font-display text-3xl mb-1" style={{ color: "#e8edf5" }}>{m.value}</p>
                  <p className="text-xs" style={{ color: "#7a8ba5" }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "business-model":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>BUSINESS MODEL</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              Open Standard. Own the Rails.
            </h2>
            <div className="space-y-3">
              {[
                { title: "Platform Scoring API", desc: "$0.0001 per scored video call. Volume-tiered SaaS.", timeline: "Month 12", icon: Globe },
                { title: "Enterprise SDK License", desc: "$150K/year annual license for native player integration.", timeline: "Month 14", icon: Target },
                { title: "Verified Publisher Program", desc: "$5K/year certification for news orgs and creators.", timeline: "Month 10", icon: ShieldCheck },
                { title: "Premium Extension", desc: "Freemium — advanced analytics and alerts for $3/month.", timeline: "Month 6", icon: Zap },
                { title: "Government/NGO Contracts", desc: "Custom infrastructure for election integrity.", timeline: "Month 18", icon: TrendingUp },
              ].map((r) => (
                <div key={r.title} className="flex items-center gap-4 p-3" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                  <r.icon className="w-5 h-5 shrink-0" style={{ color: "#c8a45c" }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "#e8edf5" }}>{r.title}</p>
                    <p className="text-xs" style={{ color: "#7a8ba5" }}>{r.desc}</p>
                  </div>
                  <span className="font-mono text-[10px]" style={{ color: "#c8a45c" }}>{r.timeline}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "financials":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>FINANCIALS</p>
            <h2 className="text-[28px] font-light mb-4" style={{ color: "#e8edf5" }}>
              Three Scenarios. Bottom-Up.
            </h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "CONSERVATIVE", arr: "$890K", desc: "No platform deals", color: "#ef4444" },
                { label: "BASE CASE", arr: "$2.1M", desc: "1-2 mid-tier platforms", color: "#f59e0b" },
                { label: "OPTIMISTIC", arr: "$6.8M", desc: "YouTube/Meta integration", color: "#10b981" },
              ].map((s) => (
                <div key={s.label} className="p-3 text-center" style={{ backgroundColor: "#0d1320", border: `1px solid ${s.color}`, borderRadius: "4px" }}>
                  <p className="font-mono text-[9px] mb-1" style={{ color: s.color }}>{s.label}</p>
                  <p className="font-display text-2xl" style={{ color: "#e8edf5" }}>{s.arr}</p>
                  <p className="text-[10px]" style={{ color: "#7a8ba5" }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ height: "200px" }}>
              {scenarios && <Line data={chartData} options={chartOptions} />}
            </div>
          </div>
        );

      case "competition":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>COMPETITION</p>
            <h2 className="text-[28px] font-light mb-4" style={{ color: "#e8edf5" }}>
              Why TrueFrame Wins
            </h2>
            <div style={{ border: "1px solid #1e2d47", borderRadius: "4px", overflow: "hidden" }}>
              <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-3" style={{ backgroundColor: "#0d1320" }}>
                <span className="font-mono text-[9px]" style={{ color: "#7a8ba5" }}>APPROACH</span>
                <span className="font-mono text-[9px]" style={{ color: "#7a8ba5" }}>TRUEFRAME'S EDGE</span>
              </div>
              {[
                { approach: "Platform Moderation", edge: "Open, cross-platform, works everywhere — not just walled gardens" },
                { approach: "Standalone Detection Tools", edge: "Passive ambient delivery — zero user effort required" },
                { approach: "C2PA Provenance Alone", edge: "Complete fallback for non-C2PA content + accelerates adoption" },
                { approach: "Fact-Checking Orgs", edge: "Automated scale + ambient signal — no site visit required" },
              ].map((c) => (
                <div key={c.approach} className="grid grid-cols-[1.2fr_1fr] gap-3 p-3" style={{ borderTop: "1px solid #1e2d47" }}>
                  <span className="text-xs" style={{ color: "#e8edf5" }}>{c.approach}</span>
                  <span className="text-xs" style={{ color: "#10b981" }}>{c.edge}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "team":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>TEAM</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              Built to Scale
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-5 text-center" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                <Users className="w-8 h-8 mx-auto mb-3" style={{ color: "#4a5a73" }} />
                <p className="text-sm font-medium" style={{ color: "#e8edf5" }}>Michael Camelio</p>
                <p className="text-xs" style={{ color: "#7a8ba5" }}>Founder & CEO</p>
              </div>
              <div className="p-5" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                <p className="text-xs font-medium mb-2" style={{ color: "#e8edf5" }}>Planned Hires (Month 1-3)</p>
                <div className="space-y-1.5">
                  {["AI/ML Detection Engineer — $180K", "Full-Stack Engineer — $160K", "Head of Standards — $140K"].map((h) => (
                    <p key={h} className="text-xs flex items-center gap-2" style={{ color: "#7a8ba5" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c8a45c" }} />
                      {h}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-3" style={{ backgroundColor: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "4px" }}>
              <p className="text-xs" style={{ color: "#f59e0b" }}>
                Advisor network in formation — targeting former Adobe Content Authenticity Initiative,
                WITNESS, and major platform trust & safety executives.
              </p>
            </div>
          </div>
        );

      case "roadmap":
        return (
          <div className="h-full">
            <p className="font-mono text-[10px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>ROADMAP</p>
            <h2 className="text-[28px] font-light mb-6" style={{ color: "#e8edf5" }}>
              Path to Universal Adoption
            </h2>
            <div className="space-y-3">
              {[
                { phase: "Phase 1", time: "M1-6", desc: "Browser extension beta, 50K installs", color: "#3b82f6" },
                { phase: "Phase 2", time: "M6-12", desc: "Publisher SDK, verified publisher program", color: "#10b981" },
                { phase: "Phase 3", time: "M12-18", desc: "Mid-tier platforms, API revenue live", color: "#f59e0b" },
                { phase: "Phase 4", time: "M18-36", desc: "YouTube, TikTok, Meta adoption", color: "#c8a45c" },
                { phase: "Phase 5", time: "Year 3+", desc: "Universal standard — every video has a glow", color: "#10b981" },
              ].map((p) => (
                <div key={p.phase} className="flex items-center gap-4 p-3" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: `3px solid ${p.color}`, borderRadius: "4px" }}>
                  <span className="font-mono text-[10px] shrink-0" style={{ color: p.color }}>{p.time}</span>
                  <div>
                    <p className="text-xs font-medium" style={{ color: "#e8edf5" }}>{p.phase}</p>
                    <p className="text-xs" style={{ color: "#7a8ba5" }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "ask":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <BarChart3 className="w-12 h-12 mb-6" style={{ color: "#c8a45c" }} />
            <h2 className="font-display text-[36px] mb-4" style={{ color: "#e8edf5" }}>
              The Ask
            </h2>
            <p className="font-display text-5xl mb-2" style={{ color: "#c8a45c" }}>$2,500,000</p>
            <p className="text-sm mb-8" style={{ color: "#7a8ba5" }}>Seed Round — 18-Month Runway</p>
            <div className="grid grid-cols-2 gap-4 mb-8 text-left max-w-md">
              {[
                { label: "Team (3 hires + founder)", value: "$865K" },
                { label: "Infrastructure & Compute", value: "$200K" },
                { label: "Legal, IP, Standards", value: "$150K" },
                { label: "Marketing & Partnerships", value: "$120K" },
                { label: "Buffer (20%)", value: "$500K" },
                { label: "Working Capital Reserve", value: "$665K" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span style={{ color: "#7a8ba5" }}>{item.label}</span>
                  <span className="font-mono" style={{ color: "#e8edf5" }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Link
                to="/founding-document"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.04em]"
                style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
              >
                Read the Founding Charter
              </Link>
              <Link
                to="/use-of-funds"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.04em] border"
                style={{ color: "#e8edf5", borderColor: "#2a3f63", borderRadius: "2px" }}
              >
                Detailed Financials
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />
      <div className="pt-20 pb-8 px-4 max-w-[1000px] mx-auto">
        {/* Slide Container */}
        <div
          className="relative mb-6"
          style={{
            backgroundColor: "#0d1320",
            border: "1px solid #1e2d47",
            borderRadius: "4px",
            minHeight: "520px",
            padding: "48px",
          }}
        >
          {renderSlide()}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium disabled:opacity-30 transition-colors"
            style={{ color: "#e8edf5" }}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="w-2 h-2 rounded-full transition-colors"
                style={{
                  backgroundColor: i === currentSlide ? "#c8a45c" : "#1e2d47",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium disabled:opacity-30 transition-colors"
            style={{ color: "#e8edf5" }}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center mt-3 font-mono text-[10px]" style={{ color: "#4a5a73" }}>
          {currentSlide + 1} / {slides.length} — {slides[currentSlide].replace(/-/g, " ").toUpperCase()}
        </p>
      </div>
      <Footer />
    </div>
  );
}
