import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, Database, Lock, ShieldCheck, Server, Code2, Cpu } from "lucide-react";

export default function Technology() {
  const archFlow = [
    { label: "Video Upload", icon: Brain },
    { label: "Pre-Processing\n(frame extraction, metadata)", icon: Cpu },
    { label: "Layer 1:\nEnsemble Detection", icon: Brain, color: "#3b82f6" },
    { label: "Layer 2:\nC2PA Provenance", icon: Lock, color: "#10b981" },
    { label: "Layer 3:\nPublisher Attestation", icon: ShieldCheck, color: "#c8a45c" },
    { label: "Score Aggregation\n(weighted sum)", icon: Database },
    { label: "Signed Score\nResponse", icon: Server },
    { label: "Browser Extension\n(border render)", icon: Code2 },
  ];

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
        <h1 className="text-[40px] font-light mb-3" style={{ color: "#e8edf5" }}>
          Technical Appendix
        </h1>
        <p className="text-[15px] mb-12" style={{ color: "#7a8ba5" }}>
          Detection methodology, accuracy benchmarks, and system architecture.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Ensemble Detection */}
          <div>
            <h2 className="text-xl font-medium mb-4" style={{ color: "#e8edf5" }}>
              Ensemble Detection Model
            </h2>
            <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "#7a8ba5" }}>
              The detection layer uses a multi-model ensemble approach combining: (1) CNN-based
              frame-level artifact detection for GAN fingerprints and compression anomalies, (2)
              Temporal consistency analysis using optical flow to detect unnatural motion patterns,
              (3) Audio-visual synchronization verification using cross-modal attention, and (4)
              Metadata provenance analysis for file history and editing signatures. Each sub-model
              outputs a confidence score; a learned meta-classifier combines them into a final
              detection probability.
            </p>
            <span
              className="inline-block font-mono text-[10px] px-2.5 py-1"
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.1)",
                color: "#f59e0b",
                borderRadius: "2px",
              }}
            >
              CURRENT STATUS: PROTOTYPE
            </span>
          </div>

          {/* Benchmarking */}
          <div>
            <h2 className="text-xl font-medium mb-4" style={{ color: "#e8edf5" }}>
              Benchmarking Pipeline
            </h2>
            <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "#7a8ba5" }}>
              The AI/ML Engineer hire (Month 1) will establish a continuous benchmarking pipeline
              testing against: Sora (OpenAI), Kling (Kuaishou), Runway Gen-3, Pika 1.5, and
              open-source models (Stable Video Diffusion, AnimateDiff). Target: 80%+ accuracy on
              generated-vs-authentic classification with &lt;5% false positive rate on authentic
              content.
            </p>

            <h3 className="text-base font-medium mb-3 mt-8" style={{ color: "#e8edf5" }}>
              Security Architecture
            </h3>
            <p className="text-[14px] leading-[1.7]" style={{ color: "#7a8ba5" }}>
              Pre-score border detection uses edge-region color histogram analysis with a trained
              classifier to detect artificially injected borders. The signal injection layer renders
              as a CSS overlay at z-index 999999, ensuring it is always the outermost visual layer.
              The score API uses signed JWT tokens with 60-second expiration to prevent replay attacks.
            </p>
          </div>
        </div>

        {/* System Architecture Diagram */}
        <div className="p-8" style={{ backgroundColor: "#0d1320", borderRadius: "4px", border: "1px solid #1e2d47" }}>
          <h2 className="text-xl font-medium mb-8 text-center" style={{ color: "#e8edf5" }}>
            System Architecture
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {archFlow.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="flex flex-col items-center text-center px-4 py-3 min-w-[130px]"
                  style={{
                    backgroundColor: "#060a12",
                    border: "1px solid #1e2d47",
                    borderLeft: step.color ? `3px solid ${step.color}` : "1px solid #1e2d47",
                    borderRadius: "4px",
                  }}
                >
                  <step.icon className="w-4 h-4 mb-2" style={{ color: step.color || "#7a8ba5" }} />
                  <span
                    className="text-[11px] leading-tight whitespace-pre-line"
                    style={{ color: "#e8edf5" }}
                  >
                    {step.label}
                  </span>
                </div>
                {i < archFlow.length - 1 && (
                  <div className="flex items-center">
                    <div
                      className="w-3 h-[1px]"
                      style={{ backgroundColor: "#2a3f63" }}
                    />
                    <div
                      className="w-0 h-0"
                      style={{
                        borderTop: "3px solid transparent",
                        borderBottom: "3px solid transparent",
                        borderLeft: "4px solid #2a3f63",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detection Accuracy Table */}
        <div className="mt-16">
          <h2 className="text-2xl font-normal mb-6" style={{ color: "#e8edf5" }}>
            Target Detection Benchmarks
          </h2>

          <div style={{ border: "1px solid #1e2d47", borderRadius: "4px", overflow: "hidden" }}>
            <div
              className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-3 px-4"
              style={{ backgroundColor: "#0d1320" }}
            >
              {["MODEL / SOURCE", "DETECTION ACCURACY", "FALSE POSITIVE RATE", "STATUS"].map(
                (h) => (
                  <span
                    key={h}
                    className="font-mono text-[11px] tracking-[0.06em]"
                    style={{ color: "#7a8ba5" }}
                  >
                    {h}
                  </span>
                )
              )}
            </div>

            {[
              { model: "Sora (OpenAI)", accuracy: "Target: 82%", fpr: "<5%", status: "PENDING" },
              { model: "Kling (Kuaishou)", accuracy: "Target: 80%", fpr: "<5%", status: "PENDING" },
              { model: "Runway Gen-3", accuracy: "Target: 85%", fpr: "<4%", status: "PENDING" },
              { model: "Pika 1.5", accuracy: "Target: 83%", fpr: "<5%", status: "PENDING" },
              { model: "Stable Video Diffusion", accuracy: "Target: 88%", fpr: "<3%", status: "PENDING" },
              { model: "Authentic Content", accuracy: "N/A", fpr: "<5%", status: "PENDING" },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-3 px-4 transition-colors duration-150 hover:bg-[#0d1320]"
                style={{ borderTop: "1px solid #1e2d47" }}
              >
                <span className="text-sm" style={{ color: "#e8edf5" }}>
                  {row.model}
                </span>
                <span className="font-mono text-[13px]" style={{ color: "#e8edf5" }}>
                  {row.accuracy}
                </span>
                <span className="font-mono text-[13px]" style={{ color: "#e8edf5" }}>
                  {row.fpr}
                </span>
                <span
                  className="font-mono text-[11px] px-2 py-0.5 w-fit"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    color: "#f59e0b",
                    borderRadius: "2px",
                  }}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
