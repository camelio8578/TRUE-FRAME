import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#060a12" }}
    >
      <div className="text-center">
        <h1
          className="font-display text-[120px] font-normal leading-none mb-4"
          style={{ color: "#1e2d47" }}
        >
          404
        </h1>
        <p className="text-lg font-light mb-2" style={{ color: "#e8edf5" }}>
          Page Not Found
        </p>
        <p className="text-sm mb-8" style={{ color: "#7a8ba5" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-200"
          style={{
            backgroundColor: "#c8a45c",
            color: "#060a12",
            borderRadius: "2px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d4b76a")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c8a45c")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
