import React from "react";

/**
 * Minimalist chess piece SVG icons tailored for Ocean Professional theme.
 * - Knight: used for X player (primary color)
 * - Queen: used for O player (secondary color)
 * Icons are scalable via size prop and inherit a soft drop shadow for depth.
 */

// PUBLIC_INTERFACE
export const KnightIcon: React.FC<{
  /** Icon pixel size (width and height). Default 56. */
  size?: number;
  /** Stroke/fill main color. */
  color?: string;
  /** Optional className for external styling. */
  className?: string;
}> = ({ size = 56, color = "#2563EB", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Knight"
      className={className}
      style={{
        filter: "drop-shadow(0 1px 0 rgba(17,24,39,0.04))",
        display: "block",
      }}
    >
      <defs>
        <linearGradient id="knightSoft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {/* Base / stand */}
      <rect x="14" y="50" width="36" height="6" rx="3" fill={`${color}22`} />
      <rect x="18" y="46" width="28" height="4" rx="2" fill={`${color}33`} />
      {/* Simplified knight body */}
      <path
        d="M40 14c-3.5 0-7.5 2.2-9.5 4.8l-6.2 8.1c-.7.9-1.1 2-1.1 3.1v1.2c0 1.7 1 3.3 2.6 4l2.5 1.1c.5.2.8.6.8 1.1 0 .6-.4 1.1-1 1.2l-4.8.8c-1.9.3-3.3 2-3.3 3.9V46h22c2.2 0 4-1.8 4-4V26c0-3.3-1.8-6.3-4.7-7.9l-.9-.5c-.7-.4-1.4-.6-2.2-.6z"
        fill="url(#knightSoft)"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Eye */}
      <circle cx="38" cy="22" r="1.6" fill="#0b1220" fillOpacity="0.8" />
      {/* Mane hint */}
      <path
        d="M30 20c-1.2 1.4-2.3 3.1-3.2 5"
        stroke={`${color}AA`}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

// PUBLIC_INTERFACE
export const QueenIcon: React.FC<{
  /** Icon pixel size (width and height). Default 56. */
  size?: number;
  /** Stroke/fill main color. */
  color?: string;
  /** Optional className for external styling. */
  className?: string;
}> = ({ size = 56, color = "#F59E0B", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Queen"
      className={className}
      style={{
        filter: "drop-shadow(0 1px 0 rgba(17,24,39,0.04))",
        display: "block",
      }}
    >
      <defs>
        <linearGradient id="queenSoft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {/* Base / stand */}
      <rect x="12" y="50" width="40" height="6" rx="3" fill={`${color}22`} />
      <rect x="16" y="46" width="32" height="4" rx="2" fill={`${color}33`} />
      {/* Crown points */}
      <path
        d="M16 24l6 6 6-10 6 10 6-10 6 10 6-6"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Queen body */}
      <path
        d="M20 24c0 10 3 14 12 14s12-4 12-14"
        fill="url(#queenSoft)"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Waist and skirt */}
      <path
        d="M18 40c3.5 0 8 2 14 2s10.5-2 14-2v4c0 2.2-1.8 4-4 4H22c-2.2 0-4-1.8-4-4v-4z"
        fill={`${color}33`}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Crown beads */}
      <circle cx="16" cy="24" r="2" fill={color} />
      <circle cx="26" cy="20" r="2" fill={color} />
      <circle cx="32" cy="18" r="2" fill={color} />
      <circle cx="38" cy="20" r="2" fill={color} />
      <circle cx="48" cy="24" r="2" fill={color} />
    </svg>
  );
};
