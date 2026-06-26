import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { ShieldCheck, LogIn, UserPlus } from "lucide-react";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/dashboard";
    },
    onError: (err) => setError(err.message),
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/dashboard";
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    if (mode === "login") {
      loginMutation.mutate({ username, password });
    } else {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      registerMutation.mutate({
        username,
        password,
        displayName: displayName || username,
      });
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#060a12" }}
    >
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <ShieldCheck className="w-6 h-6" style={{ color: "#c8a45c" }} />
            <span
              className="text-lg font-medium tracking-[0.08em] uppercase"
              style={{ color: "#e8edf5" }}
            >
              TrueFrame
            </span>
          </Link>
          <h1 className="text-2xl font-light" style={{ color: "#e8edf5" }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm mt-2" style={{ color: "#7a8ba5" }}>
            {mode === "login"
              ? "Sign in to access the analysis dashboard"
              : "Register to start analyzing videos"}
          </p>
        </div>

        {/* OAuth */}
        <button
          onClick={() => {
            window.location.href = getOAuthUrl();
          }}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors duration-200 mb-6"
          style={{
            backgroundColor: "#0d1320",
            border: "1px solid #1e2d47",
            color: "#e8edf5",
            borderRadius: "4px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2a3f63")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e2d47")}
        >
          <LogIn className="w-4 h-4" />
          Sign in with Kimi
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-[1px]" style={{ backgroundColor: "#1e2d47" }} />
          <span className="text-xs font-mono" style={{ color: "#4a5a73" }}>
            OR
          </span>
          <div className="flex-1 h-[1px]" style={{ backgroundColor: "#1e2d47" }} />
        </div>

        {/* Local Auth Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              className="mb-4 p-3 text-sm"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                borderRadius: "4px",
              }}
            >
              {error}
            </div>
          )}

          {mode === "register" && (
            <div className="mb-4">
              <label className="block text-xs mb-2" style={{ color: "#7a8ba5" }}>
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 text-sm outline-none transition-colors duration-200"
                style={{
                  backgroundColor: "#0d1320",
                  border: "1px solid #1e2d47",
                  color: "#e8edf5",
                  borderRadius: "4px",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#2a3f63")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#1e2d47")}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-xs mb-2" style={{ color: "#7a8ba5" }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full px-4 py-3 text-sm outline-none transition-colors duration-200"
              style={{
                backgroundColor: "#0d1320",
                border: "1px solid #1e2d47",
                color: "#e8edf5",
                borderRadius: "4px",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#2a3f63")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e2d47")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs mb-2" style={{ color: "#7a8ba5" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 text-sm outline-none transition-colors duration-200"
              style={{
                backgroundColor: "#0d1320",
                border: "1px solid #1e2d47",
                color: "#e8edf5",
                borderRadius: "4px",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#2a3f63")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e2d47")}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-[0.04em] transition-colors duration-200 disabled:opacity-50"
            style={{
              backgroundColor: "#c8a45c",
              color: "#060a12",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.backgroundColor = "#d4b76a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#c8a45c";
            }}
          >
            {isLoading ? (
              "Processing..."
            ) : mode === "login" ? (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <p className="text-center text-sm mt-6" style={{ color: "#7a8ba5" }}>
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => { setMode("register"); setError(""); }}
                className="transition-colors duration-200 hover:underline"
                style={{ color: "#c8a45c" }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("login"); setError(""); }}
                className="transition-colors duration-200 hover:underline"
                style={{ color: "#c8a45c" }}
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
