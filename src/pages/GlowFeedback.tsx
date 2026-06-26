import { useState } from "react";
import { Link } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import { useSession } from "@/hooks/useSession";
import { Send, CheckCircle, Star } from "lucide-react";

export default function GlowFeedback() {
  const { sessionId, markFeedbackSubmitted } = useSession();
  const [perceivedColor, setPerceivedColor] = useState("");
  const [accuracyRating, setAccuracyRating] = useState(0);
  const [helpfulness, setHelpfulness] = useState(0);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = trpc.comment.submitGlowFeedback.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      markFeedbackSubmitted();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!perceivedColor || accuracyRating === 0 || helpfulness === 0) return;
    submitFeedback.mutate({
      sessionId,
      videoId: 1,
      perceivedColor,
      accuracyRating,
      helpfulness,
      notes: notes || undefined,
    });
  };

  const colorOptions = [
    { value: "blue-green", label: "Blue-Green (Authentic)", color: "#10b981" },
    { value: "amber", label: "Amber (Uncertain)", color: "#f59e0b" },
    { value: "red", label: "Red (Synthetic)", color: "#ef4444" },
    { value: "none", label: "I didn't notice a glow", color: "#4a5a73" },
  ];

  const StarRating = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
    <div className="mb-4">
      <label className="block text-xs mb-2" style={{ color: "#7a8ba5" }}>{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-colors"
          >
            <Star
              className="w-6 h-6"
              style={{ color: star <= value ? "#c8a45c" : "#1e2d47" }}
              fill={star <= value ? "#c8a45c" : "none"}
            />
          </button>
        ))}
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
        <Navigation />
        <div className="pt-20 pb-16 px-6 max-w-[600px] mx-auto text-center">
          <div className="p-10" style={{ backgroundColor: "#0d1320", border: "1px solid #10b981", borderRadius: "4px" }}>
            <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: "#10b981" }} />
            <h2 className="text-xl font-light mb-2" style={{ color: "#e8edf5" }}>Thank You!</h2>
            <p className="text-sm mb-6" style={{ color: "#7a8ba5" }}>
              Your feedback helps us improve the TrueFrame ambient glow. You've unlocked unlimited
              video viewing and commenting.
            </p>
            <Link
              to="/feed"
              className="inline-block px-6 py-2.5 text-xs font-semibold uppercase"
              style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
            >
              Continue to Gallery
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-20 pb-16 px-6 max-w-[600px] mx-auto">
        <h1 className="text-[28px] font-light mb-2" style={{ color: "#e8edf5" }}>
          Glow Feedback
        </h1>
        <p className="text-sm mb-8" style={{ color: "#7a8ba5" }}>
          You've watched 3 videos with TrueFrame ambient glows. Share your experience to unlock
          unlimited viewing. Your feedback directly shapes the open standard.
        </p>

        <div className="p-6" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Perceived Color */}
            <div>
              <label className="block text-xs mb-3" style={{ color: "#7a8ba5" }}>
                What color glow did you notice most on the videos you watched?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPerceivedColor(opt.value)}
                    className="flex items-center gap-3 p-3 text-left transition-colors"
                    style={{
                      backgroundColor: perceivedColor === opt.value ? "#141e33" : "#060a12",
                      border: `1px solid ${perceivedColor === opt.value ? opt.color : "#1e2d47"}`,
                      borderRadius: "4px",
                    }}
                  >
                    <div className="w-4 h-4 rounded-sm shrink-0" style={{ backgroundColor: opt.color }} />
                    <span className="text-xs" style={{ color: "#e8edf5" }}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Star Ratings */}
            <StarRating
              value={accuracyRating}
              onChange={setAccuracyRating}
              label="How accurate did the glow color feel to the actual video content?"
            />

            <StarRating
              value={helpfulness}
              onChange={setHelpfulness}
              label="How helpful is the ambient glow for instantly understanding authenticity?"
            />

            {/* Notes */}
            <div>
              <label className="block text-xs mb-2" style={{ color: "#7a8ba5" }}>
                Any suggestions or observations? (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Did the glow feel intuitive? Was the color distinction clear enough? Any ideas for improvement?"
                rows={4}
                className="w-full px-3 py-2 text-xs outline-none resize-none"
                style={{ backgroundColor: "#060a12", border: "1px solid #1e2d47", color: "#e8edf5", borderRadius: "4px" }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitFeedback.isPending || !perceivedColor || accuracyRating === 0 || helpfulness === 0}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase disabled:opacity-40"
              style={{ backgroundColor: "#c8a45c", color: "#060a12", borderRadius: "2px" }}
            >
              <Send className="w-3 h-3" />
              {submitFeedback.isPending ? "Submitting..." : "Submit Feedback & Unlock"}
            </button>
          </form>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: "#4a5a73" }}>
          Your feedback is public and helps shape the TrueFrame open standard.
          All data may be reviewed and discarded as the system evolves.
        </p>
      </div>

      <Footer />
    </div>
  );
}
