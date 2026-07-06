interface IconProps {
  size?: number;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconGrid = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" />
    <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.5" />
    <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.5" />
    <rect x="9" y="9" width="5.5" height="5.5" rx="1.5" />
  </svg>
);

export const IconChart = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M1.5 14.5h13" />
    <path d="M2.5 11l3.5-3.5 2.5 2 4.5-5" />
    <path d="M10 4.5h3v3" />
  </svg>
);

export const IconUsers = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="5.5" cy="5" r="2.5" />
    <path d="M1.5 13.5c0-2.2 1.8-4 4-4s4 1.8 4 4" />
    <path d="M10.5 2.8a2.5 2.5 0 010 4.4M11.5 9.7c1.8.5 3 2 3 3.8" />
  </svg>
);

export const IconCalendar = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="1.5" y="2.5" width="13" height="12" rx="2" />
    <path d="M1.5 6h13M5 1v3M11 1v3" />
  </svg>
);

export const IconDollar = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="8" cy="8" r="6.5" />
    <path d="M10 5.8c-.4-.7-1.1-1-2-1-1.2 0-2 .6-2 1.5C6 8.6 10 7.4 10 9.7c0 .9-.8 1.5-2 1.5-.9 0-1.6-.3-2-1M8 3.6v1.2M8 11.2v1.2" />
  </svg>
);

export const IconFolder = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M1.5 4a1.5 1.5 0 011.5-1.5h3l1.5 2h5.5A1.5 1.5 0 0114.5 6v6a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 12V4z" />
  </svg>
);

export const IconBolt = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M8.8 1.5L3 9h4l-.8 5.5L12 7H8l.8-5.5z" />
  </svg>
);

export const IconGear = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="8" cy="8" r="2.2" />
    <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4" />
  </svg>
);

export const IconTrendUp = ({ size = 12 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M2 12l4.5-4.5 3 2.5L14 4" />
    <path d="M9.5 4H14v4.5" />
  </svg>
);

export const IconCheck = ({ size = 13 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M2.5 8.5l3.5 3.5 7.5-8" />
  </svg>
);
