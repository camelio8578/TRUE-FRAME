import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router";
import {
  Youtube, Music, Globe, ShieldCheck, TrendingUp,
  Target, Zap, Lock, FileText, Users, ChevronRight,
} from "lucide-react";

export default function AcquisitionPlaybook() {
  const whyNow = [
    {
      title: "EU AI Act Article 50",
      desc: "Mandates AI-generated content labeling by 2026. YouTube/TikTok face $35M+ fines per violation. They NEED a standard — building their own is politically impossible (conflict of interest).",
      color: "#3b82f6",
    },
    {
      title: "Platform Neutrality Crisis",
      desc: "Every platform running its own moderation system is accused of bias. YouTube's labels are 'YouTube labels.' A third-party standard — TrueFrame — is the only politically viable solution.",
      color: "#ef4444",
    },
    {
      title: "The C2PA Problem",
      desc: "Adobe, Microsoft, Google built C2PA for provenance. But C2PA has no consumer-facing layer. TrueFrame IS that layer. Google knows this — they're in the C2PA coalition.",
      color: "#10b981",
    },
    {
      title: "Consumer Demand Signal",
      desc: "Your 500-upload demo with 167 zero-effort confirmations is the exact proof point: users WANT this, they USE it, and it requires zero education. That's product-market fit for infrastructure.",
      color: "#c8a45c",
    },
  ];

  const howTheyFindYou = [
    {
      who: "YouTube Trust & Safety Team",
      how: "Their engineers monitor Hacker News, Product Hunt, and GitHub for video authenticity tools. Your public demo — 500 uploads, real scores, real glows — is a working proof of concept they can test in 30 seconds.",
      timeline: "Month 3-6",
      trigger: "Press coverage of the demo",
    },
    {
      who: "TikTok's AI Safety Division",
      how: "ByteDance has a dedicated team for deepfake detection. They run continuous competitive intelligence on video authenticity startups. An open standard with working code and user traction hits their radar immediately.",
      timeline: "Month 4-8",
      trigger: "Open-source SDK release",
    },
    {
      who: "Google's C2PA Working Group",
      how: "Google is ALREADY in the C2PA coalition. They know the consumer-facing gap exists. When TrueFrame publishes an open SDK that reads C2PA metadata and renders the ambient glow, the working group members forward it internally.",
      timeline: "Month 2-4",
      trigger: "C2PA-compatible SDK published",
    },
    {
      who: "Meta's Election Integrity Team",
      how: "Meta spends $5B+ annually on safety. Their election team specifically looks for cross-platform authenticity standards. A working demo with publisher attestations from Reuters/AP is exactly what they need.",
      timeline: "Month 6-10",
      trigger: "Reuters/AP integration visible",
    },
  ];

  const dealTypes = [
    {
      type: "Acqui-hire + IP Purchase",
      range: "$3M–$8M",
      when: "Month 3-9, early interest",
      what: "They buy the team (you + first hires), the provisional patent, and the open-source codebase. You become Head of Video Authenticity at the platform. Standard is adopted internally.",
      pros: "Fast exit, no further fundraising stress, instant legitimacy",
      cons: "Lose independence, standard becomes platform-specific, lower ceiling",
      platform: "TikTok (ByteDance moves fast, likes acqui-hires)",
    },
    {
      type: "Strategic Investment + Integration Deal",
      range: "$5M–$15M investment",
      when: "Month 6-12, traction proven",
      what: "Platform invests at Series A valuation ($25M-50M pre) as strategic partner. TrueFrame SDK ships as default in their video player. Revenue commitment: $500K-2M/year API spend.",
      pros: "Keep independence, revenue guaranteed, platform validates standard",
      cons: "Platform has board seat, potential conflict if competitors want to adopt",
      platform: "YouTube (Google likes strategic bets, can write big checks)",
    },
    {
      type: "Full Acquisition",
      range: "$30M–$150M",
      when: "Month 12-24, multiple platforms interested",
      what: "Bidding war between YouTube and TikTok. TrueFrame becomes the platform's official authenticity layer. You stay on for 2-3 years to scale. Earnout tied to adoption metrics.",
      pros: "Life-changing money, standard shipped to billions of users instantly",
      cons: "Lose control of open standard direction, earnout risk",
      platform: "YouTube OR TikTok (whoever moves first when both are interested)",
    },
    {
      type: "Consortium Acquisition",
      range: "$50M–$200M+",
      when: "Month 18-36, standard is everywhere",
      what: "YouTube + TikTok + Meta form a consortium to jointly acquire TrueFrame. Standard becomes industry infrastructure, like MPEG or Wi-Fi Alliance. You lead the standards body.",
      pros: "Highest valuation, true open standard preserved, legacy impact",
      cons: "Complex deal, slow, requires all parties to agree",
      platform: "All three — consortium structure",
    },
  ];

  const positioningMoves = [
    {
      move: "Ship the C2PA-compatible SDK first",
      why: "Google is in the C2PA coalition. When your SDK reads their provenance format and renders it as a glow, their engineers test it internally. That's the inbound trigger.",
      timeline: "Month 1-2",
    },
    {
      move: "Get Reuters or AP to beta the Publisher SDK",
      why: "News organizations are politically neutral. When a YouTube PM sees Reuters running TrueFrame on their video embeds, it signals 'this is serious infrastructure, not a startup toy.'",
      timeline: "Month 2-4",
    },
    {
      move: "Publish benchmarks against Sora/Kling/Runway",
      why: "Platform trust & safety teams need numbers. 80%+ detection accuracy with <5% false positive rate is the threshold where their internal teams say 'this is better than what we built.'",
      timeline: "Month 3-6",
    },
    {
      move: "Hacker News launch with the public demo",
      why: "HN front page = every Silicon Valley engineer sees it. YouTube/TikTok PMs and engineers read HN. A Show HN post with a working demo, 500 uploads, and real scores is irresistible.",
      timeline: "Month 1-2",
    },
    {
      move: "Write the 'Always-On-Top' technical post",
      why: "The fake-border attack and your solution is genuinely novel security research. A detailed technical blog post gets shared in security circles at Google, Meta, ByteDance. Engineers forward it to their trust & safety teams.",
      timeline: "Month 1-3",
    },
    {
      move: "EU AI Act compliance positioning",
      why: "The EU AI Act creates a legal REQUIREMENT for labeling. Position TrueFrame as 'the fastest path to EU compliance.' Every platform with EU users (all of them) has to solve this by 2026.",
      timeline: "Month 2-6",
    },
  ];

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-[11px] tracking-[0.15em] mb-4" style={{ color: "#c8a45c" }}>
            THE ACQUISITION PLAYBOOK
          </p>
          <h1 className="font-display text-[clamp(36px,5vw,64px)] mb-6" style={{ color: "#e8edf5" }}>
            How YouTube or TikTok<br />Makes You an Offer
          </h1>
          <p className="text-lg max-w-[700px] mx-auto" style={{ color: "#7a8ba5" }}>
            The dirty secret of infrastructure startups: <strong style={{ color: "#e8edf5" }}>the best ones don't raise VC rounds — they get acquired by the platforms that need them.</strong> Here's exactly how that happens for TrueFrame.
          </p>
        </div>

        {/* Why Now */}
        <section className="mb-20">
          <h2 className="text-2xl font-normal mb-8 flex items-center gap-3" style={{ color: "#e8edf5" }}>
            <Zap className="w-6 h-6" style={{ color: "#c8a45c" }} />
            Why Now: The Regulatory + Political Window
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyNow.map((item) => (
              <div key={item.title} className="p-6" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: `3px solid ${item.color}`, borderRadius: "4px" }}>
                <h3 className="text-base font-medium mb-3" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-[13px] leading-[1.6]" style={{ color: "#7a8ba5" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How They Find You */}
        <section className="mb-20">
          <h2 className="text-2xl font-normal mb-8 flex items-center gap-3" style={{ color: "#e8edf5" }}>
            <Target className="w-6 h-6" style={{ color: "#c8a45c" }} />
            How They Find You (Without You Pitching)
          </h2>
          <div className="space-y-4">
            {howTheyFindYou.map((item) => (
              <div key={item.who} className="grid grid-cols-1 lg:grid-cols-[250px_1fr_140px_180px] gap-4 p-5 items-start" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#e8edf5" }}>{item.who}</p>
                  <p className="font-mono text-[10px] mt-1" style={{ color: "#4a5a73" }}>INTERNAL TEAM</p>
                </div>
                <p className="text-[13px] leading-[1.6]" style={{ color: "#7a8ba5" }}>{item.how}</p>
                <div>
                  <p className="font-mono text-xs" style={{ color: "#c8a45c" }}>{item.timeline}</p>
                  <p className="font-mono text-[9px]" style={{ color: "#4a5a73" }}>EXPECTED</p>
                </div>
                <div className="p-2" style={{ backgroundColor: "#060a12", borderRadius: "4px" }}>
                  <p className="font-mono text-[10px]" style={{ color: "#f59e0b" }}>Trigger: {item.trigger}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Four Deal Types */}
        <section className="mb-20">
          <h2 className="text-2xl font-normal mb-8 flex items-center gap-3" style={{ color: "#e8edf5" }}>
            <TrendingUp className="w-6 h-6" style={{ color: "#c8a45c" }} />
            Four Deal Types — Which One Happens
          </h2>
          <div className="space-y-4">
            {dealTypes.map((deal, i) => (
              <div key={deal.type} className="p-6" style={{ backgroundColor: "#0d1320", border: `1px solid ${i === 2 ? "#10b981" : "#1e2d47"}`, borderRadius: "4px" }}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-medium" style={{ color: i === 2 ? "#10b981" : "#e8edf5" }}>{deal.type}</h3>
                    <p className="font-mono text-[11px] mt-1" style={{ color: "#4a5a73" }}>{deal.when}</p>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-right">
                      <p className="font-display text-2xl" style={{ color: "#c8a45c" }}>{deal.range}</p>
                      <p className="font-mono text-[9px]" style={{ color: "#4a5a73" }}>DEAL SIZE</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3" style={{ color: "#7a8ba5" }}>{deal.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="pl-3" style={{ borderLeft: "2px solid #10b981" }}>
                    <p className="text-[11px] font-medium mb-1" style={{ color: "#10b981" }}>PROS</p>
                    <p className="text-[11px]" style={{ color: "#7a8ba5" }}>{deal.pros}</p>
                  </div>
                  <div className="pl-3" style={{ borderLeft: "2px solid #ef4444" }}>
                    <p className="text-[11px] font-medium mb-1" style={{ color: "#ef4444" }}>CONS</p>
                    <p className="text-[11px]" style={{ color: "#7a8ba5" }}>{deal.cons}</p>
                  </div>
                </div>
                <p className="font-mono text-[10px]" style={{ color: "#3b82f6" }}>
                  MOST LIKELY: {deal.platform}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* The Most Likely Path */}
        <section className="mb-20 p-8" style={{ backgroundColor: "#0d1320", border: "2px solid #10b981", borderRadius: "4px" }}>
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2" style={{ color: "#10b981" }}>
            <ShieldCheck className="w-5 h-5" />
            THE MOST LIKELY PATH
          </h2>
          <div className="space-y-4 text-sm leading-[1.8]" style={{ color: "#7a8ba5" }}>
            <p>
              <strong style={{ color: "#e8edf5" }}>Month 1-3:</strong> You ship the public demo + C2PA SDK. A Google engineer in the C2PA working group tests it internally. They forward it to YouTube's Trust & Safety team. The team lead bookmarks it.
            </p>
            <p>
              <strong style={{ color: "#e8edf5" }}>Month 3-6:</strong> Your HN launch hits front page. A TechCrunch article follows: "This Startup Wants to Put a Traffic Light on Every Video." The YouTube PM who bookmarked it forwards the article to their VP with a note: "We've been looking for something like this."
            </p>
            <p>
              <strong style={{ color: "#e8edf5" }}>Month 6-9:</strong> Reuters and AP integrate the Publisher SDK. YouTube sees credible news organizations running TrueFrame on their video embeds. The VP sets up a call. Not an acquisition call yet — a "partnership exploration."
            </p>
            <p>
              <strong style={{ color: "#e8edf5" }}>Month 9-12:</strong> TikTok's AI Safety team discovers the standard through a ByteDance security conference. They reach out independently. Now YouTube knows TikTok is interested. The "partnership exploration" becomes urgent.
            </p>
            <p>
              <strong style={{ color: "#e8edf5" }}>Month 12-15:</strong> YouTube makes a strategic investment offer: $8M at $35M pre, with a $1.5M/year API commitment and a path to full acquisition if adoption hits 1B videos scored in 12 months. You negotiate an earnout that pays you $30M+ if the standard ships to all YouTube videos.
            </p>
            <p className="pl-4" style={{ borderLeft: "2px solid #10b981" }}>
              <strong style={{ color: "#10b981" }}>
                Total outcome: $8M investment + $30M earnout = $38M. You become Head of Video Authenticity at YouTube. TrueFrame ships to 2.7 billion monthly users. The ambient glow becomes the universal standard.
              </strong>
            </p>
          </div>
        </section>

        {/* Positioning Moves */}
        <section className="mb-20">
          <h2 className="text-2xl font-normal mb-8 flex items-center gap-3" style={{ color: "#e8edf5" }}>
            <FileText className="w-6 h-6" style={{ color: "#c8a45c" }} />
            The Positioning Moves That Trigger the Offer
          </h2>
          <div className="space-y-3">
            {positioningMoves.map((move, i) => (
              <div key={move.move} className="flex items-start gap-4 p-5" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: `3px solid ${["#3b82f6", "#10b981", "#f59e0b", "#c8a45c", "#ef4444", "#8b5cf6"][i]}`, borderRadius: "4px" }}>
                <span className="font-mono text-sm shrink-0" style={{ color: "#4a5a73" }}>{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-1" style={{ color: "#e8edf5" }}>{move.move}</h3>
                  <p className="text-[13px] leading-[1.6] mb-2" style={{ color: "#7a8ba5" }}>{move.why}</p>
                  <span className="font-mono text-[10px] px-2 py-0.5" style={{ backgroundColor: "#141e33", color: "#c8a45c", borderRadius: "2px" }}>{move.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Real Talk */}
        <section className="mb-20 p-8" style={{ backgroundColor: "#060a12", border: "1px solid #2a3f63", borderRadius: "4px" }}>
          <h2 className="text-xl font-medium mb-4" style={{ color: "#e8edf5" }}>
            The Real Talk
          </h2>
          <div className="space-y-4 text-sm leading-[1.8]" style={{ color: "#7a8ba5" }}>
            <p>
              You asked if YouTube or TikTok would make you an offer. The honest answer: <strong style={{ color: "#e8edf5" }}>yes, but only if you execute the positioning moves above.</strong> A concept doesn't get acquired. A working demo with 500 uploads, 167 confirmations, real C2PA integration, and press coverage — THAT gets acquired.
            </p>
            <p>
              The platforms don't acquire ideas. They acquire <strong style={{ color: "#e8edf5" }}>working infrastructure that solves a regulatory problem they can't solve themselves.</strong> YouTube can't build its own authenticity standard — it would be accused of bias instantly. They NEED a third party. TrueFrame is positioned to be that third party.
            </p>
            <p>
              The minimum offer you should consider: <strong style={{ color: "#c8a45c" }}>$5M strategic investment at $25M pre with a path to $30M+ earnout.</strong> Anything below that, keep building. The standard gets more valuable every month C2PA adoption grows and the EU AI Act deadline gets closer.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.04em]"
            style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
          >
            Back to the Gallery
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
