export function NetflixLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="netflix-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B1060F" />
          <stop offset="100%" stopColor="#E50914" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="#000000" rx="15%" />
      <g transform="translate(120, 80)">
        {/* Left bar */}
        <rect x="0" y="0" width="70" height="352" fill="url(#netflix-gradient)" />

        {/* Diagonal bar */}
        <polygon
          points="0,0 70,0 272,352 202,352"
          fill="url(#netflix-gradient)"
        />

        {/* Right bar */}
        <rect x="202" y="0" width="70" height="352" fill="url(#netflix-gradient)" />

        {/* Shadow effect */}
        <polygon
          points="70,0 140,0 272,263 202,263"
          fill="#000000"
          opacity="0.2"
        />
      </g>
    </svg>
  );
}