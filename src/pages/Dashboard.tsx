import { useState, useCallback } from "react";
import { Link } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScoreRing from "@/components/ScoreRing";
import { trpc } from "@/providers/trpc";
import { Upload, FileVideo, Clock, Calendar, HardDrive, Lock, ShieldCheck, Brain } from "lucide-react";

interface AnalysisResult {
  videoId: number;
  overallScore: number;
  category: string;
  detectionScore: number;
  c2paScore: number;
  publisherScore: number;
  c2paPresent: boolean;
  detectionConfidence: number;
  processingTime: number;
}

export default function Dashboard() {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);

  const uploadMutation = trpc.video.upload.useMutation();
  const analyzeMutation = trpc.video.analyze.useMutation();
  const utils = trpc.useUtils();

  const { data: recentAnalyses } = trpc.score.listRecent.useQuery({ limit: 10 });

  const stages = [
    "Uploading...",
    "Layer 1: AI Detection",
    "Layer 2: Provenance Check",
    "Layer 3: Publisher Attestation",
    "Score Finalized",
  ];

  const handleFile = useCallback(
    async (file: File) => {
      if (!file) return;
      setFileName(file.name);
      setFileSize(file.size);
      setIsAnalyzing(true);
      setAnalysisStage(0);
      setResult(null);

      try {
        const uploadRes = await uploadMutation.mutateAsync({
          fileName: file.name,
          fileSize: file.size,
          duration: Math.floor(Math.random() * 180) + 30,
          resolution: "1920x1080",
        });

        setAnalysisStage(1);
        await new Promise((r) => setTimeout(r, 600));
        setAnalysisStage(2);
        await new Promise((r) => setTimeout(r, 600));
        setAnalysisStage(3);
        await new Promise((r) => setTimeout(r, 600));
        setAnalysisStage(4);

        const analysisRes = await analyzeMutation.mutateAsync({
          videoId: uploadRes.videoId,
        });

        setResult({
          videoId: uploadRes.videoId,
          ...analysisRes,
        });

        utils.score.listRecent.invalidate();
      } catch (err) {
        console.error("Analysis failed:", err);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [uploadMutation, analyzeMutation, utils]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("video/")) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const onFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#10b981";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const getCategoryLabel = (category: string) => {
    if (category === "verified") return "VERIFIED AUTHENTIC";
    if (category === "uncertain") return "UNCERTAIN";
    return "LIKELY SYNTHETIC";
  };

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[32px] font-light mb-2" style={{ color: "#e8edf5" }}>
            Analysis Dashboard
          </h1>
          <p className="text-sm" style={{ color: "#7a8ba5" }}>
            Upload videos for authenticity scoring. Results are processed through the three-layer trust engine.
          </p>
        </div>

        {/* Upload Zone */}
        <div
          className="mb-12"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
        >
          <label className="block cursor-pointer">
            <input type="file" accept="video/*" className="hidden" onChange={onFileInput} />
            <div
              className="flex flex-col items-center justify-center py-12 px-6 transition-all duration-200"
              style={{
                border: `2px dashed ${isDragging ? "#c8a45c" : "#1e2d47"}`,
                backgroundColor: isDragging ? "#141e33" : "#0d1320",
                borderRadius: "4px",
              }}
            >
              <Upload
                className="w-12 h-12 mb-4"
                style={{ color: isDragging ? "#c8a45c" : "#4a5a73" }}
              />
              <p className="text-base mb-2" style={{ color: "#7a8ba5" }}>
                Drop a video file or click to browse
              </p>
              <p className="text-xs" style={{ color: "#4a5a73" }}>
                MP4, MOV, AVI up to 500MB
              </p>
            </div>
          </label>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="mb-12 p-8" style={{ backgroundColor: "#0d1320", borderRadius: "4px", border: "1px solid #1e2d47" }}>
            <div className="flex items-center gap-3 mb-6">
              <FileVideo className="w-5 h-5" style={{ color: "#c8a45c" }} />
              <span className="text-sm font-medium" style={{ color: "#e8edf5" }}>
                {fileName}
              </span>
              <span className="text-xs font-mono" style={{ color: "#4a5a73" }}>
                {formatFileSize(fileSize)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 mb-6" style={{ backgroundColor: "#1e2d47", borderRadius: "1px" }}>
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${((analysisStage + 1) / stages.length) * 100}%`,
                  backgroundColor: "#c8a45c",
                  borderRadius: "1px",
                }}
              />
            </div>

            {/* Stage Labels */}
            <div className="flex justify-between">
              {stages.map((stage, i) => (
                <div key={stage} className="text-center flex-1">
                  <p
                    className="font-mono text-[10px] tracking-wide"
                    style={{
                      color: i < analysisStage ? "#10b981" : i === analysisStage ? "#e8edf5" : "#4a5a73",
                    }}
                  >
                    {stage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score Results */}
        {result && !isAnalyzing && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6">
              {/* Score Card */}
              <div
                className="flex flex-col items-center justify-center p-10"
                style={{
                  backgroundColor: "#060a12",
                  border: `1px solid ${getScoreColor(result.overallScore)}`,
                  borderRadius: "4px",
                }}
              >
                <ScoreRing score={result.overallScore} size={180} strokeWidth={8} />
                <p className="text-sm text-center mt-6 leading-relaxed" style={{ color: "#7a8ba5" }}>
                  {result.category === "verified"
                    ? "High-confidence authentic video with verified C2PA provenance and strong publisher attestation."
                    : result.category === "uncertain"
                    ? "Mixed signals detected. C2PA metadata is absent. Recommend manual review for critical applications."
                    : "Strong synthetic artifact detection with temporal inconsistencies and GAN fingerprint signatures."}
                </p>
              </div>

              {/* Layer Breakdown */}
              <div className="p-8" style={{ backgroundColor: "#0d1320", borderRadius: "4px", border: "1px solid #1e2d47" }}>
                <h3 className="text-lg font-medium mb-6" style={{ color: "#e8edf5" }}>
                  Score Breakdown
                </h3>

                {/* Detection Layer */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4" style={{ color: "#3b82f6" }} />
                      <span className="text-sm" style={{ color: "#e8edf5" }}>AI Detection Analysis</span>
                    </div>
                    <span className="font-mono text-xs" style={{ color: "#7a8ba5" }}>40%</span>
                  </div>
                  <div className="w-full h-1.5 mb-1" style={{ backgroundColor: "#1e2d47", borderRadius: "1px" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${result.detectionScore}%`,
                        backgroundColor: "#3b82f6",
                        borderRadius: "1px",
                      }}
                    />
                  </div>
                  <span className="font-mono text-xs" style={{ color: "#3b82f6" }}>
                    +{(result.detectionScore * 0.4).toFixed(1)} pts
                  </span>
                </div>

                {/* C2PA Layer */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" style={{ color: "#10b981" }} />
                      <span className="text-sm" style={{ color: "#e8edf5" }}>Cryptographic Provenance</span>
                    </div>
                    <span className="font-mono text-xs" style={{ color: "#7a8ba5" }}>45%</span>
                  </div>
                  <div className="w-full h-1.5 mb-1" style={{ backgroundColor: "#1e2d47", borderRadius: "1px" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${result.c2paScore}%`,
                        backgroundColor: result.c2paPresent ? "#10b981" : "#f59e0b",
                        borderRadius: "1px",
                      }}
                    />
                  </div>
                  <span className="font-mono text-xs" style={{ color: result.c2paPresent ? "#10b981" : "#f59e0b" }}>
                    +{(result.c2paScore * 0.45).toFixed(1)} pts
                    {!result.c2paPresent && " (C2PA absent — fallback mode)"}
                  </span>
                </div>

                {/* Publisher Layer */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" style={{ color: "#c8a45c" }} />
                      <span className="text-sm" style={{ color: "#e8edf5" }}>Publisher Attestations</span>
                    </div>
                    <span className="font-mono text-xs" style={{ color: "#7a8ba5" }}>15%</span>
                  </div>
                  <div className="w-full h-1.5 mb-1" style={{ backgroundColor: "#1e2d47", borderRadius: "1px" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${result.publisherScore}%`,
                        backgroundColor: "#c8a45c",
                        borderRadius: "1px",
                      }}
                    />
                  </div>
                  <span className="font-mono text-xs" style={{ color: "#c8a45c" }}>
                    +{(result.publisherScore * 0.15).toFixed(1)} pts
                  </span>
                </div>

                {/* Divider */}
                <div className="my-4" style={{ height: "1px", backgroundColor: "#1e2d47" }} />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold" style={{ color: "#e8edf5" }}>FINAL SCORE</span>
                  <span className="font-mono text-base font-semibold" style={{ color: getScoreColor(result.overallScore) }}>
                    {result.overallScore}/100
                  </span>
                </div>

                {/* Metadata */}
                <div className="mt-6 p-5" style={{ backgroundColor: "#060a12", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "File Name", value: fileName, icon: FileVideo },
                      { label: "File Size", value: formatFileSize(fileSize), icon: HardDrive },
                      { label: "Processing Time", value: `${result.processingTime}ms`, icon: Clock },
                      { label: "C2PA Status", value: result.c2paPresent ? "Present" : "Absent", icon: Lock },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs mb-1" style={{ color: "#7a8ba5" }}>{item.label}</p>
                        <p className="font-mono text-xs" style={{ color: "#e8edf5" }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis History */}
        <div>
          <h2 className="text-2xl font-normal mb-6" style={{ color: "#e8edf5" }}>
            Recent Analyses
          </h2>

          {recentAnalyses && recentAnalyses.length > 0 ? (
            <div style={{ borderTop: "1px solid #1e2d47" }}>
              {/* Header */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 py-3 px-4" style={{ borderBottom: "1px solid #1e2d47" }}>
                {["VIDEO", "SCORE", "STATUS", "DATE", "ACTIONS"].map((h) => (
                  <span key={h} className="font-mono text-[11px] tracking-[0.08em]" style={{ color: "#7a8ba5" }}>
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              {recentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 py-3 px-4 transition-colors duration-150 hover:bg-[#0d1320]"
                  style={{ borderBottom: "1px solid #1e2d47" }}
                >
                  <span className="text-sm truncate" style={{ color: "#e8edf5" }}>
                    {analysis.fileName}
                  </span>
                  <span className="font-mono text-sm" style={{ color: getScoreColor(analysis.overallScore) }}>
                    {analysis.overallScore}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 inline-flex items-center w-fit font-mono"
                    style={{
                      backgroundColor: `${getScoreColor(analysis.overallScore)}15`,
                      color: getScoreColor(analysis.overallScore),
                      borderRadius: "2px",
                    }}
                  >
                    {getCategoryLabel(analysis.category || "uncertain")}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "#7a8ba5" }}>
                    {analysis.createdAt ? new Date(analysis.createdAt).toLocaleDateString() : "—"}
                  </span>
                  <Link
                    to="#"
                    className="text-xs transition-colors duration-200 hover:underline"
                    style={{ color: "#c8a45c" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setResult({
                        videoId: analysis.videoId,
                        overallScore: analysis.overallScore,
                        category: analysis.category || "uncertain",
                        detectionScore: analysis.detectionScore,
                        c2paScore: analysis.c2paScore,
                        publisherScore: analysis.publisherScore,
                        c2paPresent: analysis.c2paPresent || false,
                        detectionConfidence: Number(analysis.detectionConfidence),
                        processingTime: analysis.processingTime || 0,
                      });
                      setFileName(analysis.fileName);
                      setFileSize(0);
                      window.scrollTo({ top: 200, behavior: "smooth" });
                    }}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center" style={{ border: "1px solid #1e2d47", borderRadius: "4px" }}>
              <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: "#4a5a73" }} />
              <p className="text-sm" style={{ color: "#7a8ba5" }}>
                No analyses yet. Upload a video to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
