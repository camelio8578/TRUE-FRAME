import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

type ScenarioKey = "conservative" | "base" | "optimistic";

export default function FinancialModel() {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("base");
  const { data: scenarios } = trpc.financial.getScenarios.useQuery();
  const { data: assumptions } = trpc.financial.getAssumptions.useQuery();
  const { data: milestones } = trpc.financial.getTractionMilestones.useQuery();
  const { data: enables } = trpc.financial.getWhatThisEnables.useQuery();

  const activeData = scenarios?.[activeScenario];
  const scenarioColors: Record<ScenarioKey, string> = {
    conservative: "#ef4444",
    base: "#f59e0b",
    optimistic: "#10b981",
  };
  const scenarioLabels: Record<ScenarioKey, string> = {
    conservative: "CONSERVATIVE",
    base: "BASE CASE",
    optimistic: "OPTIMISTIC",
  };

  const months = Array.from({ length: 36 }, (_, i) => `M${i + 1}`);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Conservative",
        data: scenarios?.conservative.data.arr.map((v: number) => v / 1000) || [],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.03)",
        borderDash: [5, 5],
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "Base Case",
        data: scenarios?.base.data.arr.map((v: number) => v / 1000) || [],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.03)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "Optimistic",
        data: scenarios?.optimistic.data.arr.map((v: number) => v / 1000) || [],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.03)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "#7a8ba5", font: { family: "'JetBrains Mono', monospace", size: 11 }, usePointStyle: true, pointStyleWidth: 8 },
      },
      tooltip: {
        backgroundColor: "#0d1320",
        titleColor: "#e8edf5",
        bodyColor: "#7a8ba5",
        borderColor: "#2a3f63",
        borderWidth: 1,
        titleFont: { family: "'JetBrains Mono', monospace" },
        bodyFont: { family: "'Inter', sans-serif" },
        callbacks: { label: (context: { dataset: { label?: string }; parsed: { y: number | null } }) => `${context.dataset.label}: $${(context.parsed.y || 0).toFixed(0)}K ARR` },
      },
    },
    scales: {
      x: { grid: { color: "#1e2d47" }, ticks: { color: "#7a8ba5", font: { family: "'JetBrains Mono', monospace", size: 9 }, maxTicksLimit: 12 } },
      y: { grid: { color: "#1e2d47" }, ticks: { color: "#7a8ba5", font: { family: "'JetBrains Mono', monospace", size: 9 }, callback: (v: string | number) => `$${Number(v).toFixed(0)}K` } },
    },
  };

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.15em] mb-3" style={{ color: "#c8a45c" }}>REVISED PROJECTION — TRACTION-BASED</p>
          <h1 className="text-[40px] font-light mb-4" style={{ color: "#e8edf5" }}>
            Financial Model
          </h1>
          <p className="text-[15px] max-w-[700px]" style={{ color: "#7a8ba5" }}>
            Built from a real starting point: <strong style={{ color: "#e8edf5" }}>500 organic video uploads</strong>,
            100% user agreement that the ambient glow genuinely helps detect AI vs. authentic content,
            and <strong style={{ color: "#e8edf5" }}>167 explicit confirmations</strong> that zero-effort recognition works.
          </p>
        </div>

        {/* Key Proof Point Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { value: "500", label: "Organic video uploads", sub: "Zero marketing spend", color: "#3b82f6" },
            { value: "167", label: 'Explicit "zero effort" confirmations', sub: "33.4% of all users", color: "#10b981" },
            { value: "100%", label: "Agree the glow is helpful", sub: "For recognizing AI vs. real", color: "#c8a45c" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 text-center" style={{ backgroundColor: "#0d1320", border: `1px solid ${stat.color}30`, borderRadius: "4px" }}>
              <p className="font-display text-5xl mb-2" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm font-medium mb-1" style={{ color: "#e8edf5" }}>{stat.label}</p>
              <p className="text-xs" style={{ color: "#4a5a73" }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Scenario Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {(Object.keys(scenarioLabels) as ScenarioKey[]).map((key) => {
            const s = scenarios?.[key];
            const isActive = activeScenario === key;
            return (
              <button key={key} onClick={() => setActiveScenario(key)} className="text-left p-8 transition-all" style={{ backgroundColor: "#0d1320", border: `1px solid ${isActive ? scenarioColors[key] : "#1e2d47"}`, borderTop: isActive ? `3px solid ${scenarioColors[key]}` : "1px solid #1e2d47", borderRadius: "4px", cursor: "pointer" }}>
                <p className="font-mono text-[11px] tracking-[0.1em] mb-2" style={{ color: scenarioColors[key] }}>{scenarioLabels[key]}</p>
                <p className="text-[13px] leading-[1.6] mb-4" style={{ color: "#7a8ba5" }}>{s?.description}</p>
                <div className="flex gap-6">
                  <div>
                    <p className="font-display text-3xl" style={{ color: "#e8edf5" }}>${((s?.month18ARR || 0) / 1000000).toFixed(1)}M</p>
                    <p className="font-mono text-[9px]" style={{ color: "#4a5a73" }}>MONTH 18 ARR</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl" style={{ color: "#e8edf5" }}>${((s?.month36ARR || 0) / 1000000).toFixed(1)}M</p>
                    <p className="font-mono text-[9px]" style={{ color: "#4a5a73" }}>MONTH 36 ARR</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ARR Chart */}
        <div className="mb-12 p-8" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
          <h2 className="text-lg font-medium mb-2" style={{ color: "#e8edf5" }}>Annual Recurring Revenue — 36 Month Projection</h2>
          <p className="text-xs mb-6" style={{ color: "#4a5a73" }}>Values in thousands of dollars. Based on organic growth from 500-upload proof point.</p>
          <div style={{ height: "400px" }}>
            {scenarios && <Line data={chartData} options={chartOptions} />}
          </div>
        </div>

        {/* Monthly Revenue Table */}
        <div className="mb-12">
          <h2 className="text-xl font-normal mb-4" style={{ color: "#e8edf5" }}>
            Monthly Revenue — {scenarioLabels[activeScenario]} Scenario
          </h2>
          <div style={{ border: "1px solid #1e2d47", borderRadius: "4px", overflow: "hidden" }}>
            <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 py-3 px-4" style={{ backgroundColor: "#0d1320" }}>
              {["", "M6", "M12", "M18", "M24", "M30", "M36"].map((h) => (
                <span key={h} className={`font-mono text-[10px] tracking-[0.06em] ${h ? "text-right" : ""}`} style={{ color: "#7a8ba5" }}>{h}</span>
              ))}
            </div>
            {[
              { label: "Monthly Revenue", getter: (m: number) => activeData?.data.revenue[m - 1] || 0 },
              { label: "Cumulative Revenue", getter: (m: number) => activeData?.data.cumulativeRevenue[m - 1] || 0 },
              { label: "Implied ARR", getter: (m: number) => (activeData?.data.revenue[m - 1] || 0) * 12 },
              { label: "Active Users", getter: (m: number) => activeData?.data.platformUsers[m - 1] || 0 },
              { label: "Videos Scored", getter: (m: number) => activeData?.data.scoredVideos[m - 1] || 0 },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 py-2.5 px-4" style={{ borderTop: "1px solid #1e2d47" }}>
                <span className="text-[10px] font-medium" style={{ color: "#e8edf5" }}>{row.label}</span>
                {[6, 12, 18, 24, 30, 36].map((m) => {
                  const val = row.getter(m);
                  const isMoney = row.label.includes("Revenue") || row.label.includes("ARR");
                  return (
                    <span key={m} className="font-mono text-[11px] text-right" style={{ color: val ? "#e8edf5" : "#4a5a73" }}>
                      {val ? (isMoney ? `$${val >= 1000 ? (val / 1000).toFixed(1) + "K" : val.toLocaleString()}` : val.toLocaleString()) : "—"}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* What This Enables — The Funding Roadmap */}
        <div className="mb-12">
          <h2 className="text-2xl font-normal mb-6" style={{ color: "#e8edf5" }}>
            What the 500-Upload Proof Enables
          </h2>
          <div className="space-y-4">
            {enables?.map((stage, i) => (
              <div key={i} className="p-6" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderLeft: `3px solid ${i === 0 ? "#10b981" : i === 1 ? "#3b82f6" : i === 2 ? "#c8a45c" : "#ef4444"}`, borderRadius: "4px" }}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                  <h3 className="text-base font-medium" style={{ color: "#e8edf5" }}>{stage.stage}</h3>
                  <div className="flex gap-6 shrink-0">
                    <div className="text-right">
                      <p className="font-mono text-sm" style={{ color: "#c8a45c" }}>{stage.raise}</p>
                      <p className="font-mono text-[9px]" style={{ color: "#4a5a73" }}>RAISE</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm" style={{ color: "#e8edf5" }}>{stage.valuation}</p>
                      <p className="font-mono text-[9px]" style={{ color: "#4a5a73" }}>PRE-MONEY</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs mb-2" style={{ color: "#7a8ba5" }}>From: {stage.from}</p>
                <p className="text-sm leading-[1.6]" style={{ color: "#7a8ba5" }}>{stage.why}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traction Milestones */}
        <div className="mb-12">
          <h2 className="text-2xl font-normal mb-6" style={{ color: "#e8edf5" }}>
            Traction Milestones
          </h2>
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-[1px]" style={{ backgroundColor: "#1e2d47" }} />
            {milestones?.map((m, i) => (
              <div key={i} className="relative mb-6 last:mb-0">
                <div className="absolute -left-4 top-1 w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                <p className="font-mono text-[10px] mb-1" style={{ color: m.color }}>{m.month === 0 ? "NOW" : m.month <= 12 ? `MONTH ${m.month}` : `MONTH ${m.month}`}</p>
                <p className="text-sm font-medium mb-1" style={{ color: "#e8edf5" }}>{m.label}</p>
                <p className="text-xs" style={{ color: "#7a8ba5" }}>{m.metric}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom-Up Assumptions */}
        <div>
          <h2 className="text-2xl font-normal mb-6" style={{ color: "#e8edf5" }}>
            Bottom-Up Assumptions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {assumptions?.map((a) => (
              <div key={a.metric} className="p-4" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
                <p className="text-[12px] mb-1" style={{ color: "#7a8ba5" }}>{a.metric}</p>
                <p className="font-mono text-base mb-1" style={{ color: "#e8edf5" }}>{a.value}</p>
                <p className="text-[11px]" style={{ color: "#4a5a73" }}>{a.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
