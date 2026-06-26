import { useState } from "react";
import { Link } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AmbientSignalCanvas from "@/components/AmbientSignalCanvas";
import { Brain, Lock, ShieldCheck, ChevronRight, Eye, Zap, XCircle } from "lucide-react";

export default function Landing() {
  const [activeDemo, setActiveDemo] = useState<"verified" | "uncertain" | "synthetic">("verified");

  const demoConfigs = {
    verified: { score: 87, color: "#10b981", label: "VERIFIED AUTHENTIC", desc: "No AI. No modification. No Photoshop. Cryptographically verified authentic.", gradient: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)" },
    uncertain: { score: 52, color: "#f59e0b", label: "UNCERTAIN", desc: "Mixed signals. C2PA metadata absent. Recommend manual review.", gradient: "#f59e0b" },
    synthetic: { score: 23, color: "#ef4444", label: "LIKELY SYNTHETIC", desc: "Strong AI detection. Temporal inconsistencies found. Treat as potentially fabricated.", gradient: "#ef4444" },
  };

  const active = demoConfigs[activeDemo];

  return (
    <div style={{ backgroundColor: "#060a12" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <AmbientSignalCanvas />
        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6" style={{ paddingTop: "30vh" }}>
          <p className="font-mono text-[11px] tracking-[0.15em] mb-6" style={{ color: "#7a8ba5" }}>
            UNIVERSAL OPEN STANDARD FOR VIDEO AUTHENTICITY
          </p>
          <h1 className="font-display text-[clamp(48px,6vw,96px)] font-normal leading-[1.1] mb-6" style={{ color: "#e8edf5" }}>
            The FICO Score<br />of Video Truth
          </h1>
          <p className="text-lg font-light mb-4 max-w-[560px] leading-relaxed" style={{ color: "#7a8ba5" }}>
            Every public video gets an ambient colored glow. <strong style={{ color: "#e8edf5" }}>Blue-green</strong> means
            verified authentic — no AI, no modification, no Photoshop. <strong style={{ color: "#ef4444" }}>Red</strong> means
            likely synthetic. Zero effort. Zero cognitive steps. Like a traffic light for video truth.
          </p>
          <div className="flex gap-4 flex-wrap mb-12">
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-9 py-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200" style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d4b76a")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c8a45c")}>
              Try the Demo <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/pitch-deck" className="inline-flex items-center gap-2 px-9 py-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] border transition-colors duration-200" style={{ color: "#e8edf5", borderColor: "#2a3f63", borderRadius: "2px" }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c8a45c")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a3f63")}>
              View Pitch Deck
            </Link>
          </div>

          {/* Color Legend Inline */}
          <div className="flex gap-4 flex-wrap">
            {[
              { gradient: "linear-gradient(135deg, #3b82f6, #10b981)", label: "Authentic — No AI", desc: "Score 70-100" },
              { bg: "#f59e0b", label: "Uncertain", desc: "Score 40-69" },
              { bg: "#ef4444", label: "Synthetic", desc: "Score 0-39" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-sm shrink-0" style={{ background: c.gradient || c.bg }} />
                <div>
                  <span className="text-xs font-medium" style={{ color: "#e8edf5" }}>{c.label}</span>
                  <span className="text-xs ml-2" style={{ color: "#4a5a73" }}>{c.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZERO EFFORT SECTION — The Core Insight */}
      <section className="py-[100px]" style={{ backgroundColor: "#0d1320" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-[11px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>THE KILLER INSIGHT</p>
            <h2 className="text-[clamp(28px,3vw,44px)] font-light mb-4" style={{ color: "#e8edf5" }}>
              Why Banners Fail and the Glow Wins
            </h2>
            <p className="text-[15px] max-w-[640px] mx-auto" style={{ color: "#7a8ba5" }}>
              Every existing authenticity warning requires the viewer to perform conscious cognitive steps.
              TrueFrame requires <strong style={{ color: "#10b981" }}>zero steps</strong>. Here's the math:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Banner Warning — 5 Steps */}
            <div className="p-8" style={{ backgroundColor: "#060a12", border: "1px solid #ef4444", borderRadius: "4px" }}>
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
                <h3 className="text-lg font-medium" style={{ color: "#ef4444" }}>Banner Warning: 5 Cognitive Steps</h3>
              </div>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Move eyes from video to banner (saccade + focus shift)", time: "200ms" },
                  { step: "2", text: "Read warning: 'This video is 98% AI-generated' (text processing)", time: "400ms" },
                  { step: "3", text: "Process what '98% AI-generated' means (comprehension)", time: "600ms" },
                  { step: "4", text: "Decide whether to keep watching (judgment)", time: "300ms" },
                  { step: "5", text: "Return eye focus to video content (re-focus)", time: "200ms" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3 p-3" style={{ backgroundColor: "#0d1320", borderRadius: "4px" }}>
                    <span className="font-mono text-sm shrink-0" style={{ color: "#ef4444" }}>{s.step}</span>
                    <div className="flex-1">
                      <p className="text-xs" style={{ color: "#7a8ba5" }}>{s.text}</p>
                    </div>
                    <span className="font-mono text-[10px] shrink-0" style={{ color: "#4a5a73" }}>{s.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 text-center" style={{ backgroundColor: "rgba(239,68,68,0.1)", borderRadius: "4px" }}>
                <p className="font-mono text-lg" style={{ color: "#ef4444" }}>1,700ms total cognitive cost</p>
                <p className="text-xs mt-1" style={{ color: "#7a8ba5" }}>Result: Banner blindness within days. Complete signal abandonment.</p>
              </div>
            </div>

            {/* Ambient Glow — 0 Steps */}
            <div className="p-8" style={{ backgroundColor: "#060a12", border: "1px solid #10b981", borderRadius: "4px" }}>
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5" style={{ color: "#10b981" }} />
                <h3 className="text-lg font-medium" style={{ color: "#10b981" }}>Ambient Glow: 0 Cognitive Steps</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Eye, text: "Peripheral vision processes the border color without conscious attention", highlight: "No eye movement required" },
                  { icon: Zap, text: "The human brain interprets color meaning pre-consciously — like a traffic light", highlight: "No reading required" },
                  { icon: ShieldCheck, text: "The viewer simply KNOWS the authenticity status while continuing to watch", highlight: "No processing required" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3" style={{ backgroundColor: "#0d1320", borderRadius: "4px" }}>
                    <item.icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#10b981" }} />
                    <div>
                      <p className="text-xs" style={{ color: "#7a8ba5" }}>{item.text}</p>
                      <p className="text-xs font-medium mt-1" style={{ color: "#10b981" }}>{item.highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 text-center" style={{ backgroundColor: "rgba(16,185,129,0.1)", borderRadius: "4px" }}>
                <p className="font-mono text-lg" style={{ color: "#10b981" }}>0ms cognitive cost</p>
                <p className="text-xs mt-1" style={{ color: "#7a8ba5" }}>Result: Persistent, effortless, universal signal. No blindness possible.</p>
              </div>
            </div>
          </div>

          {/* The Key Quote */}
          <div className="mt-12 p-8 text-center" style={{ backgroundColor: "#060a12", border: "1px solid #2a3f63", borderRadius: "4px" }}>
            <p className="font-display text-xl leading-[1.5] max-w-[700px] mx-auto" style={{ color: "#e8edf5" }}>
              "A banner says 'WARNING: 98% AI-GENERATED' and requires five conscious steps.
              A glow just <em style={{ color: "#c8a45c" }}>is</em> red — and the viewer knows instantly,
              without ever looking away from the video."
            </p>
            <p className="font-mono text-xs mt-4" style={{ color: "#4a5a73" }}>
              — The TrueFrame Founding Principle
            </p>
          </div>
        </div>
      </section>

      {/* COLOR LEGEND SECTION */}
      <section className="py-[100px]" style={{ backgroundColor: "#060a12" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-[11px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>THE COLOR LEGEND</p>
            <h2 className="text-[clamp(28px,3vw,44px)] font-light mb-4" style={{ color: "#e8edf5" }}>
              Three Colors. Universal Meaning.
            </h2>
            <p className="text-[15px] max-w-[600px] mx-auto" style={{ color: "#7a8ba5" }}>
              Every video on every platform displays a TrueFrame ambient border.
              No text. No icons. No reading required. Just color.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {/* Blue-Green */}
            <div className="flex items-start gap-6 p-6" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: "4px solid #10b981", borderRadius: "4px" }}>
              <div className="w-20 h-20 shrink-0 rounded" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)" }} />
              <div>
                <h3 className="text-lg font-medium mb-2" style={{ color: "#10b981" }}>
                  Blue-Green Glow = Verified Authentic (Score 70-100)
                </h3>
                <p className="text-sm leading-[1.7] mb-2" style={{ color: "#e8edf5" }}>
                  <strong>No AI generation detected. No modification found. No Photoshop manipulation.
                  No synthetic alteration of any kind.</strong>
                </p>
                <p className="text-sm leading-[1.6]" style={{ color: "#7a8ba5" }}>
                  The video is cryptographically verified authentic through C2PA provenance (Adobe,
                  Microsoft, Google, BBC coalition), or scored as highly authentic through the ensemble
                  detection model with strong publisher attestation. This is the green light — watch
                  with full confidence. Share without hesitation.
                </p>
              </div>
            </div>

            {/* Amber */}
            <div className="flex items-start gap-6 p-6" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: "4px solid #f59e0b", borderRadius: "4px" }}>
              <div className="w-20 h-20 shrink-0 rounded" style={{ backgroundColor: "#f59e0b" }} />
              <div>
                <h3 className="text-lg font-medium mb-2" style={{ color: "#f59e0b" }}>
                  Amber Glow = Uncertain / Mixed Signals (Score 40-69)
                </h3>
                <p className="text-sm leading-[1.7]" style={{ color: "#7a8ba5" }}>
                  Some indicators suggest possible modification or AI involvement, but the evidence
                  is not conclusive. C2PA provenance may be missing. Detection confidence is moderate.
                  The viewer should exercise mild skepticism. Clicking the glow reveals a detailed
                  breakdown of which signals triggered the uncertainty and why.
                </p>
              </div>
            </div>

            {/* Red */}
            <div className="flex items-start gap-6 p-6" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: "4px solid #ef4444", borderRadius: "4px" }}>
              <div className="w-20 h-20 shrink-0 rounded" style={{ backgroundColor: "#ef4444" }} />
              <div>
                <h3 className="text-lg font-medium mb-2" style={{ color: "#ef4444" }}>
                  Red Glow = Likely AI-Generated / Synthetic (Score 0-39)
                </h3>
                <p className="text-sm leading-[1.7] mb-2" style={{ color: "#e8edf5" }}>
                  <strong>High probability of AI-generated or synthetically manipulated content.</strong>
                </p>
                <p className="text-sm leading-[1.6]" style={{ color: "#7a8ba5" }}>
                  The ensemble detection model has identified one or more synthetic markers: GAN
                  fingerprints in video frames, temporal inconsistencies in motion, audio-visual sync
                  anomalies, or face reenactment signatures. The viewer should treat this content as
                  potentially fabricated. Major news organizations should flag before republication.
                  Social platforms may choose to add a label overlay in addition to the glow.
                </p>
              </div>
            </div>
          </div>

          {/* Score Demo */}
          <h3 className="text-xl font-light text-center mb-8" style={{ color: "#e8edf5" }}>
            See the Signal in Action
          </h3>
          <div className="max-w-[800px] mx-auto mb-8">
            <div className="relative overflow-hidden transition-all duration-300" style={{ backgroundColor: "#060a12", border: `3px solid ${active.color}`, borderRadius: "4px", aspectRatio: "16/9" }}>
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0d1320 0%, #141e33 50%, #0d1320 100%)" }}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ border: `2px solid ${active.color}` }}>
                    <div className="w-0 h-0 ml-1" style={{ borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: `16px solid ${active.color}` }} />
                  </div>
                  <p className="font-mono text-xs" style={{ color: "#4a5a73" }}>SAMPLE VIDEO</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-5 py-3" style={{ backgroundColor: "rgba(6, 10, 18, 0.9)", borderBottomLeftRadius: "4px" }}>
                <p className="font-mono text-[10px] mb-1" style={{ color: "#7a8ba5" }}>TRUEFRAME SCORE</p>
                <p className="font-mono text-3xl font-medium transition-colors duration-300" style={{ color: active.color }}>{active.score}</p>
                <p className="text-[11px] font-medium mt-1 transition-colors duration-300" style={{ color: active.color }}>{active.label}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {(["verified", "uncertain", "synthetic"] as const).map((key) => {
              const config = demoConfigs[key];
              return (
                <button key={key} onClick={() => setActiveDemo(key)} className="px-6 py-2.5 font-mono text-xs transition-all duration-200" style={{ border: `1px solid ${config.color}`, color: config.color, backgroundColor: activeDemo === key ? `${config.color}15` : "transparent", borderRadius: "2px" }}>
                  {config.label} ({config.score})
                </button>
              );
            })}
          </div>
          <p className="text-center text-[13px] mt-6 max-w-md mx-auto" style={{ color: "#7a8ba5" }}>{active.desc}</p>
        </div>
      </section>

      {/* ALWAYS ON TOP — Anti-Spoofing */}
      <section className="py-[100px]" style={{ backgroundColor: "#0d1320" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-[11px] tracking-[0.15em] mb-4" style={{ color: "#ef4444" }}>SECURITY</p>
            <h2 className="text-[clamp(28px,3vw,44px)] font-light mb-4" style={{ color: "#e8edf5" }}>
              The Always-On-Top Doctrine
            </h2>
            <p className="text-[15px] max-w-[640px] mx-auto" style={{ color: "#7a8ba5" }}>
              Bad actors will try to inject fake green borders into their synthetic videos.
              We solved this before they could exploit it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "The Signal Never Lives in the Video",
                body: "The glow is NEVER part of the video file. It is NEVER embedded. It exists ONLY as an externally injected layer rendered by TrueFrame's browser extension or platform SDK. Content creators have zero access and zero ability to manipulate the signal.",
                color: "#3b82f6",
              },
              {
                title: "Pre-Score Border Detection",
                body: "Before any video receives a TrueFrame Score, the system runs a mandatory check on frame edges. If ANY pre-existing colored border is detected, the video receives an automatic MAXIMUM-RISK red flag. This flag is permanent and cannot be overridden. Faking green becomes self-defeating.",
                color: "#ef4444",
              },
              {
                title: "Always the Outermost Layer",
                body: "TrueFrame renders its border at the absolute maximum z-index with full opacity. If a bad actor's fake green border is detected underneath, TrueFrame renders RED on top. The viewer sees only TrueFrame's signal. No conflicting hues. No spoofing possible.",
                color: "#10b981",
              },
            ].map((card) => (
              <div key={card.title} className="p-6" style={{ backgroundColor: "#060a12", border: "1px solid #1e2d47", borderTop: `3px solid ${card.color}`, borderRadius: "4px" }}>
                <h3 className="text-base font-medium mb-3" style={{ color: card.color }}>{card.title}</h3>
                <p className="text-[13px] leading-[1.6]" style={{ color: "#7a8ba5" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-Layer Trust Engine */}
      <section className="py-[100px]" style={{ backgroundColor: "#060a12" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(28px,3vw,40px)] font-light mb-4" style={{ color: "#e8edf5" }}>Three-Layer Trust Engine</h2>
            <p className="text-[15px] max-w-[600px] mx-auto" style={{ color: "#7a8ba5" }}>
              Every video is analyzed across three independent signals, weighted and combined into a single 0-100 authenticity score.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { layer: "LAYER 1", icon: Brain, title: "AI Detection Analysis", weight: "40%", color: "#3b82f6", desc: "Proprietary ensemble model analyzes video for synthetic artifacts: GAN fingerprints, temporal inconsistencies, audio-visual sync anomalies, face reenactment signatures, and metadata irregularities." },
              { layer: "LAYER 2", icon: Lock, title: "Cryptographic Provenance", weight: "45%", color: "#10b981", desc: "Content Credentials aligned with the C2PA open standard — backed by Adobe, Microsoft, Google, Nikon, and the BBC. Verified provenance = strong green signal. Missing = neutral. Stripped = negative." },
              { layer: "LAYER 3", icon: ShieldCheck, title: "Publisher Attestations", weight: "15%", color: "#c8a45c", desc: "Credentialed media organizations submit time-stamped attestations. Weight rules are published in the open standard. Governance is council-based with stake-weighted voting to prevent capture." },
            ].map((card) => (
              <div key={card.title} className="p-8 transition-colors duration-300 hover:border-[#2a3f63]" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                <p className="font-mono text-[10px] tracking-[0.1em] mb-4" style={{ color: "#4a5a73" }}>{card.layer}</p>
                <card.icon className="w-8 h-8 mb-4" style={{ color: card.color }} />
                <h3 className="text-xl font-medium mb-3" style={{ color: "#e8edf5" }}>{card.title}</h3>
                <p className="text-[13px] leading-[1.6] mb-5" style={{ color: "#7a8ba5" }}>{card.desc}</p>
                <span className="inline-block font-mono text-[11px] px-3 py-1.5" style={{ backgroundColor: "#141e33", color: card.color, borderRadius: "2px" }}>{card.weight} WEIGHT</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ backgroundColor: "#0d1320" }}>
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(24px,3vw,36px)] font-light mb-6" style={{ color: "#e8edf5" }}>
            Ready to Restore Trust in Video?
          </h2>
          <p className="text-[15px] mb-10" style={{ color: "#7a8ba5" }}>
            TrueFrame is the open standard the internet needs. Upload a video to see the scoring system
            in action, read the founding charter, or view the full investor pitch deck.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-9 py-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200" style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d4b76a")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c8a45c")}>
              Analyze a Video <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/founding-document" className="inline-flex items-center gap-2 px-9 py-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] border transition-colors duration-200" style={{ color: "#e8edf5", borderColor: "#2a3f63", borderRadius: "2px" }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c8a45c")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a3f63")}>
              Read Founding Charter
            </Link>
            <Link to="/pitch-deck" className="inline-flex items-center gap-2 px-9 py-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] border transition-colors duration-200" style={{ color: "#e8edf5", borderColor: "#2a3f63", borderRadius: "2px" }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c8a45c")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a3f63")}>
              View Pitch Deck
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
