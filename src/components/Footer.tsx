import { Link } from "react-router";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const links = [
    { label: "Platform", href: "/dashboard" },
    { label: "Technology", href: "/technology" },
    { label: "Financial Model", href: "/financials" },
    { label: "Team", href: "/team" },
    { label: "IP & Governance", href: "/ip-governance" },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#060a12",
        borderTop: "1px solid #1e2d47",
        padding: "48px 0",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4" style={{ color: "#c8a45c" }} />
            <span className="text-sm font-medium tracking-[0.08em] uppercase" style={{ color: "#e8edf5" }}>
              TrueFrame
            </span>
          </div>
          <p className="text-xs" style={{ color: "#7a8ba5" }}>
            The Universal Standard for Video Authenticity
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-xs transition-colors duration-200 hover:text-[#e8edf5]"
              style={{ color: "#7a8ba5" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="text-right">
          <p className="text-xs" style={{ color: "#4a5a73" }}>
            &copy; 2026 TrueFrame. All rights reserved.
          </p>
          <p className="text-xs mt-1" style={{ color: "#4a5a73" }}>
            Confidential &mdash; Investor Materials
          </p>
        </div>
      </div>
    </footer>
  );
}
