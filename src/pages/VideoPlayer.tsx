import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import { useSession } from "@/hooks/useSession";
import ScoreRing from "@/components/ScoreRing";
import { Brain, Lock, ShieldCheck, Send, Eye, ArrowLeft } from "lucide-react";

function getScoreColor(score: number): string {
  if (score >= 70) return "#10b981";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

export default function VideoPlayer() {
  const { id } = useParams<{ id: string }>();
  const videoId = parseInt(id || "0");
  const { sessionId, recordView, isLocked, viewsRemaining } = useSession();

  const { data, isLoading } = trpc.video.getById.useQuery({ id: videoId });
  const { data: commentsList, refetch: refetchComments } = trpc.comment.list.useQuery({ videoId });
  const utils = trpc.useUtils();

  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createComment = trpc.comment.create.useMutation({
    onSuccess: () => {
      setCommentText("");
      setSubmitted(true);
      refetchComments();
      utils.comment.list.invalidate({ videoId });
    },
  });

  // Track view on load
  useEffect(() => {
    if (videoId && sessionId) {
      recordView();
    }
  }, [videoId, sessionId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;
    createComment.mutate({
      videoId,
      authorName: authorName.trim(),
      content: commentText.trim(),
    });
  };

  if (isLoading) {
    return (
      <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
        <Navigation />
        <div className="pt-20 pb-16 px-6 max-w-[1000px] mx-auto">
          <div className="animate-pulse">
            <div className="aspect-video rounded" style={{ backgroundColor: "#0d1320" }} />
            <div className="mt-6 h-6 rounded w-1/2" style={{ backgroundColor: "#0d1320" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!data?.video) {
    return (
      <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
        <Navigation />
        <div className="pt-20 pb-16 px-6 max-w-[1000px] mx-auto text-center">
          <p className="text-lg" style={{ color: "#e8edf5" }}>Video not found</p>
          <Link to="/feed" className="text-sm mt-4 inline-block" style={{ color: "#c8a45c" }}>
            Back to feed
          </Link>
        </div>
      </div>
    );
  }

  const video = data.video;
  const score = data.score;
  const scoreColor = score ? getScoreColor(score.overallScore) : "#4a5a73";
  const scoreLabel = score
    ? score.overallScore >= 70
      ? "VERIFIED AUTHENTIC"
      : score.overallScore >= 40
      ? "UNCERTAIN"
      : "LIKELY SYNTHETIC"
    : "NOT SCORED";

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-20 pb-16 px-6 max-w-[1000px] mx-auto">
        {/* Back Link */}
        <Link to="/feed" className="inline-flex items-center gap-1 text-xs mb-4 transition-colors hover:text-[#e8edf5]" style={{ color: "#7a8ba5" }}>
          <ArrowLeft className="w-3 h-3" />
          Back to Gallery
        </Link>

        {/* Video Player with Glow */}
        <div
          className="relative aspect-video overflow-hidden rounded mb-6"
          style={{
            border: `4px solid ${scoreColor}`,
            boxShadow: `0 0 40px ${scoreColor}30, 0 0 80px ${scoreColor}15`,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, #0a1020 0%, #141e33 40%, #0d1320 100%)` }}
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ border: `3px solid ${scoreColor}` }}>
                <div className="w-0 h-0 ml-1.5" style={{ borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: `20px solid ${scoreColor}` }} />
              </div>
              <p className="font-mono text-sm" style={{ color }}>{video.fileName}</p>
              <p className="font-mono text-xs mt-1" style={{ color: "#4a5a73" }}>
                {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, "0")}` : ""}
                {" "}&middot;{" "}
                {video.resolution || "1920x1080"}
              </p>
            </div>
          </div>

          {/* Score Overlay */}
          <div
            className="absolute top-4 right-4 px-5 py-3"
            style={{ backgroundColor: "rgba(6, 10, 18, 0.95)", borderBottomLeftRadius: "4px", border: `1px solid ${scoreColor}40` }}
          >
            <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: "#7a8ba5" }}>TRUEFRAME SCORE</p>
            <p className="font-mono text-4xl font-medium" style={{ color: scoreColor }}>
              {score?.overallScore ?? "—"}
            </p>
            <p className="text-[11px] font-medium mt-1" style={{ color: scoreColor }}>{scoreLabel}</p>
          </div>

          {/* Always-On-Top Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5" style={{ backgroundColor: "rgba(6, 10, 18, 0.9)", borderRadius: "2px" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#10b981" }} />
            <span className="font-mono text-[9px] tracking-wide" style={{ color: "#7a8ba5" }}>ALWAYS-ON-TOP VERIFIED</span>
          </div>
        </div>

        {/* Video Info */}
        <h1 className="text-xl font-medium mb-2" style={{ color: "#e8edf5" }}>
          {video.title || video.fileName}
        </h1>
        <div className="flex items-center gap-4 mb-6 text-xs" style={{ color: "#7a8ba5" }}>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {video.viewCount || 0} views</span>
          <span>{video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}</span>
          {video.fileSize && <span>{(video.fileSize / (1024 * 1024)).toFixed(1)} MB</span>}
        </div>

        {/* Score Breakdown */}
        {score && (
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 mb-10">
            <div className="flex flex-col items-center justify-center p-6" style={{ backgroundColor: "#0d1320", border: `1px solid ${scoreColor}40`, borderRadius: "4px" }}>
              <ScoreRing score={score.overallScore} size={140} strokeWidth={6} />
            </div>
            <div className="p-6" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
              <h3 className="text-sm font-medium mb-4" style={{ color: "#e8edf5" }}>Score Breakdown</h3>
              {[
                { icon: Brain, label: "AI Detection", score: score.detectionScore, weight: "40%", color: "#3b82f6" },
                { icon: Lock, label: "C2PA Provenance", score: score.c2paScore, weight: "45%", color: score.c2paPresent ? "#10b981" : "#f59e0b" },
                { icon: ShieldCheck, label: "Publisher Attestations", score: score.publisherScore, weight: "15%", color: "#c8a45c" },
              ].map((layer) => (
                <div key={layer.label} className="mb-3 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <layer.icon className="w-3.5 h-3.5" style={{ color: layer.color }} />
                      <span className="text-xs" style={{ color: "#e8edf5" }}>{layer.label}</span>
                    </div>
                    <span className="font-mono text-[10px]" style={{ color: "#7a8ba5" }}>{layer.weight}</span>
                  </div>
                  <div className="w-full h-1.5" style={{ backgroundColor: "#1e2d47", borderRadius: "1px" }}>
                    <div className="h-full" style={{ width: `${layer.score}%`, backgroundColor: layer.color, borderRadius: "1px" }} />
                  </div>
                  <span className="font-mono text-[10px]" style={{ color: layer.color }}>+{(layer.score * parseInt(layer.weight) / 100).toFixed(1)} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Comment List */}
          <div>
            <h3 className="text-sm font-medium mb-4" style={{ color: "#e8edf5" }}>
              Comments ({commentsList?.length || 0})
            </h3>

            {commentsList && commentsList.length > 0 ? (
              <div className="space-y-3">
                {commentsList.map((comment) => (
                  <div key={comment.id} className="p-4" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium" style={{ color: "#e8edf5" }}>{comment.authorName}</span>
                      {comment.isGlowFeedback && (
                        <span className="font-mono text-[9px] px-1.5 py-0.5" style={{ backgroundColor: "rgba(200,164,92,0.1)", color: "#c8a45c", borderRadius: "2px" }}>
                          GLOW FEEDBACK
                        </span>
                      )}
                      <span className="font-mono text-[10px] ml-auto" style={{ color: "#4a5a73" }}>
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "#7a8ba5" }}>{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm py-8 text-center" style={{ color: "#4a5a73" }}>No comments yet. Be the first.</p>
            )}
          </div>

          {/* Comment Form */}
          <div>
            <div className="p-5 sticky top-20" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
              <h3 className="text-sm font-medium mb-4" style={{ color: "#e8edf5" }}>Add a Comment</h3>

              {/* View Counter */}
              {!isLocked && (
                <div className="mb-4 p-2" style={{ backgroundColor: "#060a12", borderRadius: "4px" }}>
                  <p className="text-[11px]" style={{ color: "#7a8ba5" }}>
                    <span className="font-mono" style={{ color: "#c8a45c" }}>{viewsRemaining}</span> free video{viewsRemaining !== 1 ? "s" : ""} left
                  </p>
                </div>
              )}

              {isLocked ? (
                <div className="p-4 text-center" style={{ backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "4px" }}>
                  <p className="text-xs mb-3" style={{ color: "#ef4444" }}>
                    You've used your 3 free video views.
                  </p>
                  <Link
                    to="/feedback"
                    className="inline-block px-4 py-2 text-xs font-medium"
                    style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
                  >
                    Submit Glow Feedback to Unlock
                  </Link>
                </div>
              ) : submitted ? (
                <div className="p-4 text-center" style={{ backgroundColor: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px" }}>
                  <p className="text-sm" style={{ color: "#10b981" }}>Comment posted!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitComment} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs outline-none"
                    style={{ backgroundColor: "#060a12", border: "1px solid #1e2d47", color: "#e8edf5", borderRadius: "4px" }}
                  />
                  <textarea
                    placeholder="What do you think about the ambient glow? Is the score accurate?"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3 py-2 text-xs outline-none resize-none"
                    style={{ backgroundColor: "#060a12", border: "1px solid #1e2d47", color: "#e8edf5", borderRadius: "4px" }}
                  />
                  <button
                    type="submit"
                    disabled={createComment.isPending}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase disabled:opacity-50"
                    style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
                  >
                    <Send className="w-3 h-3" />
                    {createComment.isPending ? "Posting..." : "Post Comment"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
