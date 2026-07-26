type Props = {
  size?: number;
  variant?: "compact" | "full";
  className?: string;
};

export function LogoMark({ size = 28, variant = "compact", className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      role="img"
      aria-label="ProjectBlock"
      className={className}
    >
      {variant === "full" && (
        <path
          d="M8 8 H152 V112 L112 152 H8 Z"
          fill="none"
          stroke="#00e5cc"
          strokeWidth={3}
          opacity={0.55}
        />
      )}
      <rect x={104} y={26} width={22} height={26} fill="#00e5cc" opacity={0.38} />
      <rect x={26} y={60} width={108} height={8} fill="#ffffff" />
      <rect x={40} y={104} width={22} height={30} fill="#00e5cc" opacity={0.6} />
      <rect x={72} y={88} width={22} height={46} fill="#00e5cc" opacity={0.8} />
      <rect x={104} y={72} width={22} height={62} fill="#00e5cc" />
    </svg>
  );
}
