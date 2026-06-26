import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function IPGovernance() {
  const ipStatuses = [
    {
      title: "Provisional Patent Application",
      color: "#10b981",
      status: "FILED — PROVISIONAL",
      body: "The ambient hue signal UX concept — delivering video authenticity probability as a passive colored border rendered externally and injected at the player layer — is the subject of a provisional patent application. A provisional patent is a 12-month placeholder that establishes an early filing date. Non-provisional conversion is planned for Month 8, contingent on seed funding.",
    },
    {
      title: "Document Copyright",
      color: "#3b82f6",
      status: "FILED",
      body: "The text of this investor presentation, technical documentation, and website content is copyright 2026 TrueFrame. Copyright protects the creative expression (text, code, images), not concepts, methodologies, or scoring architectures.",
    },
    {
      title: "Trade Secret Protection",
      color: "#f59e0b",
      status: "IN EFFECT",
      body: "The specific ensemble model architecture, pre-score border detection algorithm, and signal injection implementation are maintained as trade secrets. These are protectable through confidentiality agreements and will be subject to defensive publication strategy as the open standard matures.",
    },
  ];

  const timeline = [
    { month: "Month 0", label: "Provisional patent filed", color: "#10b981" },
    { month: "Month 3", label: "Hire AI/ML Engineer — begin model development under NDA", color: "#3b82f6" },
    { month: "Month 6", label: "Browser extension beta — defensive publication of border injection method", color: "#3b82f6" },
    { month: "Month 8", label: "Non-provisional patent conversion (contingent on Series A progress)", color: "#f59e0b" },
    { month: "Month 12", label: "Open standard draft publication — selective patent licensing", color: "#c8a45c" },
  ];

  const governanceCards = [
    {
      title: "Council-Based Verification",
      body: "Attestation rights are granted by a multi-stakeholder council comprising representatives from journalism (40%), academia (25%), civil society (20%), and platform trust teams (15%). No single entity can unilaterally grant or revoke attestation status.",
    },
    {
      title: "Stake-Weighted Voting",
      body: "Council decisions require a 60% supermajority for rule changes and a 75% supermajority for attestation grants/revocations. Voting weight is distributed to prevent any two categories from forming a controlling coalition.",
    },
    {
      title: "Transparent Appeals",
      body: "All attestation decisions, weight assignments, and rule changes are published on a public ledger. Attested publishers can appeal decisions through an independent arbitration panel with published criteria.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
        {/* IP Status */}
        <div className="mb-20">
          <h1 className="text-[40px] font-light mb-3" style={{ color: "#e8edf5" }}>
            Intellectual Property Status
          </h1>
          <p className="text-[15px] mb-12" style={{ color: "#7a8ba5" }}>
            Transparent, accurate positioning of all IP protections.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* IP Cards */}
            <div className="flex flex-col gap-4">
              {ipStatuses.map((ip) => (
                <div
                  key={ip.title}
                  className="p-6"
                  style={{
                    backgroundColor: "#0d1320",
                    border: "1px solid #1e2d47",
                    borderLeft: `3px solid ${ip.color}`,
                    borderRadius: "4px",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-medium" style={{ color: "#e8edf5" }}>
                      {ip.title}
                    </h3>
                    <span
                      className="font-mono text-[10px] px-2.5 py-1"
                      style={{
                        backgroundColor: `${ip.color}15`,
                        color: ip.color,
                        borderRadius: "2px",
                      }}
                    >
                      {ip.status}
                    </span>
                  </div>
                  <p className="text-[14px] leading-[1.7]" style={{ color: "#7a8ba5" }}>
                    {ip.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-lg font-medium mb-6" style={{ color: "#e8edf5" }}>
                IP Strategy Timeline
              </h3>
              <div className="relative pl-6">
                <div
                  className="absolute left-2 top-0 bottom-0 w-[1px]"
                  style={{ backgroundColor: "#1e2d47" }}
                />
                {timeline.map((item, i) => (
                  <div key={i} className="relative mb-8 last:mb-0">
                    <div
                      className="absolute -left-4 top-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="font-mono text-[11px] mb-1" style={{ color: item.color }}>
                      {item.month}
                    </p>
                    <p className="text-sm" style={{ color: "#e8edf5" }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Governance Model */}
        <div>
          <h2 className="text-2xl font-normal mb-6" style={{ color: "#e8edf5" }}>
            Publisher Attestation Governance
          </h2>
          <p className="text-[15px] max-w-[720px] leading-[1.7] mb-8" style={{ color: "#7a8ba5" }}>
            The verified publisher attestation layer (15% weight) requires a robust governance model
            to prevent capture by partisan fact-checkers, state actors, or commercial interests.
            TrueFrame proposes a council-based, stake-weighted governance system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {governanceCards.map((card) => (
              <div
                key={card.title}
                className="p-6"
                style={{
                  backgroundColor: "#060a12",
                  border: "1px solid #1e2d47",
                  borderRadius: "4px",
                }}
              >
                <h3 className="text-base font-medium mb-3" style={{ color: "#e8edf5" }}>
                  {card.title}
                </h3>
                <p className="text-[13px] leading-[1.6]" style={{ color: "#7a8ba5" }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
