import React from "react";

export default function Logo({ size = 48 }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="22" fill="#2563EB" />
        <path
          d="M28 52L44 68L72 36"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="72" cy="28" r="6" fill="white" />
      </svg>
      <span className="text-2xl font-semibold text-blue-600">Attendify</span>
    </div>
  );
}
