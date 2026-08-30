import { useEffect, useRef, useCallback } from 'react';

export type DensityLevel = 'SUBTLE' | 'LOW' | 'MEDIUM';

interface FallingPinsBackgroundProps {
  density?: DensityLevel;
  interactive?: boolean;
  className?: string;
  zIndex?: number;
  opacity?: number;
}

interface PinParticle {
  id: number;
  x: number;
  y: number;
  z: number; // depth: 0.1 (far) to 1.0 (near)
  baseVy: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  tiltX: number;
  tiltY: number;
  vTiltX: number;
  vTiltY: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  pinType: 'CLASSIC' | 'BULB' | 'HEAVY';
  opacity: number;
  glintPhase: number;
  glintSpeed: number;
}

// Pure polished silver / chrome metallic palette
const SILVER_THEME = {
  wire: '#8a949e',
  wireHighlight: '#ffffff',
  wireShadow: '#4a525d',
  claspLight: '#f0f4f8',
  claspMid: '#d3dbe3',
  claspDark: '#5c6773',
  glow: 'rgba(255, 255, 255, 0.5)',
  accent: '#ffffff',
};

const DENSITY_COUNTS: Record<DensityLevel, number> = {
  SUBTLE: 9,
  LOW: 14,
  MEDIUM: 20,
};

