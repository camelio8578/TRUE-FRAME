import { useState, useEffect, useCallback } from "react";

const SESSION_KEY = "tf_session_id";
const VIEWS_KEY = "tf_view_count";
const FEDBACK_KEY = "tf_has_feedback";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function useSession() {
  const [sessionId, setSessionId] = useState<string>("");
  const [viewCount, setViewCount] = useState(0);
  const [hasFeedback, setHasFeedback] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = generateId();
      localStorage.setItem(SESSION_KEY, sid);
    }
    setSessionId(sid);
    setViewCount(parseInt(localStorage.getItem(VIEWS_KEY) || "0", 10));
    setHasFeedback(localStorage.getItem(FEDBACK_KEY) === "true");
  }, []);

  const recordView = useCallback(() => {
    setViewCount((prev) => {
      const next = prev + 1;
      localStorage.setItem(VIEWS_KEY, String(next));
      if (next >= 3 && !hasFeedback) {
        setShowFeedbackModal(true);
      }
      return next;
    });
  }, [hasFeedback]);

  const markFeedbackSubmitted = useCallback(() => {
    setHasFeedback(true);
    setShowFeedbackModal(false);
    localStorage.setItem(FEDBACK_KEY, "true");
  }, []);

  const dismissFeedback = useCallback(() => {
    setShowFeedbackModal(false);
  }, []);

  const viewsRemaining = Math.max(0, 3 - viewCount);
  const isLocked = viewCount >= 3 && !hasFeedback;

  return {
    sessionId,
    viewCount,
    hasFeedback,
    showFeedbackModal,
    viewsRemaining,
    isLocked,
    recordView,
    markFeedbackSubmitted,
    dismissFeedback,
  };
}
