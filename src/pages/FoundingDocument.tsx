import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router";
import { ShieldCheck, Eye, Zap, Globe, Lock, Users, ChevronRight } from "lucide-react";

export default function FoundingDocument() {
  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[900px] mx-auto">
        {/* Document Header */}
        <div className="text-center mb-16 pb-8" style={{ borderBottom: "2px solid #c8a45c" }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="w-6 h-6" style={{ color: "#c8a45c" }} />
            <span className="text-sm font-medium tracking-[0.08em] uppercase" style={{ color: "#c8a45c" }}>
              TrueFrame
            </span>
          </div>
          <h1 className="font-display text-[clamp(32px,4vw,48px)] font-normal mb-4" style={{ color: "#e8edf5" }}>
            Founding Charter
          </h1>
          <p className="text-lg mb-2" style={{ color: "#7a8ba5" }}>
            The Universal Open Standard for Video Authenticity
          </p>
          <p className="font-mono text-xs" style={{ color: "#4a5a73" }}>
            Document Version 1.0 &mdash; June 2026 &mdash; TrueFrame Foundation
          </p>
        </div>

        {/* Preamble */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2" style={{ color: "#e8edf5" }}>
            <div className="w-1 h-6" style={{ backgroundColor: "#c8a45c" }} />
            Preamble
          </h2>
          <div className="space-y-4 text-[15px] leading-[1.8]" style={{ color: "#7a8ba5" }}>
            <p>
              <strong style={{ color: "#e8edf5" }}>Whereas</strong> AI-generated video crossed the indistinguishability
              threshold in early 2025, rendering human visual judgment insufficient for determining content authenticity;
            </p>
            <p>
              <strong style={{ color: "#e8edf5" }}>Whereas</strong> existing solutions — platform moderation, standalone
              detection tools, C2PA provenance, and fact-checking — all fail at the critical last-mile problem of
              consumer adoption because they require active cognitive effort from the viewer;
            </p>
            <p>
              <strong style={{ color: "#e8edf5" }}>Whereas</strong> the only viable solution is an ambient, passive signal
              that operates in peripheral vision with zero cognitive overhead, like a traffic light for video truth;
            </p>
            <p>
              <strong style={{ color: "#e8edf5" }}>Whereas</strong> an open standard, transparently governed and freely
              adoptable by all platforms, is the only path to universal coverage and public trust;
            </p>
            <p className="pl-4" style={{ borderLeft: "2px solid #c8a45c" }}>
              <strong style={{ color: "#e8edf5" }}>
                We establish TrueFrame as the Universal Open Standard for Video Authenticity — a protocol,
                scoring infrastructure, and ambient signal system designed to restore trust in every video
                viewed by every person on every platform.
              </strong>
            </p>
          </div>
        </section>

        {/* Article I: The Ambient Signal */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2" style={{ color: "#e8edf5" }}>
            <Eye className="w-5 h-5" style={{ color: "#c8a45c" }} />
            Article I: The Ambient Signal — Zero-Effort by Design
          </h2>

          <div className="p-6 mb-6" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
            <h3 className="text-base font-medium mb-4" style={{ color: "#e8edf5" }}>
              The Five-Step Problem That Kills Every Other Solution
            </h3>
            <p className="text-sm leading-[1.7] mb-4" style={{ color: "#7a8ba5" }}>
              Every existing approach to video authenticity notification requires the viewer to perform
              a sequence of conscious cognitive steps. Consider a typical "AI Warning" banner at the bottom
              of a video:
            </p>
            <ol className="space-y-2 mb-4">
              {[
                "Move eyes from video content down to the banner area (saccade + focus shift)",
                "Read the warning text: \"This video is 98% AI-generated and probably not real\" (cognitive processing)",
                "Process the information — understand what \"98% AI-generated\" means for trustworthiness (evaluation)",
                "Make a judgment decision about whether to continue watching (decision)",
                "Return eye focus to the video content (saccade + re-focus)",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: "#7a8ba5" }}>
                  <span className="font-mono text-xs shrink-0 mt-0.5" style={{ color: "#ef4444" }}>
                    STEP {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="text-sm font-medium" style={{ color: "#ef4444" }}>
              Total cognitive cost: 5+ distinct mental operations. Result: Viewer fatigue, banner blindness,
              and complete abandonment of the authenticity signal within days of exposure.
            </p>
          </div>

          <div className="p-6 mb-6" style={{ backgroundColor: "#0d1320", border: "1px solid #10b981", borderRadius: "4px" }}>
            <h3 className="text-base font-medium mb-4" style={{ color: "#10b981" }}>
              The TrueFrame Solution: Zero Steps. Zero Effort. Peripheral Vision.
            </h3>
            <p className="text-sm leading-[1.7] mb-4" style={{ color: "#7a8ba5" }}>
              TrueFrame replaces the five-step banner process with a single ambient colored glow around
              the edge of every video frame. The human visual system processes color in peripheral vision
              <em> without conscious attention</em>. The viewer never stops watching the video. They never
              read a label. They simply <em>know</em> — the same way they know a traffic light is red
              without reading the word "STOP."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 text-center" style={{ backgroundColor: "#060a12", borderRadius: "4px" }}>
                <p className="font-mono text-3xl mb-2" style={{ color: "#ef4444" }}>5+</p>
                <p className="text-xs" style={{ color: "#7a8ba5" }}>Cognitive steps for banner warnings</p>
              </div>
              <div className="p-4 text-center" style={{ backgroundColor: "#060a12", borderRadius: "4px", border: "1px solid #10b981" }}>
                <p className="font-mono text-3xl mb-2" style={{ color: "#10b981" }}>0</p>
                <p className="text-xs" style={{ color: "#7a8ba5" }}>Cognitive steps for ambient glow</p>
              </div>
            </div>
          </div>
        </section>

        {/* Article II: Color Legend */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2" style={{ color: "#e8edf5" }}>
            <Zap className="w-5 h-5" style={{ color: "#c8a45c" }} />
            Article II: The TrueFrame Color Legend
          </h2>
          <p className="text-sm mb-6" style={{ color: "#7a8ba5" }}>
            Every video viewed through any TrueFrame-enabled platform or browser shall display a colored
            ambient border. The color is determined by the TrueFrame Score (0-100) and communicates
            authenticity status without text, icons, or any element requiring conscious reading.
          </p>

          <div className="space-y-4">
            {/* Authentic */}
            <div className="flex items-start gap-5 p-5" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: "4px solid #10b981", borderRadius: "4px" }}>
              <div className="w-16 h-16 shrink-0 rounded" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)" }} />
              <div>
                <h3 className="text-base font-medium mb-1" style={{ color: "#10b981" }}>
                  Blue-Green Glow — Verified Authentic (Score 70-100)
                </h3>
                <p className="text-sm leading-[1.6]" style={{ color: "#7a8ba5" }}>
                  <strong style={{ color: "#e8edf5" }}>No AI generation detected. No modification found.
                  No Photoshop manipulation. No synthetic alteration of any kind.</strong> The video is
                  cryptographically verified authentic through C2PA provenance, or scored as highly
                  authentic through the ensemble detection model with strong publisher attestation.
                  This is the green light — watch with confidence.
                </p>
              </div>
            </div>

            {/* Uncertain */}
            <div className="flex items-start gap-5 p-5" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: "4px solid #f59e0b", borderRadius: "4px" }}>
              <div className="w-16 h-16 shrink-0 rounded" style={{ backgroundColor: "#f59e0b" }} />
              <div>
                <h3 className="text-base font-medium mb-1" style={{ color: "#f59e0b" }}>
                  Amber Glow — Uncertain / Mixed Signals (Score 40-69)
                </h3>
                <p className="text-sm leading-[1.6]" style={{ color: "#7a8ba5" }}>
                  Some indicators of possible modification or AI involvement, but not conclusive.
                  C2PA provenance may be missing. Detection confidence is moderate. The viewer should
                  exercise mild skepticism. Clicking the glow reveals a detailed breakdown of which
                  signals triggered the uncertainty.
                </p>
              </div>
            </div>

            {/* Synthetic */}
            <div className="flex items-start gap-5 p-5" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: "4px solid #ef4444", borderRadius: "4px" }}>
              <div className="w-16 h-16 shrink-0 rounded" style={{ backgroundColor: "#ef4444" }} />
              <div>
                <h3 className="text-base font-medium mb-1" style={{ color: "#ef4444" }}>
                  Red Glow — Likely AI-Generated / Synthetic (Score 0-39)
                </h3>
                <p className="text-sm leading-[1.6]" style={{ color: "#7a8ba5" }}>
                  <strong style={{ color: "#e8edf5" }}>High probability of AI-generated or synthetically
                  manipulated content.</strong> The ensemble detection model has identified GAN fingerprints,
                  temporal inconsistencies, audio-visual sync anomalies, or other synthetic markers. The
                  viewer should treat this content as potentially fabricated. Major news organizations
                  should flag this content for review before republication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article III: Always On Top */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2" style={{ color: "#e8edf5" }}>
            <Lock className="w-5 h-5" style={{ color: "#ef4444" }} />
            Article III: The Always-On-Top Doctrine — Anti-Spoofing Architecture
          </h2>

          <div className="p-6 mb-6" style={{ backgroundColor: "#0d1320", border: "1px solid #ef4444", borderRadius: "4px" }}>
            <h3 className="text-base font-medium mb-3" style={{ color: "#ef4444" }}>
              The Attack: Bad Actors Injecting Fake Green Borders
            </h3>
            <p className="text-sm leading-[1.7]" style={{ color: "#7a8ba5" }}>
              A bad actor creates an AI-generated deepfake video and <em>embeds a green border directly
              into the video file</em> before uploading. An unsophisticated viewer sees the green border
              and assumes the content is verified authentic. <strong style={{ color: "#e8edf5" }}>This is
              the single most critical attack vector in any video authenticity system.</strong> If the
              signal can be faked, the entire standard collapses — worse, it becomes a weapon for deception.
            </p>
          </div>

          <div className="p-6" style={{ backgroundColor: "#0d1320", border: "1px solid #10b981", borderRadius: "4px" }}>
            <h3 className="text-base font-medium mb-4" style={{ color: "#10b981" }}>
              The Solution: Three-Layer Anti-Spoofing Defense
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "The Signal Never Lives in the Video",
                  body: "The TrueFrame glow is NEVER part of the video file. It is NEVER embedded in the content. It is NEVER something a content creator can add, edit, or control. The glow exists ONLY as a layer injected externally by TrueFrame's system — rendered by the browser extension or platform SDK — based on a real-time score query that the video creator has zero access to and zero ability to manipulate.",
                },
                {
                  title: "Pre-Score Border Detection (The Self-Defeating Trap)",
                  body: "Before any video receives a TrueFrame Score, the system runs a mandatory pre-scoring check on the video frame edges. If ANY pre-existing colored border is detected — regardless of color — the video receives an automatic MAXIMUM-RISK red flag. This flag is permanent and cannot be overridden. Attempting to fake a green border becomes self-defeating: the very act of embedding a colored edge triggers the red signal.",
                },
                {
                  title: "Always Rendered as the Absolute Outermost Layer",
                  body: "TrueFrame's injected border is always rendered as the absolute outermost visual layer with sufficient width and opacity to fully replace and cover any edge region of the video frame. If a bad actor's fake green border is detected underneath, TrueFrame renders a RED border on top of it at z-index maximum. The viewer sees only TrueFrame's signal — never the fake. There is no scenario where conflicting hues coexist.",
                },
              ].map((defense, i) => (
                <div key={i} className="pl-4" style={{ borderLeft: "2px solid #10b981" }}>
                  <p className="text-sm font-medium mb-1" style={{ color: "#e8edf5" }}>
                    {i + 1}. {defense.title}
                  </p>
                  <p className="text-sm leading-[1.6]" style={{ color: "#7a8ba5" }}>
                    {defense.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Article IV: Open Standard Governance */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2" style={{ color: "#e8edf5" }}>
            <Globe className="w-5 h-5" style={{ color: "#3b82f6" }} />
            Article IV: Open Standard Governance
          </h2>
          <div className="space-y-4 text-sm leading-[1.7]" style={{ color: "#7a8ba5" }}>
            <p>
              TrueFrame is an <strong style={{ color: "#e8edf5" }}>open standard</strong>. The scoring
              algorithm, weight rules, API specification, and governance procedures are published and
              freely available. Any platform — YouTube, TikTok, Meta, X, news organizations, independent
              publishers — may integrate the TrueFrame SDK at no cost.
            </p>
            <p>
              Revenue is generated through premium services built <em>on top</em> of the open standard:
              enterprise analytics, advanced detection models, verified publisher certification, and
              government compliance infrastructure. This is the FICO playbook. The SSL certificate
              playbook. The credit rating playbook. Open enough to become universal. Proprietary enough
              to generate durable revenue.
            </p>
            <p>
              The TrueFrame Governance Council comprises representatives from journalism (40%), academia
              (25%), civil society (20%), and platform trust & safety teams (15%). No single entity or
              coalition can capture the standard. All attestation decisions, weight changes, and rule
              modifications are published on a public ledger with transparent appeals.
            </p>
          </div>
        </section>

        {/* Article V: Platform Adoption */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2" style={{ color: "#e8edf5" }}>
            <Users className="w-5 h-5" style={{ color: "#c8a45c" }} />
            Article V: Platform Adoption Roadmap
          </h2>
          <p className="text-sm mb-6" style={{ color: "#7a8ba5" }}>
            TrueFrame is designed for phased adoption across the video ecosystem. The browser extension
            creates consumer demand; platform SDK integration fulfills that demand at scale.
          </p>

          <div className="space-y-4">
            {[
              {
                phase: "Phase 1: Browser Extension (Months 1-6)",
                desc: "Chrome/Firefox/Safari extension renders the ambient glow on all HTML5 video elements. Creates consumer awareness and demand. Targets 50,000 installs by Month 6.",
                color: "#3b82f6",
              },
              {
                phase: "Phase 2: Publisher SDK (Months 6-12)",
                desc: "News organizations (Reuters, BBC, AP, The Guardian) integrate the TrueFrame Player SDK to display scores on their video content. Verified Publisher Program launches.",
                color: "#10b981",
              },
              {
                phase: "Phase 3: Mid-Tier Platforms (Months 12-18)",
                desc: "Dailymotion, Vimeo, Twitch, Substack, and Medium integrate the TrueFrame Scoring API. Platform Scoring API revenue goes live at $0.0001 per scored video.",
                color: "#f59e0b",
              },
              {
                phase: "Phase 4: Major Platforms (Months 18-36)",
                desc: "YouTube, TikTok, Meta, Instagram, and X adopt TrueFrame as the industry-standard authenticity signal. Regulatory pressure (EU AI Act, US deepfake legislation) accelerates adoption.",
                color: "#c8a45c",
              },
              {
                phase: "Phase 5: Universal Standard (Year 3+)",
                desc: "Every public video on the internet displays a TrueFrame ambient glow. Red for synthetic. Blue-green for authentic. Zero effort. Universal trust restored.",
                color: "#10b981",
              },
            ].map((phase) => (
              <div
                key={phase.phase}
                className="p-5"
                style={{
                  backgroundColor: "#0d1320",
                  border: "1px solid #1e2d47",
                  borderLeft: `3px solid ${phase.color}`,
                  borderRadius: "4px",
                }}
              >
                <h3 className="text-sm font-medium mb-2" style={{ color: phase.color }}>
                  {phase.phase}
                </h3>
                <p className="text-sm leading-[1.6]" style={{ color: "#7a8ba5" }}>
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Signatories */}
        <section className="mb-16 p-8 text-center" style={{ backgroundColor: "#0d1320", border: "1px solid #2a3f63", borderRadius: "4px" }}>
          <h2 className="text-lg font-medium mb-4" style={{ color: "#e8edf5" }}>
            Founding Signatory
          </h2>
          <p className="font-display text-xl mb-1" style={{ color: "#e8edf5" }}>
            Michael Camelio
          </p>
          <p className="text-sm mb-4" style={{ color: "#7a8ba5" }}>
            Founder & CEO, TrueFrame
          </p>
          <p className="font-mono text-xs" style={{ color: "#4a5a73" }}>
            June 2026
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/pitch-deck"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200"
            style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
          >
            View the Full Pitch Deck
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
