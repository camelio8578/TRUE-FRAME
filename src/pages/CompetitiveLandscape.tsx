import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CompetitiveLandscape() {
  const competitors = [
    {
      approach: "Platform Moderation (YouTube, Meta)",
      strength: "Massive scale, existing infrastructure, direct policy enforcement",
      limitation:
        "Closed systems with no cross-platform consistency. Platform incentives (engagement) conflict with transparency goals. Adversarial evolution outpaces manual review.",
      trueframe:
        "Complements by providing an open, cross-platform signal that works everywhere — not just within walled gardens.",
    },
    {
      approach: "Standalone Detection Tools (Sensity, Reality Defender)",
      strength: "Sophisticated detection models, B2B integration, high accuracy in lab conditions",
      limitation:
        "Require active effort — users must consciously run a scan. Zero consumer UX layer. No ambient signal.",
      trueframe:
        "Integrates detection as one layer (40%) but delivers it passively through the ambient border signal — zero user effort required.",
    },
    {
      approach: "C2PA Provenance",
      strength:
        "Cryptographically robust, hardware-backed, industry coalition (Adobe, Microsoft, Google, BBC)",
      limitation:
        "Only works on newly captured content with C2PA-enabled cameras. No solution for the 99%+ of existing video. Adoption is nascent.",
      trueframe:
        "Weights C2PA heavily (45%) when present but provides a complete fallback scoring system for non-C2PA content. Accelerates C2PA adoption by making provenance visible to consumers.",
    },
    {
      approach: "Fact-Checking Organizations",
      strength: "Human judgment, contextual understanding, editorial standards",
      limitation:
        "Manual, slow, cannot scale to billions of videos daily. No passive ambient signal.",
      trueframe:
        "Publisher attestations (15%) incorporate fact-checker input at scale, but the ambient signal automates the delivery so consumers don't need to visit a fact-checking site.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
        <h1 className="text-[40px] font-light mb-4" style={{ color: "#e8edf5" }}>
          Competitive Landscape
        </h1>
        <p className="text-[15px] max-w-[640px] mb-12" style={{ color: "#7a8ba5" }}>
          A respectful analysis of existing approaches and why TrueFrame complements rather than
          replaces them.
        </p>

        {/* Comparison Table */}
        <div style={{ border: "1px solid #1e2d47", borderRadius: "4px", overflow: "hidden" }}>
          {/* Header */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 py-4 px-6"
            style={{ backgroundColor: "#0d1320" }}
          >
            {["APPROACH", "STRENGTH", "LIMITATION", "TRUEFRAME'S POSITION"].map((h) => (
              <span
                key={h}
                className="font-mono text-[11px] tracking-[0.06em] uppercase"
                style={{ color: "#7a8ba5" }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {competitors.map((comp, i) => (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 py-6 px-6 transition-colors duration-150 hover:bg-[#0d1320]"
              style={{ borderTop: "1px solid #1e2d47" }}
            >
              <span className="text-sm font-medium" style={{ color: "#e8edf5" }}>
                {comp.approach}
              </span>
              <p className="text-[13px] leading-[1.6]" style={{ color: "#e8edf5" }}>
                {comp.strength}
              </p>
              <p className="text-[13px] leading-[1.6]" style={{ color: "#7a8ba5" }}>
                {comp.limitation}
              </p>
              <p className="text-[13px] leading-[1.6]" style={{ color: "#10b981" }}>
                {comp.trueframe}
              </p>
            </div>
          ))}
        </div>

        {/* Nuanced Positioning */}
        <div className="mt-16 p-8" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
          <h2 className="text-xl font-medium mb-4" style={{ color: "#e8edf5" }}>
            Why TrueFrame Complements, Not Replaces
          </h2>
          <p className="text-[15px] leading-[1.7] mb-4" style={{ color: "#7a8ba5" }}>
            The competitive landscape table above is intentionally respectful. Platform moderation
            isn't failing because it's "biased" — it's failing because of scale and adversarial
            evolution. C2PA isn't failing — it's nascent and needs consumer-visible applications to
            drive adoption. Standalone detection tools aren't failing — they serve a critical B2B
            function but lack consumer UX.
          </p>
          <p className="text-[15px] leading-[1.7]" style={{ color: "#7a8ba5" }}>
            TrueFrame's position is unique: we are the consumer-facing layer that makes all these
            underlying technologies visible, usable, and trustworthy at scale. We don't replace C2PA
            — we accelerate its adoption. We don't replace detection tools — we democratize their
            output. We don't replace platform moderation — we provide a cross-platform signal that
            works everywhere. This is the "own the rails" strategy: be the indispensable interface
            layer that every platform and every consumer needs.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
