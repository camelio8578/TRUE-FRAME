import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Youtube, Music, Instagram, Twitter, Newspaper, Tv, Radio, Vote, FileText } from "lucide-react";

export default function PlatformAdoption() {
  const tiers = [
    {
      title: "Tier 1: Major Video Platforms",
      subtitle: "Phase 4 Target (Months 18-36)",
      color: "#c8a45c",
      platforms: [
        { name: "YouTube", icon: Youtube, users: "2.7B monthly", desc: "Integration via TrueFrame Player SDK into the YouTube HTML5 player. Ambient glow renders around every video frame. Revenue: Platform Scoring API at $0.0001/video.", status: "TARGET" },
        { name: "TikTok", icon: Music, users: "1.1B monthly", desc: "SDK integration into TikTok's native video player. Critical for short-form AI detection (Sora/Kling dominance in 60s clips).", status: "TARGET" },
        { name: "Meta (Facebook)", icon: Instagram, users: "3.0B monthly", desc: "Cross-platform SDK covers Facebook Watch, Reels, and embedded video. Largest single integration opportunity.", status: "TARGET" },
        { name: "Instagram", icon: Instagram, users: "2.0B monthly", desc: "Reels-focused integration. AI-generated influencer content is the fastest-growing synthetic video category.", status: "TARGET" },
        { name: "X / Twitter", icon: Twitter, users: "550M monthly", desc: "Video-first pivot makes X a high-priority integration. News content verification is core to X's trust strategy.", status: "TARGET" },
      ],
    },
    {
      title: "Tier 2: Mid-Tier & Creator Platforms",
      subtitle: "Phase 3 Target (Months 12-18)",
      color: "#f59e0b",
      platforms: [
        { name: "Vimeo", icon: Tv, users: "260M monthly", desc: "Professional/creative video focus aligns with TrueFrame's quality-over-quantity positioning. Early adopter potential.", status: "LOI STAGE" },
        { name: "Twitch", icon: Radio, users: "140M monthly", desc: "Live stream verification for real-time deepfake detection. Partnership with Amazon AWS for infrastructure.", status: "LOI STAGE" },
        { name: "Dailymotion", icon: Tv, users: "350M monthly", desc: "European base aligns with EU AI Act compliance requirements. Regulatory-driven adoption opportunity.", status: "TARGET" },
        { name: "Substack", icon: FileText, users: "35M monthly", desc: "Video-native newsletters need authenticity signals. Publisher-focused integration with Verified Publisher Program.", status: "TARGET" },
        { name: "Medium", icon: FileText, users: "100M monthly", desc: "Long-form journalism video embeds. Strong alignment with publisher attestation layer.", status: "TARGET" },
      ],
    },
    {
      title: "Tier 3: News & Government",
      subtitle: "Phase 2 + 5 (Months 6-12, 18+)",
      color: "#10b981",
      platforms: [
        { name: "Reuters", icon: Newspaper, users: "Global wire", desc: "Verified Publisher Program founding member. All Reuters video carries C2PA + TrueFrame dual verification.", status: "COMMITTED" },
        { name: "BBC News", icon: Newspaper, users: "489M weekly", desc: "BBC Verify division integration. Public service broadcasting mandate supports open standard adoption.", status: "IN TALKS" },
        { name: "Associated Press", icon: Newspaper, users: "Global wire", desc: "AP's fact-checking network feeds directly into TrueFrame's publisher attestation layer.", status: "COMMITTED" },
        { name: "EU Election Monitoring", icon: Vote, users: "27 member states", desc: "EU AI Act Article 50 compliance for political advertising. Custom government contract for election integrity.", status: "RFP STAGE" },
        { name: "US State Election Boards", icon: Vote, users: "50 states", desc: "Deepfake detection for campaign video. Bipartisan election integrity infrastructure.", status: "PILOT" },
      ],
    },
  ];

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
        <h1 className="text-[40px] font-light mb-3" style={{ color: "#e8edf5" }}>
          Platform Adoption Strategy
        </h1>
        <p className="text-[15px] max-w-[720px] mb-4" style={{ color: "#7a8ba5" }}>
          TrueFrame is designed for phased adoption across the entire video ecosystem — from browser
          extensions that create consumer demand, to platform SDK integrations that fulfill that demand
          at global scale. Within 3 years, every public video on the internet will have a TrueFrame
          ambient glow.
        </p>
        <div className="pl-4 mb-12" style={{ borderLeft: "2px solid #c8a45c" }}>
          <p className="text-sm" style={{ color: "#c8a45c" }}>
            <strong>Endgame vision:</strong> YouTube, TikTok, Meta, Instagram, X, and every news
            organization display a TrueFrame glow on every video. Red for synthetic. Blue-green for
            authentic. Zero effort. Universal trust.
          </p>
        </div>

        {tiers.map((tier) => (
          <div key={tier.title} className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
              <h2 className="text-xl font-medium" style={{ color: "#e8edf5" }}>{tier.title}</h2>
            </div>
            <p className="font-mono text-[11px] mb-6 ml-6" style={{ color: tier.color }}>{tier.subtitle}</p>

            <div className="space-y-3">
              {tier.platforms.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-1 lg:grid-cols-[200px_1fr_120px] gap-4 p-5 items-center"
                  style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}
                >
                  <div className="flex items-center gap-3">
                    <p.icon className="w-5 h-5 shrink-0" style={{ color: tier.color }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#e8edf5" }}>{p.name}</p>
                      <p className="font-mono text-[10px]" style={{ color: "#4a5a73" }}>{p.users}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-[1.6]" style={{ color: "#7a8ba5" }}>{p.desc}</p>
                  <span
                    className="font-mono text-[10px] px-3 py-1 text-center w-fit lg:ml-auto"
                    style={{
                      backgroundColor: `${tier.color}15`,
                      color: tier.color,
                      borderRadius: "2px",
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Regulatory Tailwinds */}
        <div className="mt-16 p-8" style={{ backgroundColor: "#0d1320", border: "1px solid #2a3f63", borderRadius: "4px" }}>
          <h2 className="text-xl font-medium mb-6" style={{ color: "#e8edf5" }}>
            Regulatory Tailwinds Accelerating Adoption
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "EU AI Act (2025-2026)",
                body: "Article 50 requires labeling of AI-generated content. Article 52 mandates transparency for deepfakes. TrueFrame provides the technical infrastructure for compliance.",
                color: "#3b82f6",
              },
              {
                title: "US DEEPFAKES Accountability Act",
                body: "Federal legislation criminalizing malicious deepfakes in elections. 35+ states have introduced similar bills. Creates demand for standardized detection infrastructure.",
                color: "#ef4444",
              },
              {
                title: "Platform Self-Regulation",
                body: "YouTube, Meta, and TikTok have all announced AI labeling policies. None have cross-platform consistency. TrueFrame provides the open standard they all need.",
                color: "#10b981",
              },
            ].map((r) => (
              <div key={r.title} className="pl-4" style={{ borderLeft: `3px solid ${r.color}` }}>
                <h3 className="text-sm font-medium mb-2" style={{ color: "#e8edf5" }}>{r.title}</h3>
                <p className="text-xs leading-[1.6]" style={{ color: "#7a8ba5" }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
