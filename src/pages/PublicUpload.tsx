import { useState, useCallback } from "react";
import { Link } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import { Upload, CheckCircle } from "lucide-react";

export default function PublicUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [result, setResult] = useState<{ videoId: number; score: number; category: string } | null>(null);

  const uploadMutation = trpc.video.upload.useMutation();
  const analyzeMutation = trpc.video.analyze.useMutation();

  const stages = ["Uploading...", "AI Detection Analysis", "C2PA Provenance Check", "Publisher Attestation", "Score Finalized"];

  const handleFile = useCallback(
    async (file: File) => {
      setFileName(file.name);
      setFileSize(file.size);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
      setIsAnalyzing(true);
      setAnalysisStage(0);
      setResult(null);

      try {
        const uploadRes = await uploadMutation.mutateAsync({
          fileName: file.name,
          fileSize: file.size,
          duration: Math.floor(Math.random() * 180) + 30,
          resolution: "1920x1080",
          title: title || file.name.replace(/\.[^/.]+$/, ""),
          description: description || undefined,
        });

        setAnalysisStage(1);
        await new Promise((r) => setTimeout(r, 500));
        setAnalysisStage(2);
        await new Promise((r) => setTimeout(r, 500));
        setAnalysisStage(3);
        await new Promise((r) => setTimeout(r, 500));
        setAnalysisStage(4);

        const analysisRes = await analyzeMutation.mutateAsync({ videoId: uploadRes.videoId });

        setResult({
          videoId: uploadRes.videoId,
          score: analysisRes.overallScore,
          category: analysisRes.category,
        });
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [uploadMutation, analyzeMutation, title, description]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("video/")) handleFile(file);
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

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#10b981";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-20 pb-16 px-6 max-w-[700px] mx-auto">
        <h1 className="text-[28px] font-light mb-2" style={{ color: "#e8edf5" }}>
          Upload a Video
        </h1>
        <p className="text-sm mb-8" style={{ color: "#7a8ba5" }}>
          Upload any video to get a TrueFrame authenticity score. The result will be displayed
          as an ambient glow that everyone can see.
        </p>

        {/* Upload Form */}
        {!result && (
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-xs mb-2" style={{ color: "#7a8ba5" }}>Video Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your video a title"
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", color: "#e8edf5", borderRadius: "4px" }}
              />
            </div>
            <div>
              <label className="block text-xs mb-2" style={{ color: "#7a8ba5" }}>Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's in this video?"
                rows={3}
                className="w-full px-4 py-3 text-sm outline-none resize-none"
                style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", color: "#e8edf5", borderRadius: "4px" }}
              />
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
            >
              <label className="block cursor-pointer">
                <input type="file" accept="video/*" className="hidden" onChange={onFileInput} />
                <div
                  className="flex flex-col items-center justify-center py-12 px-6 transition-all"
                  style={{
                    border: `2px dashed ${isDragging ? "#c8a45c" : "#1e2d47"}`,
                    backgroundColor: isDragging ? "#141e33" : "#0d1320",
                    borderRadius: "4px",
                  }}
                >
                  <Upload className="w-10 h-10 mb-3" style={{ color: isDragging ? "#c8a45c" : "#4a5a73" }} />
                  <p className="text-sm" style={{ color: "#7a8ba5" }}>Drop video here or click to browse</p>
                  <p className="text-xs mt-1" style={{ color: "#4a5a73" }}>MP4, MOV, AVI up to 500MB</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="p-6 mb-8" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
            <p className="text-sm font-medium mb-1" style={{ color: "#e8edf5" }}>{fileName}</p>
            <p className="font-mono text-xs mb-4" style={{ color: "#4a5a73" }}>{(fileSize / (1024 * 1024)).toFixed(1)} MB</p>
            <div className="w-full h-1 mb-4" style={{ backgroundColor: "#1e2d47" }}>
              <div className="h-full transition-all duration-500" style={{ width: `${((analysisStage + 1) / stages.length) * 100}%`, backgroundColor: "#c8a45c" }} />
            </div>
            <div className="flex justify-between">
              {stages.map((s, i) => (
                <p key={s} className="font-mono text-[9px]" style={{ color: i < analysisStage ? "#10b981" : i === analysisStage ? "#e8edf5" : "#4a5a73" }}>{s}</p>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="p-8 text-center" style={{ backgroundColor: "#0d1320", border: `2px solid ${getScoreColor(result.score)}`, borderRadius: "4px" }}>
            <CheckCircle className="w-10 h-10 mx-auto mb-4" style={{ color: "#10b981" }} />
            <p className="font-mono text-[10px] tracking-[0.1em] mb-2" style={{ color: "#7a8ba5" }}>TRUEFRAME SCORE</p>
            <p className="font-display text-6xl mb-2" style={{ color: getScoreColor(result.score) }}>{result.score}</p>
            <p className="text-sm font-medium mb-6" style={{ color: getScoreColor(result.score) }}>
              {result.score >= 70 ? "VERIFIED AUTHENTIC" : result.score >= 40 ? "UNCERTAIN" : "LIKELY SYNTHETIC"}
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to={`/video/${result.videoId}`}
                className="px-6 py-2.5 text-xs font-semibold uppercase"
                style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
              >
                View in Gallery
              </Link>
              <Link
                to="/feed"
                className="px-6 py-2.5 text-xs font-semibold uppercase border"
                style={{ color: "#e8edf5", borderColor: "#2a3f63", borderRadius: "2px" }}
              >
                Browse Gallery
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
