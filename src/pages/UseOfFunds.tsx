import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UseOfFunds() {
  const { data: funds } = trpc.financial.getUseOfFunds.useQuery();

  const doughnutData = funds
    ? {
        labels: funds.map((f) => f.name),
        datasets: [
          {
            data: funds.map((f) => f.amount),
            backgroundColor: funds.map((f) => f.color),
            borderColor: "#060a12",
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      }
    : null;

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0d1320",
        titleColor: "#e8edf5",
        bodyColor: "#7a8ba5",
        borderColor: "#2a3f63",
        borderWidth: 1,
        callbacks: {
          label: (context: { parsed: number; label?: string }) => {
            const val = context.parsed;
            const pct = ((val / 2500000) * 100).toFixed(1);
            return `${context.label}: $${val.toLocaleString()} (${pct}%)`;
          },
        },
      },
    },
  };

  const total = funds?.reduce((a, f) => a + f.amount, 0) || 2500000;

  return (
    <div style={{ backgroundColor: "#060a12", minHeight: "100vh" }}>
      <Navigation />

      <div className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
        <h1 className="text-[40px] font-light mb-3" style={{ color: "#e8edf5" }}>
          Use of Funds
        </h1>
        <p className="text-[15px] mb-12" style={{ color: "#7a8ba5" }}>
          $2,500,000 Seed Round — 18-month runway to Series A readiness
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12">
          {/* Doughnut Chart */}
          <div className="flex flex-col items-center">
            <div className="relative" style={{ width: "320px", height: "320px" }}>
              {doughnutData && <Doughnut data={doughnutData} options={doughnutOptions} />}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-display text-[28px]" style={{ color: "#e8edf5" }}>
                  $2.5M
                </span>
                <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "#7a8ba5" }}>
                  TOTAL
                </span>
              </div>
            </div>
          </div>

          {/* Fund Items */}
          <div className="flex flex-col gap-3">
            {funds?.map((item) => {
              const pct = ((item.amount / 2500000) * 100).toFixed(1);
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-4"
                  style={{
                    backgroundColor: "#0d1320",
                    border: "1px solid #1e2d47",
                    borderRadius: "4px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm" style={{ color: "#e8edf5" }}>
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm" style={{ color: "#e8edf5" }}>
                      ${item.amount.toLocaleString()}
                    </span>
                    <span className="font-mono text-[11px] ml-2" style={{ color: "#7a8ba5" }}>
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Total */}
            <div
              className="flex items-center justify-between p-4 mt-2"
              style={{
                backgroundColor: "#141e33",
                border: "1px solid #2a3f63",
                borderRadius: "4px",
              }}
            >
              <span className="text-sm font-semibold" style={{ color: "#e8edf5" }}>
                TOTAL ALLOCATED
              </span>
              <span className="font-mono text-lg font-semibold" style={{ color: "#c8a45c" }}>
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Buffer Note */}
        <div
          className="mt-8 pl-4 py-3"
          style={{
            borderLeft: "2px solid #f59e0b",
          }}
        >
          <p className="text-[13px]" style={{ color: "#7a8ba5" }}>
            The 20% buffer and working capital reserve ensure the company can survive conservative-case
            revenue delays of up to 6 months without additional fundraising. This addresses the original
            criticism that the use of funds ($1.13M) did not match the ask ($2.5M). The revised breakdown
            includes a full 20% contingency buffer plus a working capital reserve that extends effective
            runway by an additional 3-4 months in the conservative scenario.
          </p>
        </div>

        {/* Why This Matters */}
        <div className="mt-16 p-8" style={{ backgroundColor: "#0d1320", border: "1px solid #1e2d47", borderRadius: "4px" }}>
          <h2 className="text-xl font-medium mb-4" style={{ color: "#e8edf5" }}>
            Addressing the Original Gap
          </h2>
          <p className="text-[15px] leading-[1.7] mb-4" style={{ color: "#7a8ba5" }}>
            The original VC package showed $1.13M in use of funds against a $2.5M ask — leaving $1.37M
            unaccounted for. This revised breakdown closes that gap with three additions:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-[15px]" style={{ color: "#7a8ba5" }}>
            <li>
              <strong style={{ color: "#e8edf5" }}>20% Buffer ($500K)</strong> — Standard contingency for
              unforeseen costs, market shifts, or the need for additional hires.
            </li>
            <li>
              <strong style={{ color: "#e8edf5" }}>Working Capital Reserve ($665K)</strong> — Operating
              reserve specifically designed to bridge 6 months of conservative-case revenue delays.
            </li>
            <li>
              <strong style={{ color: "#e8edf5" }}>Extended Founder Runway</strong> — Increased from
              6 months to 12 months to ensure founder stability through the full seed period.
            </li>
          </ol>
        </div>
      </div>

      <Footer />
    </div>
  );
}