export function FallingPinsBackground({
  density = 'LOW',
  interactive = true,
  className = '',
  zIndex = 0,
  opacity = 1.0,
}: FallingPinsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<PinParticle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const mouseRef = useRef<{ x: number; y: number; vx: number; vy: number; lastX: number; lastY: number; active: boolean }>({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    lastX: -9999,
    lastY: -9999,
    active: false,
  });

  // Create a randomized silver safety pin particle
  const createParticle = useCallback((
    canvasWidth: number,
    canvasHeight: number,
    spawnAbove = false,
    customZ?: number
  ): PinParticle => {
    const z = customZ !== undefined ? customZ : Math.random() * 0.85 + 0.15; // depth factor

    const pinTypes: ('CLASSIC' | 'BULB' | 'HEAVY')[] = ['CLASSIC', 'CLASSIC', 'BULB', 'HEAVY'];
    const pinType = pinTypes[Math.floor(Math.random() * pinTypes.length)];

    // Refined, subtle sizing and gentle fall speeds
    const size = (16 + z * 24) * (pinType === 'HEAVY' ? 1.1 : pinType === 'BULB' ? 0.9 : 1.0);
    const baseVy = 0.25 + z * 0.75 + Math.random() * 0.2; // Gentle falling speed

    return {
      id: Math.random(),
      x: Math.random() * canvasWidth,
      y: spawnAbove ? -size * 2 - Math.random() * (canvasHeight * 0.2) : Math.random() * canvasHeight,
      z,
      baseVy,
      vx: (Math.random() - 0.5) * 0.25,
      vy: baseVy,
      size,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * (0.006 + (1 - z) * 0.008),
      tiltX: Math.random() * Math.PI * 2,
      tiltY: Math.random() * Math.PI * 2,
      vTiltX: (Math.random() - 0.5) * 0.012,
      vTiltY: (Math.random() - 0.5) * 0.014,
      swayAmp: 0.4 + z * 0.8 + Math.random() * 0.4,
      swayFreq: 0.0008 + Math.random() * 0.0012,
      swayPhase: Math.random() * Math.PI * 2,
      pinType,
      // Subtle background opacity: ranges from 0.12 to 0.32 max
      opacity: (0.12 + z * 0.22) * opacity,
      glintPhase: Math.random() * Math.PI * 2,
      glintSpeed: 0.0015 + Math.random() * 0.002,
    };
  }, [opacity]);

  // Initialize particle pool
  const initParticles = useCallback((canvasWidth: number, canvasHeight: number) => {
    const targetCount = DENSITY_COUNTS[density];
    const newParticles: PinParticle[] = [];
    for (let i = 0; i < targetCount; i++) {
      newParticles.push(createParticle(canvasWidth, canvasHeight, false));
    }
    particlesRef.current = newParticles;
  }, [createParticle, density]);

  // Draw an individual silver safety pin
  const drawSafetyPin = (
    ctx: CanvasRenderingContext2D,
    p: PinParticle,
    now: number
  ) => {
    const theme = SILVER_THEME;

    ctx.save();
    ctx.translate(p.x, p.y);

    // 2D rotation + 3D perspective foreshortening
    ctx.rotate(p.rotation);
    const cosX = Math.cos(p.tiltX);
    const cosY = Math.cos(p.tiltY);
    const scaleX = (cosY >= 0 ? 1 : -1) * (0.25 + 0.75 * Math.abs(cosY));
    const scaleY = (cosX >= 0 ? 1 : -1) * (0.35 + 0.65 * Math.abs(cosX));
    ctx.scale(scaleX, scaleY);

    const s = p.size;
    const L = s; // Total length
    const W = s * 0.30; // Width between arms
    const wireRadius = Math.max(0.9, s * 0.038);
    const springRadius = W * 0.55;

    // Specular silver glint calculation
    const lightAngle = 0.785; // 45 deg
    const alignment = Math.cos(p.rotation - lightAngle) * Math.cos(p.tiltX);
    const glint = Math.pow(Math.max(0, alignment), 6) * Math.abs(Math.sin(now * p.glintSpeed + p.glintPhase));

    ctx.globalAlpha = p.opacity;

    const topY = -L * 0.48;
    const claspH = L * 0.25;
    const spineX = W * 0.5;
    const pinArmX = -W * 0.5;
    const coilCenterY = L * 0.36;

    // 1. BACK WIRE (SPINE)
    ctx.beginPath();
    ctx.moveTo(spineX, topY + claspH * 0.7);
    ctx.lineTo(spineX, coilCenterY - springRadius * 0.4);
    ctx.strokeStyle = theme.wireShadow;
    ctx.lineWidth = wireRadius + 0.8;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(spineX, topY + claspH * 0.7);
    ctx.lineTo(spineX, coilCenterY - springRadius * 0.4);
    ctx.strokeStyle = theme.wire;
    ctx.lineWidth = wireRadius;
    ctx.stroke();

    // Specular highlight line
    ctx.beginPath();
    ctx.moveTo(spineX - 0.3, topY + claspH * 0.75);
    ctx.lineTo(spineX - 0.3, coilCenterY - springRadius * 0.5);
    ctx.strokeStyle = theme.wireHighlight;
    ctx.lineWidth = Math.max(0.5, wireRadius * 0.35);
    ctx.stroke();

    // 2. BOTTOM SPRING COIL
    if (p.pinType === 'BULB') {
      ctx.beginPath();
      ctx.moveTo(spineX, coilCenterY - springRadius * 0.4);
      ctx.bezierCurveTo(
        spineX + W * 0.35,
        coilCenterY + springRadius * 0.75,
        pinArmX - W * 0.35,
        coilCenterY + springRadius * 0.75,
        pinArmX,
        coilCenterY - springRadius * 0.4
      );
      ctx.strokeStyle = theme.wire;
      ctx.lineWidth = wireRadius;
      ctx.stroke();
    } else {
      const coilLoops = p.pinType === 'HEAVY' ? 2 : 1;
      for (let loop = 0; loop < coilLoops; loop++) {
        const offset = (loop - (coilLoops - 1) / 2) * (wireRadius * 0.6);
        ctx.beginPath();
        ctx.arc(0, coilCenterY + offset, springRadius, -0.2, Math.PI * 1.85, false);
        ctx.strokeStyle = theme.wireShadow;
        ctx.lineWidth = wireRadius + 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, coilCenterY + offset, springRadius, -0.2, Math.PI * 1.85, false);
        ctx.strokeStyle = theme.wire;
        ctx.lineWidth = wireRadius;
        ctx.stroke();

        // Inner coil shine
        ctx.beginPath();
        ctx.arc(0, coilCenterY + offset, springRadius * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = theme.wireHighlight;
        ctx.lineWidth = Math.max(0.4, wireRadius * 0.25);
        ctx.stroke();
      }
    }

    // 3. FRONT NEEDLE PIN ARM
    const targetTipX = pinArmX + W * 0.15;
    const targetTipY = topY + claspH * 0.5;

    ctx.beginPath();
    ctx.moveTo(pinArmX, coilCenterY - springRadius * 0.4);
    ctx.lineTo(pinArmX, topY + claspH * 0.8);
    ctx.lineTo(targetTipX, targetTipY);
    ctx.strokeStyle = theme.wireShadow;
    ctx.lineWidth = wireRadius + 0.8;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pinArmX, coilCenterY - springRadius * 0.4);
    ctx.lineTo(pinArmX, topY + claspH * 0.8);
    ctx.lineTo(targetTipX, targetTipY);
    ctx.strokeStyle = theme.wire;
    ctx.lineWidth = wireRadius;
    ctx.stroke();

    // Specular shine along needle
    ctx.beginPath();
    ctx.moveTo(pinArmX + 0.2, coilCenterY - springRadius * 0.5);
    ctx.lineTo(pinArmX + 0.2, topY + claspH * 0.9);
    ctx.strokeStyle = theme.wireHighlight;
    ctx.lineWidth = Math.max(0.5, wireRadius * 0.35);
    ctx.stroke();

    // 4. CLASP / HEAD HOOD (Silver Stamped Cap)
    const claspW = W * 1.25;
    const claspX = -claspW * 0.42;
    const claspY = topY;
    const claspRadius = claspW * 0.28;

    // Clasp outer capsule
    ctx.beginPath();
    ctx.roundRect(claspX, claspY, claspW, claspH, [claspRadius, claspRadius, claspRadius * 0.5, claspRadius * 0.5]);

    // Metallic silver gradient fill
    const grad = ctx.createLinearGradient(claspX, claspY, claspX + claspW, claspY + claspH);
    grad.addColorStop(0, theme.claspLight);
    grad.addColorStop(0.35, theme.wireHighlight);
    grad.addColorStop(0.7, theme.claspMid);
    grad.addColorStop(1, theme.claspDark);

    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = theme.wireShadow;
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Clasp catch notch
    ctx.beginPath();
    ctx.moveTo(claspX + claspW * 0.2, claspY + claspH * 0.45);
    ctx.lineTo(claspX + claspW * 0.65, claspY + claspH * 0.45);
    ctx.lineTo(claspX + claspW * 0.65, claspY + claspH * 0.85);
    ctx.strokeStyle = theme.wireShadow;
    ctx.lineWidth = Math.max(0.7, wireRadius * 0.55);
    ctx.stroke();

    // Clasp crimp indentation dot
    ctx.beginPath();
    ctx.arc(claspX + claspW * 0.72, claspY + claspH * 0.32, wireRadius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = theme.wireShadow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(claspX + claspW * 0.70, claspY + claspH * 0.30, wireRadius * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = theme.wireHighlight;
    ctx.fill();

    // 5. METALLIC SPECULAR GLINT / STARBURST
    if (glint > 0.55 && p.z > 0.4) {
      const glintX = claspX + claspW * 0.3;
      const glintY = claspY + claspH * 0.25;
      const glintSize = (s * 0.16) * (glint - 0.55) * 2.0;

      // Glow halo
      const radialGlow = ctx.createRadialGradient(glintX, glintY, 0, glintX, glintY, glintSize * 1.8);
      radialGlow.addColorStop(0, theme.glow);
      radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(glintX, glintY, glintSize * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Delicate silver starburst ray
      ctx.beginPath();
      ctx.moveTo(glintX - glintSize, glintY);
      ctx.lineTo(glintX + glintSize, glintY);
      ctx.moveTo(glintX, glintY - glintSize);
      ctx.lineTo(glintX, glintY + glintSize);
      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    ctx.restore();
  };

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
    };

    handleResize();
    initParticles(width, height);
    window.addEventListener('resize', handleResize, { passive: true });

    // Mouse gentle interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.vx = e.clientX - mouse.lastX;
      mouse.vy = e.clientY - mouse.lastY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity = (currentY - lastScrollY) * 0.05;
      lastScrollY = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = (now: number) => {
      lastTimeRef.current = now;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = 120;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      // Soft ambient oscillation
      const windX = Math.sin(now * 0.0004) * 0.18;
      scrollVelocity *= 0.94;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Natural slow falling & swaying
        const sway = Math.sin(now * p.swayFreq + p.swayPhase) * p.swayAmp;
        p.x += p.vx + sway + windX;
        p.y += p.vy + scrollVelocity;

        p.rotation += p.vRot;
        p.tiltX += p.vTiltX;
        p.tiltY += p.vTiltY;

        // 2. Soft mouse response
        if (interactive && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouseRadius) * (0.4 + p.z * 0.6);
            const nx = dx / dist;
            const ny = dy / dist;

            p.vx += nx * force * 0.8;
            p.vy += ny * force * 0.6;
            p.vRot += (Math.random() - 0.5) * force * 0.02;
          }
        }

        // 3. Velocity damping
        p.vx *= 0.96;
        p.vy = p.vy * 0.97 + p.baseVy * 0.03;
        p.vRot = p.vRot * 0.98 + (p.vRot >= 0 ? 1 : -1) * 0.0001;
        p.vTiltX *= 0.98;
        p.vTiltY *= 0.98;

        // 4. Wrap screen bounds
        const margin = p.size * 2 + 20;
        if (p.y > height + margin) {
          p.y = -margin - Math.random() * 30;
          p.x = Math.random() * width;
          p.vy = p.baseVy;
          p.vx = (Math.random() - 0.5) * 0.3;
        } else if (p.y < -margin * 2) {
          p.y = height + margin;
        }

        if (p.x > width + margin) {
          p.x = -margin;
        } else if (p.x < -margin) {
          p.x = width + margin;
        }

        // 5. Draw safety pin
        drawSafetyPin(ctx, p, now);
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initParticles, interactive]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full pointer-events-none"
      />
    </div>
  );
}

export default FallingPinsBackground;
