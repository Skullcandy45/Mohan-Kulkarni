import React from 'react';

/** Minimal tooth mark for brand wordmark */
export default function ToothIcon({ className = '', size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12 3C9.5 3 7.5 4.8 7 7.2 6.2 11.5 5 14 5 16.5 5 18.5 6.2 20 8 20.5 8.8 18.8 9.5 17 10 15.5 10.5 17 11.2 18.8 12 20.5 12.8 18.8 13.5 17 14 15.5 14.5 17 15.2 18.8 16 20.5 17.8 20 19 18.5 19 16.5 19 14 17.8 11.5 17 7.2 16.5 4.8 14.5 3 12 3Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M12 8v7"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
