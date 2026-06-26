import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Gallery", href: "/" },
    { label: "Upload", href: "/upload" },
    { label: "Pitch Deck", href: "/pitch-deck" },
    { label: "Acquisition", href: "/acquisition" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center"
      style={{
        backgroundColor: "rgba(6, 10, 18, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1e2d47",
      }}
    >
      <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" style={{ color: "#c8a45c" }} />
          <span className="text-sm font-medium tracking-[0.08em] uppercase" style={{ color: "#e8edf5" }}>
            TrueFrame
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="px-2.5 py-2 text-[11px] font-normal uppercase tracking-[0.05em] transition-colors duration-300 border-b-2 border-transparent hover:border-[#c8a45c]"
              style={{ color: "#7a8ba5" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8edf5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7a8ba5")}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-4">
              <span className="text-[11px]" style={{ color: "#7a8ba5" }}>{user?.name}</span>
              <button
                onClick={logout}
                className="text-[11px] font-medium uppercase tracking-[0.04em] px-4 py-2 transition-colors duration-200"
                style={{ color: "#060a12", backgroundColor: "#c8a45c", borderRadius: "2px" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d4b76a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c8a45c")}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/upload"
              className="ml-4 text-[11px] font-medium uppercase tracking-[0.04em] px-5 py-2.5 transition-colors duration-200"
              style={{ color: "#060a12", backgroundColor: "#c8a45c", borderRadius: "2px" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d4b76a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c8a45c")}
            >
              Upload Video
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#e8edf5" }}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 lg:hidden p-6 flex flex-col gap-4" style={{ backgroundColor: "rgba(6, 10, 18, 0.98)", borderBottom: "1px solid #1e2d47" }}>
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-sm py-2" style={{ color: "#7a8ba5" }} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <span className="text-sm" style={{ color: "#e8edf5" }}>{user?.name}</span>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm py-2 text-left" style={{ color: "#ef4444" }}>Logout</button>
            </>
          ) : (
            <Link to="/upload" className="text-sm py-2" style={{ color: "#c8a45c" }} onClick={() => setMobileOpen(false)}>Upload Video</Link>
          )}
        </div>
      )}
    </nav>
  );
}
