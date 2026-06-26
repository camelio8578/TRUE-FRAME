import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function ScoreRing({ score, size = 160, strokeWidth = 6 }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * score) / 100;

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  let color = "#ef4444";
  let label = "LIKELY SYNTHETIC";
  if (score >= 70) {
    color = "#10b981";
    label = "VERIFIED AUTHENTIC";
  } else if (score >= 40) {
    color = "#f59e0b";
    label = "UNCERTAIN";
  }

  useEffect(() => {
    const controls = animate(count, score, {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return controls.stop;
  }, [score, count]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: size, height: size, transform: "rotate(-90deg)" }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1e2d47"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ transform: "rotate(0deg)" }}
        >
          <motion.span
            className="font-mono text-4xl font-medium"
            style={{ color }}
          >
            {rounded}
          </motion.span>
          <span className="font-mono text-[10px] mt-1" style={{ color: "#7a8ba5", letterSpacing: "0.1em" }}>
            SCORE
          </span>
        </div>
      </div>
      <span
        className="text-xs font-medium mt-4 tracking-wide"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
