import React from "react";

const AIAutomationIllustrationSVG = ({ className = "" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 640 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="640" height="400" fill="#FFFFFF" />

      {/* Light blocks */}
      <rect x="80" y="60" width="160" height="220" fill="#F2F4F7" />
      <rect x="300" y="70" width="260" height="170" rx="8" fill="#D8E8FF" />
      <rect x="340" y="250" width="170" height="90" rx="10" fill="#F2F4F7" />

      {/* Dots pattern */}
      <g opacity="0.9">
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 7 }).map((__, c) => (
            <circle
              key={`${r}-${c}`}
              cx={110 + c * 10}
              cy={90 + r * 10}
              r="2"
              fill="#1E78FF"
              opacity="0.65"
            />
          ))
        )}
      </g>

      {/* Big blue circle top */}
      <circle cx="185" cy="90" r="22" fill="#1E78FF" opacity="0.9" />

      {/* Desk */}
      <rect x="120" y="250" width="260" height="12" rx="6" fill="#1E78FF" />
      <rect x="140" y="262" width="10" height="90" fill="#1F2A44" opacity="0.9" />
      <rect x="350" y="262" width="10" height="90" fill="#1F2A44" opacity="0.9" />

      {/* Chair */}
      <rect x="95" y="215" width="35" height="80" rx="10" fill="#1F2A44" />
      <rect x="85" y="290" width="55" height="10" rx="5" fill="#1F2A44" />
      <circle cx="92" cy="305" r="6" fill="#1F2A44" />
      <circle cx="132" cy="305" r="6" fill="#1F2A44" />

      {/* Person (simple flat) */}
      {/* Head */}
      <circle cx="155" cy="190" r="18" fill="#B96A45" />
      {/* Hair */}
      <path
        d="M138 188 C140 170, 170 165, 175 180 C176 195, 162 200, 148 198 Z"
        fill="#1F2A44"
      />
      {/* Body */}
      <path
        d="M140 210 C150 200, 175 205, 180 220 L190 255 L150 255 L135 225 Z"
        fill="#2E3B55"
      />
      {/* Shirt */}
      <path
        d="M150 220 L170 220 L175 245 L150 245 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
      {/* Legs */}
      <path d="M160 255 L195 255 L210 330 L185 330 Z" fill="#5DA8FF" />
      <path d="M150 255 L175 255 L165 330 L140 330 Z" fill="#5DA8FF" />
      {/* Shoes */}
      <rect x="135" y="328" width="40" height="10" rx="4" fill="#1F2A44" />
      <rect x="180" y="328" width="40" height="10" rx="4" fill="#1F2A44" />

      {/* Monitor */}
      <rect x="210" y="190" width="80" height="55" rx="6" fill="#CFE3FF" />
      <rect x="245" y="245" width="10" height="18" fill="#1F2A44" />
      <rect x="230" y="262" width="40" height="6" rx="3" fill="#1F2A44" />

      {/* Login card (right blue UI) */}
      <rect x="355" y="95" width="190" height="130" rx="10" fill="#8EC1FF" />
      <rect x="380" y="125" width="140" height="14" rx="5" fill="#FFFFFF" opacity="0.95" />
      <rect x="380" y="150" width="140" height="14" rx="5" fill="#FFFFFF" opacity="0.95" />
      <rect x="380" y="175" width="80" height="16" rx="6" fill="#1E78FF" />

      {/* AI Automation Reply bubbles */}
      <g>
        {/* Bubble 1 */}
        <rect x="350" y="250" width="210" height="36" rx="10" fill="#FFFFFF" />
        <circle cx="365" cy="268" r="10" fill="#1E78FF" />
        <text x="385" y="273" fontSize="11" fill="#1F2A44" fontFamily="Arial">
          AI: Auto-reply sent instantly ✅
        </text>

        {/* Bubble 2 */}
        <rect x="350" y="295" width="240" height="40" rx="10" fill="#FFFFFF" />
        <circle cx="365" cy="315" r="10" fill="#00C389" />
        <text x="385" y="312" fontSize="11" fill="#1F2A44" fontFamily="Arial">
          User: Thanks! Problem solved 🙌
        </text>
        <text x="385" y="327" fontSize="10" fill="#6B7280" fontFamily="Arial">
          Satisfaction improved by automation
        </text>
      </g>

      {/* Small chart bars */}
      <g>
        <rect x="365" y="270" width="10" height="45" fill="#1E78FF" opacity="0.9" />
        <rect x="380" y="285" width="10" height="30" fill="#1E78FF" opacity="0.7" />
        <rect x="395" y="260" width="10" height="55" fill="#1E78FF" opacity="0.55" />
        <rect x="410" y="290" width="10" height="25" fill="#1E78FF" opacity="0.4" />
      </g>

      {/* Plant */}
      <rect x="520" y="300" width="35" height="30" rx="6" fill="#1E78FF" opacity="0.25" />
      <circle cx="538" cy="295" r="10" fill="#1E78FF" opacity="0.9" />
      <circle cx="552" cy="305" r="8" fill="#1E78FF" opacity="0.7" />
      <circle cx="528" cy="305" r="7" fill="#1E78FF" opacity="0.6" />

      {/* Trash bin */}
      <rect x="280" y="300" width="30" height="35" rx="5" fill="#CFE3FF" />
      <rect x="275" y="295" width="40" height="8" rx="4" fill="#1E78FF" opacity="0.7" />
    </svg>
  );
};

export default AIAutomationIllustrationSVG;
