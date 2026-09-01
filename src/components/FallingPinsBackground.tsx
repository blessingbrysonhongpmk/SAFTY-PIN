export function FallingPinsBackground({
  className = '',
}: {
  density?: 'SUBTLE' | 'LOW' | 'MEDIUM';
  interactive?: boolean;
  className?: string;
  zIndex?: number;
  opacity?: number;
}) {
  // Clean, lightweight background for crisp professional aesthetics
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 bg-radial from-accent/3 via-transparent to-transparent opacity-60 ${className}`}
      aria-hidden="true"
    />
  );
}

export default FallingPinsBackground;
