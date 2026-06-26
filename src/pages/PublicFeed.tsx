import { useState, useEffect } from "react";
import { Link } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import { useSession } from "@/hooks/useSession";
import { Upload, Eye, Play, Lock } from "lucide-react";

function getScoreColor(score: number): string {
  if (score >= 70) return "#10b981";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

function getScoreLabel(score: number): string {
  if (score >= 70) return "AUTHENTIC";
  if (score >= 40) return "UNCERTAIN";
  return "SYNTHETIC";
}

export default function PublicFeed() {
  const { data: videos, isLoading } = trpc.video.listPublic.useQuery({ limit: 50 });
  const { isLocked, viewsRemaining, showFeedbackModal } = useSession();
  const [filter, setFilter] = useState<"all" | "authentic" | "uncertain" | "synthetic">("all");

  const filtered = videos?.filter((v) => {
    if (!v.score) return false;
    if (filter === "all") return true;
    if (filter === "authentic") return v.score.overallScore >= 70;
    if (filter === "uncertain") return v.score.overallScore >= 40 && v.score.overallScore < 70;
    if (filter === "synthetic") return v.score.overallScore < 40;
    return true;
  });

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-20 pb-16 px-6 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[28px] font-light mb-1" style={{ color: "#e8edf5" }}>
              TrueFrame Video Gallery
            </h1>
            <p className="text-sm" style={{ color: "#7a8ba5" }}>
              Every video has an ambient glow. Blue-green = authentic. Amber = uncertain. Red = synthetic. Zero effort required.
            </p>
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.04em] transition-colors"
            style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
          >
            <Upload className="w-4 h-4" />
            Upload Video
          </Link>
        </div>

        {/* View Counter / Lock Warning */}
        {isLocked ? (
          <div className="mb-6 p-4 flex items-center gap-3" style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", borderRadius: "4px" }}>
            <Lock className="w-5 h-5 shrink-0" style={{ color: "#ef4444" }} />
            <div>
              <p className="text-sm font-medium" style={{ color: "#ef4444" }}>
                You've viewed 3 videos. Give feedback about the TrueFrame glow to unlock unlimited viewing.
              </p>
              <Link to="/feedback" className="text-xs mt-1 inline-block underline" style={{ color: "#c8a45c" }}>
                Submit Glow Feedback to Unlock
              </Link>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-3" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
            <p className="text-xs" style={{ color: "#7a8ba5" }}>
              <span className="font-mono" style={{ color: "#c8a45c" }}>{viewsRemaining}</span> free video{viewsRemaining !== 1 ? "s" : ""} remaining.
              After 3, share your thoughts on the ambient glow to unlock unlimited access.
            </p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { key: "all", label: "ALL", color: "#e8edf5" },
            { key: "authentic", label: "AUTHENTIC", color: "#10b981" },
            { key: "uncertain", label: "UNCERTAIN", color: "#f59e0b" },
            { key: "synthetic", label: "SYNTHETIC", color: "#ef4444" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className="px-4 py-1.5 text-[11px] font-mono tracking-wide transition-colors"
              style={{
                backgroundColor: filter === f.key ? `${f.color}15` : "transparent",
                border: `1px solid ${filter === f.key ? f.color : "#1e2d47"}`,
                color: filter === f.key ? f.color : "#7a8ba5",
                borderRadius: "2px",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video rounded" style={{ backgroundColor: "#0d1320" }} />
                <div className="mt-3 h-4 rounded w-3/4" style={{ backgroundColor: "#0d1320" }} />
                <div className="mt-2 h-3 rounded w-1/2" style={{ backgroundColor: "#0d1320" }} />
              </div>
            ))}
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const score = item.score?.overallScore || 0;
              const color = getScoreColor(score);
              const label = getScoreLabel(score);
              return (
                <Link
                  key={item.video.id}
                  to={`/video/${item.video.id}`}
                  className="group block transition-transform duration-200 hover:-translate-y-1"
                >
                  {/* Thumbnail with Glow Border */}
                  <div
                    className="relative aspect-video overflow-hidden rounded"
                    style={{
                      border: `3px solid ${color}`,
                      boxShadow: `0 0 20px ${color}20`,
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, #0d1320 0%, #141e33 50%, #0d1320 100%)` }}
                    >
                      <Play className="w-10 h-10 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color }} />
                    </div>
                    {/* Score Badge */}
                    <div
                      className="absolute top-2 right-2 px-2 py-1 font-mono text-[10px]"
                      style={{ backgroundColor: "rgba(6,10,18,0.9)", color, borderRadius: "2px" }}
                    >
                      {score} — {label}
                    </div>
                    {/* Duration */}
                    {item.video.duration && (
                      <div
                        className="absolute bottom-2 right-2 px-1.5 py-0.5 font-mono text-[10px]"
                        style={{ backgroundColor: "rgba(6,10,18,0.9)", color: "#e8edf5", borderRadius: "2px" }}
                      >
                        {Math.floor(item.video.duration / 60)}:{(item.video.duration % 60).toString().padStart(2, "0")}
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="mt-3">
                    <h3 className="text-sm font-medium truncate group-hover:text-[#c8a45c] transition-colors" style={{ color: "#e8edf5" }}>
                      {item.video.title || item.video.fileName}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[11px]" style={{ color: "#4a5a73" }}>
                        <Eye className="w-3 h-3" />
                        {item.video.viewCount || 0}
                      </span>
                      <span className="text-[11px]" style={{ color: "#4a5a73" }}>
                        {item.video.createdAt ? new Date(item.video.createdAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg mb-2" style={{ color: "#e8edf5" }}>No videos yet</p>
            <p className="text-sm mb-6" style={{ color: "#7a8ba5" }}>
              Be the first to upload a video and see the TrueFrame glow in action.
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase"
              style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
            >
              <Upload className="w-4 h-4" />
              Upload First Video
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
