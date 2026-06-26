import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { User, Cpu, Code2, Handshake } from "lucide-react";

export default function Team() {
  const plannedHires = [
    {
      role: "AI/ML Detection Engineer",
      icon: Cpu,
      timing: "Month 1",
      salary: "$180,000/year",
      color: "#3b82f6",
      description:
        "Responsible for training, evaluating, and deploying the ensemble detection model. Will establish benchmarking pipeline against Sora, Kling, Runway outputs and publish accuracy metrics.",
    },
    {
      role: "Full-Stack Engineer",
      icon: Code2,
      timing: "Month 1",
      salary: "$160,000/year",
      color: "#10b981",
      description:
        "Browser extension architecture, platform SDK development, and API infrastructure. Extension + API background required.",
    },
    {
      role: "Head of Standards & Partnerships",
      icon: Handshake,
      timing: "Month 3",
      salary: "$140,000/year",
      color: "#c8a45c",
      description:
        "C2PA coalition engagement, platform partnership negotiations, and open standard governance coordination. Former trust & safety or standards body experience preferred.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
        {/* Founder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 mb-20">
          <div>
            <div
              className="aspect-square flex items-center justify-center mb-6"
              style={{
                backgroundColor: "#0d1320",
                border: "1px solid #1e2d47",
                borderRadius: "4px",
              }}
            >
              <User className="w-16 h-16" style={{ color: "#4a5a73" }} />
            </div>
            <h3 className="text-xl font-medium mb-1" style={{ color: "#e8edf5" }}>
              Michael Camelio
            </h3>
            <p className="text-sm" style={{ color: "#7a8ba5" }}>
              Founder & CEO
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.15em] mb-4" style={{ color: "#7a8ba5" }}>
              THE TEAM
            </p>
            <h1 className="text-[32px] font-light leading-[1.3] mb-5" style={{ color: "#e8edf5" }}>
              Built by a Solo Founder with Deep Domain Conviction
            </h1>
            <p className="text-[15px] leading-[1.7] mb-6" style={{ color: "#7a8ba5" }}>
              Michael Camelio is the founder of TrueFrame. While currently a solo founder, the $2.5M
              seed round is explicitly allocated to bring on three key hires within the first 90 days:
              an AI/ML Detection Engineer, a Full-Stack Engineer for extension and API development,
              and a Head of Standards and Partnerships. The founding team will be complete by Month 3.
            </p>
            <div
              className="pl-4 py-2"
              style={{
                borderLeft: "2px solid #f59e0b",
              }}
            >
              <p className="text-[13px] leading-[1.6]" style={{ color: "#f59e0b" }}>
                Advisor network in formation — targeting former executives from Adobe Content
                Authenticity Initiative, WITNESS, and major platform trust & safety teams.
              </p>
            </div>
          </div>
        </div>

        {/* Planned Hires */}
        <div>
          <h2 className="text-2xl font-normal mb-8" style={{ color: "#e8edf5" }}>
            Planned Hires (Seed Funded)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plannedHires.map((hire) => (
              <div
                key={hire.role}
                className="p-7"
                style={{
                  backgroundColor: "#0d1320",
                  border: "1px solid #1e2d47",
                  borderRadius: "4px",
                }}
              >
                <hire.icon className="w-6 h-6 mb-4" style={{ color: hire.color }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: "#e8edf5" }}>
                  {hire.role}
                </h3>
                <p className="font-mono text-[11px] mb-1" style={{ color: "#c8a45c" }}>
                  {hire.timing}
                </p>
                <p className="font-mono text-[13px] mb-4" style={{ color: "#7a8ba5" }}>
                  {hire.salary}
                </p>
                <p className="text-[13px] leading-[1.6]" style={{ color: "#7a8ba5" }}>
                  {hire.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory Note */}
        <div className="mt-16 p-8" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
          <h3 className="text-lg font-medium mb-4" style={{ color: "#e8edf5" }}>
            Addressing the Solo Founder Concern
          </h3>
          <p className="text-[15px] leading-[1.7] mb-4" style={{ color: "#7a8ba5" }}>
            We recognize that investors bet primarily on teams. The seed round is structured to
            address this head-on: three critical hires are budgeted and timed to join within the
            first 90 days. The $2.5M ask explicitly includes competitive salaries for each role and
            an 18-month runway that gives the complete team time to ship, iterate, and demonstrate
            traction before Series A.
          </p>
          <p className="text-[15px] leading-[1.7]" style={{ color: "#7a8ba5" }}>
            The founder brings deep product thinking in security architecture, open standard strategy,
            and go-to-market positioning — validated by the comprehensive security analysis (Section 3)
            that identified and solved the fake-border attack vector before any competitor or development
            firm had addressed it.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
